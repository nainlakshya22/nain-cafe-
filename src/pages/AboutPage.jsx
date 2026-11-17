import React, { useEffect } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Coffee,
  Disc3,
  Heart,
  Instagram,
  Music,
  Sparkles,
  Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AboutPage({ onOpenReservation }) {
  useEffect(() => {
    document.title = 'Our Story & Vinyl Philosophy — Listen | Halifax'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Learn the story behind Listen (Rooms Coffee): A sanctuary for specialty coffee, slow vinyl listening, and intentional pauses in downtown Halifax.'
      )
    }
  }, [])

  return (
    <main id="main-content" className="about-page">
      {/* Hero */}
      <section className="about-hero-banner">
        <div className="section-wrap">
          <p className="eyebrow">A NOTE ON WHAT WE BELIEVE</p>
          <h1>
            Good things<br />
            take <em>time.</em>
          </h1>
          <p className="about-lead">
            Listen is a place for specialty coffee, rare vinyl records, and the quiet pleasure of paying attention.
          </p>
        </div>
      </section>

      {/* Point of View */}
      <section className="section-wrap about-story-grid-section">
        <div className="about-split-layout">
          <div className="about-story-col">
            <p className="eyebrow">01 — OUR POINT OF VIEW</p>
            <h2>A cup is never just a <em>cup.</em></h2>
            <div className="about-rich-prose">
              <p>
                It’s a reason to pause. A familiar little ritual. Something made with care, enjoyed without needing to be anywhere else. Listen is shaped around that feeling—and around the way music can make an ordinary afternoon feel like its own small occasion.
              </p>
              <p>
                We believe in thoughtful coffee, an authentic record, and the kind of space that leaves room for both. In a world defined by notifications and rush, we created a corner designed for taking your time.
              </p>
            </div>

            <div className="story-pillars-chips">
              <div className="chip-item">
                <Disc3 size={16} />
                <span>Audiophile Turntables</span>
              </div>
              <div className="chip-item">
                <Coffee size={16} />
                <span>Single Origin Micro-Roasts</span>
              </div>
              <div className="chip-item">
                <Sparkles size={16} />
                <span>House Baked Desserts</span>
              </div>
            </div>
          </div>

          <figure className="about-image-card">
            <img
              src="/images/listen-detail.jpg"
              alt="Manual coffee brewing and espresso prep in warm light"
            />
            <figcaption>The daily brewing ritual at 1237 Barrington Street</figcaption>
          </figure>
        </div>
      </section>

      {/* Analog Quote */}
      <section className="smoky-quote-section">
        <div className="section-wrap">
          <blockquote className="smoky-quote-text">
            <Disc3 size={28} className="quote-disc-icon" />
            <p>“Make a little room for what you <em>love.</em>”</p>
            <cite>THE LISTEN WAY</cite>
          </blockquote>
        </div>
      </section>

      {/* The Vinyl Culture */}
      <section className="section-wrap vinyl-culture-section">
        <div className="vinyl-culture-split">
          <figure className="vinyl-culture-img">
            <img src="/images/listen-vinyl.jpg" alt="Vinyl record on wooden turntable" />
            <span className="vinyl-badge-tag">Curated Analog Sound</span>
          </figure>

          <div className="vinyl-culture-copy">
            <p className="eyebrow">02 — THE SOUND OF ANALOG</p>
            <h2>Music you can touch and hear.</h2>
            <p>
              Streaming gave us everything at once, but lost the ritual of browsing album art, setting the needle, and listening to an artist’s complete statement from Side A to Side B.
            </p>
            <p>
              Our café features custom audio booths equipped with vintage Marantz and McIntosh tube amplification and high-grade headphones. Grab a warm cup, pull a record from our shelves, and listen without distraction.
            </p>
            <button className="button button-dark mt-4" onClick={onOpenReservation}>
              Reserve a Vinyl Booth <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* Rooted in Halifax */}
      <section className="section-wrap about-rooted-section">
        <div className="rooted-split">
          <div>
            <p className="eyebrow">03 — DOWNTOWN HALIFAX</p>
            <h2>A little corner to <em>come back to.</em></h2>
            <p>
              Find Listen at 1237 Barrington Street. Whether you’re meeting an old friend, reading a novel, or taking twenty minutes between meetings, the light is always on.
            </p>
            <a
              href="https://www.instagram.com/listenhalifax/"
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              Follow @listenhalifax on Instagram <ArrowUpRight size={14} />
            </a>
          </div>

          <figure className="rooted-img-wrap">
            <img src="/images/cafe-interior-warm.jpg" alt="Sunlit cozy cafe lounge" />
          </figure>
        </div>
      </section>

      {/* CTA */}
      <section className="section-wrap about-cta-banner">
        <div className="about-cta-inner">
          <div>
            <p className="eyebrow eyebrow-light">THE DOOR IS OPEN</p>
            <h2>We’ll leave a light on for you.</h2>
            <p>Open daily from 8:00 AM to 7:00 PM on Barrington Street.</p>
          </div>
          <button className="button button-paper" onClick={onOpenReservation}>
            Book a Table <ArrowRight size={15} />
          </button>
        </div>
      </section>
    </main>
  )
}
