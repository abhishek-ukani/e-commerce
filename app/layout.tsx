import type { Metadata, Viewport } from 'next'
import { DM_Sans, Noto_Sans_Gujarati, Cormorant_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/components/providers/cart-provider'
import { AuthProvider } from '@/components/providers/auth-provider'
import './globals.css'

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans"
})

const notoSansGujarati = Noto_Sans_Gujarati({ 
  subsets: ["gujarati"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-gujarati-sans"
})

const cormorantGaramond = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant-garamond"
})

export const metadata: Metadata = {
  title: 'Talala Kesariya | તાલાલા કેસરિયા - Premium Kesar Mangoes',
  description: 'Order premium Kesar mangoes directly from Talala, Gujarat. 100% natural, no chemicals, straight from the farm to your doorstep.',
  keywords: ['Kesar mango', 'Talala', 'Gujarat', 'premium mangoes', 'organic mangoes', 'Indian mangoes'],
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#d97706',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${notoSansGujarati.variable} ${cormorantGaramond.variable}`}>
      <body className="font-sans antialiased bg-background">
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
