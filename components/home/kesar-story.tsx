"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

// SVG Icons
function CrownMangoIcon() {
  return (
    <svg viewBox="0 0 200 280" className="w-48 h-64 md:w-64 md:h-80">
      {/* Crown */}
      <path
        d="M60 80 L100 40 L140 80 L130 80 L100 55 L70 80 Z"
        fill="none"
        stroke="#E8820C"
        strokeWidth="2"
      />
      <circle cx="60" cy="80" r="4" fill="#E8820C" />
      <circle cx="100" cy="40" r="4" fill="#E8820C" />
      <circle cx="140" cy="80" r="4" fill="#E8820C" />
      
      {/* Mango silhouette */}
      <ellipse
        cx="100"
        cy="170"
        rx="55"
        ry="75"
        fill="none"
        stroke="#E8820C"
        strokeWidth="2"
      />
      <path
        d="M100 95 Q110 85 115 75"
        fill="none"
        stroke="#E8820C"
        strokeWidth="2"
      />
    </svg>
  )
}

function GujaratMapIcon() {
  return (
    <svg viewBox="0 0 300 250" className="w-64 h-56 md:w-80 md:h-64">
      {/* Simplified Gujarat outline */}
      <path
        d="M150 20 
           C180 25, 220 40, 250 70
           C270 100, 280 140, 260 180
           C240 210, 200 230, 150 235
           C100 230, 60 210, 40 180
           C20 140, 30 100, 50 70
           C80 40, 120 25, 150 20Z"
        fill="none"
        stroke="#E8820C"
        strokeWidth="1.5"
        opacity="0.6"
      />
      
      {/* Talala Gir location - pulsing dot */}
      <motion.circle
        cx="120"
        cy="160"
        r="8"
        fill="#E8820C"
        animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <circle cx="120" cy="160" r="3" fill="#FFF8E7" />
    </svg>
  )
}

function GIBadgeIcon() {
  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64">
      {/* Rotating outer ring */}
      <motion.svg
        viewBox="0 0 200 200"
        className="w-full h-full absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="#E8820C"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <defs>
          <path
            id="circlePath"
            d="M100,100 m-75,0 a75,75 0 1,1 150,0 a75,75 0 1,1 -150,0"
          />
        </defs>
        <text fill="#A89880" fontSize="8" letterSpacing="2">
          <textPath href="#circlePath">
            GOVERNMENT OF INDIA · GEOGRAPHICAL INDICATION · PROTECTED ·
          </textPath>
        </text>
      </motion.svg>
      
      {/* Static inner content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="text-[#E8820C] text-xs tracking-widest mb-1">CERTIFIED</div>
          <div className="text-[#FFF8E7] text-2xl md:text-3xl font-bold">GI No. 185</div>
          <div className="text-[#A89880] text-xs mt-1">Since 2011</div>
        </div>
      </div>
    </div>
  )
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 80 80" className="w-16 h-16 md:w-20 md:h-20">
      <ellipse cx="40" cy="40" rx="30" ry="18" fill="none" stroke="#E8820C" strokeWidth="2" />
      <circle cx="40" cy="40" r="10" fill="none" stroke="#E8820C" strokeWidth="2" />
      <circle cx="40" cy="40" r="4" fill="#E8820C" />
    </svg>
  )
}

function NoseIcon() {
  return (
    <svg viewBox="0 0 80 80" className="w-16 h-16 md:w-20 md:h-20">
      <path
        d="M40 15 Q30 35, 25 55 Q30 65, 40 65 Q50 65, 55 55 Q50 35, 40 15"
        fill="none"
        stroke="#E8820C"
        strokeWidth="2"
      />
      <path d="M20 25 Q15 20, 20 15" fill="none" stroke="#E8820C" strokeWidth="1.5" opacity="0.6" />
      <path d="M60 25 Q65 20, 60 15" fill="none" stroke="#E8820C" strokeWidth="1.5" opacity="0.6" />
      <path d="M15 35 Q10 30, 15 25" fill="none" stroke="#E8820C" strokeWidth="1.5" opacity="0.4" />
      <path d="M65 35 Q70 30, 65 25" fill="none" stroke="#E8820C" strokeWidth="1.5" opacity="0.4" />
    </svg>
  )
}

function TongueIcon() {
  return (
    <svg viewBox="0 0 80 80" className="w-16 h-16 md:w-20 md:h-20">
      <path
        d="M25 20 Q40 15, 55 20 Q60 35, 55 55 Q40 70, 40 70 Q40 70, 25 55 Q20 35, 25 20"
        fill="none"
        stroke="#E8820C"
        strokeWidth="2"
      />
      <path d="M40 30 L40 50" fill="none" stroke="#E8820C" strokeWidth="1.5" />
      <path
        d="M40 55 Q35 62, 40 68 Q45 62, 40 55"
        fill="#E8820C"
        opacity="0.6"
      />
    </svg>
  )
}

function BrainIcon() {
  return (
    <svg viewBox="0 0 40 40" className="w-8 h-8">
      <circle cx="15" cy="15" r="8" fill="none" stroke="#E8820C" strokeWidth="1.5" />
      <circle cx="25" cy="15" r="8" fill="none" stroke="#E8820C" strokeWidth="1.5" />
      <circle cx="20" cy="25" r="8" fill="none" stroke="#E8820C" strokeWidth="1.5" />
    </svg>
  )
}

function ShieldBrokenIcon() {
  return (
    <svg viewBox="0 0 40 40" className="w-8 h-8">
      <path
        d="M20 5 L35 10 L35 20 Q35 32, 20 38 Q5 32, 5 20 L5 10 Z"
        fill="none"
        stroke="#E8820C"
        strokeWidth="1.5"
      />
      <path d="M12 15 L28 28" stroke="#E8820C" strokeWidth="1.5" />
    </svg>
  )
}

function WarningIcon() {
  return (
    <svg viewBox="0 0 40 40" className="w-8 h-8">
      <path
        d="M20 5 L37 35 L3 35 Z"
        fill="none"
        stroke="#E8820C"
        strokeWidth="1.5"
      />
      <line x1="20" y1="15" x2="20" y2="25" stroke="#E8820C" strokeWidth="2" />
      <circle cx="20" cy="30" r="1.5" fill="#E8820C" />
    </svg>
  )
}

// Frame component
function Frame({ 
  children, 
  number,
  className = ""
}: { 
  children: React.ReactNode
  number: string
  className?: string
}) {
  return (
    <div 
      className={`w-screen h-full flex-shrink-0 relative overflow-hidden ${className}`}
      style={{ backgroundColor: "#0A0805" }}
    >
      {/* Background number */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span 
          className="text-[200px] md:text-[400px] font-bold leading-none opacity-[0.03]"
          style={{ color: "#E8820C" }}
        >
          {number}
        </span>
      </div>
      <div className="relative z-10 h-full w-full max-w-6xl mx-auto px-8 md:px-16 py-12 flex flex-col justify-center">
        {children}
      </div>
    </div>
  )
}

