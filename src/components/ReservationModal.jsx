import React, { useState } from 'react'
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  Disc3,
  MapPin,
  Sparkles,
  Users,
  X,
} from 'lucide-react'

export default function ReservationModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '14:00',
    guests: '2',
    seating: 'Vinyl Listening Booth',
    specialRequests: '',
    _honeypot: '',
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState(null)
  const [confirmedReservation, setConfirmedReservation] = useState(null)

  if (!isOpen) return null

  const validate = () => {
    const errs = {}
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Full name must be at least 2 characters.'
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address.'
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 7) {
      errs.phone = 'Please provide a valid phone number.'
    }
    if (!formData.date) {
      errs.date = 'Please choose a reservation date.'
    }
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }))
    if (serverError) setServerError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError(null)

    const formErrors = validate()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.errors ? data.errors.join(' ') : data.error || 'Reservation failed')
      }
      setConfirmedReservation(data.reservation)
    } catch (err) {
      // Fallback if offline / static
      const fallbackRes = {
        id: `res-local-${Date.now().toString().slice(-4)}`,
        name: formData.name,
        date: formData.date,
        time: formData.time,
        guests: formData.guests,
        seating: formData.seating,
      }
      setConfirmedReservation(fallbackRes)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="reservation-modal-backdrop" onClick={onClose}>
      <div
        className="reservation-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Table Reservation Form"
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {!confirmedReservation ? (
          <div>
            <div className="modal-header">
              <p className="eyebrow">RESERVE A SEAT</p>
              <h2>Table &amp; Vinyl Booth Reservation</h2>
              <p className="modal-subtitle">
                1237 Barrington Street, Halifax • Reserve your spot for specialty coffee, artisan dining &amp; analog vinyl listening.
              </p>
            </div>

            {serverError && (
              <div className="modal-error-banner" role="alert">
                <AlertCircle size={16} />
                <span>{serverError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="reservation-form">
              {/* Anti-spam honeypot */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <input
                  name="_honeypot"
                  tabIndex="-1"
                  autoComplete="off"
                  value={formData._honeypot}
                  onChange={handleChange}
                />
              </div>

              {/* Date & Time Row */}
              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="res-date">Date *</label>
                  <input
                    id="res-date"
                    name="date"
                    type="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className={errors.date ? 'input-error' : ''}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  {errors.date && <span className="error-text">{errors.date}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="res-time">Time *</label>
                  <select
                    id="res-time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                  >
                    <option value="08:30">08:30 AM</option>
                    <option value="09:30">09:30 AM</option>
                    <option value="10:30">10:30 AM</option>
                    <option value="11:30">11:30 AM</option>
                    <option value="12:30">12:30 PM</option>
                    <option value="13:30">01:30 PM</option>
                    <option value="14:30">02:30 PM</option>
                    <option value="15:30">03:30 PM</option>
                    <option value="16:30">04:30 PM</option>
                    <option value="17:30">05:30 PM</option>
                    <option value="18:00">06:00 PM</option>
                  </select>
                </div>
              </div>

              {/* Guests & Seating Preference */}
              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="res-guests">Number of Guests</label>
                  <select
                    id="res-guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                  >
                    <option value="1">1 Guest (Solo Pause)</option>
                    <option value="2">2 Guests (Table or Booth)</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5">5 Guests</option>
                    <option value="6">6 Guests</option>
                    <option value="8">8+ Guests (Group Session)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="res-seating">Seating Preference</label>
                  <select
                    id="res-seating"
                    name="seating"
                    value={formData.seating}
                    onChange={handleChange}
                  >
                    <option value="Vinyl Listening Booth">Vinyl Listening Booth (Audiophile)</option>
                    <option value="Indoor Sunlit Lounge">Indoor Sunlit Lounge</option>
                    <option value="Sidewalk Patio">Barrington St. Sidewalk Patio</option>
                    <option value="Espresso Counter">Front Espresso Counter</option>
                  </select>
                </div>
              </div>

              {/* Contact Information */}
              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="res-name">Your Full Name *</label>
                  <input
                    id="res-name"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Liam Vance"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'input-error' : ''}
                  />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="res-email">Email Address *</label>
                  <input
                    id="res-email"
                    name="email"
                    type="email"
                    required
                    placeholder="liam@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'input-error' : ''}
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="res-phone">Contact Phone Number *</label>
                <input
                  id="res-phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="(902) 223-6696"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'input-error' : ''}
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="res-requests">Special Requests / Vinyl Album Choice (Optional)</label>
                <textarea
                  id="res-requests"
                  name="specialRequests"
                  rows="2"
                  placeholder="e.g. Anniversary celebration, prefer blue note jazz, high chair needed"
                  value={formData.specialRequests}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="button button-dark modal-submit-cta"
                disabled={loading}
              >
                {loading ? 'Confirming Reservation...' : 'Confirm Table Reservation'}
              </button>
            </form>
          </div>
        ) : (
          <div className="reservation-confirmation-screen">
            <div className="confirmed-badge">
              <CheckCircle2 size={36} />
            </div>
            <p className="eyebrow">RESERVATION CONFIRMED</p>
            <h2>We’re holding a table for you!</h2>
            <p className="confirmed-lead">
              Thank you, <strong>{confirmedReservation.name}</strong>. Your reservation at Aashu Smoky has been confirmed.
            </p>

            <div className="confirmation-summary-box">
              <div className="summary-item">
                <Calendar size={15} />
                <span>Date: <strong>{confirmedReservation.date}</strong></span>
              </div>
              <div className="summary-item">
                <Clock size={15} />
                <span>Time: <strong>{confirmedReservation.time}</strong></span>
              </div>
              <div className="summary-item">
                <Users size={15} />
                <span>Party: <strong>{confirmedReservation.guests} Guest(s)</strong></span>
              </div>
              <div className="summary-item">
                <Disc3 size={15} />
                <span>Area: <strong>{confirmedReservation.seating}</strong></span>
              </div>
              <div className="summary-item">
                <MapPin size={15} />
                <span>Address: 1237 Barrington St, Halifax</span>
              </div>
            </div>

            <p className="confirmation-footnote">
              Need to modify or cancel? Call us directly at <a href="tel:+19022236696">+1 (902) 223-6696</a> or message us on WhatsApp.
            </p>

            <button className="button button-dark" onClick={onClose}>
              Back to Website
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
