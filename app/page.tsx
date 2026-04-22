import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import HeroSection from '@/components/home/hero-section'
import { KesarStory } from '@/components/home/kesar-story'
import { ProductSection } from '@/components/home/product-section'
import { AboutSection } from '@/components/home/about-section'
import ComingSoonSection from '@/components/home/coming-soon-section'


export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header /> */}
      <main className="flex-1">
        <HeroSection />
        <KesarStory />
        {/* <ProductSection /> */}
        {/* <AboutSection /> */}
      </main>
      <ComingSoonSection />
      <Footer />
    </div>
  )
}
