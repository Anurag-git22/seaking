import { Link } from 'react-router-dom'
import { Phone, ArrowUpRight } from 'lucide-react'
import { PHONE_NUMBER, PHONE_DISPLAY, WHATSAPP_NUMBER, INSTAGRAM_URL, LOCATIONS } from '../../data/constants'
import { WhatsAppIcon } from '../WhatsAppIcon'

const InstagramIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
)

export const Footer = () => {
  return (
    <footer className="bg-navy text-slate-300 pt-16 pb-12 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Main Footer Row */}
        <div className="grid md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Intro */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex flex-col items-center md:items-start gap-3">
              <div className="w-24 h-24 rounded-full bg-white p-1 shadow-lg ring-2 ring-teal-300 flex items-center justify-center">
                <img
                  src="/images/logo.png"
                  alt="Sea King Scuba Diving logo"
                  width="96"
                  height="96"
                  className="h-full w-full object-contain"
                />
              </div>
              <span className="font-bold text-xl text-white">Sea King Boating Safari</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Authentic backwater cruises, island adventures, and dolphin safaris in Malvan, Sindhudurg, Maharashtra.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={`tel:${PHONE_NUMBER}`}
                aria-label="Call Sea King"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-teal text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-teal"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Sea King!')}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Sea King"
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

          {/* Location 1 */}
          <div className="md:col-span-4 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-soft">
              Location 1 • Devbag
            </h4>
            <p className="text-white font-medium text-sm">{LOCATIONS[0].name}</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              {LOCATIONS[0].address}, {LOCATIONS[0].state}
            </p>
            <p className="text-xs text-sand font-medium">Open daily, {LOCATIONS[0].hours}</p>
            <a
              href={LOCATIONS[0].mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-teal hover:underline pt-1 focus:outline-none focus:ring-2 focus:ring-teal rounded"
            >
              <span>Google Maps</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>

          {/* Location 2 */}
          <div className="md:col-span-4 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-soft">
              Location 2 • Tarkarli
            </h4>
            <p className="text-white font-medium text-sm">{LOCATIONS[1].name}</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              {LOCATIONS[1].address}, {LOCATIONS[1].state}
            </p>
            <p className="text-xs text-sand font-medium">Open daily, {LOCATIONS[1].hours}</p>
            <a
              href={LOCATIONS[1].mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-teal hover:underline pt-1 focus:outline-none focus:ring-2 focus:ring-teal rounded"
            >
              <span>Google Maps</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Sea King Boating Safari. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:text-teal transition-colors">Home</Link>
            <Link to="/experiences" className="hover:text-teal transition-colors">Tours</Link>
            <Link to="/contact" className="hover:text-teal transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
