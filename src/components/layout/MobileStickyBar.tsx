import { Phone } from 'lucide-react'
import { PHONE_NUMBER, WHATSAPP_NUMBER } from '../../data/constants'
import { WhatsAppIcon } from '../WhatsAppIcon'

export const MobileStickyBar = () => {
  return (
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
  )
}
