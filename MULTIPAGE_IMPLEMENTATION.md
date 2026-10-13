# Sea King Multipage Site Implementation Guide

## Overview
This document outlines the complete conversion from single-page to multipage site with React Router and Framer Motion animations.

## Installation Complete
```bash
npm install react-router-dom framer-motion react-helmet-async
```

## Folder Structure
```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx           # Shared navbar with active link detection
│   │   ├── Footer.tsx           # Shared footer
│   │   ├── Layout.tsx           # Wrapper with navbar + footer + sticky bar
│   │   └── MobileStickyBar.tsx  # Bottom Call/WhatsApp bar
│   ├── shared/
│   │   ├── SEO.tsx              # ✅ Created - Helmet wrapper
│   │   ├── WaveDivider.tsx      # ✅ Created - Animated SVG wave
│   │   ├── WhatsAppIcon.tsx     # ✅ Exists
│   │   ├── InstagramIcon.tsx    # Extract from App.tsx
│   │   ├── ExperienceCard.tsx   # Reusable tour card
│   │   ├── GalleryItem.tsx      # Photo/video tile
│   │   └── LocationCard.tsx     # Location display card
│   └── animations/
│       ├── PageTransition.tsx   # Fade + slide-up wrapper
│       ├── ScrollReveal.tsx     # Intersection observer wrapper
│       ├── CountUp.tsx          # Animated number counter
│       └── FloatingWhatsApp.tsx # Pulsing FAB (desktop only)
├── pages/
│   ├── Home.tsx                 # Hero + previews + CTA
│   ├── Experiences.tsx          # All 8 tours
│   ├── Gallery.tsx              # Photos/videos with filters
│   ├── Locations.tsx            # 2 location cards
│   ├── Contact.tsx              # Form + links
│   └── NotFound.tsx             # 404 page
├── hooks/
│   ├── useScrollToTop.ts        # ✅ Created
│   ├── useReducedMotion.ts      # ✅ Created
│   └── useInView.ts             # Intersection observer
├── data/
│   └── constants.ts             # ✅ Created - All shared data
├── App.tsx                      # Router setup
└── main.tsx                     # Add HelmetProvider + BrowserRouter
```

## Key Implementation Steps

### 1. Update main.tsx
```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
)
```

### 2. Create Router in App.tsx
```tsx
import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Layout from './components/layout/Layout'

const Home = lazy(() => import('./pages/Home'))
const Experiences = lazy(() => import('./pages/Experiences'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Locations = lazy(() => import('./pages/Locations'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="experiences" element={<Experiences />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="locations" element={<Locations />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
```

### 3. Animation Patterns

**Page Transitions:**
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3 }}
>
```

**Scroll Reveal:**
```tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6 }}
>
```

**Card Hover:**
```tsx
<motion.div
  whileHover={{ y: -8, scale: 1.02 }}
  transition={{ duration: 0.2 }}
>
```

**Staggered Children:**
```tsx
<motion.div
  variants={{
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  }}
  initial="hidden"
  whileInView="show"
>
  {items.map((item) => (
    <motion.div
      key={item.id}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
    />
  ))}
</motion.div>
```

### 4. Navbar Active Link Detection
```tsx
const location = useLocation()
const isActive = (path: string) => location.pathname === path

<Link
  to="/experiences"
  className={`... ${isActive('/experiences') ? 'text-teal-soft' : '...'}`}
>
```

### 5. Hero Animations
```tsx
// Ken Burns effect
<motion.div
  animate={{ scale: 1.1 }}
  transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
>

// Staggered hero content
<motion.h1
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
>

<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.4 }}
>
  {/* Buttons */}
</motion.div>
```

### 6. Count-Up Numbers
```tsx
import { useInView } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

export const CountUp = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    
    let start = 0
    const increment = end / (duration * 60)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.ceil(start))
      }
    }, 1000 / 60)
    
    return () => clearInterval(timer)
  }, [isInView, end, duration])

  return <span ref={ref}>{count}</span>
}
```

### 7. Respect prefers-reduced-motion
```tsx
const prefersReducedMotion = useReducedMotion()

<motion.div
  animate={prefersReducedMotion ? {} : { y: -8 }}
  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3 }}
>
```

## Page-Specific Content

### Home Page
- Full-screen hero with Ken Burns effect
- 2 Locations strip (horizontal cards)
- 4 experience previews (first 4 from array)
- Stats strip with count-up animation
- 4 gallery items preview
- CTA banner at bottom

### Experiences Page
- All 8 numbered cards
- Staggered fade-in on load
- Keep existing grid layout

### Gallery Page
- Keep existing filter tabs
- Keep existing lightbox
- Tiles fade in with stagger
- Lightbox scale + fade animation

### Locations Page
- 2 location cards side by side
- Map embed or gradient placeholder
- Clear heading "We Operate in 2 Locations"

### Contact Page
- Phone numbers as tap-to-call
- WhatsApp button
- Enquiry form
- Instagram link

### 404 Page
- Centered content
- "Page not found" message
- Link back to home
- Ocean-themed illustration or gradient

## Performance Optimizations
- ✅ Lazy load all pages
- ✅ Lazy load images
- ✅ Use transform/opacity only for animations
- ✅ Reduce motion detection
- ✅ Viewport once: true for scroll animations

## Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px
- All touch targets: min 44px

## Next Steps
1. Create all component files
2. Split current App.tsx into pages
3. Implement Layout wrapper
4. Add animations with Framer Motion
5. Test all routes and animations
6. Verify responsive behavior
7. Test reduced motion preferences

Would you like me to proceed with creating all the component files, or would you prefer to implement this incrementally?
