'use client';
export default function HeroSection() {
  return (
    <>
      <section id="home" className="hero">
        <div className="hero-atm" aria-hidden="true" />

        <div className="hero-mountains" aria-hidden="true">
          <svg viewBox="0 0 1440 420" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMax slice">
            <defs>
              <filter id="mblur1"><feGaussianBlur stdDeviation="6"/></filter>
              <filter id="mblur2"><feGaussianBlur stdDeviation="3"/></filter>
              <filter id="mblur3"><feGaussianBlur stdDeviation="1.2"/></filter>
              <linearGradient id="mtn1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1E2410" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#111509" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="mtn2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#222814" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#111509" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="mtn3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2A3018" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#111509" stopOpacity="1" />
              </linearGradient>
            </defs>

            <path
              d="M0 420 L0 260 Q80 200 160 230 Q240 260 320 180 Q400 100 480 160 Q560 220 640 140 Q720 60 800 130 Q880 200 960 150 Q1040 100 1120 170 Q1200 240 1280 190 Q1360 140 1440 200 L1440 420Z"
              fill="url(#mtn1)"
              filter="url(#mblur1)"
            />
            <path
              d="M0 420 L0 300 Q100 240 200 270 Q300 300 400 220 Q480 160 560 210 Q640 260 720 190 Q800 120 880 180 Q960 240 1040 200 Q1120 160 1200 220 Q1320 280 1440 240 L1440 420Z"
              fill="url(#mtn2)"
              filter="url(#mblur2)"
            />
            <path
              d="M0 420 L0 340 Q120 290 240 320 Q340 345 440 290 Q520 250 600 280 Q680 310 760 270 Q840 230 920 270 Q1000 310 1100 285 Q1220 258 1340 300 Q1400 320 1440 310 L1440 420Z"
              fill="url(#mtn3)"
              filter="url(#mblur3)"
            />
            <g opacity="0.6">
              <path d="M95 420 Q100 360 108 310 Q114 270 118 240" stroke="#1A1C0E" strokeWidth="7" fill="none" strokeLinecap="round" />
              <path d="M118 240 Q90 210 65 200" stroke="#1E2210" strokeWidth="5" fill="none" strokeLinecap="round" />
              <path d="M118 240 Q100 205 88 185" stroke="#1E2210" strokeWidth="4.5" fill="none" strokeLinecap="round" />
              <path d="M118 240 Q112 200 112 175" stroke="#1E2210" strokeWidth="4.5" fill="none" strokeLinecap="round" />
              <path d="M118 240 Q128 202 138 188" stroke="#1E2210" strokeWidth="4.5" fill="none" strokeLinecap="round" />
              <path d="M118 240 Q140 215 160 210" stroke="#1E2210" strokeWidth="5" fill="none" strokeLinecap="round" />
              <path d="M118 240 Q148 225 165 228" stroke="#1E2210" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M65 200 Q52 210 42 218" stroke="#1E2210" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M88 185 Q78 196 70 206" stroke="#1E2210" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M138 188 Q148 200 152 212" stroke="#1E2210" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M160 210 Q172 218 178 226" stroke="#1E2210" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </g>
            <g opacity="0.35" transform="translate(-15,25)">
              <path d="M55 420 Q58 370 62 330 Q65 300 68 275" stroke="#161808" strokeWidth="5" fill="none" strokeLinecap="round" />
              <path d="M68 275 Q50 252 34 246" stroke="#161808" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M68 275 Q56 248 50 232" stroke="#161808" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              <path d="M68 275 Q68 242 70 222" stroke="#161808" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              <path d="M68 275 Q82 248 90 238" stroke="#161808" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              <path d="M68 275 Q90 262 102 260" stroke="#161808" strokeWidth="4" fill="none" strokeLinecap="round" />
            </g>
            <g opacity="0.55">
              <path d="M1340 420 Q1334 362 1328 315 Q1322 275 1318 248" stroke="#1A1C0E" strokeWidth="7" fill="none" strokeLinecap="round" />
              <path d="M1318 248 Q1296 222 1275 215" stroke="#1E2210" strokeWidth="5" fill="none" strokeLinecap="round" />
              <path d="M1318 248 Q1306 218 1300 200" stroke="#1E2210" strokeWidth="4.5" fill="none" strokeLinecap="round" />
              <path d="M1318 248 Q1318 212 1318 192" stroke="#1E2210" strokeWidth="4.5" fill="none" strokeLinecap="round" />
              <path d="M1318 248 Q1332 215 1342 202" stroke="#1E2210" strokeWidth="4.5" fill="none" strokeLinecap="round" />
              <path d="M1318 248 Q1345 225 1365 220" stroke="#1E2210" strokeWidth="5" fill="none" strokeLinecap="round" />
              <path d="M1318 248 Q1350 236 1370 238" stroke="#1E2210" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M1275 215 Q1260 226 1250 234" stroke="#1E2210" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M1300 200 Q1290 212 1284 222" stroke="#1E2210" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M1342 202 Q1352 214 1356 226" stroke="#1E2210" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M1365 220 Q1378 228 1384 238" stroke="#1E2210" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </g>
            <ellipse cx="720" cy="420" rx="800" ry="30" fill="#1A1E0E" opacity="0.5" />
          </svg>
        </div>

        <div className="hero-mango" aria-hidden="true">
          <svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
            <defs>
              <radialGradient id="mangoFill" cx="50%" cy="35%" r="55%">
                <stop offset="0%" stopColor="#F5C842" />
                <stop offset="40%" stopColor="#E8A020" />
                <stop offset="100%" stopColor="#C46A08" />
              </radialGradient>
              <radialGradient id="mangoSkin" cx="50%" cy="35%" r="60%">
                <stop offset="0%" stopColor="#4A8A1A" />
                <stop offset="60%" stopColor="#2E6010" />
                <stop offset="100%" stopColor="#1A3A08" />
              </radialGradient>
            </defs>
            <path d="M100 20 C135 22 160 70 158 120 C156 170 130 215 90 220 C50 215 22 170 20 118 C18 65 64 18 100 20Z" fill="url(#mangoSkin)" />
            <path d="M92 24 C82 32 76 48 78 64 C82 82 98 98 118 106 C120 94 110 60 92 24Z" fill="rgba(232,130,12,0.45)" />
            <ellipse cx="128" cy="22" rx="16" ry="8" fill="#2E6010" transform="rotate(24 128 22)" />
            <ellipse cx="110" cy="28" rx="42" ry="16" fill="#E8820C" opacity="0.2" />
          </svg>
        </div>

        <div className="hero-lions" aria-hidden="true">
          <svg viewBox="0 0 1440 300" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMax meet">
            <path d="M0 245 C120 205 240 220 380 225 C520 230 660 210 780 215 C900 220 1040 205 1160 220 C1280 235 1380 228 1440 230 L1440 300 L0 300Z" fill="rgba(12,14,8,0.9)" />
            <path d="M80 255 C156 235 236 240 320 243 C404 246 500 238 600 239 C700 240 796 232 880 235 C964 238 1040 233 1120 240 C1200 247 1280 244 1360 246 L1360 280 L80 280Z" fill="rgba(18,20,16,0.7)" />
          </svg>
        </div>

        <div className="hero-ground" aria-hidden="true" />

        <div className="hero-text">
          <div className="hero-tagline-top">Talala · Gir Forest · Gujarat</div>

          <div className="hero-headline">
            <span className="headline-gu">તાલાલા</span>
            <span className="headline-en">Kesariya</span>
          </div>

          <div className="hero-ornament">
            <div className="ornament-line" />
            <span className="ornament-star">✦</span>
          </div>
        </div>

        <div className="scroll-cue" aria-hidden="true">
          <span className="scroll-text">Scroll</span>
          <div className="scroll-line" />
        </div>

        <div className="hero-badges">
          <div className="badge-item">
            <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            </svg>
            <div className="badge-text">
              <span className="badge-title">Single Origin</span>
              <span className="badge-sub">Gir Forest</span>
            </div>
          </div>
          <div className="badge-item">
            <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M12 2C6 2 3 8 3 13c0 5 4 9 9 9s9-4 9-9C21 8 18 2 12 2z" />
              <path d="M12 22V12M12 12C10 10 7 10 6 11M12 12c2-2 5-2 6-1" />
            </svg>
            <div className="badge-text">
              <span className="badge-title">Sustainably Grown</span>
              <span className="badge-sub">Zero Chemicals</span>
            </div>
          </div>
          <div className="badge-item">
            <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 3" />
            </svg>
            <div className="badge-text">
              <span className="badge-title">Limited Harvest</span>
              <span className="badge-sub">May · Jun · Jul</span>
            </div>
          </div>
          <div className="badge-item">
            <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6L12 2z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
            <div className="badge-text">
              <span className="badge-title">Trusted by</span>
              <span className="badge-sub">Generations</span>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero {
          position: relative;
          width: 100%;
          min-height: 100svh;
          overflow: hidden;
          background: #111509;
          color: #F0E6C8;
          font-family: 'DM Sans', sans-serif;
        }

        .hero-atm {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 38% 55% at 62% 0%, rgba(190,170,80,0.11) 0%, rgba(190,170,80,0.04) 45%, transparent 70%),
            radial-gradient(ellipse 80% 30% at 50% 72%, rgba(140,120,40,0.07) 0%, transparent 65%),
            linear-gradient(170deg, #131708 0%, #181D0C 40%, #111509 70%, #0C0F07 100%);
          z-index: 1;
          pointer-events: none;
        }

        .hero-mountains {
          position: absolute;
          bottom: 18%;
          left: 0;
          right: 0;
          height: 45%;
          z-index: 2;
          pointer-events: none;
        }

        .hero-mango {
          position: absolute;
          top: -4%;
          right: -2%;
          width: 52%;
          max-width: 620px;
          z-index: 6;
          will-change: transform;
          transform-origin: 37% 18%;
          animation: mangoSway 5s cubic-bezier(0.37,0,0.63,1) infinite;
          mix-blend-mode: lighten;
          filter: brightness(1.05) contrast(1.08);
        }

        .hero-mango svg {
          display: block;
          width: 100%;
          height: auto;
        }

        .hero-lions {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 42%;
          z-index: 7;
          pointer-events: none;
          opacity: 0.92;
        }

        .hero-ground {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 22%;
          z-index: 8;
          background: linear-gradient(to top, #080A05 0%, #0C0F07 50%, transparent 100%);
          pointer-events: none;
        }

        .hero-text {
          position: absolute;
          top: 50%;
          left: 4.5rem;
          transform: translateY(-50%);
          z-index: 10;
          width: min(42rem, calc(100% - 6rem));
        }

        .hero-tagline-top {
          font-size: 0.65rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #C8A84B;
          opacity: 0.75;
          margin-bottom: 1.4rem;
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
        }

        .hero-tagline-top::before {
          content: '';
          width: 22px;
          height: 1px;
          background: #C8A84B;
          opacity: 0.6;
          display: block;
        }

        .hero-headline {
          display: flex;
          flex-direction: column;
          gap: 0;
          margin-bottom: 1.6rem;
        }

        .headline-gu {
          font-family: 'Noto Serif Gujarati', serif;
          font-size: clamp(4.2rem, 7.5vw, 7.2rem);
          font-weight: 900;
          line-height: 0.92;
          letter-spacing: -0.01em;
          background: linear-gradient(160deg, #E8D080 0%, #C8A848 30%, #D4B858 55%, #A07828 75%, #C8A848 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 2px 24px rgba(200,168,72,0.18));
        }

        .headline-en {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3.6rem, 6.5vw, 6.2rem);
          font-weight: 300;
          font-style: italic;
          line-height: 1.0;
          letter-spacing: 0.01em;
          background: linear-gradient(160deg, #E8D080 0%, #C8A848 35%, #B89038 60%, #C8A848 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 2px 20px rgba(200,168,72,0.14));
        }

        .hero-ornament {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.8rem;
          opacity: 0.55;
        }

        .ornament-line {
          width: 110px;
          height: 1px;
          background: linear-gradient(to right, #C8A84B, transparent);
        }

        .ornament-star {
          color: #C8A84B;
          font-size: 0.9rem;
          line-height: 1;
        }

        .scroll-cue {
          position: absolute;
          bottom: 5.5rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 15;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          opacity: 0.9;
        }

        .scroll-text {
          font-size: 0.58rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #7A7A5A;
        }

        .scroll-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, #7A7A5A, transparent);
          animation: scrollPulse 2.4s ease-in-out infinite;
        }

        .hero-badges {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 20;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          border-top: 1px solid rgba(200,168,72,0.12);
          background: rgba(11,14,7,0.82);
          backdrop-filter: blur(8px);
        }

        .badge-item {
          display: flex;
          align-items: center;
          gap: 0.9rem;
          padding: 1.1rem 2rem;
          border-right: 1px solid rgba(200,168,72,0.1);
          transition: background 0.3s ease;
        }

        .badge-item:last-child {
          border-right: none;
        }

        .badge-item:hover {
          background: rgba(200,168,72,0.04);
        }

        .badge-icon {
          flex-shrink: 0;
          width: 22px;
          height: 22px;
          color: #C8A84B;
          opacity: 0.7;
        }

        .badge-text {
          display: grid;
        }

        .badge-title {
          font-size: 0.68rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #F0E6C8;
          line-height: 1.2;
        }

        .badge-sub {
          font-size: 0.6rem;
          letter-spacing: 0.08em;
          color: #7A7A5A;
          margin-top: 0.15rem;
        }

        @keyframes mangoSway {
          0% { transform: rotate(-2.5deg); }
          25% { transform: rotate(0deg); }
          50% { transform: rotate(2.5deg); }
          75% { transform: rotate(0deg); }
          100% { transform: rotate(-2.5deg); }
        }

        @keyframes scrollPulse {
          0% { transform: scaleY(0); transform-origin: top; opacity: 0; }
          45% { transform: scaleY(1); transform-origin: top; opacity: 1; }
          80% { transform: scaleY(1); transform-origin: bottom; opacity: 1; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
        }

        @media (max-width: 768px) {
          .hero-text {
            left: 1.75rem;
            width: calc(100% - 3.5rem);
          }

          .hero-mango {
            width: 65%;
            right: -10%;
            top: -8%;
          }

          .hero-mountains {
            height: 34%;
          }

          .hero-ground {
            height: 28%;
          }

          .hero-badges {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}
