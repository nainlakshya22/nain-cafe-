import React from 'react'
import {
  Calendar,
  Coffee,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const WHATSAPP_URL =
  'https://wa.me/19022236696?text=Hi%20Listen%20Halifax%20team%2C%20I%20would%20like%20to%20inquire%20about%20a%20table%20reservation%20or%20menu%20offerings!'
const DIRECTIONS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=1237+Barrington+Street,+Halifax,+Nova+Scotia'

export default function FloatingActions({ onOpenReservation }) {
  return (
    <>
      {/* Floating WhatsApp Bubble */}
      <aside className="whatsapp-floating-wrap" aria-label="Quick contact WhatsApp">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="whatsapp-btn"
          aria-label="Chat with Listen Halifax on WhatsApp"
        >
          <MessageCircle size={22} fill="white" />
          <span className="whatsapp-label">Chat with Us</span>
        </a>
      </aside>

      {/* Sticky Mobile Bottom Bar (Visible on mobile viewports < 768px) */}
      <nav className="mobile-sticky-bottom-bar" aria-label="Quick action bottom bar">
        <button
          className="bottom-bar-action highlight"
          onClick={onOpenReservation}
          aria-label="Book a table"
        >
          <Calendar size={18} />
          <span>Book Table</span>
        </button>

        <Link to="/menu" className="bottom-bar-action" aria-label="View menu">
          <Coffee size={18} />
          <span>Menu</span>
        </Link>

        <a href="tel:+19022236696" className="bottom-bar-action" aria-label="Call café">
          <Phone size={18} />
          <span>Call</span>
        </a>

        <a
          href={DIRECTIONS_URL}
          target="_blank"
          rel="noreferrer"
          className="bottom-bar-action"
          aria-label="Get directions in Google Maps"
        >
          <MapPin size={18} />
          <span>Directions</span>
        </a>
      </nav>
    </>
  )
}
