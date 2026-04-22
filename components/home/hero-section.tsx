'use client'

import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'

// Golden particle component
function GoldenParticle({ delay = 0, x = 0 }: { delay?: number; x?: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-[#FFD700]"
      style={{ left: x, top: '50%' }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1.5, 0],
        y: [-100, -200, -300, -400],
        x: [0, Math.random() * 100 - 50, Math.random() * 150 - 75],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    />
  )
}

// Light leak/flare component
function LightLeak() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: `radial-gradient(ellipse at 50% 50%, 
          rgba(255, 107, 0, 0.1) 0%, 
          rgba(255, 215, 0, 0.05) 30%, 
          transparent 70%)`,
      }}
    />
  )
}

// Separate component that uses scroll - only rendered after mount
function ScrollContent({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Smooth spring-based scroll progress for cinematic feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Mango transformations - starts zoomed in, zooms out as you scroll
  const mangoScale = useTransform(smoothProgress, [0, 0.3, 0.6], [3, 1.5, 1])
  const mangoY = useTransform(smoothProgress, [0, 0.5, 1], ['0%', '-5%', '-15%'])
  const mangoRotate = useTransform(smoothProgress, [0, 0.5, 1], [0, 5, -3])
  const mangoOpacity = useTransform(smoothProgress, [0, 0.1], [0, 1])

  // Background glow intensity
  const glowOpacity = useTransform(smoothProgress, [0, 0.3, 0.7], [0, 0.8, 1])
  const glowScale = useTransform(smoothProgress, [0, 0.5], [0.5, 1.5])

  // Text reveals - staggered appearance
  const gujaratiOpacity = useTransform(smoothProgress, [0.25, 0.4], [0, 1])
  const gujaratiY = useTransform(smoothProgress, [0.25, 0.4], [50, 0])

  const englishOpacity = useTransform(smoothProgress, [0.4, 0.55], [0, 1])
  const englishY = useTransform(smoothProgress, [0.4, 0.55], [30, 0])

  const ctaOpacity = useTransform(smoothProgress, [0.6, 0.75], [0, 1])
  const ctaY = useTransform(smoothProgress, [0.6, 0.75], [30, 0])
  const ctaScale = useTransform(smoothProgress, [0.6, 0.8], [0.9, 1])

  // Particle visibility
  const particleOpacity = useTransform(smoothProgress, [0.2, 0.4], [0, 1])

  // Scroll indicator
  const scrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0])

  return (
    <div className="h-screen sticky top-0 overflow-hidden bg-[#0D0A06]">
      {/* Background ambient glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,107,0,0.15) 0%, rgba(255,215,0,0.08) 40%, transparent 70%)',
          opacity: glowOpacity,
          scale: glowScale,
        }}
      />

      {/* Secondary ambient glow */}
      <motion.div
        className="absolute top-1/3 left-1/3 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,215,0,0.1) 0%, transparent 60%)',
          opacity: glowOpacity,
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Light leak effect */}
      <motion.div style={{ opacity: particleOpacity }}>
        <LightLeak />
      </motion.div>

      {/* Golden particles */}
      <motion.div style={{ opacity: particleOpacity }} className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <GoldenParticle
            key={i}
            delay={i * 0.2}
            x={100 + (i % 10) * 100}
          />
        ))}
      </motion.div>

      {/* Floating dust particles */}
      <motion.div style={{ opacity: particleOpacity }} className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`dust-${i}`}
            className="absolute w-0.5 h-0.5 rounded-full bg-[#FFD700]/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      {/* Main mango with cinematic zoom */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px]"
        style={{
          scale: mangoScale,
          y: mangoY,
          rotate: mangoRotate,
          opacity: mangoOpacity,
        }}
      >
        {/* Glow behind mango */}
        <div className="absolute inset-0 -z-10 blur-3xl">
          <div className="w-full h-full rounded-full bg-gradient-to-b from-[#FF6B00]/30 to-[#FFD700]/20" />
        </div>
        
        <Image
          src="/images/mango-hero.jpg"
          alt="Premium Kesar Mango"
          fill
          className="object-contain drop-shadow-[0_0_100px_rgba(255,107,0,0.3)]"
          priority
        />
      </motion.div>

      {/* Text overlays */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 md:pb-32 px-4">
        {/* Gujarati headline */}
        <motion.h1
          className="font-serif text-4xl md:text-6xl lg:text-8xl text-[#FFD700] text-center mb-4 tracking-wide"
          style={{
            opacity: gujaratiOpacity,
            y: gujaratiY,
            textShadow: '0 0 60px rgba(255,215,0,0.5)',
          }}
        >
          શ્રેષ્ઠ કેસર કેરી
        </motion.h1>

        {/* English subline */}
        <motion.p
          className="text-[#FFF8F0] text-lg md:text-xl lg:text-2xl text-center mb-8 tracking-widest uppercase"
          style={{
            opacity: englishOpacity,
            y: englishY,
          }}
        >
          100% Natural · Talala, Gujarat
        </motion.p>

        {/* CTA Button */}
        <motion.button
          className="relative px-10 py-4 md:px-14 md:py-5 text-lg md:text-xl font-semibold text-[#0D0A06] bg-[#FF6B00] rounded-full overflow-hidden group"
          style={{
            opacity: ctaOpacity,
            y: ctaY,
            scale: ctaScale,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          {/* Button glow effect */}
          <span className="absolute inset-0 bg-gradient-to-r from-[#FF6B00] via-[#FFD700] to-[#FF6B00] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="relative z-10">Order Now</span>
          {/* Shine animation */}
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
            animate={{
              x: ['-200%', '200%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: 'easeInOut',
            }}
          />
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
        style={{ opacity: scrollIndicatorOpacity }}
      >
        <motion.div
          className="flex flex-col items-center gap-3"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-[#FFF8F0]/50 text-sm tracking-widest uppercase">Scroll</span>
          <div className="w-6 h-10 rounded-full border-2 border-[#FFF8F0]/30 flex items-start justify-center p-1.5">
            <motion.div
              className="w-1.5 h-2.5 rounded-full bg-[#FF6B00]"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Top vignette */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#0D0A06] to-transparent pointer-events-none" />
      
      {/* Bottom vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-t from-[#0D0A06] to-transparent pointer-events-none" />

      {/* Side vignettes */}
      <div className="absolute top-0 bottom-0 left-0 w-40 bg-gradient-to-r from-[#0D0A06] to-transparent pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-40 bg-gradient-to-l from-[#0D0A06] to-transparent pointer-events-none" />
    </div>
  )
}

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <section ref={containerRef} className="h-[300vh] relative">
      {isMounted ? (
        <ScrollContent containerRef={containerRef} />
      ) : (
        <div className="h-screen sticky top-0 flex items-center justify-center bg-[#0D0A06]">
          <div className="w-20 h-20 rounded-full bg-[#FF6B00]/20 animate-pulse" />
        </div>
      )}
    </section>
  )
}
