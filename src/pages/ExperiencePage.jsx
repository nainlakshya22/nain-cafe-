import React from 'react'
import { ArrowRight, ArrowUpRight, Coffee, Disc3, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const experiencesList = [
  {
    number: '01',
    title: 'Specialty Coffee Flights',
    description: 'Taste the nuanced spectrum of origin beans with our curated single-origin tasting flights, pulled through V60 or espresso.',
    image: '/images/listen-detail.jpg',
    detail: 'Coffee · Ask our baristas for today’s roast',
    route: '/menu',
  },
  {
    number: '02',
    title: 'Hi-Fi Vinyl Listening Sessions',
    description: 'An intentional, listening-first atmosphere with audiophile turntables and vintage tube amplifiers inviting you to pause.',
    image: '/images/listen-vinyl.jpg',
    detail: 'Analog Fidelity · Reserve a booth',
    route: '/reserve',
  },
  {
    number: '03',
    title: 'Signature Beverage Creations',
    description: 'Try our handcrafted Nova Scotia Maple Sea Salt Latte, Pistachio Velvet, or Ceremonial Matcha Latte.',
    image: '/images/listen-drinks.jpg',
    detail: 'Signature Drinks · House-made syrups',
    route: '/menu',
  },
  {
    number: '04',
    title: 'Browse the Record Wall',
    description: 'Browse our collection of vintage vinyl records across jazz, ambient, soul, and lo-fi. Pick an album to spin.',
    image: '/images/vinyl-shelf.jpg',
    detail: 'Record Browsing · In-store collection',
    route: '/about',
  },
  {
    number: '05',
    title: 'Kitchen & Confection Craft',
    description: 'Warm truffle fontina paninis, smoked chili avocado sourdough, and burnt Basque cheesecakes.',
    image: '/images/tiramisu.jpg',
    detail: 'Kitchen · Sourdoughs & Desserts',
    route: '/menu',
  },
]

export default function ExperiencePage({ onOpenReservation }) {
  return (
    <main id="main-content" className="experience-page">
      <section className="experience-hero-banner">
        <div className="section-wrap">
          <p className="eyebrow">THE LISTENING ROOM</p>
          <h1>
            A softer, richer<br />
            <em>kind of buzz.</em>
          </h1>
          <p className="experience-hero-lead">
            Not a checklist. Not a hurry. Just good drinks, good music, and a space made to enjoy both.
          </p>
        </div>
      </section>

      <section className="section-wrap experience-cards-section">
        <div className="experience-list-grid">
          {experiencesList.map((item) => (
            <article key={item.number} className="experience-item-card">
              <div className="experience-item-img-box">
                <img src={item.image} alt={item.title} />
                <span className="exp-num">{item.number}</span>
              </div>
              <div className="experience-item-copy">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="exp-detail-tag">{item.detail}</span>
                <button
                  className="exp-cta-link"
                  onClick={onOpenReservation}
                >
                  Experience This →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-wrap experience-end-banner">
        <div className="experience-end-inner">
          <p className="eyebrow eyebrow-light">MAKE A LITTLE ROOM</p>
          <h2>Come listen with us.</h2>
          <button className="button button-paper" onClick={onOpenReservation}>
            Book a Vinyl Booth Session <ArrowRight size={14} />
          </button>
        </div>
      </section>
    </main>
  )
}
