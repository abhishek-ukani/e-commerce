import Link from 'next/link'
import { MapPin, Phone, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">TK</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Talala Kesariya</h3>
                <p className="text-sm opacity-80 font-[family-name:var(--font-gujarati-sans)]">તલાળા કેસરિયા</p>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Premium Kesar mangoes directly from the orchards of Talala, Gujarat. 
              100% natural, no chemicals, just pure sweetness.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  Cart
                </Link>
              </li>
              <li>
                <Link href="/account" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 opacity-80" />
                <span className="text-sm opacity-80">
                  Talala, Gir Somnath District,<br />
                  Gujarat, India - 362150
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 opacity-80" />
                <span className="text-sm opacity-80">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 opacity-80" />
                <span className="text-sm opacity-80">hello@talalakesariya.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm opacity-60">
            {new Date().getFullYear()} Talala Kesariya. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
