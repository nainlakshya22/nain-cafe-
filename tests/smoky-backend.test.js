import { EventEmitter } from 'events'
import { handleApiRequest } from '../server/apiHandler.js'

function mockRequest({ method = 'GET', url = '/', headers = {}, body = null }) {
  const req = new EventEmitter()
  req.method = method
  req.url = url
  req.headers = { host: 'localhost', ...headers }
  req.socket = { remoteAddress: '127.0.0.1' }

  process.nextTick(() => {
    if (body) {
      const data = typeof body === 'string' ? body : JSON.stringify(body)
      req.emit('data', Buffer.from(data))
    }
    req.emit('end')
  })

  return req
}

function mockResponse(callback) {
  const res = {
    statusCode: 200,
    headers: {},
    body: '',
    writeHead(code, headers = {}) {
      this.statusCode = code
      this.headers = { ...this.headers, ...headers }
    },
    end(chunk) {
      if (chunk) this.body += chunk.toString()
      let json = null
      try {
        json = JSON.parse(this.body)
      } catch (e) {
        json = this.body
      }
      callback({
        status: this.statusCode,
        headers: this.headers,
        body: this.body,
        json,
      })
    },
  }
  return res
}

function callApi(options) {
  return new Promise((resolve) => {
    const req = mockRequest(options)
    const res = mockResponse(resolve)
    handleApiRequest(req, res)
  })
}

async function runSmokyTests() {
  console.log(`\n======================================================`)
  console.log(`AASHU SMOKY — AUTOMATED BACKEND & QA VERIFICATION`)
  console.log(`======================================================\n`)

  let passed = 0
  let failed = 0

  const assert = (condition, title, details = '') => {
    if (condition) {
      console.log(`  [PASS] ${title}`)
      passed++
    } else {
      console.error(`  [FAIL] ${title} - ${details}`)
      failed++
    }
  }

  // 1. Health
  console.log(`[TEST SUITE 1] System Health & Service Identification`)
  const rHealth = await callApi({ method: 'GET', url: '/api/health' })
  assert(rHealth.status === 200, 'GET /api/health returns 200 OK')
  assert(rHealth.json.status === 'ok', 'Status payload is "ok"')
  assert(rHealth.json.service.includes('Aashu Smoky'), 'Service identifies as Aashu Smoky API')

  // 2. Menu Endpoint
  console.log(`\n[TEST SUITE 2] Digital Menu Filtering & Search`)
  const rMenu = await callApi({ method: 'GET', url: '/api/menu' })
  assert(rMenu.status === 200, 'GET /api/menu returns 200 OK')
  assert(rMenu.json.success === true, 'Menu query success is true')
  assert(rMenu.json.menu.length >= 10, `Found ${rMenu.json.menu.length} menu items`)

  // Category filter
  const rCold = await callApi({ method: 'GET', url: '/api/menu?category=Cold%20Coffee' })
  assert(rCold.json.menu.length > 0, 'Found Cold Coffee items')
  assert(rCold.json.menu.every(i => i.category === 'Cold Coffee'), 'All items belong to category "Cold Coffee"')

  // Keyword search
  const rSearch = await callApi({ method: 'GET', url: '/api/menu?search=caramel' })
  assert(rSearch.json.menu.some(i => i.id === 'as-smoky-caramel'), 'Search matches Smoky Maple Caramel Latte')

  // 3. Table Reservation Submission & Validation
  console.log(`\n[TEST SUITE 3] Table Reservation Endpoint & Anti-Spam`)
  // Test A: Missing fields
  const rResMissing = await callApi({
    method: 'POST',
    url: '/api/reservations',
    body: { name: 'A' }
  })
  assert(rResMissing.status === 400, 'Rejects missing reservation fields with 400 Bad Request')
  assert(rResMissing.json.errors.length > 0, 'Returns list of specific validation errors')

  // Test B: Honeypot spam detection
  const rResBot = await callApi({
    method: 'POST',
    url: '/api/reservations',
    body: {
      name: 'Spam Bot',
      email: 'bot@spam.com',
      phone: '1234567',
      date: '2026-12-01',
      time: '12:00',
      guests: 2,
      _honeypot: 'bot filled this hidden input'
    }
  })
  assert(rResBot.status === 400, 'Traps and rejects bot honeypot field')

  // Test C: Valid reservation submission
  const validResPayload = {
    name: 'Maya Lin',
    email: 'maya.lin@example.com',
    phone: '(902) 441-9922',
    date: '2026-11-25',
    time: '14:30',
    guests: 3,
    seating: 'Vinyl Listening Booth',
    specialRequests: 'Celebrating friend birthday, request Blue Note jazz album!'
  }
  const rResValid = await callApi({
    method: 'POST',
    url: '/api/reservations',
    headers: { 'x-forwarded-for': '203.0.113.10' },
    body: validResPayload
  })
  assert(rResValid.status === 201, 'Valid reservation returns 201 Created')
  assert(rResValid.json.success === true, 'Reservation success is true')
  assert(rResValid.json.reservation.id.startsWith('res-'), 'Generates unique reservation confirmation code')

  // Test D: Rate limiting immediate duplicate
  const rResRate = await callApi({
    method: 'POST',
    url: '/api/reservations',
    headers: { 'x-forwarded-for': '203.0.113.10' },
    body: validResPayload
  })
  assert(rResRate.status === 429, 'Rate limit blocks immediate repeated reservation submission with 429')

  // Test E: Database persistence check
  const rAllRes = await callApi({ method: 'GET', url: '/api/reservations' })
  assert(
    rAllRes.json.reservations.some(r => r.id === rResValid.json.reservation.id),
    'Verified reservation is stored in data/reservations.json'
  )

  // 4. Contact Form Submission
  console.log(`\n[TEST SUITE 4] Contact Enquiry Endpoint & Persistence`)
  const validContactPayload = {
    name: 'Julian Vance',
    email: 'julian.vance@dal.ca',
    phone: '(902) 221-4455',
    subject: 'Private Vinyl Evening Booking',
    message: 'Hello, our music society would like to host an acoustic listening night for 15 guests at Aashu Smoky.'
  }
  const rContact = await callApi({
    method: 'POST',
    url: '/api/contact',
    headers: { 'x-forwarded-for': '203.0.113.20' },
    body: validContactPayload
  })
  assert(rContact.status === 201, 'Valid contact submission returns 201 Created')
  assert(rContact.json.enquiryId.startsWith('msg-'), 'Generates contact enquiry ID')

  const rAllMsg = await callApi({ method: 'GET', url: '/api/contact' })
  assert(
    rAllMsg.json.messages.some(m => m.id === rContact.json.enquiryId),
    'Verified contact enquiry stored in data/contact.json'
  )

  console.log(`\n======================================================`)
  console.log(`ALL ${passed} AASHU SMOKY BACKEND TESTS PASSED (${failed} FAILED)`)
  console.log(`======================================================\n`)

  if (failed > 0) process.exit(1)
}

runSmokyTests().catch(err => {
  console.error('Fatal test error:', err)
  process.exit(1)
})
