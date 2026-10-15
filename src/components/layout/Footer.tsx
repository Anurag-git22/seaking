import { Link } from 'react-router-dom'
import { Phone, ArrowUpRight, MapPin } from 'lucide-react'
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
            <div className="md:col-span-6 space-y-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4">
              <div className="w-[72px] h-[72px] md:w-[88px] md:h-[88px] rounded-full bg-white shadow-lg ring-2 ring-teal-300 flex items-center justify-center shrink-0">
                <img
                  src="/images/logo-icon.png"
                  alt="Sea King Scuba Diving logo"
                  width="512"
                  height="512"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-[22px] md:text-[26px] text-white leading-tight">
                  Sea King Scuba Diving
                </span>
                <span className="text-[10px] md:text-[11px] font-medium tracking-[0.15em] uppercase text-teal-soft mt-1 leading-none">
                  SCUBA • WATER SPORTS • BOATING
                </span>
              </div>
            </div>
            <p className="text-[15px] text-slate-300 leading-relaxed max-w-md">
              Scuba diving and water sports in Malvan, boating safaris in Devbag. Safe, fun and unforgettable days on the Konkan coast.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-slate-200 text-xs font-medium">
                <MapPin className="w-3 h-3" />
                Malvan
              </span>
            </div>
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
          <div className="md:col-span-6 space-y-2">
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
