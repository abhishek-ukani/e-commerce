'use client'

import Link from 'next/link'
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/components/providers/cart-provider'
import { useAuth } from '@/components/providers/auth-provider'



export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { totalItems, isHydrated } = useCart()
  const { isAuthenticated } = useAuth()
  const navRef = useRef<HTMLElement>(null);
  const NAV_LINKS = [
    { label: 'Kesar Story', href: '#kesar-story' },
    { label: 'Coming Soon', href: '#coming-soon' },
  ];


  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-white/5 bg-[linear-gradient(to_bottom,rgba(10,8,5,0.92)_0%,rgba(10,8,5,0)_100%)] backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* NAV */}
          <nav
            ref={navRef}
            className="fixed top-0 left-0 right-0 z-[300] flex items-center justify-between px-12 py-5
                   transition-all duration-400"
            style={{
              background: 'linear-gradient(to bottom,rgba(5,14,6,0.88) 0%,transparent 100%)',
            }}
          >
            {/* Logo */}
            <a href="/" className="flex items-center gap-2.5 no-underline">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="opacity-75">
                <path d="M12 3C7.5 3 4 8 4 12.5c0 4 3.2 7.5 8 8.5 4.8-1 8-4.5 8-8.5C20 8 16.5 3 12 3z"
                  stroke="#E8820C" strokeWidth="1.2" />
                <path d="M12 21V13" stroke="#E8820C" strokeWidth="1" strokeDasharray="2 2.5" />
                <path d="M12 16c-2.5-1.5-4.5-1-5.5 0" stroke="#E8820C" strokeWidth="1" strokeLinecap="round" />
                <path d="M12 13c2.5-1.5 4.5-1 5.5 0" stroke="#E8820C" strokeWidth="1" strokeLinecap="round" />
              </svg>
              <span className="text-[1rem] font-medium tracking-[0.26em] uppercase"
                style={{ color: '#E8820C' }}>
                Talala Kesariya
              </span>
            </a>

            {/* Links — hidden on mobile */}
            <ul className="hidden md:flex gap-10 list-none">
              {NAV_LINKS.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[0.8rem] tracking-[0.1em] no-underline transition-colors duration-200"
                    style={{ color: 'rgba(255,248,231,0.45)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#FFF8E7')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,248,231,0.45)')}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Icons */}
            <div className="flex items-center gap-5">

              {/* Account */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="1.5" strokeLinecap="round" className="cursor-pointer transition-colors duration-200"
                style={{ color: 'rgba(255,248,231,0.40)' }}>
                <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
              {/* Cart */}
              {/* <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="1.5" strokeLinecap="round" className="cursor-pointer transition-colors duration-200"
                style={{ color: 'rgba(255,248,231,0.40)' }}>
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg> */}
            </div>
          </nav>
        </div>

      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/40 bg-card"
          >
            <nav className="flex flex-col p-4 gap-2">
              <Link
                href="/"
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/#product"
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Our Mangoes
              </Link>
              <Link
                href="/#about"
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
