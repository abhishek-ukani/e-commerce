"use client";
import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const beats = [
  {
    id: 1,
    num: '01',
    title: <>શરૂઆત —<br /><em className="not-italic text-primary">૧૯૩૧</em></>,
    subtitle: 'Born in the gardens of the Nawab',
    desc: 'સન ૧૯૩૧ ની વાત સે. જૂનાગઢ ના વઝીર સાલેભાઈ એ વંથલી માં એક અજીબ ઝાડ જોયું. ફળ ચાખ્યું — આંખો બંધ થઈ ગઈ. નવાબ મહોબત ખાન ને ખવડાવ્યું, ઈ બોલ્યા — \'આ તો કેસર સે, ભઈ!\' બસ, નામ પડી ગ્યું. ઈ દી થી આજ સુધી.',
    visual: (
      <svg viewBox="0 0 200 280" className="w-56 h-72 md:w-80 md:h-96 relative z-10">
        {/* Crown */}
        <path d="M60 80 L100 40 L140 80 L130 80 L100 55 L70 80 Z" fill="none" stroke="#E8820C" strokeWidth="2" opacity="0.8" />
        <circle cx="60" cy="80" r="4" fill="#E8820C" opacity="0.8" />
        <circle cx="100" cy="40" r="4" fill="#E8820C" opacity="0.8" />
        <circle cx="140" cy="80" r="4" fill="#E8820C" opacity="0.8" />
        {/* Mango silhouette */}
        <ellipse cx="100" cy="170" rx="55" ry="75" fill="none" stroke="#E8820C" strokeWidth="2" opacity="0.4" />
        <path d="M100 95 Q110 85 115 75" fill="none" stroke="#E8820C" strokeWidth="2" opacity="0.8" />
        <text x="100" y="180" textAnchor="middle" fill="#E8820C" fontSize="24" fontFamily="Cormorant Garamond, serif" fontStyle="italic" opacity="0.3">1931</text>
      </svg>
    )
  },
  {
    id: 2,
    num: '02',
    title: <><em className="not-italic text-primary">ગીર ની</em><br />ધરતી — ખારી</>,
    subtitle: 'The land of Gir — where the soil remembers',
    desc: 'ગિરનાર ના પડછાયા માં, સૌરાષ્ટ્ર ની કડકડતી ગરમી માં — આ ધરતી નો સ્વાદ કેરી ની અંદર ઉતરે સે. તળાળા ગીર ની ખારી-મીઠી હવા, કાળી માટી — આ combination દુનિયા ભર માં બીજે ક્યાંય નથ.',
    visual: (
      <svg viewBox="0 0 480 540" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" className="relative z-10 mix-blend-screen opacity-80">
        {/* Deep soil layers */}
        <rect x="0" y="340" width="480" height="200" fill="#1A1208" opacity="0.9" />
        <rect x="0" y="360" width="480" height="180" fill="#120E06" opacity="0.8" />
        <line x1="0" y1="380" x2="480" y2="380" stroke="#2A1E0A" strokeWidth="0.5" />
        <line x1="0" y1="410" x2="480" y2="410" stroke="#2A1E0A" strokeWidth="0.5" />
        <line x1="0" y1="440" x2="480" y2="440" stroke="#1E1608" strokeWidth="0.5" />
        <ellipse cx="240" cy="345" rx="280" ry="18" fill="#1E1508" opacity="0.8" />
        {/* Roots system */}
        <g stroke="#3A2510" strokeWidth="1.5" fill="none" opacity="0.7">
          <path d="M240 345 L240 520" />
          <path d="M240 370 Q200 390 170 430" />
          <path d="M240 370 Q280 390 310 430" />
          <path d="M240 400 Q180 420 140 470" />
          <path d="M240 400 Q300 420 340 470" />
          <path d="M240 420 Q200 450 180 500" />
          <path d="M240 420 Q280 450 300 500" />
          <path d="M170 430 Q155 450 148 470" strokeWidth="0.8" />
          <path d="M310 430 Q325 450 332 470" strokeWidth="0.8" />
          <path d="M140 470 Q125 490 118 510" strokeWidth="0.6" />
          <path d="M340 470 Q355 490 362 510" strokeWidth="0.6" />
        </g>
        {/* Tree trunk */}
        <rect x="228" y="100" width="24" height="248" rx="4" fill="#2A1A0A" opacity="0.8" />
        <rect x="232" y="120" width="16" height="220" rx="3" fill="#1E1208" opacity="0.6" />
        <g stroke="#2A1A0A" strokeWidth="8" fill="none" strokeLinecap="round">
          <path d="M240 160 Q190 130 150 80" />
          <path d="M240 180 Q290 140 340 90" />
          <path d="M240 220 Q170 200 120 160" />
          <path d="M240 220 Q310 200 360 160" />
          <path d="M240 140 Q240 100 240 60" />
        </g>
        <g opacity="0.75">
          <ellipse cx="145" cy="70" rx="52" ry="36" fill="#1A2E10" />
          <ellipse cx="145" cy="70" rx="38" ry="26" fill="#1E3A12" />
          <ellipse cx="340" cy="78" rx="52" ry="36" fill="#1A2E10" />
          <ellipse cx="340" cy="78" rx="38" ry="26" fill="#1E3A12" />
          <ellipse cx="240" cy="48" rx="58" ry="38" fill="#1E3412" />
          <ellipse cx="240" cy="48" rx="44" ry="28" fill="#223E14" />
          <ellipse cx="112" cy="148" rx="44" ry="30" fill="#1A2E10" />
          <ellipse cx="368" cy="148" rx="44" ry="30" fill="#1A2E10" />
        </g>
        <g transform="translate(210,160)">
          <line x1="30" y1="-5" x2="30" y2="10" stroke="#3A2510" strokeWidth="2" />
          <path d="M30 10 C8 18 0 45 4 68 C8 90 22 105 38 105 C54 105 66 88 66 65 C66 42 58 18 30 10Z" fill="#4A7A18" opacity="0.85" />
          <path d="M30 10 C18 18 12 42 16 65 C20 82 28 95 38 95 C30 80 26 58 30 10Z" fill="#3A6010" opacity="0.5" />
          <ellipse cx="44" cy="75" rx="14" ry="18" fill="#E8820C" opacity="0.3" />
        </g>
      </svg>
    )
  },
  {
    id: 3,
    num: '03',
    title: <>સરકારી <em className="not-italic text-primary">સિક્કો</em></>,
    subtitle: 'GI Certified. The true mark of Kesar.',
    desc: '૨૦૧૧ માં ભારત સરકારે GI Tag આપ્યો — નંબર ૧૮૫. ગુજરાત નો પે\'લો ખેત ઉત્પાદન, ને આખા ભારત ની બીજી કેરી જેને આ સન્માન મળ્યું. હવે કાયદેસર — \'ગીર કેસર\' નું નામ ફક્ત તલાળા ની કેરી ને જ વાપરી શકાય. બીજા ભઈ ગમે ઈ કે\'વા દો — અસલ તો આ જ સે.',
    visual: (
      <div className="relative w-56 h-56 md:w-80 md:h-80 z-10">
        <motion.svg viewBox="0 0 200 200" className="w-full h-full absolute inset-0" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
          <circle cx="100" cy="100" r="90" fill="none" stroke="#E8820C" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
          <defs><path id="circlePath" d="M100,100 m-75,0 a75,75 0 1,1 150,0 a75,75 0 1,1 -150,0" /></defs>
          <text fill="#8A7A68" fontSize="8" letterSpacing="2">
            <textPath href="#circlePath">GOVERNMENT OF INDIA · GEOGRAPHICAL INDICATION · PROTECTED ·</textPath>
          </text>
        </motion.svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-center">
            <div className="text-primary text-[0.65rem] md:text-[0.75rem] tracking-[0.2em] mb-1 uppercase font-sans">CERTIFIED</div>
            <div className="text-foreground text-4xl md:text-5xl font-serif font-light">GI-185</div>
            <div className="text-muted-foreground text-[0.65rem] md:text-[0.75rem] uppercase tracking-[0.1em] mt-1 font-sans">Since 2011</div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 4,
    num: '04',
    title: <>કેસર —<br /><em className="not-italic text-primary">અસલ ઓળખ</em></>,
    subtitle: 'Identifying the real Kesar',
    desc: 'અસલ કેસર કેરી ઓળખવાની રીત — ચળકતી ચામડી, ભારે ઠોઠ, ઉપરથી ઘેરો લીલો ને અંદરથી સૂર્ય જેવો પીળો. ન ઉઝરડો, ન ધૂળ, ન ઝેર — બસ ગામ ના ઝાડ ની સ્વચ્છ ખુશ્બૂ. ચૂસો ને આંખ બંધ થઈ જાય. ગર એટલો ઘટ્ટ કે ચમચી ચઢે.',
    visual: (
      <svg viewBox="0 0 480 540" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" className="relative z-10">
        <defs>
          <radialGradient id="fleshGrad" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#F5C842" />
            <stop offset="40%" stopColor="#E8A020" />
            <stop offset="100%" stopColor="#C46A08" />
          </radialGradient>
          <radialGradient id="skinGrad" cx="50%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#4A8A1A" />
            <stop offset="60%" stopColor="#2E6010" />
            <stop offset="100%" stopColor="#1A3A08" />
          </radialGradient>
        </defs>
        {/* Whole mango */}
        <g transform="translate(110,270) rotate(-18)">
          <path d="M0 -120 C-52 -90 -72 -20 -68 50 C-64 115 -32 155 8 155 C48 155 78 112 78 50 C78 -18 55 -90 0 -120Z" fill="url(#skinGrad)" />
          <path d="M-10 -100 C-30 -70 -38 -20 -36 30 C-22 -10 -10 -65 -10 -100Z" fill="white" opacity="0.07" />
          <ellipse cx="18" cy="80" rx="30" ry="45" fill="#E8820C" opacity="0.22" />
          <line x1="0" y1="-120" x2="0" y2="-145" stroke="#3A2510" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="10" cy="-148" rx="14" ry="6" fill="#2E6010" transform="rotate(20 10 -148)" />
        </g>
        {/* Cross section */}
        <g transform="translate(310, 270)">
          <path d="M0 -110 C-48 -82 -65 -18 -62 46 C-58 106 -28 142 8 142 C44 142 72 104 72 46 C72 -18 50 -82 0 -110Z" fill="url(#skinGrad)" opacity="0.9" />
          <path d="M0 -108 C-44 -80 -60 -15 -57 45 C-53 100 -25 135 8 135 C41 135 66 98 66 45 C66 -15 44 -80 0 -108Z" fill="url(#fleshGrad)" />
          <ellipse cx="8" cy="40" rx="18" ry="44" fill="#C46A08" opacity="0.55" />
          <ellipse cx="8" cy="40" rx="12" ry="34" fill="#A85A06" opacity="0.6" />
          <path d="M-50 10 Q-30 5 0 8 Q30 11 58 8" stroke="white" strokeWidth="0.5" fill="none" opacity="0.15" />
          <path d="M-55 30 Q-30 25 8 28 Q40 31 62 28" stroke="white" strokeWidth="0.5" fill="none" opacity="0.12" />
          <path d="M-52 55 Q-25 48 8 52 Q38 56 60 52" stroke="white" strokeWidth="0.5" fill="none" opacity="0.1" />
          <path d="M0 -108 C-44 -80 -60 -15 -57 45 C-53 100 -25 135 8 135" stroke="#E8820C" strokeWidth="1.5" fill="none" opacity="0.3" />
        </g>
        <line x1="240" y1="200" x2="345" y2="150" stroke="#E8820C" strokeWidth="0.5" strokeDasharray="3 5" opacity="0.35" />
        <text x="350" y="146" fontFamily="DM Sans, sans-serif" fontSize="10" fill="#E8820C" opacity="0.6" letterSpacing="1">FLESH</text>
        <line x1="358" y1="310" x2="400" y2="340" stroke="#E8820C" strokeWidth="0.5" strokeDasharray="3 5" opacity="0.35" />
        <text x="406" y="344" fontFamily="DM Sans, sans-serif" fontSize="10" fill="#E8820C" opacity="0.6" letterSpacing="1">SEED</text>
        <line x1="110" y1="180" x2="70" y2="150" stroke="#E8820C" strokeWidth="0.5" strokeDasharray="3 5" opacity="0.35" />
        <text x="12" y="146" fontFamily="DM Sans, sans-serif" fontSize="10" fill="#E8820C" opacity="0.6" letterSpacing="1">SKIN</text>
      </svg>
    )
  },
  {
    id: 5,
    num: '05',
    title: <><em className="not-italic text-primary">ઝેર નહિ —</em><br />બસ સમય</>,
    subtitle: 'No chemicals. Ever. Not one spray.',
    desc: 'ઘણા ભઈ લોકો કેરી ને ઝડપ થી પકવવા calcium carbide વાપરે. બ\'હાર થી જુઓ — લાગે પાકેલી. અંદર? કાચી ને બેસ્વાદ. અમારી કેરી તલાળા ગીર ની ખેતર માં થી સાચ્ચા ટેમ પર ઉતારીએ. ઘરે આવે, ૪-૫ દી રૂમ temperature પર રે\'વા દો — કુદરત પોતે જ પકવે. કોઈ gas નઈ. કોઈ chemical નઈ. કોઈ ઉતાવળ નઈ.',
    visual: (
      <svg viewBox="0 0 480 540" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" className="relative z-10">
        <g transform="translate(240, 270)">
          <path d="M0 -220 C35 -180 55 -100 52 -20 C48 60 30 120 0 150 C-30 120 -48 60 -52 -20 C-55 -100 -35 -180 0 -220Z" fill="#1A3A08" opacity="0.85" />
          <path d="M0 -215 C28 -175 44 -98 42 -18 C38 56 22 112 0 140 C-22 112 -38 56 -42 -18 C-44 -98 -28 -175 0 -215Z" fill="#22480A" opacity="0.7" />
          <path d="M0 -220 L0 150" stroke="#1A2E08" strokeWidth="2.5" opacity="0.8" />
          <g stroke="#1E3A0A" strokeWidth="0.8" fill="none" opacity="0.6">
            <path d="M0 -160 Q-28 -148 -40 -138" /><path d="M0 -130 Q-30 -115 -44 -102" />
            <path d="M0 -98 Q-32 -80 -46 -64" /><path d="M0 -65 Q-33 -45 -46 -28" />
            <path d="M0 -30 Q-32 -8 -43 12" /><path d="M0 8 Q-28 28 -36 50" />
            <path d="M0 50 Q-24 68 -30 88" /><path d="M0 90 Q-18 106 -20 122" />
            <path d="M0 -160 Q28 -148 40 -138" /><path d="M0 -130 Q30 -115 44 -102" />
            <path d="M0 -98 Q32 -80 46 -64" /><path d="M0 -65 Q33 -45 46 -28" />
            <path d="M0 -30 Q32 -8 43 12" /><path d="M0 8 Q28 28 36 50" />
            <path d="M0 50 Q24 68 30 88" /><path d="M0 90 Q18 106 20 122" />
          </g>
          <ellipse cx="0" cy="-205" rx="6" ry="12" fill="#2E5010" opacity="0.4" />
        </g>
        <g transform="translate(380, 120)" opacity="0.45">
          <circle cx="0" cy="0" r="22" stroke="#E8820C" strokeWidth="1.2" fill="none" />
          <line x1="-12" y1="-12" x2="12" y2="12" stroke="#E8820C" strokeWidth="1.5" />
          <line x1="12" y1="-12" x2="-12" y2="12" stroke="#E8820C" strokeWidth="1.5" />
        </g>
        <text x="354" y="158" fontFamily="DM Sans, sans-serif" fontSize="9" fill="#E8820C" opacity="0.5" letterSpacing="1" textAnchor="middle">NO CHEMICALS</text>
        <ellipse cx="264" cy="200" rx="4" ry="6" fill="white" opacity="0.18" />
        <ellipse cx="218" cy="245" rx="3" ry="5" fill="white" opacity="0.14" />
        <ellipse cx="270" cy="310" rx="3.5" ry="5.5" fill="white" opacity="0.12" />
      </svg>
    )
  },
  {
    id: 6,
    num: '06',
    title: <>માત્ર <em className="not-italic text-primary">૬ અઠવાડિયા</em></>,
    subtitle: 'Nature gives us 6 weeks. We don\'t push it.',
    desc: 'મે-જૂન — બસ આ જ ટેમ. બાકી ના મહિના માં? ના લઈએ, ના વેચીએ. કુદરત જેટલો ટેમ આપે એમાં જ મઝા. ડિસેમ્બર માં કેસર વેચે? પૂછો — ક્યાં થી આવી, ભઈ?',
    visual: (
      <div className="grid grid-cols-4 gap-3 md:gap-4 relative z-10 px-6 w-full max-w-[400px]">
        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => {
          const isActive = ['May', 'Jun'].includes(month);
          return (
            <div key={month} className="flex flex-col items-center">
              <div className={`w-10 h-10 md:w-16 md:h-16 rounded-full flex items-center justify-center text-[0.6rem] md:text-sm tracking-wider uppercase font-sans transition-all duration-300 ${isActive ? 'bg-primary text-background shadow-[0_0_15px_rgba(232,130,12,0.4)]' : 'bg-background text-muted-foreground/50 border border-primary/10'}`}>
                {month}
              </div>
            </div>
          );
        })}
      </div>
    )
  }
];