// Frame 01: Origin - Born in 1931
function Frame01() {
  return (
    <Frame number="01">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 h-full">
        <div className="flex-1 md:w-[60%] border-l-2 border-[#E8820C] pl-6 md:pl-8">
          <span className="text-[#E8820C] text-sm tracking-widest">૦૧ / શરૂઆત</span>
          
          <h2 className="text-3xl md:text-5xl font-light text-[#FFF8E7] leading-tight mt-4 font-serif">
            એક ડાઘિયા કેરીએ નવાબ ને ઘેલો કર્યો.
          </h2>
          
          <p className="text-base md:text-lg text-[#A89880] max-w-xl leading-relaxed mt-6">
            સન ૧૯૩૧ ની વાત સે. જૂનાગઢ ના વઝીર સાલે ભાઈ એ વાંથળી માં એક અજીબ ઝાડ જોયું. 
            ફળ ચાખ્યું — આંખો બંધ થઈ ગઈ. નવાબ મહોબત ખાન ને ખવડાવ્યું, 
            ઈ બોલ્યા — &apos;આ તો કેસર સે, ભઈ!&apos; બસ, નામ પડી ગ્યું. ઈ દી થી આજ સુધી.
          </p>
          
          <span className="text-sm text-[#A89880] opacity-60 mt-8 block">વાંથળી, જૂનાગઢ · ૧૯૩૧</span>
        </div>
        
        <div className="md:w-[40%] flex flex-col items-center justify-center">
          <CrownMangoIcon />
          <span className="text-6xl md:text-8xl font-serif text-[#E8820C] opacity-80 mt-4">૧૯૩૧</span>
        </div>
      </div>
    </Frame>
  )
}

