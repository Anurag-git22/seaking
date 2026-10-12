import React, { useState, useEffect, useRef } from 'react'
import { 
  Phone, 
  MapPin, 
  Clock, 
  Navigation, 
  Star, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Menu,
  Compass, 
  ShieldCheck, 
  Waves, 
  Anchor, 
  Calendar, 
  User, 
  CheckCircle2, 
  ArrowUpRight,
  Play
} from 'lucide-react'
import { WhatsAppIcon } from './components/WhatsAppIcon'

// Single constant for WhatsApp booking number
const WHATSAPP_NUMBER = '919370331487'
const PHONE_NUMBER = '+919370331487'
const PHONE_DISPLAY = '+91 93703 31487'
const INSTAGRAM_URL = 'https://www.instagram.com/seakingboatingsafari'

// Custom Instagram SVG icon
const InstagramIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
)

// 8 Signature Tour Experiences
const EXPERIENCES = [
  {
    id: 'sangam-point',
    title: 'Sangam Point',
    description: 'Where the river meets the sea',
    image: '/images/SangamPoint-clean.jpg',
    tag: 'Scenic Confluence'
  },
  {
    id: 'tsunami-island',
    title: 'Tsunami Island',
    description: 'Water sports, jet ski, bumper and banana rides',
    image: '/images/tsunami-clean.jpg',
    tag: 'Island & Watersports'
  },
  {
    id: 'devbag-beach',
    title: 'Devbag Beach',
    description: 'Calm golden shoreline',
    image: '/images/devbagh-beach.jpg',
    tag: 'Beach'
  },
  {
    id: 'seagull-island',
    title: 'Seagull Birds & Island',
    description: 'Flocks of seagulls on the sandbank',
    image: '/images/Seagull.jpg',
    tag: 'Wildlife'
  },
  {
    id: 'mini-kerala',
    title: 'Mini Kerala',
    description: 'Palm-fringed backwaters',
    image: '/images/Minikerala.jpg',
    tag: 'Backwaters'
  },
  {
    id: 'bhogwe-beach',
    title: 'Bhogwe Beach',
    description: 'Scenic Konkan coastline',
    image: '/images/Bhogwe-clean.jpg',
    tag: 'Coastal'
  },
  {
    id: 'crocodile-point',
    title: 'Crocodile Point',
    description: 'Rocky coastal viewpoint',
    image: '/images/crocodile-point.jpg',
    tag: 'Coastal'
  },
  {
    id: 'dolphin-safari',
    title: 'Dolphin Safari',
    description: 'Spot dolphins near the creek mouth',
    image: '/images/dolphin-clean.jpg',
    tag: 'Wildlife'
  }
]

// Gallery images featuring exclusively client real photos
const GALLERY_ITEMS = [
  { src: '/images/Scuba-enhanced.jpg', title: 'Malvan Scuba Diving & Coral Safari', category: 'Underwater Scuba' },
  { src: '/images/boating.jpg', title: 'Live Safari Boat Tour with Guests', category: 'Safari Boat Tour' },
  { src: '/images/SangamPoint-clean.jpg', title: 'Devbag Sangam Peninsula Aerial', category: 'Devbag Sangam' },
  { src: '/images/dolphin-clean.jpg', title: 'Malvan Dolphin Safari Sighting', category: 'Marine Life' },
  { src: '/images/tsunami-clean.jpg', title: 'Tsunami Island Watersports Hub', category: 'Island Adventure' },
  { src: '/images/MangroveSafari-clean.jpg', title: 'Pristine Karli Mangrove Channels', category: 'Mangroves' },
  { src: '/images/Bhogwe-clean.jpg', title: 'Bhogwe Beach Pristine Coastline', category: 'Bhogwe Beach' },
  { src: '/images/Gallery2.jpg', title: "Sea King Safari Boat 'Angriya' at Shore", category: 'Our Fleet' },
  { src: '/images/devbagh-beach.jpg', title: 'Devbag Beach - Calm Golden Shoreline', category: 'Beach' },
  { src: '/images/Seagull.jpg', title: 'Seagull Birds & Island Safari', category: 'Wildlife' },
  { src: '/images/Minikerala.jpg', title: 'Mini Kerala - Palm-Fringed Backwaters', category: 'Backwaters' },
  { src: '/images/crocodile-point.jpg', title: 'Crocodile Point - Rocky Coastal Viewpoint', category: 'Coastal' }
]