export function KesarStory() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'));
          setActiveIndex(index);
        }
      });
    }, observerOptions);

    const refs = containerRefs.current;
    refs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      refs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div id="kesar-story"  className="relative w-full bg-background">
      {/* Section Title */}
      <div className="sticky top-0 left-0 z-20 p-6 md:p-8 pointer-events-none">
        <span className="text-[#E8820C] text-lg tracking-[0.3em] uppercase">The Kesar Story</span>
      </div>

      {/* Desktop Sticky Scroll Section */}
      <div className="hidden md:block relative">
        {/* Sticky Visual Container */}
        <div className="md:sticky top-0 h-auto md:h-screen w-full flex items-center justify-center overflow-hidden z-0">
          <div className="w-full max-w-[1400px] h-full flex flex-col md:flex-row items-center justify-start px-6 md:px-16 lg:px-24">

            {/* Visual Frame */}
            <div className="w-full md:w-1/2 h-[45vh] md:h-[45vh] relative flex items-center justify-center sticky top-24 md:top-auto z-20 md:z-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 flex items-center justify-center bg-card/40 backdrop-blur-md rounded-[2rem] border border-border/30 shadow-2xl overflow-hidden"
                >
                  <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(232,130,12,0.08) 0%, transparent 70%)' }} />
                  {beats[activeIndex]?.visual}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* Scrolling Content */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto flex flex-col md:flex-row md:justify-end px-6 md:px-16 lg:px-24 md:-mt-[100vh]">
          <div className="w-full md:w-1/2 pb-[10vh] mt-10 md:mt-0">
            {beats.map((beat, index) => (
              <div
                key={beat.id}
                data-index={index}
                ref={(el) => { containerRefs.current[index] = el; }}
                className="min-h-[60vh] md:min-h-[75vh] flex items-center justify-center md:pl-12 lg:pl-20 py-10 md:py-0"
              >
                <div className="bg-background/80 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] border border-border/50 shadow-xl w-full max-w-[500px] hover:shadow-2xl transition-shadow duration-500">
                  <motion.div className="font-serif text-[4rem] md:text-[5rem] font-light text-primary/20 leading-none mb-4">
                    {beat.num}
                  </motion.div>
                  <h2 className="font-gujarati text-[clamp(1.8rem,3vw,2.5rem)] font-bold text-foreground leading-[1.15] mb-3 tracking-[-0.02em]">
                    {beat.title}
                  </h2>
                  <span className="font-serif text-[clamp(0.9rem,1.1vw,1rem)] font-light italic text-foreground block mt-1 mb-6 tracking-[0.03em]">
                    {beat.subtitle}
                  </span>
                  <p className="font-gujarati text-[0.95rem] md:text-base font-light text-foreground leading-[1.85]">
                    {beat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

       {/* Mobile Layout */}
      <div className="md:hidden relative w-full px-6">
        <div className="w-full pb-[10vh]">
          {beats.map((beat, index) => (
            <div 
              key={beat.id} 
              data-index={index}
              className="mb-6 flex flex-col items-center justify-center"
            >
              {/* Image */}
              <div className="h-[35vh] flex items-center justify-center mb-1">
                <div className="w-56 h-56 flex items-center justify-center bg-foreground/10 backdrop-blur-md rounded-4xl border border-border/30 shadow-2xl overflow-hidden relative">
                  <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(232,130,12,0.08) 0%, transparent 70%)' }} />
                  {beat.visual}
                </div>
              </div>
              {/* Content */}
              <div className="bg-background/80 backdrop-blur-xl p-8 rounded-[2rem] border border-border/50 shadow-xl w-full hover:shadow-2xl transition-shadow duration-500">
                <motion.div className="font-serif text-[4rem] font-light text-primary/20 leading-none mb-4">
                  {beat.num}
                </motion.div>
                <h2 className="font-gujarati text-[1.8rem] font-bold text-foreground leading-[1.15] mb-3 tracking-[-0.02em]">
                  {beat.title}
                </h2>
                <span className="font-serif text-[0.9rem] font-light italic text-muted-foreground block mt-1 mb-6 tracking-[0.03em]">
                  {beat.subtitle}
                </span>
                <p className="font-gujarati text-[0.95rem] font-light text-foreground leading-[1.85]">
                  {beat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

