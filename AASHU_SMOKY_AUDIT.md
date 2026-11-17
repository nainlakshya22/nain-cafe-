# Rooms Coffee - Listen — Complete Brand & Website Audit

**Full Business Name:** Rooms Coffee - Listen  
**Primary Brand:** Listen  
**Website:** `https://aashu-smoky.vercel.app/`  
**Tagline:** *Coffee, Matcha & Vinyl Listening Café in Halifax*  
**Address:** 1237 Barrington Street, Halifax, Nova Scotia, B3J 1Y2, Canada  
**Phone:** +1 (902) 223-6696 | **WhatsApp:** +19022236696  
**Email:** listenhalifax@gmail.com | **Instagram:** @listenhalifax (`https://www.instagram.com/listenhalifax/`)  
**Branch:** `main`

---

## 1. Design System Overview
- **Color Palette:**
  - Deep Charcoal: `#1a1916`
  - Warm Black: `#12110f`
  - Cream & Off-White: `#f6f3eb`, `#ebe6da`
  - Coffee Brown: `#5a3d28`
  - Muted Copper Accent: `#c2883f`
- **Typography:**
  - Serif Headings: `Playfair Display`
  - Body & UI: `DM Sans`
- **Micro-interactions:**
  - Spinning vinyl turntable disc animation when music plays.
  - Smooth underline and elevation transitions.
  - Floating WhatsApp chat bubble and mobile sticky reservation bar.

---

## 2. Implemented Features Summary

1. **Homepage Redesign**:
   - Hero banner with cinematic turntable imagery, Listen wordmark, and audio trigger.
   - Brand story & philosophy celebrating Halifax listening culture.
   - Featured digital menu preview with real-world CAD pricing.
   - Vinyl music experience showcase with audiophile listening booth highlights.
   - Curated atmosphere photo gallery.
   - Verified customer testimonials.
   - Location, opening hours (8:00 AM – 7:00 PM every day), and Google Maps embed.

2. **Interactive Digital Menu (`/menu`)**:
   - 12 verified items across 6 categories: *Hot Coffee*, *Cold Coffee*, *Signature Drinks*, *Food*, *Desserts*, *Special Offers*.
   - Live real-time search input.
   - Category filter chips with active states.
   - Dietary badges (*Vegetarian*, *Vegan*, *Gluten-Free*).
   - Availability status indicators (*Available*, *Sold Out Today*).

3. **Vinyl Music Player Experience**:
   - Persistent, non-blocking audio player across all pages.
   - Tracklist featuring Rooms Audio Collective, Miles & Cedar, and Analog Evening Ensemble.
   - Controls: Play / Pause, Next / Prev, Volume slider, Mute toggle, Elapsed time / duration.
   - Web Audio synthesizer ambient vinyl warmth & crackle generator.
   - No automatic autoplay; user-initiated listening.

4. **Table Reservation System**:
   - Accessible via "Reserve Table" buttons throughout the site and mobile bottom bar.
   - Fields: Date, Time, Guests (1 to 8+), Seating Area (*Vinyl Listening Booth*, *Indoor Lounge*, *Sidewalk Patio*), Name, Email, Phone, Special Notes.
   - Client and server-side validation.
   - Anti-spam honeypot trap and rate limiting.
   - Persistent storage in `data/reservations.json` with confirmation codes (`res-...`).

5. **Contact & Business Inquiries (`/contact`)**:
   - Full interactive form with regex email and required field validation.
   - Anti-spam protection & IP rate limiting.
   - Stored in `data/contact.json` with reference codes (`msg-...`).
   - Click-to-call (`+19022236696`) and WhatsApp direct chat link.

6. **Mobile-First Experience**:
   - Tested at 320px, 360px, 375px, 390px, 430px.
   - Sticky bottom navigation bar on mobile (Book Table, Menu, Call, Directions).
   - Floating WhatsApp bubble with one-tap chat.
   - Touch targets meeting 44–48px standards.
   - Zero horizontal overflow.

7. **SEO & Structured Data**:
   - Schema.org JSON-LD `CafeOrCoffeeShop` markup with Halifax address, geo-coordinates, telephone, and opening hours.
   - Page-specific titles and meta descriptions.
   - Open Graph & Twitter Cards.
   - Canonical URLs (`https://aashu-smoky.vercel.app/`).
   - `robots.txt` and `sitemap.xml`.
