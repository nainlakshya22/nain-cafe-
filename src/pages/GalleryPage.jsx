import React, { useEffect, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Disc3,
  X,
} from 'lucide-react'

const galleryPhotos = [
  {
    src: '/images/listen-hero.jpg',
    title: 'A Place to Pause',
    category: 'The Listening Room',
    caption: 'Turntable, warm light and fresh single origin pour-over.',
  },
  {
    src: '/images/cafe-interior-warm.jpg',
    title: 'Sunlit Lounge & Reading Corner',
    category: 'Atmosphere',
    caption: 'Natural timber tables, plants and comfortable seating.',
  },
  {
    src: '/images/listen-drinks.jpg',
    title: 'Espresso & Velvet Textures',
    category: 'Beverage Craft',
    caption: 'Microfoam poured with precision in ceramic cups.',
  },
  {
    src: '/images/listen-vinyl.jpg',
    title: 'Side A, Side B',
    category: 'Analog Sessions',
    caption: 'Vintage vinyl pressing on audiophile turntable.',
  },
  {
    src: '/images/vinyl-shelf.jpg',
    title: 'Curated Record Archive',
    category: 'Vinyl Library',
    caption: 'Shelves filled with rare jazz, soul, and lo-fi albums.',
  },
  {
    src: '/images/cheesecake.jpg',
    title: 'Burnt Basque Cheesecake',
    category: 'Kitchen Bakery',
    caption: 'Baked fresh with molten center and caramelized crust.',
  },
  {
    src: '/images/listen-detail.jpg',
    title: 'The Extraction Ritual',
    category: 'Espresso Bar',
    caption: 'Dialing in the grind every morning at 8 AM.',
  },
  {
    src: '/images/cafe-patio.jpg',
    title: 'Barrington Street Storefront',
    category: 'Exterior',
    caption: 'Historic Halifax facade with sidewalk tables.',
  },
]

export default function GalleryPage() {
  const [activeIndex, setActiveIndex] = useState(null)

  useEffect(() => {
    document.title = 'Photo Archive & Atmosphere — Listen | Halifax'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Explore the visual atmosphere of Listen: vinyl turntables, specialty coffee brewing, warm sunlit spaces, and confections on Barrington Street, Halifax.'
      )
    }
  }, [])

  useEffect(() => {
    if (activeIndex === null) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveIndex(null)
      if (e.key === 'ArrowRight') setActiveIndex((i) => (i + 1) % galleryPhotos.length)
      if (e.key === 'ArrowLeft') setActiveIndex((i) => (i - 1 + galleryPhotos.length) % galleryPhotos.length)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex])

  return (
    <main id="main-content" className="gallery-page">
      <section className="gallery-hero-banner">
        <div className="section-wrap">
          <p className="eyebrow">VISUAL ARCHIVE</p>
          <h1>
            A closer look.<br />
            <em>Warm cups &amp; analog grooves.</em>
          </h1>
          <p className="gallery-hero-lead">
            A quiet visual pause. Glimpses of daily life at 1237 Barrington Street.
          </p>
        </div>
      </section>

      <section className="section-wrap gallery-grid-section">
        <div className="gallery-masonry-grid">
          {galleryPhotos.map((photo, index) => (
            <figure key={photo.src} className="gallery-item-tile">
              <button
                className="gallery-tile-btn"
                onClick={() => setActiveIndex(index)}
                aria-label={`Open image: ${photo.title}`}
              >
                <img src={photo.src} alt={photo.title} loading="lazy" />
                <span className="tile-hover-overlay">
                  <span>{photo.category}</span>
                  <ArrowUpRight size={16} />
                </span>
              </button>
              <figcaption>
                <strong>{photo.title}</strong>
                <span>0{index + 1}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Lightbox Viewer */}
      {activeIndex !== null && (
        <div className="gallery-lightbox-overlay" onClick={() => setActiveIndex(null)}>
          <div className="gallery-lightbox-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox-close-btn"
              onClick={() => setActiveIndex(null)}
              aria-label="Close image viewer"
            >
              <X size={22} />
            </button>

            <button
              className="lightbox-nav-btn prev"
              onClick={() =>
                setActiveIndex((activeIndex - 1 + galleryPhotos.length) % galleryPhotos.length)
              }
              aria-label="Previous image"
            >
              <ArrowLeft size={22} />
            </button>

            <figure className="lightbox-figure">
              <img
                src={galleryPhotos[activeIndex].src}
                alt={galleryPhotos[activeIndex].title}
              />
              <figcaption>
                <strong>{galleryPhotos[activeIndex].title}</strong> — {galleryPhotos[activeIndex].caption}
                <span className="lightbox-counter">
                  0{activeIndex + 1} / 0{galleryPhotos.length}
                </span>
              </figcaption>
            </figure>

            <button
              className="lightbox-nav-btn next"
              onClick={() => setActiveIndex((activeIndex + 1) % galleryPhotos.length)}
              aria-label="Next image"
            >
              <ArrowRight size={22} />
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