// Frame 02: The Sacred Land
function Frame02() {
  return (
    <Frame number="02">
      <div className="flex flex-col items-center justify-center text-center h-full">
        <span className="text-[#E8820C] text-sm tracking-widest">૦૨ / ધરતી</span>
        
        <h2 className="text-3xl md:text-5xl font-light text-[#FFF8E7] leading-tight mt-4 font-serif max-w-3xl">
          ગીરની માટી માં સે એ વાત, બીજે ક્યાંય નો મળે, ભઈ.
        </h2>
        
        <p className="text-base md:text-lg text-[#A89880] max-w-2xl leading-relaxed mt-6">
          ગિરનાર ના પડછાયા માં, સૌરાષ્ટ્ર ની કડકડતી ગરમી માં — આ ધરતી નો સ્વાદ કેરી ની અંદર ઉતરે સે. 
          તળાળા ગીર ની ખારી-મીઠી હવા, કાળી માટી — આ combination દુનિયા ભર માં બીજે ક્યાંય નથ.
        </p>
        
        <div className="mt-10">
          <GujaratMapIcon />
          <p className="text-sm text-[#A89880] mt-2">તળાળા ગીર · ૨૦,૦૦૦ હેક્ટર</p>
        </div>
      </div>
    </Frame>
  )
}

// Frame 03: GI Certification
function Frame03() {
  return (
    <Frame number="03">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 h-full">
        <div className="flex-1 md:w-[55%] border-l-2 border-[#E8820C] pl-6 md:pl-8">
          <span className="text-[#E8820C] text-sm tracking-widest">૦૩ / ઓળખ</span>
          
          <h2 className="text-3xl md:text-5xl font-light text-[#FFF8E7] leading-tight mt-4 font-serif">
            સરકારે સિક્કો માર્યો — આ કેસર અસલી સે.
          </h2>
          
          <p className="text-base md:text-lg text-[#A89880] max-w-xl leading-relaxed mt-6">
            ૨૦૧૧ માં ભારત સરકારે GI Tag આપ્યો — નંબર ૧૮૫. ગુજરાત નો પે&apos;લો ખેત ઉત્પાદન, 
            ને આખા ભારત ની બીજી કેરી જેને આ સન્માન મળ્યું. હવે કાયદેસર — &apos;ગીર કેસર&apos; નું નામ 
            ફક્ત તળાળા ની કેરી ને જ વાપરી શકાય. બીજા ભઈ ગમે ઈ કે&apos;વા દો — અસલ તો આ જ સે.
          </p>
        </div>
        
        <div className="md:w-[45%] flex items-center justify-center">
          <GIBadgeIcon />
        </div>
      </div>
    </Frame>
  )
}

// Frame 04: How to Identify
function Frame04() {
  return (
    <Frame number="04">
      <div className="h-full flex flex-col justify-center">
        <div className="mb-8">
          <span className="text-[#E8820C] text-sm tracking-widest">૦૪ / ઓળખો</span>
          <h2 className="text-2xl md:text-3xl font-light text-[#FFF8E7] leading-tight mt-4 font-serif">
            અસલ કેસર ઓળખવી હોય? ત્રણ વાત યાદ રાખો, ભઈ.
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* SEE Column */}
          <div className="flex flex-col border-t-2 border-[#E8820C] pt-6">
            <EyeIcon />
            <span className="text-[#E8820C] text-xs tracking-widest uppercase mt-4">જુઓ</span>
            <h3 className="text-xl md:text-2xl text-[#FFF8E7] font-light mt-2 font-serif">
              ડાઘા-ટપકા? એ જ અસલ.
            </h3>
            <p className="text-sm text-[#A89880] leading-relaxed mt-3">
              ચળકતી, uniform પીળી કેરી જોઈ ને ખુશ ના થાવ. અસલ કેસર ની છાલ પર કુદરતી ડાઘ હોય, 
              નીચે થી લીલાસ, ઉપર સોનેરી — એ જ સાચી.
            </p>
          </div>
          
          {/* SMELL Column */}
          <div className="flex flex-col border-t-2 border-[#E8820C] pt-6">
            <NoseIcon />
            <span className="text-[#E8820C] text-xs tracking-widest uppercase mt-4">સૂંઘો</span>
            <h3 className="text-xl md:text-2xl text-[#FFF8E7] font-light mt-2 font-serif">
              નાક ક્યારેય જૂઠ ના બોલે.
            </h3>
            <p className="text-sm text-[#A89880] leading-relaxed mt-3">
              હાથ માં લો, ઊંચી કરો — સોડમ આવે? આ&apos;વ વાસ ભઈ, laboratory માં ના બને. 
              ના આવે સોડમ — ઠેલો ભઈ.
            </p>
          </div>
          
          {/* TASTE Column */}
          <div className="flex flex-col border-t-2 border-[#E8820C] pt-6">
            <TongueIcon />
            <span className="text-[#E8820C] text-xs tracking-widest uppercase mt-4">ચાખો</span>
            <h3 className="text-xl md:text-2xl text-[#FFF8E7] font-light mt-2 font-serif">
              ચૂસો ને આંખ બંધ થઈ જાય.
            </h3>
            <p className="text-sm text-[#A89880] leading-relaxed mt-3">
              ગર એટલો ઘટ્ટ કે ચમચી ચઢે. આ&apos;વો ઘટ્ટ, રેસા વગરનો, કેસરિયો ગર — 
              એ ઓળખ સે અસલ કેસર ની.
            </p>
          </div>
        </div>
      </div>
    </Frame>
  )
}

