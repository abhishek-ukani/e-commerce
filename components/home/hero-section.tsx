'use client';

import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <>
      <section id="home" className="min-h-screen flex flex-col justify-center px-6 md:px-16 pt-36 pb-20 relative overflow-hidden bg-background text-foreground">
        
        {/* Radial warm glow */}
        <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[140%] pointer-events-none" 
          style={{
            background: 'radial-gradient(ellipse at 60% 40%, rgba(232,130,12,0.07) 0%, rgba(232,130,12,0.03) 35%, transparent 65%)'
          }}
        />

        {/* Large decorative Gujarati rangoli motif — right side */}
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[55vw] max-w-[750px] opacity-[0.055] pointer-events-none hidden md:block" aria-hidden="true">
          <svg viewBox="0 0 700 700" xmlns="http://www.w3.org/2000/svg" fill="none">
            {/* Outer rings */}
            <circle cx="350" cy="350" r="320" stroke="#E8820C" strokeWidth="0.4" strokeDasharray="6 14"/>
            <circle cx="350" cy="350" r="280" stroke="#E8820C" strokeWidth="0.3" strokeDasharray="3 9"/>
            <circle cx="350" cy="350" r="220" stroke="#E8820C" strokeWidth="0.5"/>
            <circle cx="350" cy="350" r="160" stroke="#E8820C" strokeWidth="0.3"/>
            <circle cx="350" cy="350" r="90"  stroke="#E8820C" strokeWidth="0.6"/>
            <circle cx="350" cy="350" r="30"  fill="#E8820C" opacity="0.4"/>
            {/* Petal forms (12-fold symmetry) */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(deg => (
              <path key={deg} d="M350 130 C370 200 360 270 350 310 C340 270 330 200 350 130Z" fill="#E8820C" opacity="0.25" transform={`rotate(${deg} 350 350)`}/>
            ))}
            {/* Cardinal dots */}
            <circle cx="350" cy="33" r="5" fill="#E8820C" opacity="0.5"/>
            <circle cx="667" cy="350" r="5" fill="#E8820C" opacity="0.5"/>
            <circle cx="350" cy="667" r="5" fill="#E8820C" opacity="0.5"/>
            <circle cx="33"  cy="350" r="5" fill="#E8820C" opacity="0.5"/>
            {/* Diagonal dots */}
            <circle cx="577" cy="123" r="3" fill="#E8820C" opacity="0.35"/>
            <circle cx="577" cy="577" r="3" fill="#E8820C" opacity="0.35"/>
            <circle cx="123" cy="577" r="3" fill="#E8820C" opacity="0.35"/>
            <circle cx="123" cy="123" r="3" fill="#E8820C" opacity="0.35"/>
          </svg>
        </div>

        <motion.div 
          className="relative z-10 max-w-[820px]"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-3 mb-10 text-primary text-[0.68rem] tracking-[0.22em] uppercase font-sans">
            <div className="w-6 h-px bg-primary" />
            <span aria-label="Season 2026, May to July">સિઝન ૨૦૨૬ &nbsp;·&nbsp; મે – જૂન – જુલાઈ</span>
            <div className="w-6 h-px bg-primary" />
          </div>

          <h1 className="font-gujarati text-[clamp(3.5rem,8vw,7.5rem)] font-bold leading-none text-foreground tracking-[-0.025em] mb-1">
            ગીર ની
            <span className="font-serif text-[clamp(2.8rem,6.5vw,6rem)] font-light italic text-primary block leading-[1.1] mb-2 tracking-[0.01em]">Kesariya</span>
            <span className="opacity-20 block">કેરી</span>
          </h1>

          <p className="font-gujarati text-[clamp(1rem,2vw,1.2rem)] font-light text-muted-foreground max-w-[420px] leading-[1.8] mt-10 mb-14">
            તળાળા ગીર ની ધરતી પર પ્રકૃતિના ખોળે<br/>
            પાકે છે — ૧૦૦% કુદરતી, કોઈ ઝેર નહિ,<br/>
            સીધા ઝાડ પરથી તમારા ઘર સુધી.
          </p>

          <div className="flex items-center gap-8">
            <a href="#notify" className="inline-block bg-primary text-primary-foreground border-none px-9 py-4 font-sans text-[0.8rem] font-medium tracking-[0.1em] uppercase cursor-pointer rounded-sm no-underline transition-all hover:bg-[#F09422] hover:-translate-y-[1px]">
              જાણ કરો — Notify Me
            </a>
            <a href="#story" className="inline-flex items-center gap-2.5 bg-transparent border-none text-muted-foreground font-sans text-[0.8rem] tracking-[0.08em] cursor-pointer no-underline transition-colors hover:text-foreground group">
              Story <span className="text-base transition-transform group-hover:translate-y-[2px]">↓</span>
            </a>
          </div>
        </motion.div>

        {/* Origin tag bottom-right */}
        <motion.div 
          className="absolute bottom-16 right-16 text-right z-10 hidden md:block"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
          aria-hidden="true"
        >
          <span className="font-serif text-5xl font-light italic text-foreground opacity-[0.04] leading-none block tracking-[-0.02em]">Talala</span>
          <span className="text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground block mt-1">Gir Somnath, Gujarat</span>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 z-10" aria-hidden="true">
          <span className="text-[0.6rem] tracking-[0.25em] uppercase text-muted-foreground">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-muted-foreground to-transparent animate-scroll-drop origin-top" />
        </div>
      </section>

      {/* STAT STRIP */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 border-y border-input"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.75, ease: "easeOut" }}
      >
        <div className="py-14 px-8 text-center border-b border-r border-input md:border-b-0 relative transition-colors hover:bg-primary/5">
          <div className="font-serif text-[clamp(2.8rem,4.5vw,4.2rem)] font-semibold text-foreground leading-none mb-2">
            100<sup className="text-[0.4em] align-super text-primary">%</sup>
          </div>
          <div className="font-gujarati text-[0.82rem] text-muted-foreground leading-[1.5]">કુદરતી — No Chemicals<br/>Zero pesticides</div>
        </div>
        <div className="py-14 px-8 text-center border-b border-input md:border-r md:border-b-0 relative transition-colors hover:bg-primary/5">
          <div className="font-serif text-[clamp(2.8rem,4.5vw,4.2rem)] font-semibold text-foreground leading-none mb-2">
            10<sub className="text-[0.35em] align-baseline text-muted-foreground">kg</sub>
          </div>
          <div className="font-gujarati text-[0.82rem] text-muted-foreground leading-[1.5]">per box — ૧ ડબ્બો<br/>Farm-packed</div>
        </div>
        <div className="py-14 px-8 text-center border-r border-input relative transition-colors hover:bg-primary/5">
          <div className="font-serif text-[clamp(2.8rem,4.5vw,4.2rem)] font-semibold text-foreground leading-none mb-2">
            GI<sup className="text-[0.4em] align-super text-primary">✓</sup>
          </div>
          <div className="font-gujarati text-[0.82rem] text-muted-foreground leading-[1.5]">Certified Origin<br/>Gir Kesar Mango</div>
        </div>
        <div className="py-14 px-8 text-center relative transition-colors hover:bg-primary/5">
          <div className="font-serif text-[clamp(2.8rem,4.5vw,4.2rem)] font-semibold text-foreground leading-none mb-2">
            3<sub className="text-[0.35em] align-baseline text-muted-foreground">mo</sub>
          </div>
          <div className="font-gujarati text-[0.82rem] text-muted-foreground leading-[1.5]">Season Window<br/>May · June · July</div>
        </div>
      </motion.div>
    </>
  );
}