'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { NAV_CONFIG } from './nav-config'

type Variant = 'home' | 'product' | 'default'

type HeaderProps = {
  variant?: Variant
  title?: string
}

// Optional: Central title mapping (no need to pass title everywhere)
const PAGE_TITLES: Record<string, string> = {
  '/cart': 'Your Cart',
  '/product': 'Product Details',
  '/checkout': 'Checkout',
}

export function Header({ variant, title: titleProp }: HeaderProps) {
  const pathname = usePathname()
  const router = useRouter()

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Detect variant automatically
  const currentVariant: Variant =
    variant ||
    (pathname === '/'
      ? 'home'
      : pathname.startsWith('/product')
      ? 'product'
      : 'default')

  const NAV_LINKS = NAV_CONFIG[currentVariant]

  // Resolve title
  const title = titleProp || PAGE_TITLES[pathname] || 'Page'

  // Back handler (safe fallback)
  const handleBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/')
    }
  }

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${
          scrolled
            ? 'bg-[#0A0805]/80 backdrop-blur-md border-b border-white/10'
            : 'bg-transparent'
        }
      `}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          
          {/* LEFT SECTION */}
          <div className="flex items-center gap-3">

            {/* HOME: Logo */}
            {currentVariant === 'home' ? (
              <Link href="/" className="flex items-center gap-2.5">
                <span className="text-sm tracking-[0.25em] uppercase text-[#E8820C]">
                  Talala Kesariya
                </span>
              </Link>
            ) : (
              <>
                {/* Back Button */}
                <button
                  onClick={handleBack}
                  className="text-white/70 hover:text-white transition"
                >
                  <ArrowLeft size={20} />
                </button>

                {/* Page Title */}
                <span className="text-sm tracking-wide text-white font-medium">
                  {title}
                </span>
              </>
            )}
          </div>

          {/* DESKTOP NAV (only home) */}
          {currentVariant === 'home' && (
            <nav className="hidden md:flex gap-10">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm tracking-wide text-white/50 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white/70"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && currentVariant === 'home' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-[#0A0805]/95 backdrop-blur-lg border-t border-white/10"
          >
            <div className="flex flex-col p-6 gap-4">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white/70 hover:text-white transition"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}