// Frame 05: The Chemical Warning
function Frame05() {
  return (
    <Frame number="05" className="!p-0">
      <div className="flex flex-col md:flex-row h-full w-full max-w-none">
        {/* Left half - danger */}
        <div 
          className="flex-1 p-8 md:p-12 flex flex-col justify-center"
          style={{ backgroundColor: "rgba(26, 8, 5, 0.8)" }}
        >
          <span className="text-red-400/80 text-sm tracking-widest flex items-center gap-2">
            &#9888; બીજા શું કરે
          </span>
          
          <h2 className="text-2xl md:text-3xl font-light text-[#FFF8E7] leading-tight mt-4 font-serif">
            કાર્બાઈડ. બાંધકામ માં વપરાતો chemical.
          </h2>
          
          <p className="text-sm text-[#A89880] leading-relaxed mt-4">
            ઘણા ભઈ લોકો કેરી ને ઝડપ થી પકવવા calcium carbide વાપરે. 
            બ&apos;હાર થી જુઓ — લાગે પાકેલી. અંદર? કાચી ને બેસ્વાદ.
            <br /><br />
            આ chemical માં arsenic ને phosphorus ભળ્યાં હોય. ખાઓ તો ધીરે ધીરે શરીર ને 
            અસર કરે — brain, hormones, immunity.
            <br /><br />
            ઘણા દેશો માં ban સે — પણ સસ્તી કેરી માં ચાલ્યા કરે.
          </p>
          
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="flex items-center gap-2 text-xs text-[#A89880]">
              <BrainIcon />
              <span>દિમાગ ને નુકસાન</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#A89880]">
              <ShieldBrokenIcon />
              <span>રોગ સામે નબળા</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#A89880]">
              <WarningIcon />
              <span>ઘણા દેશ માં ગેરકાયદેસર</span>
            </div>
          </div>
        </div>
        
        {/* Right half - safe */}
        <div 
          className="flex-1 p-8 md:p-12 flex flex-col justify-center"
          style={{ backgroundColor: "rgba(20, 12, 0, 0.8)" }}
        >
          <span className="text-[#E8820C] text-sm tracking-widest flex items-center gap-2">
            &#10003; અમે શું કરીએ
          </span>
          
          <h2 className="text-2xl md:text-3xl font-light text-[#FFF8E7] leading-tight mt-4 font-serif">
            કાઈ નઈ. બસ તડકો ને ટેમ.
          </h2>
          
          <p className="text-sm text-[#A89880] leading-relaxed mt-4">
            અમારી કેરી તળાળા ગીર ની ખેતર માં થી સાચ્ચા ટેમ પર ઉતારીએ.
            <br /><br />
            ઘરે આવે, ૪-૫ દી રૂમ temperature પર રે&apos;વા દો — કુદરત પોતે જ પકવે.
            <br /><br />
            કોઈ gas નઈ. કોઈ chemical નઈ. કોઈ ઉતાવળ નઈ.
            <br /><br />
            &apos;ભઈ, ટેમ લાગે — પણ મઝા આવે.&apos;
          </p>
          
          <div className="mt-6 inline-flex items-center gap-2 text-xs text-[#E8820C] border border-[#E8820C]/30 px-3 py-2 rounded-full w-fit">
            100% Carbide-Free · FSSAI Certified
          </div>
        </div>
      </div>
    </Frame>
  )
}

