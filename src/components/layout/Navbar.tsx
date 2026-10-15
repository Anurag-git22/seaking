import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { PHONE_NUMBER, WHATSAPP_NUMBER } from '../../data/constants'
import { WhatsAppIcon } from '../WhatsAppIcon'

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [malvanOpen, setMalvanOpen] = useState(false)
  const [devbagOpen, setDevbagOpen] = useState(false)
  const [malvanMobileOpen, setMalvanMobileOpen] = useState(false)
  const [devbagMobileOpen, setDevbagMobileOpen] = useState(false)
  const location = useLocation()
  const malvanRef = useRef<HTMLDivElement>(null)
  const devbagRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
    setMalvanMobileOpen(false)
    setDevbagMobileOpen(false)
  }, [location.pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (malvanRef.current && !malvanRef.current.contains(event.target as Node)) {
        setMalvanOpen(false)
      }
      if (devbagRef.current && !devbagRef.current.contains(event.target as Node)) {
        setDevbagOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close dropdowns on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMalvanOpen(false)
        setDevbagOpen(false)
        setMobileMenuOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const isActive = (path: string) => location.pathname === path

  const malvanItems = [
    { path: '/malvan-packages', label: 'Scuba Diving' },
    { path: '/malvan-packages', label: 'Water Sports' },
    { path: '/malvan-packages', label: 'Packages' }
  ]

  const devbagItems = [
    { path: '/experiences', label: 'Boating Tours' },
    { path: '/devbag-packages', label: 'Boating Packages' }
  ]

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-navy/95 backdrop-blur-md border-b border-navy-light/40 shadow-xl py-2.5' 
          : 'bg-gradient-to-b from-navy/90 via-navy/60 to-transparent border-b border-white/10 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-teal rounded-lg p-0.5">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden ring-2 ring-teal/80 group-hover:ring-teal shadow-md group-hover:scale-105 transition-all shrink-0 bg-navy">
            <img 
              src="/images/Head.jpg" 
              alt="Sea King Scuba Diving Official Logo" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base sm:text-lg text-white tracking-tight leading-none group-hover:text-teal-soft transition-colors">
              Sea King Scuba Diving
            </span>
            <span className="text-[8px] sm:text-[9px] font-medium tracking-[0.15em] uppercase text-teal-soft mt-1 leading-none">
              SCUBA • WATER SPORTS • BOATING
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium" aria-label="Main Navigation">
          <Link
            to="/"
            className={`group relative py-1 transition-colors focus:outline-none ${
              isActive('/') ? 'text-teal-soft font-semibold' : 'text-slate-200 hover:text-white'
            }`}
          >
            <span>Home</span>
            <span 
              className={`absolute bottom-0 left-0 w-full h-0.5 bg-teal rounded-full transition-all duration-300 ${
                isActive('/')
                  ? 'scale-x-100 opacity-100' 
                  : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-75'
              }`} 
            />
          </Link>

          <Link
            to="/#about"
            className="group relative py-1 text-slate-200 hover:text-white transition-colors focus:outline-none"
          >
            <span>About</span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal rounded-full scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-75 transition-all duration-300" />
          </Link>

          {/* Malvan Dropdown */}
          <div 
            ref={malvanRef}
            className="relative"
            onMouseEnter={() => setMalvanOpen(true)}
            onMouseLeave={() => setMalvanOpen(false)}
          >
            <button
              onClick={() => setMalvanOpen(!malvanOpen)}
              onFocus={() => setMalvanOpen(true)}
              className="group relative py-1 text-slate-200 hover:text-white transition-colors focus:outline-none inline-flex items-center gap-1"
              aria-haspopup="true"
              aria-expanded={malvanOpen}
              aria-label="Malvan services menu"
            >
              <span>Malvan</span>
              <ChevronDown 
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  malvanOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            <AnimatePresence>
              {malvanOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl overflow-hidden"
                >
                  <div className="px-4 py-2 bg-teal-soft/20 border-b border-teal/10">
                    <p className="text-[10px] font-bold text-teal-dark uppercase tracking-wider">
                      Mangalmurti Scuba Diving - Malvan
                    </p>
                  </div>
                  {malvanItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.path}
                      className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-teal-soft/30 hover:text-teal-dark transition-colors focus:outline-none focus:bg-teal-soft/30 focus:text-teal-dark min-h-[44px] flex items-center"
                    >
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Devbag Dropdown */}
          <div 
            ref={devbagRef}
            className="relative"
            onMouseEnter={() => setDevbagOpen(true)}
            onMouseLeave={() => setDevbagOpen(false)}
          >
            <button
              onClick={() => setDevbagOpen(!devbagOpen)}
              onFocus={() => setDevbagOpen(true)}
              className="group relative py-1 text-slate-200 hover:text-white transition-colors focus:outline-none inline-flex items-center gap-1"
              aria-haspopup="true"
              aria-expanded={devbagOpen}
              aria-label="Devbag services menu"
            >
              <span>Devbag</span>
              <ChevronDown 
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  devbagOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            <AnimatePresence>
              {devbagOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl overflow-hidden"
                >
                  <div className="px-4 py-2 bg-teal-soft/20 border-b border-teal/10">
                    <p className="text-[10px] font-bold text-teal-dark uppercase tracking-wider">
                      Devbag - Near Mahapurush Mandir
                    </p>
                  </div>
                  {devbagItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.path}
                      className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-teal-soft/30 hover:text-teal-dark transition-colors focus:outline-none focus:bg-teal-soft/30 focus:text-teal-dark min-h-[44px] flex items-center"
                    >
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            to="/gallery"
            className={`group relative py-1 transition-colors focus:outline-none ${
              isActive('/gallery') ? 'text-teal-soft font-semibold' : 'text-slate-200 hover:text-white'
            }`}
          >
            <span>Gallery</span>
            <span 
              className={`absolute bottom-0 left-0 w-full h-0.5 bg-teal rounded-full transition-all duration-300 ${
                isActive('/gallery')
                  ? 'scale-x-100 opacity-100' 
                  : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-75'
              }`} 
            />
          </Link>

          <Link
            to="/contact"
            className={`group relative py-1 transition-colors focus:outline-none ${
              isActive('/contact') ? 'text-teal-soft font-semibold' : 'text-slate-200 hover:text-white'
            }`}
          >
            <span>Contact</span>
            <span 
              className={`absolute bottom-0 left-0 w-full h-0.5 bg-teal rounded-full transition-all duration-300 ${
                isActive('/contact')
                  ? 'scale-x-100 opacity-100' 
                  : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-75'
              }`} 
            />
          </Link>
        </nav>

        {/* Desktop Call & WhatsApp Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all min-h-[44px] focus:outline-none focus:ring-2 focus:ring-teal"
            aria-label="Call now"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden xl:inline">Call</span>
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Sea King! I would like to enquire about your services.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal hover:bg-teal-dark text-white text-xs font-bold transition-all shadow-md min-h-[44px] focus:outline-none focus:ring-2 focus:ring-teal"
            aria-label="Book on WhatsApp"
          >
            <WhatsAppIcon size={16} />
            <span>Book on WhatsApp</span>
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-teal transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-navy/80 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
              style={{ zIndex: 39 }}
            />

            {/* Slide-in Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-navy/98 backdrop-blur-xl border-l border-white/10 overflow-y-auto lg:hidden flex flex-col"
              style={{ zIndex: 40 }}
            >
              {/* Close Button */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <span className="text-white font-bold">Menu</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-teal min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 px-4 py-6 space-y-2">
                <Link
                  to="/"
                  className={`block py-3 px-4 rounded-lg text-sm transition-colors min-h-[44px] flex items-center ${
                    isActive('/')
                      ? 'bg-teal-soft/20 text-teal-soft font-bold' 
                      : 'text-slate-200 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  Home
                </Link>

                <Link
                  to="/#about"
                  className="block py-3 px-4 rounded-lg text-sm text-slate-200 hover:bg-white/5 hover:text-white transition-colors min-h-[44px] flex items-center"
                >
                  About
                </Link>

                {/* Malvan Accordion */}
                <div>
                  <button
                    onClick={() => setMalvanMobileOpen(!malvanMobileOpen)}
                    className="w-full flex items-center justify-between py-3 px-4 rounded-lg text-sm text-slate-200 hover:bg-white/5 hover:text-white transition-colors min-h-[44px]"
                    aria-expanded={malvanMobileOpen}
                    aria-label="Malvan services menu"
                  >
                    <span>Malvan</span>
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform duration-200 ${
                        malvanMobileOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {malvanMobileOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-4 mt-1 space-y-1 border-l-2 border-teal/30 pl-3">
                          <p className="text-[10px] font-bold text-teal-soft uppercase tracking-wider mb-2 px-2">
                            Mangalmurti Scuba Diving - Malvan
                          </p>
                          {malvanItems.map((item) => (
                            <Link
                              key={item.label}
                              to={item.path}
                              className="block py-2 px-2 rounded text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors min-h-[44px] flex items-center"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Devbag Accordion */}
                <div>
                  <button
                    onClick={() => setDevbagMobileOpen(!devbagMobileOpen)}
                    className="w-full flex items-center justify-between py-3 px-4 rounded-lg text-sm text-slate-200 hover:bg-white/5 hover:text-white transition-colors min-h-[44px]"
                    aria-expanded={devbagMobileOpen}
                    aria-label="Devbag services menu"
                  >
                    <span>Devbag</span>
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform duration-200 ${
                        devbagMobileOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {devbagMobileOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-4 mt-1 space-y-1 border-l-2 border-teal/30 pl-3">
                          <p className="text-[10px] font-bold text-teal-soft uppercase tracking-wider mb-2 px-2">
                            Devbag - Near Mahapurush Mandir
                          </p>
                          {devbagItems.map((item) => (
                            <Link
                              key={item.label}
                              to={item.path}
                              className="block py-2 px-2 rounded text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors min-h-[44px] flex items-center"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  to="/gallery"
                  className={`block py-3 px-4 rounded-lg text-sm transition-colors min-h-[44px] flex items-center ${
                    isActive('/gallery')
                      ? 'bg-teal-soft/20 text-teal-soft font-bold' 
                      : 'text-slate-200 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  Gallery
                </Link>

                <Link
                  to="/contact"
                  className={`block py-3 px-4 rounded-lg text-sm transition-colors min-h-[44px] flex items-center ${
                    isActive('/contact')
                      ? 'bg-teal-soft/20 text-teal-soft font-bold' 
                      : 'text-slate-200 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  Contact
                </Link>
              </nav>

              {/* Bottom Call & WhatsApp Buttons */}
              <div className="p-4 border-t border-white/10 space-y-2">
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-bold transition-all min-h-[44px]"
                  aria-label="Call now"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Sea King! I would like to enquire about your services.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-teal hover:bg-teal-dark text-white text-sm font-bold transition-all shadow-md min-h-[44px]"
                  aria-label="Book on WhatsApp"
                >
                  <WhatsAppIcon size={16} />
                  <span>Book on WhatsApp</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
