'use client'

import { motion } from 'framer-motion'
import { MapPin, TreeDeciduous, Calendar, Heart } from 'lucide-react'

const stats = [
  { icon: TreeDeciduous, value: '50+', label: 'Acres of Orchards' },
  { icon: Calendar, value: '25+', label: 'Years of Experience' },
  { icon: Heart, value: '10K+', label: 'Happy Customers' },
]

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image / Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-accent/20 to-primary/20">
              <div className="absolute inset-0 pattern-paisley opacity-30" />
              <svg
                viewBox="0 0 400 300"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Orchard scene */}
                {/* Sky */}
                <rect width="400" height="300" className="fill-[oklch(0.92_0.03_90)]" />
                
                {/* Sun */}
                <circle cx="350" cy="60" r="30" className="fill-primary/30" />
                
                {/* Hills */}
                <path d="M0 200 Q100 150 200 180 Q300 160 400 190 L400 300 L0 300 Z" className="fill-accent/20" />
                
                {/* Trees */}
                {[50, 120, 200, 280, 350].map((x, i) => (
                  <g key={i} transform={`translate(${x}, ${180 + (i % 2) * 20})`}>
                    {/* Tree trunk */}
                    <rect x="-4" y="0" width="8" height="40" className="fill-[oklch(0.40_0.06_50)]" />
                    {/* Tree canopy */}
                    <ellipse cx="0" cy="-20" rx="30" ry="35" className="fill-accent" />
                    <ellipse cx="0" cy="-25" rx="25" ry="30" className="fill-[oklch(0.50_0.10_150)]" />
                    {/* Mangoes */}
                    <circle cx="-10" cy="-10" r="6" className="fill-primary" />
                    <circle cx="12" cy="-15" r="5" className="fill-[oklch(0.70_0.16_55)]" />
                    <circle cx="5" cy="-30" r="5" className="fill-primary" />
                  </g>
                ))}
                
                {/* Ground */}
                <rect x="0" y="220" width="400" height="80" className="fill-[oklch(0.50_0.08_145)]" />
                
                {/* Farmer silhouette */}
                <g transform="translate(180, 180)">
                  <circle cx="0" cy="-50" r="10" className="fill-[oklch(0.35_0.05_50)]" />
                  <path d="M-15 -40 L15 -40 L10 0 L-10 0 Z" className="fill-[oklch(0.35_0.05_50)]" />
                  <rect x="-20" y="-60" width="40" height="5" rx="2" className="fill-[oklch(0.40_0.06_50)]" />
                </g>
              </svg>
              
              {/* Location badge */}
              <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Talala, Gujarat</p>
                  <p className="text-xs text-muted-foreground">Gir Somnath District</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              <span className="font-[family-name:var(--font-gujarati-serif)] text-primary block">અમારા વિશે</span>
              <span className="mt-1 block">Our Story</span>
            </h2>
            
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p className="font-[family-name:var(--font-gujarati-sans)]">
                તાલાલા, ગુજરાત - કેસર કેરીનું જન્મસ્થળ. અમારા પરિવારે પેઢીઓથી આ સુંદર ફળની ખેતી કરી છે, 
                પરંપરાગત પદ્ધતિઓ અને પ્રકૃતિ પ્રત્યેના પ્રેમ સાથે.
              </p>
              <p>
                Talala, Gujarat - the birthplace of Kesar mangoes. Our family has been cultivating 
                this beautiful fruit for generations, with traditional methods and a deep love for nature.
              </p>
              <p>
                Every mango we send is handpicked at the perfect ripeness, packed with care, and 
                delivered fresh to your doorstep. No middlemen, no chemicals - just pure, 
                unadulterated sweetness from our orchards to your table.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="text-center p-4 rounded-xl bg-card shadow-sm"
                >
                  <stat.icon className="h-6 w-6 mx-auto text-primary mb-2" />
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
