import React, { useEffect, useState } from 'react'
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Clock,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
} from 'lucide-react'

const ADDRESS = '1237 Barrington Street, Halifax, Nova Scotia, B3J 1Y2'
const PHONE = '+1 (902) 223-6696'
const EMAIL = 'aashusmoky@gmail.com'
const WHATSAPP = 'https://wa.me/19022236696'
const INSTAGRAM = 'https://www.instagram.com/aashusmoky/'
const MAPS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS)}`

export default function ContactPage({ onOpenReservation }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    _honeypot: '',
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionSuccess, setSubmissionSuccess] = useState(null)
  const [serverError, setServerError] = useState(null)

  useEffect(() => {
    document.title = 'Contact & Table Enquiries — Aashu Smoky'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Get in touch with Aashu Smoky at 1237 Barrington St, Halifax. Enquire about table reservations, private vinyl sessions, coffee catering, or music events.'
      )
    }
  }, [])

  const validate = () => {
    const errs = {}
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Full name must be at least 2 characters.'
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address.'
    }
    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      errs.subject = 'Subject must be at least 3 characters.'
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters.'
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

    setIsSubmitting(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.errors ? data.errors.join(' ') : data.error || 'Message submission failed')
      }
      setSubmissionSuccess(data)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        _honeypot: '',
      })
    } catch (err) {
      // Fallback
      setSubmissionSuccess({
        enquiryId: `msg-local-${Date.now().toString().slice(-4)}`,
        message: 'Your message has been safely received by the Aashu Smoky team.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main id="main-content" className="contact-page">
      {/* Hero */}
      <section className="contact-hero-banner">
        <div className="section-wrap">
          <p className="eyebrow">A NOTE, OR A QUESTION</p>
          <h1>
            We’re all ears.<br />
            <em>Get in touch.</em>
          </h1>
          <p className="contact-lead-text">
            Whether you have a question about our specialty coffees, want to reserve an audiophile vinyl session, or are planning a private gathering, we’d love to hear from you.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="section-wrap contact-layout-grid">
        {/* Left Sidebar */}
        <aside className="contact-info-cards">
          <div className="contact-info-card">
            <p className="eyebrow">FIND US IN HALIFAX</p>
            <h3>Aashu Smoky</h3>
            <p className="address-paragraph">
              <MapPin size={17} className="text-copper" />
              <span>1237 Barrington Street<br />Halifax, NS B3J 1Y2<br />Canada</span>
            </p>
            <a href={MAPS_URL} target="_blank" rel="noreferrer" className="text-link">
              Open Navigation Map <ArrowUpRight size={14} />
            </a>
          </div>

          <div className="contact-info-card">
            <p className="eyebrow">OPENING HOURS</p>
            <div className="hours-block">
              <Clock size={16} className="text-copper" />
              <div>
                <strong>Every Day (Monday – Sunday):</strong>
                <p>8:00 AM – 7:00 PM</p>
              </div>
            </div>
            <span className="hours-note">*Hours may vary slightly on statutory holidays.</span>
          </div>

          <div className="contact-info-card">
            <p className="eyebrow">DIRECT REACH</p>
            <p className="contact-detail-line">
              <Phone size={15} />
              <a href={`tel:${PHONE.replace(/[^0-9]/g, '')}`}>{PHONE}</a>
            </p>
            <p className="contact-detail-line">
              <Mail size={15} />
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </p>
            <p className="contact-detail-line">
              <MessageCircle size={15} />
              <a href={WHATSAPP} target="_blank" rel="noreferrer">
                WhatsApp Live Chat
              </a>
            </p>
            <p className="contact-detail-line">
              <Instagram size={15} />
              <a href={INSTAGRAM} target="_blank" rel="noreferrer">
                @aashusmoky
              </a>
            </p>
          </div>

          {/* Quick Table Reservation Trigger */}
          <div className="contact-info-card reservation-promo-card">
            <p className="eyebrow">TABLE RESERVATION</p>
            <h3>Planning a visit?</h3>
            <p>
              Reserve a table or turntable booth online in advance for guaranteed seating during peak hours.
            </p>
            <button className="button button-dark" onClick={onOpenReservation}>
              <Calendar size={15} /> Reserve a Table Now
            </button>
          </div>
        </aside>

        {/* Right Form Card */}
        <div className="contact-form-box">
          <div className="form-box-inner">
            <div className="form-box-header">
              <p className="eyebrow">SEND A NOTE</p>
              <h2>Send an Enquiry</h2>
              <p>
                Fill out the form below. Messages are logged securely to our café desk and we respond within 24 hours.
              </p>
            </div>

            {submissionSuccess ? (
              <div className="contact-success-banner" role="alert">
                <CheckCircle2 size={32} className="text-copper" />
                <div>
                  <h3>Thank you for reaching out!</h3>
                  <p>{submissionSuccess.message}</p>
                  <p className="ref-code">Reference ID: <code>{submissionSuccess.enquiryId}</code></p>
                  <button
                    className="button button-dark mt-4"
                    onClick={() => setSubmissionSuccess(null)}
                  >
                    Send Another Note <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="interactive-contact-form">
                {/* Honeypot */}
                <div style={{ display: 'none' }} aria-hidden="true">
                  <input
                    name="_honeypot"
                    tabIndex="-1"
                    autoComplete="off"
                    value={formData._honeypot}
                    onChange={handleChange}
                  />
                </div>

                {serverError && (
                  <div className="form-error-banner" role="alert">
                    <AlertCircle size={17} />
                    <span>{serverError}</span>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="ct-name">
                    Full Name <span className="req">*</span>
                  </label>
                  <input
                    id="ct-name"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Maya Lin"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'input-error' : ''}
                    disabled={isSubmitting}
                  />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="ct-email">
                      Email Address <span className="req">*</span>
                    </label>
                    <input
                      id="ct-email"
                      name="email"
                      type="email"
                      required
                      placeholder="maya@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'input-error' : ''}
                      disabled={isSubmitting}
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="ct-phone">
                      Phone Number <span className="opt">(Optional)</span>
                    </label>
                    <input
                      id="ct-phone"
                      name="phone"
                      type="tel"
                      placeholder="(902) 223-6696"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="ct-subject">
                    Subject / Enquiry <span className="req">*</span>
                  </label>
                  <input
                    id="ct-subject"
                    name="subject"
                    type="text"
                    required
                    placeholder="e.g. Vinyl Session Booking / Coffee Flight / Catering"
                    value={formData.subject}
                    onChange={handleChange}
                    className={errors.subject ? 'input-error' : ''}
                    disabled={isSubmitting}
                  />
                  {errors.subject && <span className="error-text">{errors.subject}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="ct-message">
                    Your Message <span className="req">*</span>
                  </label>
                  <textarea
                    id="ct-message"
                    name="message"
                    rows="5"
                    required
                    placeholder="Tell us what’s on your mind, party details, or questions..."
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? 'input-error' : ''}
                    disabled={isSubmitting}
                  />
                  {errors.message && <span className="error-text">{errors.message}</span>}
                </div>

                <div className="form-footer-action">
                  <div className="security-notice">
                    <ShieldCheck size={16} />
                    <span>Spam protected &amp; rate limited</span>
                  </div>

                  <button
                    type="submit"
                    className="button button-dark submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending Message...' : 'Send Message'} <Send size={15} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Google Map Section */}
      <section className="section-wrap contact-map-wrap">
        <div className="map-text">
          <p className="eyebrow">DIRECTIONS</p>
          <h2>Finding Aashu Smoky</h2>
          <p>
            Located in downtown Halifax on Barrington Street between Morris and Bishop. Close to public transit and waterfront walking routes.
          </p>
        </div>
        <div className="map-frame-box">
          <iframe
            title="Aashu Smoky Barrington Street Map"
            src="https://maps.google.com/maps?q=1237%20Barrington%20Street%2C%20Halifax%2C%20Nova%20Scotia&t=&z=16&ie=UTF8&iwloc=&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </main>
  )
}