// Video files for gallery
const VIDEOS = [
  '/images/Video/V1.mp4',
  '/images/Video/V2.mp4',
  '/images/Video/V3.mp4',
  '/images/Video/V4.mp4',
  '/images/Video/V5.MP4'
]

export default function App() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'photos' | 'videos'>('all')
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({})
  const lightboxVideoRef = useRef<HTMLVideoElement | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    experience: 'Tsunami Island'
  })

  // Scroll spy & glass navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      // Toggle glass navbar background on scroll
      setIsScrolled(window.scrollY > 20)

      // Scroll-spy active link detection
      const sections = ['locations', 'experiences', 'gallery', 'contact']
      const scrollPos = window.scrollY + 140

      let current = 'home'
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            current = sectionId
            break
          }
        }
      }
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Keyboard controls for lightbox and body scroll lock
  useEffect(() => {
    const totalItems = GALLERY_ITEMS.length + VIDEOS.length
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') {
        setLightboxIndex(null)
        if (lightboxVideoRef.current) {
          lightboxVideoRef.current.pause()
        }
      }
      if (e.key === 'ArrowRight') {
        if (lightboxVideoRef.current) {
          lightboxVideoRef.current.pause()
        }
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % totalItems : null))
      }
      if (e.key === 'ArrowLeft') {
        if (lightboxVideoRef.current) {
          lightboxVideoRef.current.pause()
        }
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + totalItems) % totalItems : null))
      }
    }
    
    // Lock body scroll when lightbox is open
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [lightboxIndex])

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) return

    // Construct WhatsApp message with user details
    const msg = `*New Safari Enquiry - Sea King Malvan*%0A• *Name:* ${encodeURIComponent(formData.name)}%0A• *Phone:* ${encodeURIComponent(formData.phone)}%0A• *Date:* ${encodeURIComponent(formData.date || 'Flexible')}%0A• *Experience:* ${encodeURIComponent(formData.experience)}`
    
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank')
    setFormSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-teal selection:text-white font-sans antialiased">
      
      {/* SECTION 0: NAVBAR WITH GLASS EFFECT ON SCROLL */}
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-navy/95 backdrop-blur-md border-b border-navy-light/40 shadow-xl py-2.5' 
            : 'bg-gradient-to-b from-navy/90 via-navy/60 to-transparent border-b border-white/10 py-3.5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          
          {/* Brand with Bigger Logo & 2 Locations subtitle */}
          <a href="#" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-teal rounded-lg p-0.5">
            {/* Raised logo to 44-48px with crisp white/teal ring */}
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden ring-2 ring-teal/80 group-hover:ring-teal shadow-md group-hover:scale-105 transition-all shrink-0 bg-navy">
              <img 
                src="/images/Head.jpg" 
                alt="Sea King Official Logo Board" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl text-white tracking-tight leading-none group-hover:text-teal-soft transition-colors">
                Sea King
              </span>
              <span className="text-[9px] font-medium tracking-[0.2em] uppercase text-teal-soft mt-1 leading-none">
                BOATING SAFARI • MALVAN
              </span>
              {/* Omkar requirement: Explicitly mention 2 locations right under logo */}
              <span className="text-[10px] text-slate-300 font-medium leading-none mt-1 hidden sm:block">
                Devbag & Tarkarli (2 Locations)
              </span>
            </div>
          </a>

          {/* Desktop Nav Links with Scroll-Spy Active Underline */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium" aria-label="Main Navigation">
            {[
              { id: 'locations', label: 'Locations' },
              { id: 'experiences', label: 'Experiences' },
              { id: 'gallery', label: 'Gallery' },
              { id: 'contact', label: 'Contact' }
            ].map((link) => {
              const isActive = activeSection === link.id
              return (
                <a 
                  key={link.id}
                  href={`#${link.id}`} 
                  className={`group relative py-1 transition-colors focus:outline-none focus:ring-2 focus:ring-teal rounded ${
                    isActive ? 'text-teal-soft font-semibold' : 'text-slate-200 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {/* Sliding underline indicator */}
                  <span 
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-teal rounded-full transition-all duration-300 ${
                      isActive 
                        ? 'scale-x-100 opacity-100' 
                        : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-75'
                    }`} 
                  />
                </a>
              )
            })}
          </nav>

          {/* Action Buttons: Plain Outline Call + Main Action WhatsApp with Hover Lift */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Call button: plain outline */}
            <a
              href={`tel:${PHONE_NUMBER}`}
              aria-label="Call Sea King Safari directly"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border border-white/30 text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-teal"
            >
              <Phone className="w-3.5 h-3.5 text-sand" />
              <span className="hidden sm:inline">Call</span>
            </a>

            {/* Main Action WhatsApp with "Book on WhatsApp" label & soft shadow lift */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Sea King Boating Safari! I would like to book a tour.')}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book on WhatsApp"
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 text-xs font-bold rounded-full bg-teal text-white shadow-md shadow-teal/30 hover:bg-teal-dark hover:shadow-lg hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-teal active:scale-95"
            >
              <WhatsAppIcon size={14} className="shrink-0" />
              <span className="hidden sm:inline">Book on WhatsApp</span>
              <span className="sm:hidden text-[11px]">WhatsApp</span>
            </a>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-teal transition-colors"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-navy/98 backdrop-blur-xl border-b border-white/10 px-5 py-4 animate-fade-in shadow-2xl">
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10 text-xs text-teal-soft font-semibold">
              <span>NOW SERVING IN 2 LOCATIONS</span>
              <span className="text-white/60">Devbag & Tarkarli</span>
            </div>
            <nav className="flex flex-col space-y-3 py-1">
              {[
                { id: 'locations', label: 'Locations (Devbag & Tarkarli)' },
                { id: 'experiences', label: 'Experiences (5 Safari Tours)' },
                { id: 'gallery', label: 'Photo Gallery' },
                { id: 'contact', label: 'Contact & Bookings' }
              ].map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm py-1.5 px-2 rounded-lg transition-colors flex items-center justify-between ${
                    activeSection === link.id 
                      ? 'bg-teal-soft/20 text-teal-soft font-bold' 
                      : 'text-slate-200 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* SECTION 1: HERO */}
      <section className="relative h-[85vh] min-h-[580px] max-h-[820px] flex items-center justify-center overflow-hidden">
        {/* Full-width Background Photo - Scuba Diving & Marine Safari */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/Scuba-enhanced.jpg"
            alt="Sea King Scuba Diving & Boating Safari in Malvan"
            className="w-full h-full object-cover object-center scale-105 transform animate-pulse-subtle"
            loading="eager"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/Scuba.webp'
            }}
          />
          {/* Subtle multi-stop gradient overlay for airy ocean feel and crystal-clear text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center text-white pt-20">
          {/* Subtle pill tag with official emblem preview */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-medium text-teal-soft mb-6 shadow-sm">
            <div className="w-4 h-4 rounded-full overflow-hidden shrink-0 border border-teal-light">
              <img src="/images/Head.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span>Malvan, Maharashtra</span>
            <span className="text-white/40">•</span>
            <span>Devbag & Tarkarli</span>
            <span className="text-white/40">•</span>
            <span className="text-sand font-semibold">Dinu Kasavkar</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-4 text-white drop-shadow-md">
            Sea King Boating Safari
          </h1>

          {/* Tagline */}
          <p className="text-lg sm:text-2xl md:text-3xl font-light text-slate-100 max-w-2xl mx-auto mb-9 tracking-wide drop-shadow">
            Backwaters. Dolphins. Island adventures.
          </p>

          {/* CTA Buttons - Identical Shape, Height & Proportions */}
          <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md mx-auto">
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="flex-1 max-w-[210px] h-14 inline-flex items-center justify-center gap-2 sm:gap-2.5 px-4 sm:px-6 rounded-2xl bg-white text-navy font-bold text-sm sm:text-base whitespace-nowrap hover:bg-slate-100 transition-all shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-teal"
            >
              <Phone className="w-5 h-5 text-teal shrink-0" />
              <span>Call Now</span>
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Sea King Boating Safari! I would like to book a safari ride.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 max-w-[210px] h-14 inline-flex items-center justify-center gap-2 sm:gap-2.5 px-4 sm:px-6 rounded-2xl bg-teal text-white font-bold text-sm sm:text-base whitespace-nowrap hover:bg-teal-dark transition-all shadow-lg shadow-teal/30 active:scale-95 border border-teal-light/30 focus:outline-none focus:ring-2 focus:ring-teal"
            >
              <WhatsAppIcon size={20} className="shrink-0" />
              <span>Book on WhatsApp</span>
            </a>
          </div>

          {/* Quick scroll indicator */}
          <a 
            href="#locations" 
            className="inline-flex flex-col items-center mt-12 text-slate-300 hover:text-white text-xs opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Scroll to locations"
          >
            <span className="mb-1">Explore Locations</span>
            <div className="w-4 h-7 rounded-full border-2 border-white/40 flex items-start justify-center p-1">
              <div className="w-1 h-2 bg-white rounded-full animate-bounce" />
            </div>
          </a>
        </div>
      </section>

      {/* SECTION 4: WHY US STRIP */}
      <section className="bg-white border-b border-slate-100 py-4 shadow-sm relative z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-y-3 gap-x-6 sm:gap-x-10 text-xs sm:text-sm font-semibold text-slate-700">
            {/* 5.0 rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center text-sand">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-sand text-sand" />
                ))}
              </div>
              <span className="text-navy font-bold text-sm sm:text-base">5.0</span>
              <span className="text-slate-500 font-normal">rating</span>
            </div>

            <span className="hidden sm:inline-block text-slate-300">•</span>

            {/* 200+ reviews */}
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal" />
              <span className="text-navy font-bold text-sm sm:text-base">200+</span>
              <span className="text-slate-500 font-normal">verified reviews</span>
            </div>

            <span className="hidden sm:inline-block text-slate-300">•</span>

            {/* Open 7 days */}
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal" />
              <span className="text-navy font-bold text-sm sm:text-base">Open 7 days</span>
              <span className="text-slate-500 font-normal">a week</span>
            </div>

            <span className="hidden md:inline-block text-slate-300">•</span>

            {/* Life Jackets */}
            <div className="hidden md:flex items-center gap-1.5 text-slate-600">
              <ShieldCheck className="w-4 h-4 text-teal" />
              <span className="text-xs font-medium">Life Jackets Provided</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: TWO LOCATIONS (PROMINENT) */}
      <section id="locations" className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 scroll-mt-20">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-soft text-teal-dark text-xs font-bold tracking-wide uppercase mb-3">
            <MapPin className="w-3.5 h-3.5" />
            Boarding Points
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
            Now serving in 2 locations
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2">
            Board our boats conveniently from Malvan’s most scenic coastal harbors.
          </p>
        </div>

        {/* Side-by-side Cards on Mobile & Desktop */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-6 lg:gap-8">
          
          {/* Location 1: Devbag, Malvan */}
          <div className="group rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between">
            <div>
              {/* Photo */}
              <div className="relative h-32 sm:h-56 md:h-64 overflow-hidden bg-slate-100">
                <img
                  src="/images/SangamPoint-clean.jpg"
                  alt="Devbag Sangam Peninsula and Boarding Jetty"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/Gallery2.jpg'
                  }}
                />
                <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-navy/90 backdrop-blur-md text-white text-[9px] sm:text-xs font-semibold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full flex items-center gap-1 sm:gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-teal-light animate-ping" />
                  <span>Sangam Point</span>
                </div>
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-sand text-navy text-[9px] sm:text-xs font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-sm">
                  Loc 01
                </div>
              </div>

              {/* Card Body */}
              <div className="p-3 sm:p-6 md:p-8">
                <h3 className="text-sm sm:text-2xl font-bold text-navy mb-1 sm:mb-2 leading-tight">
                  Devbag, Malvan
                </h3>
                
                <div className="space-y-1.5 sm:space-y-3 text-[11px] sm:text-sm text-slate-600 mt-2 sm:mt-4">
                  <div className="flex items-start gap-1.5 sm:gap-3">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal shrink-0 mt-0.5" />
                    <span className="line-clamp-2 sm:line-clamp-none">Near Mahapurush Mandir, Devbag, Malvan - 416606</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 sm:gap-3">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal shrink-0" />
                    <span className="font-medium text-slate-800 text-[10px] sm:text-sm">10:00 AM - 7:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="p-3 sm:p-6 md:p-8 pt-0">
              <a
                href="https://maps.google.com/?q=Mahapurush+Mandir+Devbag+Malvan+Maharashtra"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-3 px-2 sm:px-5 rounded-lg sm:rounded-xl bg-navy text-white text-[11px] sm:text-sm font-bold hover:bg-navy-light transition-colors shadow-sm group-hover:bg-teal group-hover:text-white focus:outline-none focus:ring-2 focus:ring-teal"
              >
                <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Directions</span>
                <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Location 2: Tarkarli Jetty, Malvan */}
          <div className="group rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between">
            <div>
              {/* Photo */}
              <div className="relative h-32 sm:h-56 md:h-64 overflow-hidden bg-slate-100">
                <img
                  src="/images/MalvanJetty-clean.jpg"
                  alt="Sea King Boating Safari at Malvan Tarkarli Jetty"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/MalvanJetty.webp'
                  }}
                />
                <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-navy/90 backdrop-blur-md text-white text-[9px] sm:text-xs font-semibold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full flex items-center gap-1 sm:gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-sand animate-ping" />
                  <span>Central Jetty</span>
                </div>
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-teal text-white text-[9px] sm:text-xs font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-sm">
                  Loc 02
                </div>
              </div>

              {/* Card Body */}
              <div className="p-3 sm:p-6 md:p-8">
                <h3 className="text-sm sm:text-2xl font-bold text-navy mb-1 sm:mb-2 leading-tight">
                  Tarkarli Jetty
                </h3>
                
                <div className="space-y-1.5 sm:space-y-3 text-[11px] sm:text-sm text-slate-600 mt-2 sm:mt-4">
                  <div className="flex items-start gap-1.5 sm:gap-3">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal shrink-0 mt-0.5" />
                    <span className="line-clamp-2 sm:line-clamp-none">Near MTDC Water Sports Point, Tarkarli - 416606</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 sm:gap-3">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal shrink-0" />
                    <span className="font-medium text-slate-800 text-[10px] sm:text-sm">8:00 AM - 6:30 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="p-3 sm:p-6 md:p-8 pt-0">
              <a
                href="https://maps.google.com/?q=Tarkarli+Beach+Malvan+Maharashtra"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-3 px-2 sm:px-5 rounded-lg sm:rounded-xl bg-navy text-white text-[11px] sm:text-sm font-bold hover:bg-navy-light transition-colors shadow-sm group-hover:bg-teal group-hover:text-white focus:outline-none focus:ring-2 focus:ring-teal"
              >
                <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Directions</span>
                <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: EXPERIENCES (8 CARDS) */}
      <section id="experiences" className="py-16 sm:py-24 bg-slate-100/70 border-y border-slate-200/60 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-soft text-teal-dark text-xs font-bold tracking-wide uppercase mb-3">
              <Waves className="w-3.5 h-3.5" />
              Signature Tours
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
              Experiences
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-2">
              Handcrafted boat tours across pristine Konkan waters.
            </p>
          </div>

          {/* Responsive Layout: 1 col on mobile, 2 on tablet, 4 on desktop (2 rows of 4) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {EXPERIENCES.map((exp, index) => (
              <div
                key={exp.id}
                className="flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                aria-label={`Tour ${index + 1} of ${EXPERIENCES.length}: ${exp.title}`}
              >
                {/* Fixed Image Ratio 16:10 */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-teal/20 to-navy/20">
                  <img
                    src={exp.image}
                    alt={`${exp.title} boat safari experience in Malvan`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      target.parentElement!.classList.add('bg-gradient-to-br', 'from-teal/30', 'to-navy/30')
                    }}
                  />
                  {/* Subtle gradient for chip readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Top-left category chip with strong background */}
                  <span className="absolute top-3 left-3 bg-navy/90 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-md">
                    {exp.tag}
                  </span>

                  {/* Bottom-left serial number badge */}
                  <div 
                    className="absolute bottom-3 left-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 flex items-center justify-center shadow-md ring-2 ring-white"
                    aria-hidden="true"
                  >
                    <span className="text-teal font-bold text-xs sm:text-sm tabular-nums">
                      {index + 1}
                    </span>
                  </div>
                </div>

                {/* Card Body - Equal Height & Button at bottom */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col">
                  <div>
                    <h3 className="text-lg font-bold text-navy group-hover:text-teal transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-slate-600 text-sm mt-1.5 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>

                  {/* Booking Button: mt-auto so buttons always line up */}
                  <div className="mt-auto pt-5">
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, I want to book the ${exp.title}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold rounded-xl text-white bg-teal hover:bg-teal-dark transition-colors focus:outline-none focus:ring-2 focus:ring-teal active:scale-[0.99]"
                    >
                      <WhatsAppIcon size={14} className="shrink-0" />
                      <span>Book on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 5: GALLERY WITH PHOTOS & VIDEOS */}
      <section id="gallery" className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 scroll-mt-20">
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand-light text-sand-warm text-xs font-bold tracking-wide uppercase mb-3">
            <Compass className="w-3.5 h-3.5" />
            Media Collection
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
            Gallery
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2">
            Moments on the calm Malvan backwaters & sapphire sea. Tap to view.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {(['all', 'photos', 'videos'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setGalleryFilter(filter)}
              className={`px-4 py-2 min-h-[40px] rounded-full text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal ${
                galleryFilter === filter
                  ? 'bg-teal text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        {/* Centered Flex Grid */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 transition-opacity duration-200">
          {/* Photos */}
          {(galleryFilter === 'all' || galleryFilter === 'photos') && GALLERY_ITEMS.map((item, index) => (
            <button
              key={`photo-${index}`}
              onClick={() => setLightboxIndex(index)}
              className="group relative w-[calc(50%-6px)] sm:w-[calc(33.333%-11px)] lg:w-[calc(25%-12px)] aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2"
              aria-label={`View photo: ${item.title}`}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/boating.jpg'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-white text-xs font-semibold drop-shadow-md truncate">
                  {item.title}
                </span>
              </div>
            </button>
          ))}

          {/* Videos */}
          {(galleryFilter === 'all' || galleryFilter === 'videos') && VIDEOS.map((videoSrc, index) => {
            const videoIndex = GALLERY_ITEMS.length + index
            return (
              <div
                key={`video-${index}`}
                className="group relative w-[calc(50%-6px)] sm:w-[calc(33.333%-11px)] lg:w-[calc(25%-12px)] aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                onClick={() => setLightboxIndex(videoIndex)}
                onMouseEnter={() => {
                  const video = videoRefs.current[videoIndex]
                  if (video && window.innerWidth >= 1024) {
                    video.play().catch(() => {})
                  }
                }}
                onMouseLeave={() => {
                  const video = videoRefs.current[videoIndex]
                  if (video && window.innerWidth >= 1024) {
                    video.pause()
                    video.currentTime = 0
                  }
                }}
              >
                <video
                  ref={(el) => { videoRefs.current[videoIndex] = el }}
                  src={videoSrc}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  muted
                  playsInline
                  preload="metadata"
                  loop
                />
                
                {/* Video chip */}
                <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-navy/90 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md shadow-md z-10">
                  Video
                </span>

                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors z-10">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/95 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 sm:w-8 sm:h-8 text-teal fill-teal ml-0.5 sm:ml-1" />
                  </div>
                </div>

                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            )
          })}
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {lightboxIndex !== null && (() => {
        const totalItems = GALLERY_ITEMS.length + VIDEOS.length
        const isVideo = lightboxIndex >= GALLERY_ITEMS.length
        const currentItem = isVideo 
          ? { src: VIDEOS[lightboxIndex - GALLERY_ITEMS.length], title: `Safari Video ${lightboxIndex - GALLERY_ITEMS.length + 1}`, category: 'Video' }
          : GALLERY_ITEMS[lightboxIndex]

        return (
          <div 
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in overflow-hidden"
            onClick={() => {
              setLightboxIndex(null)
              if (lightboxVideoRef.current) {
                lightboxVideoRef.current.pause()
              }
            }}
            style={{ touchAction: 'pan-y' }}
          >
            {/* Close button */}
            <button
              onClick={() => {
                setLightboxIndex(null)
                if (lightboxVideoRef.current) {
                  lightboxVideoRef.current.pause()
                }
              }}
              className="absolute top-4 right-4 z-50 p-2.5 min-w-[44px] min-h-[44px] rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-teal"
              aria-label="Close viewer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Previous button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                if (lightboxVideoRef.current) {
                  lightboxVideoRef.current.pause()
                }
                setLightboxIndex((prev) => (prev !== null ? (prev - 1 + totalItems) % totalItems : null))
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 min-w-[44px] min-h-[44px] rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-teal"
              aria-label="Previous item"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                if (lightboxVideoRef.current) {
                  lightboxVideoRef.current.pause()
                }
                setLightboxIndex((prev) => (prev !== null ? (prev + 1) % totalItems : null))
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 min-w-[44px] min-h-[44px] rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-teal"
              aria-label="Next item"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Active Item container */}
            <div 
              className="relative max-w-5xl w-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {isVideo ? (
                <video
                  ref={lightboxVideoRef}
                  src={currentItem.src}
                  className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
                  controls
                  autoPlay
                  playsInline
                  controlsList="nodownload"
                />
              ) : (
                <img
                  src={currentItem.src}
                  alt={currentItem.title}
                  className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
                />
              )}
              <div className="mt-4 text-center text-white px-4">
                <p className="font-semibold text-base sm:text-lg">
                  {currentItem.title}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {lightboxIndex + 1} of {totalItems} • {currentItem.category}
                </p>
              </div>
            </div>
          </div>
        )
      })()}

      {/* SECTION 6: CONTACT & ENQUIRY */}
      <section id="contact" className="py-16 sm:py-24 bg-white border-t border-slate-200/60 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left: Quick Contact & Direct Channels */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-soft text-teal-dark text-xs font-bold tracking-wide uppercase mb-3">
                  <Phone className="w-3.5 h-3.5" />
                  Get in Touch
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
                  Book Your Safari
                </h2>
                <p className="text-slate-600 text-sm sm:text-base mt-2">
                  Call or WhatsApp us for instant boat availability, rates, and customized family packages.
                </p>
              </div>

              {/* Direct Buttons */}
              <div className="space-y-3 pt-2">
                {/* Official Board Card */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-teal-soft/30 border border-teal/20 shadow-sm">
                  <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-teal/30 shadow-sm bg-navy">
                    <img src="/images/Head.jpg" alt="Sea King Board" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-[11px] text-teal-dark font-bold uppercase tracking-wider block">
                      Registered Safari Center
                    </span>
                    <span className="text-sm font-extrabold text-navy block">
                      Dinu Kasavkar
                    </span>
                    <span className="text-xs text-slate-600 block">
                      Sea King Boating & Scuba Diving • Devbag, Tarkarli
                    </span>
                  </div>
                </div>

                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-teal hover:bg-white transition-all shadow-sm group focus:outline-none focus:ring-2 focus:ring-teal"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-navy text-white flex items-center justify-center group-hover:bg-teal transition-colors">
                      <Phone className="w-5 h-5 text-sand" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 font-medium block">Direct Phone</span>
                      <span className="text-base font-bold text-navy">{PHONE_DISPLAY}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-teal group-hover:translate-x-1 transition-all" />
                </a>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Sea King Boating Safari! I would like to enquire about safari bookings.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl bg-teal-soft/40 border border-teal/20 hover:border-teal hover:bg-teal-soft/70 transition-all shadow-sm group focus:outline-none focus:ring-2 focus:ring-teal"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-teal text-white flex items-center justify-center shadow-sm">
                      <WhatsAppIcon size={20} />
                    </div>
                    <div>
                      <span className="text-xs text-teal-dark font-medium block">WhatsApp Chat</span>
                      <span className="text-base font-bold text-teal-dark">Instant Booking Assistance</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-teal group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-sand hover:bg-white transition-all shadow-sm group focus:outline-none focus:ring-2 focus:ring-teal"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-sand to-sand-warm text-white flex items-center justify-center shadow-sm">
                      <InstagramIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 font-medium block">Follow On Instagram</span>
                      <span className="text-base font-bold text-navy">@seakingboatingsafari</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-sand-warm group-hover:translate-x-1 transition-all" />
                </a>
              </div>
            </div>

            {/* Right: Short Enquiry Form */}
            <div className="lg:col-span-7 bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
              <h3 className="text-xl font-bold text-navy mb-1">
                Quick Enquiry
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Fill details below to send an instant booking request via WhatsApp.
              </p>

              {formSubmitted ? (
                <div className="p-6 rounded-2xl bg-teal-soft border border-teal text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-teal mx-auto" />
                  <h4 className="font-bold text-navy text-lg">Enquiry Generated!</h4>
                  <p className="text-sm text-slate-700">
                    Your details have been pre-filled into WhatsApp. We are available 7 days a week to assist you.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="text-xs text-teal-dark font-bold underline hover:no-underline pt-2 focus:outline-none focus:ring-2 focus:ring-teal rounded"
                  >
                    Submit another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Your Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Patil"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent transition"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          placeholder="e.g. 98220 12345"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Preferred Date
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent transition"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Selected Experience
                    </label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent transition"
                    >
                      {EXPERIENCES.map((exp) => (
                        <option key={exp.id} value={exp.title}>
                          {exp.title} ({exp.description})
                        </option>
                      ))}
                      <option value="All Experiences / Custom Package">Custom Malvan Package</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-teal text-white font-bold text-sm hover:bg-teal-dark transition shadow-md shadow-teal/20 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-teal"
                  >
                    <WhatsAppIcon size={16} />
                    <span>Check Availability on WhatsApp</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER: WITH BOTH LOCATIONS */}
      <footer className="bg-navy text-slate-300 pt-16 pb-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          {/* Main Footer Row */}
          <div className="grid md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            {/* Brand Intro */}
            <div className="md:col-span-4 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-teal flex items-center justify-center text-white">
                  <Anchor className="w-4 h-4" />
                </div>
                <span className="font-bold text-xl text-white">Sea King Boating Safari</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Authentic backwater cruises, island adventures, and dolphin safaris in Malvan, Sindhudurg, Maharashtra.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  aria-label="Call Sea King directly"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-teal text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-teal"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Sea King!')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp Sea King directly"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-teal text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-teal"
                >
                  <WhatsAppIcon size={16} />
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Profile"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-sand-warm text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-teal"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Location 1 Footer */}
            <div className="md:col-span-4 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-soft">
                Location 1 • Devbag
              </h4>
              <p className="text-white font-medium text-sm">Devbag Sangam Jetty</p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Near Mahapurush Mandir, Devbag, Malvan - 416606, Maharashtra.
              </p>
              <p className="text-xs text-sand font-medium">Open daily, 10:00 AM - 7:00 PM</p>
              <a
                href="https://maps.google.com/?q=Mahapurush+Mandir+Devbag+Malvan+Maharashtra"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-teal hover:underline pt-1 focus:outline-none focus:ring-2 focus:ring-teal"
              >
                <span>Google Maps</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            {/* Location 2 Footer */}
            <div className="md:col-span-4 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-soft">
                Location 2 • Tarkarli
              </h4>
              <p className="text-white font-medium text-sm">Tarkarli Beach Jetty</p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Near MTDC Water Sports Point, Tarkarli, Malvan - 416606, Maharashtra.
              </p>
              <p className="text-xs text-sand font-medium">Open daily, 8:00 AM - 6:30 PM</p>
              <a
                href="https://maps.google.com/?q=Tarkarli+Beach+Malvan+Maharashtra"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-teal hover:underline pt-1 focus:outline-none focus:ring-2 focus:ring-teal"
              >
                <span>Google Maps</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© {new Date().getFullYear()} Sea King Boating Safari. All rights reserved.</p>
            <p className="flex items-center gap-1 text-slate-400">
              Devbag & Tarkarli, Malvan, Maharashtra
            </p>
          </div>
        </div>
      </footer>

      {/* MOBILE STICKY CALL / WHATSAPP BAR */}
      <aside 
        aria-label="Mobile quick actions"
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-navy/95 backdrop-blur-lg border-t border-white/10 px-4 py-2.5 shadow-2xl"
      >
        <div className="flex items-center justify-center gap-3 max-w-md mx-auto">
          {/* Call button */}
          <a
            href={`tel:${PHONE_NUMBER}`}
            aria-label="Call Now"
            className="flex-1 h-12 inline-flex items-center justify-center gap-2 px-3 rounded-xl bg-white text-navy font-bold text-xs sm:text-sm whitespace-nowrap shadow-md active:scale-95 transition-transform focus:outline-none focus:ring-2 focus:ring-teal"
          >
            <Phone className="w-4 h-4 text-teal shrink-0" />
            <span>Call Now</span>
          </a>

          {/* WhatsApp button */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Sea King Boating Safari! I would like to book a tour.')}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="flex-1 min-h-[44px] h-12 inline-flex items-center justify-center gap-2 px-3 rounded-xl bg-teal text-white font-bold text-xs sm:text-sm whitespace-nowrap shadow-md shadow-teal/30 active:scale-95 transition-transform focus:outline-none focus:ring-2 focus:ring-teal"
          >
            <WhatsAppIcon size={16} className="shrink-0" />
            <span>Book on WhatsApp</span>
          </a>
        </div>
      </aside>

    </div>
  )
}
