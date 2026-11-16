import React from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Clock,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const ADDRESS = '1237 Barrington Street, Halifax, Nova Scotia, B3J 1Y2'
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS)}`

export default function VisitPage({ onOpenReservation }) {
  return (
    <main id="main-content" className="visit-page">
      <section className="visit-hero-banner">
        <div className="section-wrap">
          <p className="eyebrow">YOUR NEXT GOOD PAUSE</p>
          <h1>
            See you on<br />
            <em>Barrington.</em>
          </h1>
          <p className="visit-hero-lead">
            We’re in downtown Halifax. Come by for single origin coffee, a fresh pastry, a spin through the records, or just a little time out.
          </p>
          <div className="visit-hero-ctas">
            <button className="button button-paper" onClick={onOpenReservation}>
              <Calendar size={15} /> Reserve a Table
            </button>
            <a href={DIRECTIONS_URL} target="_blank" rel="noreferrer" className="outline-link">
              Directions in Google Maps <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="section-wrap visit-cards-grid">
        <div className="visit-detail-card-smoky">
          <p className="eyebrow">LOCATION</p>
          <h2>1237 Barrington St</h2>
          <p>Halifax, Nova Scotia B3J 1Y2</p>
          <span>Between Morris &amp; Bishop Street</span>
          <a href={DIRECTIONS_URL} target="_blank" rel="noreferrer" className="text-link">
            Open Map Directions <ArrowUpRight size={14} />
          </a>
        </div>

        <div className="visit-detail-card-smoky">
          <p className="eyebrow">WHEN TO VISIT</p>
          <h2>Every Day</h2>
          <p>8:00 AM – 7:00 PM</p>
          <span>Breakfast, Lunch, Vinyl Sessions &amp; Evening Flights</span>
          <button className="text-link" onClick={onOpenReservation}>
            Book a Reservation <ArrowRight size={14} />
          </button>
        </div>

        <div className="visit-detail-card-smoky">
          <p className="eyebrow">GET IN TOUCH</p>
          <h2>Direct Reach</h2>
          <p>Phone: <a href="tel:+19022236696">+1 (902) 223-6696</a></p>
          <span>WhatsApp &amp; Instagram: @aashusmoky</span>
          <Link to="/contact" className="text-link">
            Send Message Online <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Map Embed */}
      <section className="visit-map-container">
        <div className="map-caption-side">
          <p className="eyebrow">CENTRAL DOWNTOWN HALIFAX</p>
          <h2>Getting here is easy.</h2>
          <p>
            Steps from the Halifax Waterfront boardwalk, Halifax Central Library, and Spring Garden Road shopping district. Street parking and bike racks are located directly outside.
          </p>
          <a href={DIRECTIONS_URL} target="_blank" rel="noreferrer" className="button button-dark">
            Open Google Maps Directions <ArrowUpRight size={14} />
          </a>
        </div>
        <div className="map-view-box">
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
