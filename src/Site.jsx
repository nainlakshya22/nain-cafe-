import React, { useEffect, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Disc3,
  Instagram,
  MapPin,
  Menu as MenuIcon,
  MessageCircle,
  Phone,
  Sparkles,
  X,
} from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import FloatingActions from './components/FloatingActions.jsx'
import ReservationModal from './components/ReservationModal.jsx'
import VinylPlayer from './components/VinylPlayer.jsx'
import { MusicProvider } from './context/MusicContext.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import ExperiencePage from './pages/ExperiencePage.jsx'
import GalleryPage from './pages/GalleryPage.jsx'
import HomePage from './pages/HomePage.jsx'
import MenuPage from './pages/MenuPage.jsx'
import VisitPage from './pages/VisitPage.jsx'
import dbData from '../data/db.json'

const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  dbData.business.address
)}`

const navLinks = [
  ['Menu', '/menu'],
  ['Our Story', '/about'],
  ['The Experience', '/experience'],
  ['Gallery', '/gallery'],
  ['Contact', '/contact'],
  ['Visit', '/visit'],
]

function Header({ onOpenReservation }) {
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

      {/* Topline Bar */}
      <div className="topline-smoky" id="top">
        <span>1237 BARRINGTON STREET · HALIFAX, NOVA SCOTIA</span>
        <div className="topline-links">
          <a href={`tel:${dbData.business.phone.replace(/[^0-9+]/g, '')}`}>
            <Phone size={12} /> {dbData.business.phone}
          </a>
          <a href={`https://wa.me/19022236696`} target="_blank" rel="noreferrer">
            <MessageCircle size={12} /> WhatsApp
          </a>
          <a href={dbData.business.instagram} target="_blank" rel="noreferrer">
            <Instagram size={12} /> @aashusmoky <ArrowUpRight size={11} />
          </a>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="site-header-smoky">
        <Link aria-label="Aashu Smoky Home" className="wordmark-smoky" to="/">
          <span>aashu smoky<span className="wordmark-dot-copper">.</span></span>
          <small>LISTEN · COFFEE &amp; RECORDS</small>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav-smoky" aria-label="Main Navigation">
          {navLinks.map(([label, path]) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) => (isActive ? 'nav-link-smoky active' : 'nav-link-smoky')}
            >
              {label}
            </NavLink>
          ))}
          <button
            className="header-reserve-btn"
            onClick={onOpenReservation}
            aria-label="Reserve a table"
          >
            <Calendar size={14} />
            <span>Reserve Table</span>
          </button>
        </nav>

        {/* Mobile Toggle & Quick Action */}
        <div className="mobile-header-btns">
          <button
            className="mobile-reserve-icon-btn"
            onClick={onOpenReservation}
            aria-label="Reserve Table"
          >
            <Calendar size={18} />
          </button>
          <button
            className="mobile-hamburger-btn"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            aria-label="Mobile Navigation"
            className="mobile-nav-smoky"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {navLinks.map(([label, path], index) => (
              <NavLink key={path} to={path} onClick={() => setMenuOpen(false)}>
                <span>0{index + 1}</span>
                {label}
                <ArrowUpRight size={17} />
              </NavLink>
            ))}
            <button
              className="mobile-nav-reserve-cta"
              onClick={() => {
                setMenuOpen(false)
                onOpenReservation()
              }}
            >
              <Calendar size={18} />
              <span>Book Table Reservation</span>
              <ArrowRight size={16} />
            </button>
            <a href={directionsUrl} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>
              <span>↗</span> Barrington St. Directions
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}

