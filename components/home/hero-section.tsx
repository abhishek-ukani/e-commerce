'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';


export default function HeroSection() {
  const bgRef       = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const mangoRef    = useRef<HTMLDivElement>(null);
  const navRef      = useRef<HTMLElement>(null);
  const rafRef      = useRef(false);
  const lastYRef    = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      lastYRef.current = window.scrollY;
      if (!rafRef.current) {
        requestAnimationFrame(applyParallax);
        rafRef.current = true;
      }
    };

    const applyParallax = () => {
      const s  = lastYRef.current;
      const vh = window.innerHeight;
      if (s > vh) { rafRef.current = false; return; }
      const p = s / vh;

      // Background — subtle zoom-out + drift
      if (bgRef.current) {
        const sc = Math.max(1.0, 1.05 - p * 0.04);
        bgRef.current.style.transform = `scale(${sc}) translateY(${s * 0.06}px)`;
      }

      // Wordmark — fades quickly (premium feel)
      if (wordmarkRef.current) {
        wordmarkRef.current.style.opacity   = String(Math.max(0, 1 - p * 3));
        wordmarkRef.current.style.transform = `translateY(calc(-52% + ${s * 0.22}px))`;
      }

      // Mango — very subtle vertical drift
      if (mangoRef.current) {
        mangoRef.current.style.transform = `translateY(${s * 0.08}px)`;
      }

      // Nav bg on scroll
      if (navRef.current) {
        if (s > 60) {
          navRef.current.style.background    = 'rgba(5,12,6,0.95)';
          navRef.current.style.backdropFilter = 'blur(12px)';
        } else {
          navRef.current.style.background    = '';
          navRef.current.style.backdropFilter = '';
        }
      }

      rafRef.current = false;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative w-full overflow-hidden flex items-center justify-center"
        style={{ height: '100vh', minHeight: '600px' }}
        id="hero"
      >
        {/* z1 — Background scene */}
        <div
          ref={bgRef}
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{
            zIndex: 1,
            backgroundImage: "url('/hero-bg.png')",
            backgroundPosition: 'center 95%',
            transform: 'scale(1)',
            willChange: 'transform',
          }}
        />

        {/* z2 — Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 2,
            background: `
              linear-gradient(to bottom, rgba(4,12,5,0.60) 0%, rgba(4,12,5,0.0) 18%),
              linear-gradient(to top,    rgba(4,12,5,0.85) 0%, rgba(4,12,5,0.0) 30%),
              linear-gradient(to right,  rgba(4,12,5,0.35) 0%, rgba(4,12,5,0.0) 25%),
              linear-gradient(to left,   rgba(4,12,5,0.25) 0%, rgba(4,12,5,0.0) 20%)
            `,
          }} 
        /> 

        {/* z5 — Ground fade */}
         <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            zIndex: 5,
            height: '18%',
            background: 'linear-gradient(to top, rgba(4,12,5,0.92) 0%, transparent 100%)',
          }}
        /> 

        {/* Scroll cue */}
        <div
          className="absolute left-1/2 flex flex-col items-center gap-2"
          style={{
            zIndex: 7,
            bottom: '3.5rem',
            transform: 'translateX(-50%)',
            animation: 'fadeIn 0.8s ease 2.2s both',
          }}
        >
          <span className="text-[0.54rem] tracking-[0.28em] uppercase"
                style={{ color: 'rgba(160,190,120,0.38)' }}>
            Scroll
          </span>
          <div
            style={{
              width: 1,
              height: 36,
              background: 'linear-gradient(to bottom, rgba(160,190,120,0.38), transparent)',
              animation: 'scrollPulse 2.4s ease-in-out 2.8s infinite',
            }}
          />
        </div>

       
      </section>

      {/* Keyframes injected globally */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scrollPulse {
          0%   { transform: scaleY(0); transform-origin: top;    opacity: 0; }
          45%  { transform: scaleY(1); transform-origin: top;    opacity: 1; }
          80%  { transform: scaleY(1); transform-origin: bottom; opacity: 1; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
        }
        .hero-bg-enter {
          animation: bgReveal 2s cubic-bezier(0.22,0.61,0.36,1) both;
        }
        @keyframes bgReveal {
          from { transform: scale(1.12); opacity: 0.5; }
          to   { transform: scale(1.05); opacity: 1;   }
        }
      `}</style>
    </>
  );
}