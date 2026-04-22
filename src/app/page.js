'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import './globals.css';

const TOTAL_FRAMES = 200;

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imagesRef = useRef([]);

  // States for scroll-driven animations
  const [scrollFraction, setScrollFraction] = useState(0);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setParticles(Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${10 + Math.random() * 20}s`,
      animationDelay: `${Math.random() * 10}s`,
      width: `${2 + Math.random() * 4}px`,
      height: `${2 + Math.random() * 4}px`
    })));
  }, []);

  useEffect(() => {
    // Preload images
    const loadImages = async () => {
      let loadedCount = 0;
      const images = [];

      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new window.Image();
        const paddedIndex = i.toString().padStart(3, '0');
        img.src = `/mango-frames/ezgif-frame-${paddedIndex}.jpg`;
        
        await new Promise((resolve) => {
          img.onload = () => {
            loadedCount++;
            setLoadingProgress(Math.floor((loadedCount / TOTAL_FRAMES) * 100));
            images.push(img);
            resolve();
          };
          img.onerror = () => {
            // handle error smoothly just by resolving
            images.push(img); 
            resolve();
          };
        });
      }
      
      imagesRef.current = images;
      setLoaded(true);
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (!loaded) return;

    const handleScroll = () => {
      if (!containerRef.current || !canvasRef.current || imagesRef.current.length === 0) return;

      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far we've scrolled inside the container
      const scrollDistance = -top;
      const scrollableHeight = height - windowHeight;
      
      let rawFraction = scrollDistance / scrollableHeight;
      // Clamp between 0 and 1
      const fraction = Math.max(0, Math.min(1, rawFraction));
      
      setScrollFraction(fraction);

      // Draw canvas
      const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(fraction * TOTAL_FRAMES));
      
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      const img = imagesRef.current[frameIndex];
      
      if (img && img.complete) {
        // Clear canvas
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // Setup canvas size based on window to keep it responsive and sharp
        if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
           canvas.width = window.innerWidth;
           canvas.height = window.innerHeight;
        }

        // Draw image covering the canvas (object-fit: cover equivalent)
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgRatio;
          offsetX = 0;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          drawWidth = canvas.height * imgRatio;
          drawHeight = canvas.height;
          offsetX = (canvas.width - drawWidth) / 2;
          offsetY = 0;
        }

        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial draw
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [loaded]);

  // Map scroll fraction to background color
  const getBackgroundColor = (fraction) => {
    if (fraction < 0.25) return '#0D0800'; // earthy dark
    if (fraction < 0.5) return '#2D1A00';  // earthy brown
    if (fraction < 0.75) return '#0A3200'; // lush green
    return '#FF6B00';                       // blazing saffron
  };

  // Helper for text opacities based on scroll range
  const getOpacity = (fraction, start, end) => {
    if (fraction < start) return 0;
    if (fraction > end) return 1 - (fraction - end) * 5; // fade out fast after end
    return (fraction - start) / (end - start);
  };

  if (!loaded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0D0800] text-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#FF6B00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse mb-6">
           <path d="M7 12c-4-4-5-8-2-11c3 3 7 4 11 8c4 4 5 8 2 11c-3-3-7-4-11-8z"/>
           <path d="M12 21A9 9 0 0 0 3 12"/>
           <path d="M3 12A9 9 0 0 0 12 3"/>
        </svg>
        <div className="text-2xl font-bold font-sans text-[var(--color-cream)]">Loading... {loadingProgress}%</div>
        <div className="w-64 h-2 bg-gray-800 rounded-full mt-4 overflow-hidden">
          <div className="h-full bg-[var(--color-saffron)] transition-all duration-300" style={{ width: `${loadingProgress}%` }}></div>
        </div>
      </div>
    );
  }

  // Particles are generated in useEffect to avoid hydration mismatch

  return (
    <main className="bg-[#0D0800] min-h-screen font-sans selection:bg-[#FF6B00] selection:text-white">
      
      {/* Scroll-driven Hero Animation */}
      <section ref={containerRef} className="hero-container">
        <div className="sticky-wrapper" style={{ 
            backgroundColor: getBackgroundColor(scrollFraction),
            transition: 'background-color 0.5s ease'
        }}>
          {/* Canvas for images */}
          <div className="canvas-wrapper">
            <canvas ref={canvasRef}></canvas>
          </div>
          
          <div className="vignette"></div>

          {/* Particles */}
          <div className="particles-container">
            {particles.map(p => (
              <div key={p.id} className="particle" style={{
                left: p.left,
                width: p.width,
                height: p.height,
                animationDuration: p.animationDuration,
                animationDelay: p.animationDelay
              }}></div>
            ))}
          </div>

          {/* Texts Overlay Layer */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10 pointer-events-none">
            
            <div style={{
              position: 'absolute', top: '20%', left: '10%',
              opacity: getOpacity(scrollFraction, 0.05, 0.2),
              transform: `translateY(${(1 - getOpacity(scrollFraction, 0.05, 0.2)) * 20}px)`,
              transition: 'opacity 0.1s, transform 0.1s'
            }}>
              <h2 className="text-[var(--color-cream)] text-3xl md:text-5xl font-gujarati tracking-wide opacity-90 drop-shadow-xl" style={{ fontFamily: 'var(--font-gujarati)' }}>
                તલાળાની ધરતીમાંથી
              </h2>
            </div>
            
            <div style={{
              position: 'absolute',
              opacity: getOpacity(scrollFraction, 0.3, 0.5),
              transform: `translateY(${(1 - getOpacity(scrollFraction, 0.3, 0.5)) * 40}px)`,
              transition: 'opacity 0.1s, transform 0.1s'
            }}>
               <h1 className="text-[var(--color-cream)] text-5xl md:text-8xl font-bold font-gujarati tracking-wider drop-shadow-2xl text-center" style={{ fontFamily: 'var(--font-gujarati)', textShadow: '0 10px 30px rgba(0,0,0,0.8)' }}>
                શ્રેષ્ઠ કેસર કેરી
               </h1>
            </div>

            <div style={{
              position: 'absolute', top: '70%',
              opacity: getOpacity(scrollFraction, 0.6, 0.8),
              transform: `translateY(${(1 - getOpacity(scrollFraction, 0.6, 0.8)) * 20}px)`,
              transition: 'opacity 0.1s, transform 0.1s'
            }}>
               <p className="text-[var(--color-cream)] text-xl md:text-3xl tracking-[0.2em] uppercase text-center font-light drop-shadow-lg">
                 100% Natural · No Chemicals · Direct from Farm
               </p>
            </div>

            <div style={{
              position: 'absolute', top: '85%',
              opacity: getOpacity(scrollFraction, 0.85, 1),
              transform: `scale(${0.9 + getOpacity(scrollFraction, 0.85, 1) * 0.1})`,
              transition: 'opacity 0.1s, transform 0.1s',
              pointerEvents: scrollFraction > 0.85 ? 'auto' : 'none'
            }}>
               <button className="cta-btn text-xl uppercase tracking-wider px-10 py-5 rounded-full shadow-[0_0_40px_var(--color-saffron-glow)] hover:scale-105 transition-transform duration-300">
                  Order Now
               </button>
            </div>
            
          </div>
        </div>
      </section>

      {/* Sections Below Hero */}
      <div className="relative z-20 bg-[var(--color-earthy-dark)]">
        
        {/* Product Section */}
        <section className="section max-w-7xl mx-auto py-32 px-6">
           <h3 className="section-title text-4xl md:text-6xl font-sans tracking-tight">Experience The Original Taste</h3>
           
           <div className="flex flex-col md:flex-row gap-16 items-center mt-16">
              <div className="w-full md:w-1/2 rounded-2xl overflow-hidden shadow-2xl relative group">
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                 <Image src="/images/kesar_mango_box.png" alt="Premium Kesar Mango Box" width={800} height={600} className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute bottom-6 left-6 z-20">
                     <div className="bg-[var(--color-saffron)] text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-2">Export Quality</div>
                     <h4 className="text-3xl font-bold text-white">10kg Premium Box</h4>
                 </div>
              </div>
              
              <div className="w-full md:w-1/2 space-y-8">
                <p className="text-xl text-gray-400 font-light leading-relaxed">
                  Hand-picked from our family farms in Talala, Gujarat. Every single mango is naturally ripened and checked for the perfect golden-saffron hue. 
                </p>
                <div className="text-5xl font-bold text-[var(--color-cream)]">
                  ₹2,499
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="flex items-center border border-gray-600 rounded-full bg-black/40">
                     <button className="px-6 py-3 text-xl text-var(--color-saffron) hover:text-white transition-colors">-</button>
                     <span className="text-xl font-medium w-6 text-center">1</span>
                     <button className="px-6 py-3 text-xl text-var(--color-saffron) hover:text-white transition-colors">+</button>
                  </div>
                  <button className="cta-btn w-full">Add To Cart</button>
                </div>
              </div>
           </div>
        </section>

        <div className="border-t border-white/5 w-full"></div>

        {/* Story Section */}
        <section className="section max-w-7xl mx-auto py-32 px-6">
          <div className="text-center mb-20">
             <h3 className="text-[var(--color-saffron)] font-semibold tracking-widest uppercase mb-4">Our Process</h3>
             <h4 className="text-4xl md:text-5xl font-sans font-bold text-[var(--color-cream)]">From Talala's Farms to Your Home</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
             <div className="hidden md:block absolute top-[25%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-saffron)] to-transparent opacity-20"></div>
             
             {/* Farm */}
             <div className="flex flex-col items-center text-center group z-10">
                <div className="w-24 h-24 rounded-full bg-[#1A1100] border border-[var(--color-saffron)] flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,107,0,0.15)] group-hover:scale-110 group-hover:shadow-[0_0_50px_rgba(255,107,0,0.3)] transition-all duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-saffron)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20h2"/><path d="M12 20v-5"/><path d="M12 15c-3-3-5-6-5-9c0-3.3 2.7-6 6-6s6 2.7 6 6c0 3-2 6-5 9"/></svg>
                </div>
                <h5 className="text-2xl font-bold text-white mb-4">1. Harvested in Talala</h5>
                <p className="text-gray-400 font-light leading-relaxed">Grown with love in the rich, fertile soils of Talala, the true home of Kesar mangoes.</p>
             </div>

             {/* Pack */}
             <div className="flex flex-col items-center text-center group z-10">
                <div className="w-24 h-24 rounded-full bg-[#1A1100] border border-[var(--color-saffron)] flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,107,0,0.15)] group-hover:scale-110 group-hover:shadow-[0_0_50px_rgba(255,107,0,0.3)] transition-all duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-saffron)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12.05 20.71 7"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                </div>
                <h5 className="text-2xl font-bold text-white mb-4">2. Carefully Packed</h5>
                <p className="text-gray-400 font-light leading-relaxed">Hand-sorted and gently placed in eco-friendly protective packaging to prevent any bruising.</p>
             </div>

             {/* Deliver */}
             <div className="flex flex-col items-center text-center group z-10">
                <div className="w-24 h-24 rounded-full bg-[#1A1100] border border-[var(--color-saffron)] flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,107,0,0.15)] group-hover:scale-110 group-hover:shadow-[0_0_50px_rgba(255,107,0,0.3)] transition-all duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-saffron)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/><path d="M15 21V9"/></svg>
                </div>
                <h5 className="text-2xl font-bold text-white mb-4">3. Delivered Fresh</h5>
                <p className="text-gray-400 font-light leading-relaxed">Direct from the farm to your doorstep within days, preserving the natural aroma and sweetness.</p>
             </div>
          </div>
        </section>

        <div className="border-t border-white/5 w-full"></div>

        {/* Features Section */}
        <section className="section max-w-7xl mx-auto py-24 px-6">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#15100B] p-10 rounded-3xl hover:bg-[#1A1410] transition-colors border border-white/5">
                 <h5 className="text-2xl font-bold text-[var(--color-saffron)] mb-3">100% Natural</h5>
                 <p className="text-gray-400 font-light">No artificial ripening agents. Allowed to mature perfectly on the tree for the authentic Kesar taste.</p>
              </div>
              <div className="bg-[#15100B] p-10 rounded-3xl hover:bg-[#1A1410] transition-colors border border-white/5">
                 <h5 className="text-2xl font-bold text-[var(--color-saffron)] mb-3">No Preservatives</h5>
                 <p className="text-gray-400 font-light">Completely chemical-free. What you eat is purely what nature intended, packed with healthy nutrients.</p>
              </div>
              <div className="bg-[#15100B] p-10 rounded-3xl hover:bg-[#1A1410] transition-colors border border-white/5">
                 <h5 className="text-2xl font-bold text-[var(--color-saffron)] mb-3">Gift Packaging Available</h5>
                 <p className="text-gray-400 font-light">Surprise your loved ones with a premium gift box. Elegant presentation perfect for corporate or family gifting.</p>
              </div>
           </div>
        </section>

        {/* Footer */}
        <footer className="bg-black py-16 px-6 border-t border-white/10">
           <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                  <h2 className="text-2xl font-gujarati text-[var(--color-saffron)] mb-2" style={{ fontFamily: 'var(--font-gujarati)' }}>તલાળા કેસરિયા</h2>
                  <p className="text-gray-500 font-light max-w-sm">Authentic farm-fresh Kesar mangoes from the heart of Talala, Gujarat.</p>
              </div>
              
              <ul className="flex gap-8 text-gray-400 font-medium">
                 <li><a href="#" className="hover:text-[var(--color-saffron)] transition-colors">Shop</a></li>
                 <li><a href="#" className="hover:text-[var(--color-saffron)] transition-colors">Our Story</a></li>
                 <li><a href="#" className="hover:text-[var(--color-saffron)] transition-colors">Contact</a></li>
              </ul>
           </div>
           
           <div className="max-w-7xl mx-auto mt-16 text-center text-gray-600 text-sm">
             &copy; {new Date().getFullYear()} Talala Kesariya. All rights reserved. Let's grow naturally, together.
           </div>
        </footer>
        
      </div>
    </main>
  );
}
