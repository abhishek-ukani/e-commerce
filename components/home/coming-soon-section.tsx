"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function ComingSoonSection() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Email submitted:', email)
  }

  return (
    <section className="relative w-full min-h-[90vh] bg-[#0A0805] flex items-center justify-center overflow-hidden">
      {/* Mango Leaf Background */}
      <div className="absolute inset-0 opacity-[0.03]">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: Math.random() * 6,
              ease: "easeInOut",
            }}
          >
            <svg width="60" height="80" viewBox="0 0 60 80" fill="currentColor" className="text-white">
              <path d="M30 0C20 0 10 10 10 25c0 15 10 30 20 30s20-15 20-30C50 10 40 0 30 0z"/>
              <path d="M30 30c-5 0-10 5-10 15 0 10 5 15 10 15s10-5 10-15c0-10-5-15-10-15z"/>
            </svg>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Label */}
        <motion.div
          className="inline-flex items-center px-4 py-2 rounded-full border border-[#E8820C] bg-transparent mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-[#E8820C] text-sm font-medium">
            🥭  સિઝન ૨૦૨૬  ·  મે - જૂન - જુલાઈ
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h1 className="text-[#FFF8E7] font-bold font-(family-name:--font-gujarati-sans) text-5xl md:text-7xl leading-tight mb-2">
            ઉતાવળે આંબા ના પાકે,
          </h1>
          <p className="text-[#A89880] font-(family-name:--font-gujarati-sans) text-3xl md:text-5xl font-medium">
            ભઈ — હજુ થોડી વાર સે.
          </p>
        </motion.div>

        {/* Subtext */}
        <motion.p
          className="text-[#A89880] font-(family-name:--font-gujarati-sans) text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          તલાળા ગીર ની કેરી પોતાના ટેમ પર પાકે — ઉતાવળ કરીએ તો સ્વાદ જાય.
          મે આવે એટલે સૌ'થી પે'લા તમને ખબર પડશે — પક્કી વાત.
        </motion.p>

        {/* Notify Me Form */}
        <motion.form
          className="flex max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="તમારો મોબાઇલ નંબર આપો"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-5 py-4 bg-[#1A1208] border border-[#E8820C] rounded-l-xl text-[#FFF8E7] placeholder-[#A89880] focus:outline-none focus:ring-2 focus:ring-[#E8820C] focus:border-transparent"
          />
          <button
            type="submit"
            className="px-6 py-4 bg-[#E8820C] text-[#3D1F00] font-semibold rounded-r-xl hover:bg-[#F4A03C] transition-colors duration-200"
          >
            જાણ કરજો  →
          </button>
        </motion.form>
      </div>
    </section>
  )
}