// Frame 06: The Season
function Frame06() {
  const months = [
    { name: "જાન", active: false },
    { name: "ફેબ", active: false },
    { name: "માર", active: false },
    { name: "એપ", active: false },
    { name: "મે", active: false },
    { name: "જૂન", active: true, label: "સિઝન શરૂ" },
    { name: "જુલ", active: true, label: "સૌ'થી મઝ્ઝા" },
    { name: "ઑગ", active: false },
    { name: "સેપ", active: false },
    { name: "ઑક્ટ", active: false },
    { name: "નવ", active: false },
    { name: "ડિ", active: false },
  ]

  return (
    <Frame number="06">
      <div className="h-full flex flex-col justify-center">
        <span className="text-[#E8820C] text-sm tracking-widest">૦૬ / સિઝન</span>
        
        <h2 className="text-3xl md:text-4xl font-light text-[#FFF8E7] leading-tight mt-4 font-serif max-w-2xl">
          કુદરત ૬ અઠવાડિયા આપે. અમે ધક્કો ના મારીએ.
        </h2>
        
        <p className="text-base md:text-lg text-[#A89880] max-w-xl leading-relaxed mt-6">
          જૂન-જુલાઈ — બસ આ જ ટેમ. બાકી ના મહિના માં? ના લઈએ, ના વેચીએ. 
          કારણ? ઈ ટેમ ની કેરી — ઈ કેરી.
        </p>
        
        {/* Calendar */}
        <div className="flex flex-wrap gap-2 md:gap-3 mt-10">
          {months.map((month) => (
            <div key={month.name} className="flex flex-col items-center">
              <div 
                className={`px-3 py-2 md:px-4 md:py-3 rounded-full text-sm md:text-base transition-all ${
                  month.active 
                    ? "bg-[#E8820C] text-[#0A0805] shadow-lg shadow-[#E8820C]/30" 
                    : "bg-[#1A1510] text-[#A89880]/50"
                }`}
              >
                {month.name}
              </div>
              {month.label && (
                <span className="text-[10px] text-[#E8820C] mt-1">{month.label}</span>
              )}
            </div>
          ))}
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 mt-10">
          <div className="text-center md:text-left">
            <div className="text-2xl md:text-3xl text-[#FFF8E7] font-light">૬ અઠવાડિયા</div>
            <div className="text-xs text-[#A89880] mt-1">અમારી આખી સિઝન</div>
          </div>
          <div className="text-center md:text-left">
            <div className="text-2xl md:text-3xl text-[#FFF8E7] font-light">શૂન્ય</div>
            <div className="text-xs text-[#A89880] mt-1">chemical. ક્યારેય નઈ.</div>
          </div>
          <div className="text-center md:text-left">
            <div className="text-2xl md:text-3xl text-[#FFF8E7] font-light">૧૯૩૧ થી</div>
            <div className="text-xs text-[#A89880] mt-1">અસલ કેસર ની ઓળખ</div>
          </div>
        </div>
        
        <p className="text-sm text-[#A89880]/60 italic mt-8">
          ડિસેમ્બર માં કેસર વેચે? પૂછો — ક્યાં થી આવી, ભઈ?
        </p>
        
        <button 
          onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
          className="mt-8 px-8 py-4 bg-[#E8820C] text-[#0A0805] font-medium rounded-full hover:bg-[#F59E0B] transition-colors w-fit"
        >
          Order This Season&apos;s Box &rarr;
        </button>
      </div>
    </Frame>
  )
}

// Inner component that uses useScroll - only rendered after mounting
function KesarStoryContent() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-500vw"])
  return (
    <section ref={containerRef} className="relative h-[600vh]" style={{ backgroundColor: "#0A0805" }}>
      {/* Sticky title */}
      <div className="sticky top-0 left-0 z-20 p-6 md:p-8 pointer-events-none">
        <span className="text-[#E8820C] text-sm tracking-[0.3em] uppercase">The Kesar Story</span>
      </div>
      
      {/* Horizontal scroll container */}
      <div className="sticky top-0 h-screen overflow-hidden" style={{ marginTop: "-56px" }}>
        <motion.div 
          style={{ x }}
          className="flex h-full"
        >
          <Frame01 />
          <Frame02 />
          <Frame03 />
          <Frame04 />
          <Frame05 />
          <Frame06 />
        </motion.div>
      </div>
      
      {/* Progress dots */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: "#E8820C",
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              delay: i * 0.1,
              repeat: Infinity,
            }}
          />
        ))}
      </div>
    </section>
  )
}

// Main component with hydration-safe pattern
export function KesarStory() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <section className="h-screen flex items-center justify-center" style={{ backgroundColor: "#0A0805" }}>
        <div className="w-12 h-12 border-2 border-[#E8820C] border-t-transparent rounded-full animate-spin" />
      </section>
    )
  }

  return <KesarStoryContent />
}
