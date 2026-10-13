import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

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
  }, [location.pathname])

  const isActive = (path: string) => location.pathname === path

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/experiences', label: 'Experiences' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/locations', label: 'Locations' },
    { path: '/contact', label: 'Contact' }
  ]

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-navy/95 backdrop-blur-md border-b border-navy-light/40 shadow-xl py-2.5' 
          : 'bg-gradient-to-b from-navy/90 via-navy/60 to-transparent border-b border-white/10 py-3.5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-teal rounded-lg p-0.5">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden ring-2 ring-teal/80 group-hover:ring-teal shadow-md group-hover:scale-105 transition-all shrink-0 bg-navy">
            <img 
              src="/images/Head.jpg" 
              alt="Sea King Official Logo" 
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
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`group relative py-1 transition-colors focus:outline-none ${
                isActive(link.path) ? 'text-teal-soft font-semibold' : 'text-slate-200 hover:text-white'
              }`}
            >
              <span>{link.label}</span>
              <span 
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-teal rounded-full transition-all duration-300 ${
                  isActive(link.path)
                    ? 'scale-x-100 opacity-100' 
                    : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-75'
                }`} 
              />
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-teal transition-colors"
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-navy/98 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <nav className="px-5 py-4 flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm py-2 px-3 rounded-lg transition-colors ${
                    isActive(link.path)
                      ? 'bg-teal-soft/20 text-teal-soft font-bold' 
                      : 'text-slate-200 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
