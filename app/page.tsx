import { lazy, Suspense } from 'react'
import { Header } from '@/components/header/header'
import { Footer } from '@/components/footer/footer'
import HeroSection from '@/components/home/hero-section'

// Lazy load components below the fold
const KesarStory = lazy(() => import('@/components/home/kesar-story').then(module => ({ default: module.KesarStory })))
const ProductSection = lazy(() => import('@/components/home/product-section').then(module => ({ default: module.ProductSection })))
const AboutSection = lazy(() => import('@/components/home/about-section').then(module => ({ default: module.AboutSection })))
const ComingSoonSection = lazy(() => import('@/components/home/coming-soon-section'))

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
          <KesarStory />
        </Suspense>
        <ComingSoonSection />
        {/* <ProductSection /> */}
        {/* <AboutSection /> */}
      </main>
      
      <Footer />
    </div>
  )
}
