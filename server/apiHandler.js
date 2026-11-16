import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const DB_PATH = path.join(rootDir, 'data', 'db.json')
const RESERVATIONS_PATH = path.join(rootDir, 'data', 'reservations.json')
const CONTACT_PATH = path.join(rootDir, 'data', 'contact.json')

const rateLimitMap = new Map()

export function readJsonFile(filePath, fallback = {}) {
  try {
    if (!fs.existsSync(filePath)) return fallback
    const raw = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(raw)
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err)
    return fallback
  }
}

export function writeJsonFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
    return true
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err)
    return false
  }
}

export function handleApiRequest(req, res) {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`)
  const pathname = parsedUrl.pathname
  const method = req.method

  const jsonResponse = (statusCode, data) => {
    res.writeHead(statusCode, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    })
    res.end(JSON.stringify(data))
  }

  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    })
    res.end()
    return
  }

  // 1. GET /api/health
  if (method === 'GET' && pathname === '/api/health') {
    return jsonResponse(200, {
      status: 'ok',
      service: 'Aashu Smoky API Server',
      version: '2.0.0',
      timestamp: new Date().toISOString(),
    })
  }

  // 2. GET /api/menu
  if (method === 'GET' && pathname === '/api/menu') {
    const db = readJsonFile(DB_PATH, { menu: [], menuCategories: [] })
    let items = db.menu || []

    const category = parsedUrl.searchParams.get('category')
    const search = parsedUrl.searchParams.get('search')

    if (category && category !== 'All') {
      items = items.filter(
        (item) => item.category.toLowerCase() === category.toLowerCase()
      )
    }

    if (search) {
      const q = search.toLowerCase().trim()
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      )
    }

    return jsonResponse(200, {
      success: true,
      count: items.length,
      categories: db.menuCategories || [],
      menu: items,
    })
  }

  const readJsonBody = (callback) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
      if (body.length > 1e6) req.destroy()
    })
    req.on('end', () => {
      try {
        const parsed = body ? JSON.parse(body) : {}
        callback(null, parsed)
      } catch (err) {
        callback(err, null)
      }
    })
  }

  // 3. POST /api/reservations
  if (method === 'POST' && pathname === '/api/reservations') {
    readJsonBody((err, body) => {
      if (err) {
        return jsonResponse(400, {
          success: false,
          error: 'Malformed JSON payload.',
        })
      }

      const { name, email, phone, date, time, guests, seating, specialRequests, _honeypot } = body

      // Spam detection
      if (_honeypot && _honeypot.trim() !== '') {
        return jsonResponse(400, {
          success: false,
          error: 'Spam submission detected.',
        })
      }

      // Rate limiting (1 submission per 8 seconds per IP)
      const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown'
      const now = Date.now()
      const last = rateLimitMap.get(clientIp) || 0
      if (now - last < 8000) {
        const waitSec = Math.ceil((8000 - (now - last)) / 1000)
        return jsonResponse(429, {
          success: false,
          error: `Please wait ${waitSec} second(s) before submitting another request.`,
        })
      }

      // Validation
      const errors = []
      if (!name || typeof name !== 'string' || name.trim().length < 2) {
        errors.push('Full name must be at least 2 characters.')
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
        errors.push('Please enter a valid email address.')
      }
      if (!phone || typeof phone !== 'string' || phone.trim().length < 7) {
        errors.push('Please provide a valid contact phone number.')
      }
      if (!date) errors.push('Please select a reservation date.')
      if (!time) errors.push('Please select a reservation time.')

      const partySize = parseInt(guests, 10)
      if (isNaN(partySize) || partySize < 1 || partySize > 20) {
        errors.push('Party size must be between 1 and 20 guests.')
      }

      if (errors.length > 0) {
        return jsonResponse(400, { success: false, errors })
      }

      rateLimitMap.set(clientIp, now)
      const resData = readJsonFile(RESERVATIONS_PATH, { reservations: [] })
      const newReservation = {
        id: `res-${Date.now()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        date,
        time,
        guests: partySize,
        seating: seating || 'Vinyl Listening Booth',
        specialRequests: specialRequests ? specialRequests.trim() : '',
        createdAt: new Date().toISOString(),
        clientIp,
        status: 'confirmed',
      }

      resData.reservations = [newReservation, ...(resData.reservations || [])]
      writeJsonFile(RESERVATIONS_PATH, resData)

      console.log(`[Reservation Confirmed] ID: ${newReservation.id} For: ${newReservation.name} (${newReservation.guests} guests on ${newReservation.date} at ${newReservation.time})`)

      return jsonResponse(201, {
        success: true,
        message: 'Your table reservation at Aashu Smoky has been confirmed! A confirmation email has been logged.',
        reservation: newReservation,
      })
    })
    return
  }

  // 4. POST /api/contact
  if (method === 'POST' && pathname === '/api/contact') {
    readJsonBody((err, body) => {
      if (err) return jsonResponse(400, { success: false, error: 'Malformed JSON payload.' })

      const { name, email, phone, subject, message, _honeypot } = body

      if (_honeypot && _honeypot.trim() !== '') {
        return jsonResponse(400, { success: false, error: 'Spam submission detected.' })
      }

      const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown'
      const now = Date.now()
      const last = rateLimitMap.get(clientIp) || 0
      if (now - last < 8000) {
        const waitSec = Math.ceil((8000 - (now - last)) / 1000)
        return jsonResponse(429, {
          success: false,
          error: `Please wait ${waitSec} second(s) before sending another message.`,
        })
      }

      const errors = []
      if (!name || name.trim().length < 2) errors.push('Full name must be at least 2 characters.')
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!email || !emailRegex.test(email.trim())) errors.push('Please enter a valid email address.')
      if (!subject || subject.trim().length < 3) errors.push('Subject must be at least 3 characters.')
      if (!message || message.trim().length < 10) errors.push('Message must be at least 10 characters.')

      if (errors.length > 0) {
        return jsonResponse(400, { success: false, errors })
      }

      rateLimitMap.set(clientIp, now)
      const contactData = readJsonFile(CONTACT_PATH, { messages: [] })
      const newMsg = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? phone.trim() : null,
        subject: subject.trim(),
        message: message.trim(),
        createdAt: new Date().toISOString(),
        clientIp,
        status: 'received',
      }

      contactData.messages = [newMsg, ...(contactData.messages || [])]
      writeJsonFile(CONTACT_PATH, contactData)

      console.log(`[Contact Message Received] ID: ${newMsg.id} From: ${newMsg.name} Subject: "${newMsg.subject}"`)

      return jsonResponse(201, {
        success: true,
        message: 'Thank you for reaching out to Aashu Smoky! Our café team will respond shortly.',
        enquiryId: newMsg.id,
      })
    })
    return
  }

  // 5. GET /api/reservations (Audit & QA)
  if (method === 'GET' && pathname === '/api/reservations') {
    const data = readJsonFile(RESERVATIONS_PATH, { reservations: [] })
    return jsonResponse(200, { success: true, count: data.reservations.length, reservations: data.reservations })
  }

  // 6. GET /api/contact (Audit & QA)
  if (method === 'GET' && pathname === '/api/contact') {
    const data = readJsonFile(CONTACT_PATH, { messages: [] })
    return jsonResponse(200, { success: true, count: data.messages.length, messages: data.messages })
  }

  return jsonResponse(404, { success: false, error: `API route '${pathname}' not found.` })
}
