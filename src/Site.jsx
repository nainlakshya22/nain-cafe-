import { useEffect, useState } from 'react'
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Disc3,
  Instagram,
  MapPin,
  Menu as MenuIcon,
  Phone,
  X,
} from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { experiences, galleryImages, instagramUrl, menuCategories, menuItems } from './siteData'

const address = '1237 Barrington Street, Halifax, Nova Scotia'
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`
const navItems = [
  ['Menu', '/menu'],
  ['The experience', '/experience'],
  ['Our story', '/about'],
  ['Gallery', '/gallery'],
  ['Visit', '/visit'],
]

function usePageMeta(title, description) {
  useEffect(() => {
    document.title = `${title} — Listen Halifax`
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [title, description])
}

function Image({ src, alt, className = '', loading = 'lazy' }) {
  return <img className={className} src={src} alt={alt} loading={loading} />
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setMenuOpen(false), [pathname])
  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="topline" id="top">
        <span>COFFEE · RECORDS · A PLACE TO LISTEN</span>
        <a href={instagramUrl} target="_blank" rel="noreferrer">HALIFAX, NOVA SCOTIA <ArrowUpRight size={13} /></a>
      </div>
      <header className="site-header">
        <Link aria-label="Listen home" className="wordmark" to="/">
          <span>listen<span className="wordmark-dot">.</span></span>
          <small>COFFEE &amp; SOUND</small>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map(([label, path]) => (
            <NavLink key={path} to={path} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>{label}</NavLink>
          ))}
          <a className="nav-cta" href={directionsUrl} target="_blank" rel="noreferrer">Find us <ArrowUpRight size={14} /></a>
        </nav>
        <button
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          className="mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={21} /> : <MenuIcon size={21} />}
        </button>
      </header>
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            aria-label="Mobile navigation"
            className="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            {navItems.map(([label, path], index) => (
              <NavLink key={path} to={path} onClick={() => setMenuOpen(false)}>
                <span>0{index + 1}</span>{label}<ArrowUpRight size={17} />
              </NavLink>
            ))}
            <a href={directionsUrl} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>
              <span>↗</span> Get directions
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link className="footer-wordmark" to="/">listen<span>.</span></Link>
          <p>A little more room for coffee, records, and the moments between.</p>
        </div>
        <div className="footer-links">
          <p className="eyebrow eyebrow-light">EXPLORE</p>
          {navItems.slice(0, 4).map(([label, path]) => <Link key={path} to={path}>{label}</Link>)}
        </div>
        <div className="footer-links">
          <p className="eyebrow eyebrow-light">COME BY</p>
          <a href={directionsUrl} target="_blank" rel="noreferrer">1237 Barrington St<br />Halifax, NS <ArrowUpRight size={13} /></a>
          <Link to="/visit">Plan your visit <ArrowUpRight size={13} /></Link>
          <a href="tel:+19022236696">+1 902-223-6696</a>
          <a href="mailto:listenhalifax@gmail.com">Email us</a>
        </div>
        <div className="footer-links">
          <p className="eyebrow eyebrow-light">KEEP IN TOUCH</p>
          <p>Every day<br />8:00 am – 6:00 pm</p>
          <a href={instagramUrl} target="_blank" rel="noreferrer"><Instagram size={15} /> Instagram · @listenhalifax</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Listen</span>
        <span>Illustrative imagery · For current café photos and updates, visit Instagram.</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  )
}

function PageIntro({ label, title, lead, image, alt, children, className = '' }) {
  return (
    <section className={`page-intro ${image ? 'page-intro-with-image' : ''} ${className}`}>
      <div className="page-intro-copy">
        <p className="eyebrow">{label}</p>
        <h1>{title}</h1>
        {lead && <p className="page-lead">{lead}</p>}
        {children}
      </div>
      {image && (
        <figure className="page-intro-image">
          <Image src={image} alt={alt} loading="eager" />
          <figcaption>Illustrative editorial image</figcaption>
        </figure>
      )}
    </section>
  )
}

function SectionHeading({ label, title, text, action }) {
  return (
    <div className="section-heading">
      <div>
        {label && <p className="eyebrow">{label}</p>}
        <h2>{title}</h2>
      </div>
      {text && <p className="section-intro">{text}</p>}
      {action}
    </div>
  )
}

function VisitCallout({ image = '/images/listen-drinks.jpg', label = '1237 BARRINGTON STREET', title = <>Your next<br /><em>good pause.</em></>, link = 'Find your way here' }) {
  return (
    <section className="visit-callout">
      <Image src={image} alt="Illustrative cups set on a café table" />
      <div className="visit-callout-shade" />
      <div className="visit-callout-copy">
        <p className="eyebrow eyebrow-light">{label}</p>
        <h2>{title}</h2>
        <Link className="outline-link" to="/visit">{link} <ArrowUpRight size={15} /></Link>
      </div>
      <span className="image-credit">Illustrative editorial image</span>
    </section>
  )
}

function HomePage() {
  usePageMeta('Coffee, Records & a Place to Pause', 'Listen Halifax brings together specialty coffee, records and a listening-first café at 1237 Barrington Street.')
  return (
    <main id="main-content">
      <section className="home-hero">
        <Image src="/images/listen-hero.jpg" alt="Illustrative still life of a turntable, records and coffee in a warm listening room" className="home-hero-image" loading="eager" />
        <div className="home-hero-shade" />
        <div className="home-hero-copy">
          <p className="eyebrow eyebrow-light">HALIFAX · NOVA SCOTIA</p>
          <h1>Less rush.<br /><em>More listen.</em></h1>
          <p>Coffee, records, and a little more room to be here.</p>
          <div className="hero-actions">
            <Link className="button button-paper" to="/experience">Get to know us <ArrowRight size={15} /></Link>
            <Link className="outline-link" to="/visit">Come by <ArrowUpRight size={15} /></Link>
          </div>
        </div>
        <span className="hero-counter">A PLACE TO PAUSE · 01 / 06</span>
        <a className="hero-scroll" href="#welcome" aria-label="Scroll to welcome section"><ArrowDown size={16} /></a>
        <span className="image-credit">Illustrative editorial image</span>
      </section>

      <section className="welcome-section section-wrap" id="welcome">
        <p className="section-index">01 — THE FEELING</p>
        <div className="welcome-heading">
          <p className="eyebrow">A SMALL INVITATION TO SLOW DOWN</p>
          <h2>Come for a cup.<br /><em>Stay for the moment.</em></h2>
        </div>
        <div className="welcome-description">
          <p>Listen brings together two simple pleasures: a thoughtfully made drink and the kind of music that makes you look up from your phone.</p>
          <Link className="text-link" to="/about">A little about Listen <ArrowRight size={15} /></Link>
        </div>
        <div className="promise-grid">
          <article>
            <span className="promise-icon"><Disc3 size={22} strokeWidth={1.3} /></span>
            <span className="promise-number">01</span>
            <h3>A good cup,<br /><em>made with care.</em></h3>
            <p>Specialty coffee, matcha, hojicha and tea—made for wherever the day takes you.</p>
          </article>
          <article>
            <span className="promise-icon"><Disc3 size={22} strokeWidth={1.3} /></span>
            <span className="promise-number">02</span>
            <h3>A record worth<br /><em>staying for.</em></h3>
            <p>A listening-first spirit, a little room to browse, and time to let the next track land.</p>
          </article>
          <article>
            <span className="promise-icon"><MapPin size={20} strokeWidth={1.3} /></span>
            <span className="promise-number">03</span>
            <h3>Make yourself<br /><em>at home.</em></h3>
            <p>Come in for a drink, stay for a side of the city that moves a little slower.</p>
          </article>
        </div>
      </section>

      <section className="listening-feature">
        <figure className="feature-image">
          <Image src="/images/listen-vinyl.jpg" alt="Illustrative close-up of a vinyl record on a turntable" />
          <figcaption>Illustrative editorial image</figcaption>
        </figure>
        <div className="feature-copy">
          <p className="eyebrow">02 — TAKE YOUR TIME</p>
          <h2>There’s a track<br />for <em>this moment.</em></h2>
          <p>Good coffee has its own rhythm. So does good music. Find a little of both in a space made for being present.</p>
          <Link className="text-link" to="/experience">Find your pace <ArrowRight size={15} /></Link>
        </div>
      </section>

      <section className="counter-section section-wrap">
        <SectionHeading
          label="03 — SOMETHING GOOD"
          title={<>A little of<br /><em>what you love.</em></>}
          text="From coffee and tea to something from the oven, the details change. Ask in store for what’s pouring and baking today."
        />
        <div className="counter-grid">
          {[
            { image: '/images/listen-detail.jpg', alt: 'Illustrative coffee brewing still life', label: 'COFFEE & ESPRESSO' },
            { image: '/images/listen-drinks.jpg', alt: 'Illustrative cups of espresso and matcha', label: 'MATCHA & TEA' },
            { image: '/images/listen-vinyl.jpg', alt: 'Illustrative listening-room record detail', label: 'SOMETHING TO SNACK ON' },
          ].map((item) => (
            <Link className="counter-card" key={item.label} to="/menu">
              <Image src={item.image} alt={item.alt} />
              <span>{item.label} <ArrowUpRight size={15} /></span>
            </Link>
          ))}
        </div>
        <Link className="text-link centered-link" to="/menu">Explore the menu <ArrowRight size={15} /></Link>
      </section>

      <VisitCallout />
    </main>
  )
}

function MenuPage() {
  const [category, setCategory] = useState('Everything')
  const filteredItems = category === 'Everything' ? menuItems : menuItems.filter((item) => item.category === category)
  usePageMeta('Menu', 'Browse current menu categories and recently announced seasonal drinks at Listen Halifax. Ask in store for current details and prices.')

  return (
    <main id="main-content">
      <PageIntro
        label="GOOD THINGS, MADE WITH CARE"
        title={<>A little<br /><em>something.</em></>}
        lead="Explore the kinds of things you might find at Listen. The café’s current menu and prices aren’t published here—ask in store for the latest."
        image="/images/listen-drinks.jpg"
        alt="Illustrative cups of coffee and matcha on a wooden table"
      />
      <section className="menu-section section-wrap">
        <div className="menu-section-intro">
          <div>
            <p className="eyebrow">01 — THE COUNTER</p>
            <h2>Made for your<br /><em>kind of day.</em></h2>
          </div>
          <p>Offerings, ingredients and availability can change. Please confirm details with the café before ordering.</p>
        </div>
        <div className="filter-row" role="group" aria-label="Filter menu categories">
          {menuCategories.map((item) => (
            <button key={item} className={category === item ? 'filter-chip selected' : 'filter-chip'} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>
          ))}
        </div>
        <div className="menu-card-grid">
          {filteredItems.map((item, index) => (
            <article className="menu-item" key={item.category}>
              <div className="menu-item-photo">
                <Image src={item.image} alt={item.imageAlt} />
                <span className="illustrative-tag">Illustrative</span>
              </div>
              <div className="menu-item-copy">
                <div className="menu-item-meta"><span>0{menuItems.indexOf(item) + 1}</span><span>{item.verified ? 'RECENT SPECIAL' : 'ASK IN STORE'}</span></div>
                <p className="eyebrow">{item.category}</p>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className="menu-item-price">Current details &amp; pricing at the café <ArrowUpRight size={14} /></div>
              </div>
            </article>
          ))}
        </div>
        <p className="menu-note">For the most current details, <a href={instagramUrl} target="_blank" rel="noreferrer">check Instagram <ArrowUpRight size={13} /></a> or ask the team in person.</p>
      </section>
      <VisitCallout label="SOMETHING CATCH YOUR EYE?" title={<>Better in<br /><em>person.</em></>} link="Plan a visit" />
    </main>
  )
}

function ExperiencePage() {
  usePageMeta('The Experience', 'Specialty coffee, matcha, hojicha, hi-fi vinyl listening, records and a place to linger in Halifax.')
  return (
    <main id="main-content">
      <PageIntro
        className="experience-intro"
        label="THE LISTENING ROOM"
        title={<>A softer<br /><em>kind of buzz.</em></>}
        lead="Not a checklist. Not a hurry. Just good drinks, good music, and a space to enjoy both."
        image="/images/listen-vinyl.jpg"
        alt="Illustrative vinyl record and turntable in a quiet room"
      >
        <Link className="text-link" to="/menu">See what’s on the menu <ArrowRight size={15} /></Link>
      </PageIntro>
      <section className="experience-idea section-wrap">
        <p className="eyebrow">01 — THE IDEA</p>
        <div className="experience-idea-grid">
          <h2>Two good things.<br /><em>One easy place.</em></h2>
          <p>Listen brings together coffee culture and the joy of focused listening. Come on your own, with someone you like, or just because the day could use a pause.</p>
        </div>
      </section>
      <section className="experience-list section-wrap">
        <div className="experience-list-heading">
          <p className="eyebrow">02 — MAKE IT YOURS</p>
          <h2>Come as <em>you are.</em></h2>
        </div>
        <div className="experience-grid">
          {experiences.map((item) => (
            <article className="experience-card" key={item.number}>
              <div className="experience-card-image"><Image src={item.image} alt={item.alt} /><span>{item.number}</span></div>
              <div className="experience-card-copy">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span>{item.detail}</span>
                <Link to={item.number === '01' || item.number === '02' ? '/menu' : item.number === '03' || item.number === '04' ? '/gallery' : '/visit'} aria-label={`Explore ${item.title}`}>Explore more <ArrowUpRight size={14} /></Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="experience-end">
        <Image src="/images/listen-detail.jpg" alt="Illustrative coffee-making scene" />
        <div className="experience-end-shade" />
        <div><p className="eyebrow eyebrow-light">MAKE A LITTLE ROOM</p><h2>Come <em>listen.</em></h2><Link className="outline-link" to="/visit">Find us in Halifax <ArrowRight size={15} /></Link></div>
        <span className="image-credit">HALIFAX, NOVA SCOTIA</span>
      </section>
    </main>
  )
}

function AboutPage() {
  usePageMeta('Our Story', 'Listen is a place for coffee, records and the pleasure of paying attention in Halifax.')
  return (
    <main id="main-content">
      <PageIntro
        label="A NOTE ON WHAT WE BELIEVE"
        title={<>Good things<br />take <em>time.</em></>}
        lead="Listen is a place for coffee, records and the pleasure of paying attention."
        image="/images/listen-detail.jpg"
        alt="Illustrative coffee preparation detail in warm natural light"
      />
      <section className="about-story section-wrap">
        <p className="eyebrow">01 — OUR POINT OF VIEW</p>
        <div className="about-story-grid">
          <h2>A cup is never<br />just a <em>cup.</em></h2>
          <div>
            <p>It’s a reason to pause. A familiar little ritual. Something made with care, enjoyed without needing to be anywhere else. Listen is shaped around that feeling—and around the way music can make an ordinary afternoon feel like its own small occasion.</p>
            <p>We believe in thoughtful coffee, a good record, and the kind of space that leaves room for both. No need to rush through it.</p>
          </div>
        </div>
      </section>
      <blockquote className="about-quote"><Disc3 size={27} strokeWidth={1.2} /><p>Make a little room<br />for what you <em>love.</em></p><cite>THE LISTEN WAY</cite></blockquote>
      <section className="about-rooted section-wrap">
        <Image src="/images/listen-vinyl.jpg" alt="Illustrative close-up of a record on a turntable" />
        <div><p className="eyebrow">02 — ROOTED IN HALIFAX</p><h2>A little corner<br />to <em>come back to.</em></h2><p>Find Listen at 1237 Barrington Street in Halifax. Follow along on Instagram for current updates and photos from the café.</p><a className="text-link" href={instagramUrl} target="_blank" rel="noreferrer">Follow @listenhalifax <ArrowUpRight size={14} /></a></div>
      </section>
      <VisitCallout label="THE DOOR IS IN HALIFAX" title={<>We’ll leave<br /><em>a light on.</em></>} link="Plan a visit" />
    </main>
  )
}

function GalleryPage() {
  const [active, setActive] = useState(null)
  usePageMeta('Gallery', 'Illustrative editorial imagery for Listen Halifax. For current photos from the café, visit Instagram.')

  useEffect(() => {
    if (active === null) return
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setActive(null)
      if (event.key === 'ArrowRight') setActive((current) => (current + 1) % galleryImages.length)
      if (event.key === 'ArrowLeft') setActive((current) => (current - 1 + galleryImages.length) % galleryImages.length)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [active])

  return (
    <main id="main-content">
      <PageIntro
        label="THE LITTLE THINGS"
        title={<>A closer<br /><em>look.</em></>}
        lead="A visual moodboard for coffee, music, and taking your time. These are illustrative images, not photos of the café. For authentic photos and current updates, visit Instagram."
      >
        <a className="text-link" href={instagramUrl} target="_blank" rel="noreferrer">See @listenhalifax <ArrowUpRight size={14} /></a>
      </PageIntro>
      <section className="gallery-section section-wrap" aria-label="Illustrative gallery">
        <div className="gallery-heading">
          <p className="eyebrow">A VISUAL PAUSE · 01—04</p>
          <p>Scroll slowly.<br /><em>There’s no next track.</em></p>
        </div>
        <div className="gallery-grid">
          {galleryImages.map((photo, index) => (
            <figure className={`gallery-tile gallery-tile-${index + 1}`} key={photo.src}>
              <button onClick={() => setActive(index)} aria-label={`Open image: ${photo.title}`}>
                <Image src={photo.src} alt={photo.alt} />
                <span className="gallery-tile-overlay"><span>{photo.label}</span><ArrowUpRight size={16} /></span>
              </button>
              <figcaption><span>{photo.title}</span><span>0{index + 1}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>
      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => { if (event.target === event.currentTarget) setActive(null) }}
          >
            <button className="lightbox-close" onClick={() => setActive(null)} aria-label="Close image viewer"><X /></button>
            <button className="lightbox-arrow prev" onClick={() => setActive((active - 1 + galleryImages.length) % galleryImages.length)} aria-label="Previous image"><ArrowLeft /></button>
            <figure><Image src={galleryImages[active].src} alt={galleryImages[active].alt} loading="eager" /><figcaption>{galleryImages[active].title} · 0{active + 1} / 04</figcaption></figure>
            <button className="lightbox-arrow next" onClick={() => setActive((active + 1) % galleryImages.length)} aria-label="Next image"><ArrowRight /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

function VisitPage() {
  const [sent, setSent] = useState(false)
  usePageMeta('Visit', 'Visit Listen at 1237 Barrington Street, Halifax. Open every day from 8:00 am to 6:00 pm.')

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const subject = encodeURIComponent(`Website message from ${formData.get('name')}`)
    const body = encodeURIComponent(`${formData.get('message')}\n\nFrom: ${formData.get('name')}\nEmail: ${formData.get('email')}`)
    window.location.href = `mailto:listenhalifax@gmail.com?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <main id="main-content">
      <PageIntro
        label="YOUR NEXT GOOD PAUSE"
        title={<>See you<br /><em>around.</em></>}
        lead="We’re in downtown Halifax. Come by for a drink, a record, or just a little time out."
        image="/images/listen-hero.jpg"
        alt="Illustrative coffee and turntable in a warm listening room"
      >
        <a className="text-link" href={directionsUrl} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={14} /></a>
      </PageIntro>
      <section className="visit-details section-wrap">
        <div className="visit-detail-card">
          <p className="eyebrow">FIND US</p>
          <h2>1237 Barrington St</h2>
          <p>Halifax, Nova Scotia</p>
          <a className="text-link" href={directionsUrl} target="_blank" rel="noreferrer">Open directions <ArrowUpRight size={14} /></a>
        </div>
        <div className="visit-detail-card">
          <p className="eyebrow">WHEN TO VISIT</p>
          <h2>Every day</h2>
          <p>8:00 am – 6:00 pm</p>
          <span>Hours may change; check Instagram for current updates.</span>
          <a className="text-link" href={instagramUrl} target="_blank" rel="noreferrer">See current updates <ArrowUpRight size={14} /></a>
        </div>
        <div className="visit-detail-card">
          <p className="eyebrow">KEEP IN TOUCH</p>
          <h2>Follow along.</h2>
          <p>For current photos, updates and the latest from Listen.</p>
          <a className="text-link" href={instagramUrl} target="_blank" rel="noreferrer"><Instagram size={15} /> Instagram · @listenhalifax <ArrowUpRight size={14} /></a>
        </div>
      </section>
      <section className="map-section">
        <div className="map-copy"><p className="eyebrow">A HALIFAX ADDRESS</p><h2>Find your way<br /><em>to Listen.</em></h2><p>Use your preferred maps app for directions to 1237 Barrington Street.</p><a className="button button-dark" href={directionsUrl} target="_blank" rel="noreferrer">Open in Maps <ArrowUpRight size={15} /></a></div>
        <div className="map-frame"><iframe title="Map showing 1237 Barrington Street, Halifax" src="https://maps.google.com/maps?q=1237%20Barrington%20Street%2C%20Halifax%2C%20Nova%20Scotia&t=&z=15&ie=UTF8&iwloc=&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
      </section>
      <section className="contact-section section-wrap">
        <div className="contact-intro"><p className="eyebrow">A NOTE, OR A QUESTION</p><h2>We’re all<br /><em>ears.</em></h2><p>Prepare a note for the team. This form opens your email app; it does not send or store messages.</p><a className="text-link" href="mailto:listenhalifax@gmail.com">Email the café <ArrowUpRight size={14} /></a></div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <p className="eyebrow">SAY HELLO</p>
          <label htmlFor="contact-name">Your name</label>
          <input id="contact-name" name="name" autoComplete="name" required maxLength="100" />
          <label htmlFor="contact-email">Email address</label>
          <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength="150" />
          <label htmlFor="contact-message">Your note</label>
          <textarea id="contact-message" name="message" rows="4" required maxLength="2000" />
          <button type="submit" className="button button-dark">{sent ? 'Open your email to send' : 'Prepare a message'} <ArrowRight size={15} /></button>
          {sent && <p className="form-status" role="status">Your email app should open with a draft. If it didn’t, email <a href="mailto:listenhalifax@gmail.com">listenhalifax@gmail.com</a>.</p>}
        </form>
      </section>
      <VisitCallout label="THE COFFEE CAN WAIT A MINUTE" title={<>Let the song<br /><em>finish.</em></>} link="The Listen experience" />
    </main>
  )
}

function NotFound() {
  usePageMeta('Page not found', 'The requested page could not be found.')
  return <main className="not-found" id="main-content"><p className="eyebrow">SIDE B</p><h1>This page is<br /><em>between tracks.</em></h1><Link className="button button-dark" to="/">Back to Listen <ArrowRight size={15} /></Link></main>
}

export default function Site() {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])
  return (
    <>
      <Header />
      <AnimatePresence mode="wait">
        <motion.div key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/visit" element={<VisitPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <Footer />
    </>
  )
}
