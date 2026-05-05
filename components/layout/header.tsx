'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Menu, X, User, ShoppingBag, LogOut } from 'lucide-react'
import { useCart } from '@/components/providers/cart-provider'
import { useAuth } from '@/components/providers/auth-provider'

export function Header() {
  const pathname = usePathname()
  const router = useRouter()

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const { totalItems, isHydrated } = useCart()
  const { isAuthenticated, logout } = useAuth()

  const isHomePage = pathname === '/'

  const NAV_LINKS = [
    { label: 'Kesar Story', href: '#kesar-story' },
    { label: 'Coming Soon', href: '#coming-soon' },
  ]

  const getPageTitle = () => {
    if (pathname === '/account') return 'My Account'
    if (pathname === '/cart') return 'Your Cart'
    if (pathname === '/login') return 'Login'
    return ''
  }

  return (
    <>
      {/* ================= HOME PAGE NAVBAR ================= */}
      {isHomePage && (
        <header className="fixed top-0 left-0 right-0 z-50 w-full
          bg-[linear-gradient(to_bottom,rgba(10,8,5,0.92)_0%,rgba(10,8,5,0)_100%)] backdrop-blur-sm">

          <div className="flex items-center justify-between px-6 md:px-12 py-5">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                className="opacity-75 group-hover:opacity-100 transition-opacity">
                <path d="M12 3C7.5 3 4 8 4 12.5c0 4 3.2 7.5 8 8.5 4.8-1 8-4.5 8-8.5C20 8 16.5 3 12 3z"
                  stroke="#E8820C" strokeWidth="1.2" />
                <path d="M12 21V13" stroke="#E8820C" strokeWidth="1" strokeDasharray="2 2.5" />
                <path d="M12 16c-2.5-1.5-4.5-1-5.5 0" stroke="#E8820C" strokeWidth="1" strokeLinecap="round" />
                <path d="M12 13c2.5-1.5 4.5-1 5.5 0" stroke="#E8820C" strokeWidth="1" strokeLinecap="round" />
              </svg>

              <span className="text-[1rem] font-medium tracking-[0.26em] uppercase text-primary">
                Talala Kesariya
              </span>
            </Link>

            {/* Desktop Links */}
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

            {/* Right Icons */}
            <div className="flex items-center gap-5">

              {/* Mobile Toggle */}
              <button
                className="md:hidden text-cream"
                onClick={() => setIsMobileMenuOpen(prev => !prev)}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              {/* Cart */}
              <Link href="/cart" className="hidden md:block relative text-cream/40 hover:text-cream transition-colors">
                <ShoppingBag size={18} />
                {isHydrated && totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-[10px] rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Account */}
              <Link href="/account" className="hidden md:block text-cream/40 hover:text-cream transition-colors">
                <User size={18} />
              </Link>


            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-white/10 bg-[#0A0805]"
              >
                <nav className="flex flex-col p-4 gap-3">
                  {NAV_LINKS.map(link => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="px-4 py-3 text-sm uppercase tracking-widest text-cream/60 hover:text-primary hover:bg-white/5 rounded-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}

                  <Link
                    href="/account"
                    className="px-4 py-3 text-sm text-cream/60"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Account
                  </Link>

                  <Link
                    href="/cart"
                    className="px-4 py-3 text-sm text-cream/60"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Cart ({totalItems})
                  </Link>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </header>
      )}

      {/* ================= INNER PAGE HEADER ================= */}
      {!isHomePage && (
        <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0A0805] backdrop-blur-md">
          <div className="flex h-16 items-center justify-between px-4">

            <div className='flex flex-row gap-2 items-center'>
              {/* Back */}
              <button
                onClick={() => router.back()}
                className="p-2 text-primary hover:bg-white/5 rounded-full"
              >
                <ArrowLeft size={18} />
              </button>

              {/* Title */}
              <h1 className="text-sm uppercase tracking-widest text-cream/90">
                {getPageTitle()}
              </h1>
            </div>


            {/* Right */}
            <div className="flex items-center gap-4">

              <Link href="/cart" className="relative text-cream/40 hover:text-cream">
                <ShoppingBag size={18} />
                {isHydrated && totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-[10px] rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>

              <Link href="/account" className="text-cream/40 hover:text-cream">
                <User size={18} />
              </Link>


            </div>
          </div>
        </header>
      )}
    </>
  )
}