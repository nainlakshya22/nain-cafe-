import React, { useEffect, useState } from 'react'
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Coffee,
  Filter,
  Flame,
  Search,
  Sparkles,
  Utensils,
  X,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import dbData from '../../data/db.json'

export default function MenuPage({ onOpenReservation }) {
  const [category, setCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [menuItems, setMenuItems] = useState(dbData.menu || [])

  useEffect(() => {
    document.title = 'Digital Menu & Coffee Offerings — Aashu Smoky'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Explore the handcrafted digital menu of Aashu Smoky: Single origin pour-overs, Smoky Maple Caramel Latte, Cold Brew, artisan grilled paninis, and Burnt Basque Cheesecake in Halifax.'
      )
    }
  }, [])

  // Filter and search
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      category === 'All' || item.category.toLowerCase() === category.toLowerCase()
    const q = searchQuery.toLowerCase().trim()
    const matchesSearch =
      !q ||
      item.name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    return matchesCategory && matchesSearch
  })

  return (
    <main id="main-content" className="menu-page">
      {/* Menu Hero */}
      <section className="menu-hero-banner">
        <div className="section-wrap">
          <p className="eyebrow">AASHU SMOKY DIGITAL MENU</p>
          <h1>
            Handcrafted Coffee,<br />
            <em>Warm Kitchen &amp; Desserts.</em>
          </h1>
          <p className="menu-hero-lead">
            Every roast is pulled on our manual commercial espresso machine, dialed in daily. Pair with our artisan grilled paninis, sourdoughs, and house-baked pastries.
          </p>
        </div>
      </section>

      {/* Toolbar: Category Chips & Search Input */}
      <section className="section-wrap menu-toolbar-section">
        <div className="menu-search-wrap">
          <Search size={18} className="menu-search-icon" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search espresso, cold brew, panini, cheesecake..."
            aria-label="Search menu items"
            className="menu-search-input"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="menu-clear-search"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Categories Chips */}
        <div className="menu-category-chips" role="group" aria-label="Menu categories">
          {dbData.menuCategories.map((cat) => (
            <button
              key={cat}
              className={`menu-chip ${category === cat ? 'active' : ''}`}
              aria-pressed={category === cat}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Menu Grid */}
      <section className="section-wrap menu-grid-section">
        <div className="menu-count-row">
          <span>
            Showing <strong>{filteredItems.length}</strong> {filteredItems.length === 1 ? 'item' : 'items'}
            {category !== 'All' ? ` in ${category}` : ''}
            {searchQuery ? ` matching "${searchQuery}"` : ''}
          </span>
        </div>

        {filteredItems.length === 0 ? (
          <div className="menu-empty-state">
            <Coffee size={36} className="text-olive" />
            <h3>No menu items match "{searchQuery}"</h3>
            <p>Try searching for another drink or choose a category above.</p>
            <button
              className="button button-dark"
              onClick={() => {
                setCategory('All')
                setSearchQuery('')
              }}
            >
              Reset Menu Filters
            </button>
          </div>
        ) : (
          <div className="digital-menu-grid">
            {filteredItems.map((item) => (
              <article key={item.id} className="menu-card-editorial">
                <div className="menu-card-img-wrap">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="menu-card-img"
                  />
                  {item.badge && <span className="menu-item-badge">{item.badge}</span>}
                  <span
                    className={`menu-status-badge ${
                      item.available ? 'available' : 'unavailable'
                    }`}
                  >
                    {item.available ? 'Available' : 'Sold Out Today'}
                  </span>
                </div>

                <div className="menu-card-body">
                  <div className="menu-card-top">
                    <span className="menu-cat-name">{item.category}</span>
                    <span className="menu-price-tag">
                      ${item.price.toFixed(2)} {item.currency}
                    </span>
                  </div>

                  <h3 className="menu-item-title">{item.name}</h3>
                  <p className="menu-item-description">{item.description}</p>

                  <div className="menu-card-footer">
                    <div className="menu-dietary-row">
                      {item.dietary?.map((d) => (
                        <span key={d} className="dietary-pill">
                          {d}
                        </span>
                      ))}
                    </div>

                    <button
                      className="menu-reserve-cta"
                      onClick={onOpenReservation}
                      aria-label={`Reserve table to try ${item.name}`}
                    >
                      Reserve &amp; Savor →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Reservation Callout Banner */}
      <section className="section-wrap menu-reservation-banner">
        <div className="reservation-banner-inner">
          <div>
            <p className="eyebrow eyebrow-light">JOIN US ON BARRINGTON</p>
            <h2>Pair your favorite drink with a vinyl session.</h2>
            <p>
              Reserve a table or turntable booth in advance. We’ll have your seat and favorite genre ready when you arrive.
            </p>
          </div>
          <button className="button button-paper" onClick={onOpenReservation}>
            Book a Table Reservation <ArrowRight size={15} />
          </button>
        </div>
      </section>
    </main>
  )
}
