import React from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Clock,
  Coffee,
  Disc3,
  Heart,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
  Play,
  Quote,
  Sparkles,
  Star,
  Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useMusic } from '../context/MusicContext.jsx'
import dbData from '../../data/db.json'

const DIRECTIONS_URL =
  'https://www.google.com/maps/dir/?api=1&destination=1237+Barrington+Street,+Halifax,+Nova+Scotia'

export default function HomePage({ onOpenReservation }) {
  const { togglePlay, isPlaying } = useMusic()

  const featuredMenuItems = (dbData.menu || []).slice(0, 4)
  const testimonials = dbData.testimonials || []

  return (
    <main id="main-content" className="homepage">
      {/* 1. HERO SECTION */}
      <section className="home-hero-smoky">
        <img
          src="/images/listen-hero.jpg"
          alt="Turntable spinning vinyl in a warm, sunlit coffeehouse"
          className="home-hero-bg"
          loading="eager"
        />
        <div className="home-hero-shade-smoky" />

        <div className="home-hero-content-smoky">
          <p className="eyebrow eyebrow-copper">1237 BARRINGTON STREET · HALIFAX, NS</p>
          <h1>
            Aashu Smoky.<br />
            <em>Coffee &amp; Records.</em>
          </h1>
          <p className="home-hero-subtitle">
            A sanctuary for specialty coffee, slow-steeped moments, and the warmth of analog vinyl. Step off the street and find a little room to pause.
          </p>

          <div className="home-hero-actions">
            <button className="button button-paper" onClick={onOpenReservation}>
              Reserve a Table <ArrowRight size={15} />
            </button>
            <Link className="outline-link" to="/menu">
              Explore Menu <ArrowUpRight size={15} />
            </Link>
            <button
              className="vinyl-hero-play-pill"
              onClick={togglePlay}
              aria-label="Play vinyl audio"
            >
              <Disc3 size={16} className={isPlaying ? 'spin-icon' : ''} />
              <span>{isPlaying ? 'Pause Audio' : 'Listen to Vinyl Session'}</span>
            </button>
          </div>
        </div>

        <span className="hero-counter-smoky">A PLACE TO PAUSE · 01 / 06</span>
        <a className="hero-scroll-smoky" href="#story" aria-label="Scroll to brand story">
          <ArrowDown size={16} />
        </a>
      </section>

      {/* 2. BRAND STORY & PHILOSOPHY */}
      <section className="section-wrap smoky-story-section" id="story">
        <p className="section-index">01 — THE FEELING</p>
        <div className="smoky-story-grid">
          <div className="smoky-story-heading">
            <p className="eyebrow">A SMALL INVITATION TO SLOW DOWN</p>
            <h2>
              Come for a cup.<br />
              <em>Stay for the groove.</em>
            </h2>
          </div>
          <div className="smoky-story-text">
            <p>
              Aashu Smoky was shaped around two simple pleasures: a meticulously brewed drink and the kind of record that makes you look up from your phone.
            </p>
            <p>
              Whether it’s our house-smoked maple caramel espresso or a rare Blue Note jazz pressing spinning on the turntable, we invite you to take a breath, tune in, and let the track finish.
            </p>
            <Link to="/about" className="text-link">
              Our Story &amp; Philosophy <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        <div className="smoky-pillars-grid">
          <article className="smoky-pillar-card">
            <span className="pillar-num">01</span>
            <h3>Single Origin Roasts</h3>
            <p>Ethically sourced beans roasted to bring out origin character, hand-poured through V60 or pulled on manual levers.</p>
          </article>
          <article className="smoky-pillar-card">
            <span className="pillar-num">02</span>
            <h3>Hi-Fi Vinyl Listening</h3>
            <p>Audiophile turntable setups, tube amplification, and a library of vintage jazz, soul, and lo-fi pressings.</p>
          </article>
          <article className="smoky-pillar-card">
            <span className="pillar-num">03</span>
            <h3>Kitchen &amp; Bakery</h3>
            <p>Fresh sourdough toasts, truffle paninis, and house-made burnt Basque cheesecakes baked daily.</p>
          </article>
        </div>
      </section>

      {/* 3. SIGNATURE MENU PREVIEW */}
      <section className="section-wrap smoky-menu-preview">
        <div className="section-heading-smoky">
          <div>
            <p className="eyebrow">02 — THE COUNTER</p>
            <h2>Signature Selections</h2>
          </div>
          <Link to="/menu" className="button button-dark">
            View Full Digital Menu <ArrowRight size={14} />
          </Link>
        </div>

        <div className="menu-preview-cards-grid">
          {featuredMenuItems.map((item) => (
            <article key={item.id} className="preview-item-card">
              <div className="preview-img-wrap">
                <img src={item.image} alt={item.name} loading="lazy" />
                {item.badge && <span className="preview-badge">{item.badge}</span>}
              </div>
              <div className="preview-card-body">
                <div className="preview-top-row">
                  <span className="preview-cat">{item.category}</span>
                  <span className="preview-price">${item.price.toFixed(2)} CAD</span>
                </div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <button
                  className="preview-book-btn"
                  onClick={onOpenReservation}
                  aria-label={`Reserve table to try ${item.name}`}
                >
                  Reserve Table to Taste →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. VINYL MUSIC EXPERIENCE SHOWCASE */}
      <section className="smoky-vinyl-feature">
        <div className="vinyl-feature-left">
          <figure className="vinyl-feature-image-box">
            <img
              src="/images/listen-vinyl.jpg"
              alt="Vinyl record spinning on a high-fidelity wooden turntable"
            />
            <button
              className="vinyl-floating-play-pill"
              onClick={togglePlay}
              aria-label="Toggle vinyl playback"
            >
              <Disc3 size={18} className={isPlaying ? 'spin-icon' : ''} />
              <span>{isPlaying ? 'Pause Music' : 'Listen Now'}</span>
            </button>
          </figure>
        </div>

        <div className="vinyl-feature-right">
          <p className="eyebrow">03 — ANALOG FIDELITY</p>
          <h2>
            There’s a track<br />
            for <em>this moment.</em>
          </h2>
          <p>
            Digital audio is convenient, but analog vinyl has warmth, presence, and intention. At Aashu Smoky, we curate rare pressings from jazz to ambient soul, playing on tube amplifiers throughout the café.
          </p>
          <div className="vinyl-specs-list">
            <div className="spec-bullet">
              <Disc3 size={18} />
              <span>Dedicated audiophile listening booths with high-grade headphones</span>
            </div>
            <div className="spec-bullet">
              <Sparkles size={18} />
              <span>Weekly vinyl sessions &amp; acoustic jazz record swaps</span>
            </div>
            <div className="spec-bullet">
              <Coffee size={18} />
              <span>Curated coffee &amp; music pairing flights</span>
            </div>
          </div>
          <button className="button button-paper" onClick={onOpenReservation}>
            Book a Vinyl Booth Session <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* 5. ATMOSPHERE GALLERY */}
      <section className="section-wrap smoky-gallery-section">
        <div className="gallery-section-header">
          <div>
            <p className="eyebrow">04 — ATMOSPHERE</p>
            <h2>Inside Aashu Smoky</h2>
          </div>
          <Link to="/gallery" className="text-link">
            See Full Photo Archive <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="smoky-photo-tiles">
          <div className="photo-tile tile-large">
            <img src="/images/cafe-interior-warm.jpg" alt="Warm sunlit café seating with natural wood and plants" />
            <span>The Sunlit Listening Lounge</span>
          </div>
          <div className="photo-tile">
            <img src="/images/listen-drinks.jpg" alt="Espresso and matcha drinks" />
            <span>Handcrafted Beverages</span>
          </div>
          <div className="photo-tile">
            <img src="/images/vinyl-shelf.jpg" alt="Curated vinyl record library" />
            <span>Curated Record Wall</span>
          </div>
          <div className="photo-tile">
            <img src="/images/cheesecake.jpg" alt="Burnt Basque Cheesecake slice" />
            <span>House Baked Confections</span>
          </div>
          <div className="photo-tile">
            <img src="/images/cafe-patio.jpg" alt="Barrington Street café exterior patio" />
            <span>Barrington St. Sidewalk</span>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="section-wrap smoky-testimonials-section">
        <div className="testimonial-header">
          <p className="eyebrow">05 — COMMUNITY VOICES</p>
          <h2>What our guests say</h2>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <article key={t.id} className="testimonial-card">
              <div className="testimonial-stars">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={14} fill="#c2883f" stroke="#c2883f" />
                ))}
              </div>
              <blockquote className="testimonial-quote">
                “{t.quote}”
              </blockquote>
              <div className="testimonial-author">
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 7. LOCATION & HOURS */}
      <section className="section-wrap smoky-visit-preview">
        <div className="visit-preview-box">
          <div className="visit-preview-copy">
            <p className="eyebrow eyebrow-light">HALIFAX LOCATION</p>
            <h2>1237 Barrington Street</h2>
            <p className="visit-address-line">
              Halifax, Nova Scotia B3J 1Y2 • Open Seven Days a Week, 8:00 AM – 7:00 PM
            </p>
            <div className="visit-action-buttons">
              <button className="button button-paper" onClick={onOpenReservation}>
                Reserve Table Now <ArrowRight size={14} />
              </button>
              <a href={DIRECTIONS_URL} target="_blank" rel="noreferrer" className="outline-link">
                Open in Google Maps <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
          <div className="visit-preview-map">
            <iframe
              title="Aashu Smoky Barrington Street Halifax Map"
              src="https://maps.google.com/maps?q=1237%20Barrington%20Street%2C%20Halifax%2C%20Nova%20Scotia&t=&z=16&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