function Footer({ onOpenReservation }) {
  return (
    <footer className="site-footer-smoky">
      <div className="footer-main-smoky">
        <div className="footer-brand-smoky">
          <Link className="footer-wordmark-smoky" to="/">
            aashu smoky<span>.</span>
          </Link>
          <p className="footer-tagline">
            Listen, Coffee, Records &amp; a Place to Pause. Specialty espresso, single origin pour-overs, and audiophile vinyl listening in downtown Halifax.
          </p>
          <div className="footer-badges">
            <span>Audiophile Analog Sound</span> • <span>Ethical Micro-Roasts</span>
          </div>
        </div>

        <div className="footer-nav-col">
          <p className="eyebrow eyebrow-light">DISCOVER</p>
          <Link to="/menu">Digital Menu</Link>
          <Link to="/about">Our Story</Link>
          <Link to="/experience">The Experience</Link>
          <Link to="/gallery">Photo Archive</Link>
          <button className="footer-text-btn" onClick={onOpenReservation}>
            Table Reservations
          </button>
        </div>

        <div className="footer-nav-col">
          <p className="eyebrow eyebrow-light">VISIT</p>
          <a href={directionsUrl} target="_blank" rel="noreferrer">
            1237 Barrington Street<br />Halifax, NS B3J 1Y2 <ArrowUpRight size={13} />
          </a>
          <a href="tel:+19022236696">+1 (902) 223-6696</a>
          <a href="mailto:aashusmoky@gmail.com">aashusmoky@gmail.com</a>
          <Link to="/contact">Send an Enquiry</Link>
        </div>

        <div className="footer-nav-col">
          <p className="eyebrow eyebrow-light">HOURS &amp; SOCIAL</p>
          <p>
            <strong>Every Day:</strong><br />
            8:00 AM – 7:00 PM
          </p>
          <a href="https://www.instagram.com/aashusmoky/" target="_blank" rel="noreferrer">
            <Instagram size={15} /> @aashusmoky
          </a>
          <a href="https://wa.me/19022236696" target="_blank" rel="noreferrer">
            <MessageCircle size={15} /> WhatsApp Live Chat
          </a>
        </div>
      </div>

      <div className="footer-bottom-smoky">
        <span>© {new Date().getFullYear()} Aashu Smoky. All rights reserved.</span>
        <span>1237 Barrington Street, Halifax, Nova Scotia.</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  )
}

function NotFound() {
  return (
    <main className="not-found-smoky" id="main-content">
      <p className="eyebrow">404 — SIDE B</p>
      <h1>
        Looks like this track<br />
        <em>has ended.</em>
      </h1>
      <p>The page you are looking for does not exist or has been moved.</p>
      <div className="not-found-actions">
        <Link to="/" className="button button-dark">
          Back to Homepage <ArrowRight size={14} />
        </Link>
        <Link to="/menu" className="button button-paper">
          Explore the Menu <ArrowRight size={14} />
        </Link>
      </div>
    </main>
  )
}

export default function Site() {
  const [reservationOpen, setReservationOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <MusicProvider>
      <Header onOpenReservation={() => setReservationOpen(true)} />

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.22 }}
        >
          <Routes location={location}>
            <Route
              path="/"
              element={<HomePage onOpenReservation={() => setReservationOpen(true)} />}
            />
            <Route
              path="/menu"
              element={<MenuPage onOpenReservation={() => setReservationOpen(true)} />}
            />
            <Route
              path="/about"
              element={<AboutPage onOpenReservation={() => setReservationOpen(true)} />}
            />
            <Route
              path="/experience"
              element={<ExperiencePage onOpenReservation={() => setReservationOpen(true)} />}
            />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route
              path="/contact"
              element={<ContactPage onOpenReservation={() => setReservationOpen(true)} />}
            />
            <Route
              path="/visit"
              element={<VisitPage onOpenReservation={() => setReservationOpen(true)} />}
            />
            <Route
              path="/reserve"
              element={<VisitPage onOpenReservation={() => setReservationOpen(true)} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </AnimatePresence>

      <Footer onOpenReservation={() => setReservationOpen(true)} />

      {/* Persistent Vinyl Player Dock */}
      <VinylPlayer />

      {/* WhatsApp & Mobile Floating Actions */}
      <FloatingActions onOpenReservation={() => setReservationOpen(true)} />

      {/* Global Table Reservation Modal */}
      <ReservationModal
        isOpen={reservationOpen}
        onClose={() => setReservationOpen(false)}
      />
    </MusicProvider>
  )
}
