"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function ReferralSection() {
  return (
    <section className="relative overflow-hidden bg-background py-12 px-6 md:py-20">
      {/* Background Glow */}
      <div className="pointer-events-none absolute top-[-10%] left-1/2 h-[500px] w-[500px] -translate-x-1/2 bg-primary/5 blur-[120px]" />

      <div className="relative mx-auto max-w-4xl text-center">
        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="eyebrow eyebrow-center"
        >
          ભઈ-ભઈ ની ભાવના
        </motion.span>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-gujarati mx-auto mb-6 max-w-2xl text-[clamp(26px,5vw,42px)] font-semibold leading-tight text-foreground"
        >
          તમારા ભઈ ને ખવડાવો,<br />
          તો <span className="text-primary italic">બેઉ ને ફાયદો</span> 🥭
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-gujarati mx-auto mb-16 max-w-lg text-lg leading-relaxed text-muted-foreground"
        >
          આ કોઈ scheme નથ, ભઈ.<br />
          તમે ખાધી, ગમી — બીજા ને કઈ દો. બસ.
        </motion.p>

        {/* Referral Cards */}
        <div className="mx-auto mb-20 flex max-w-2xl flex-col items-center justify-center gap-6 md:flex-row md:gap-4">
          {/* Referrer Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full max-w-[280px] rounded-2xl border border-primary/20 bg-card/40 p-8 backdrop-blur-sm transition-colors hover:bg-card/60 md:flex-1"
          >
            <span className="mb-4 block text-3xl">🤝</span>
            <p className="mb-2 text-[11px] font-medium tracking-widest text-primary uppercase">તમને — REFERRER</p>
            <p className="mb-2 text-4xl font-medium text-foreground">₹100</p>
            <p className="font-gujarati text-sm leading-relaxed text-muted-foreground">
              તમારો ભઈ order કરે<br />
              ત્યારે wallet માં આવે
            </p>
          </motion.div>

          {/* Plus Divider */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-background text-primary font-medium">
            +
          </div>

          {/* New Customer Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full max-w-[280px] rounded-2xl border border-primary/20 bg-card/40 p-8 backdrop-blur-sm transition-colors hover:bg-card/60 md:flex-1"
          >
            <span className="mb-4 block text-3xl">🙏</span>
            <p className="mb-2 text-[11px] font-medium tracking-widest text-primary uppercase">એમને — NEW CUSTOMER</p>
            <p className="mb-2 text-4xl font-medium text-foreground">₹50</p>
            <p className="font-gujarati text-sm leading-relaxed text-muted-foreground">
              પે&apos;લા order પર<br />
              સીધો discount
            </p>
          </motion.div>
        </div>

        {/* How it works */}
        <div className="mx-auto mb-20 max-w-lg text-left">
          <p className="font-gujarati mb-10 text-center text-sm tracking-widest text-muted-foreground uppercase">— કઈ રીતે? —</p>
          <div className="space-y-0">
            {[
              {
                num: "1",
                text: "Account બનાવો, unique link લો",
                sub: "Sign up કરો, ને તમારો referral code copy કરો",
              },
              {
                num: "2",
                text: "ભઈ ને WhatsApp કરો — \"ભઈ, ટ્રાય કર\"",
                sub: "link share કરો, ઈ ક્લિક કરે ત્યારે code automatically apply",
              },
              {
                num: "3",
                text: "ઈ order કરે, wallet ભરાય — next order સસ્તો",
                sub: "coins = future order discount. simple.",
              },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}
                className={`flex items-start gap-5 py-5 ${idx !== 2 ? "border-b border-white/5" : ""}`}
              >
                <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-[11px] text-primary font-medium">
                  {step.num}
                </div>
                <div>
                  <p className="font-gujarati text-[15px] leading-snug text-foreground">{step.text}</p>
                  <p className="font-gujarati mt-1 text-[13px] text-muted-foreground">{step.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-gujarati mx-auto mb-12 max-w-md text-[15px] italic leading-relaxed text-muted-foreground"
        >
          &quot;અમે scale નથ કરવા —<br />
          <strong className="font-medium text-primary not-italic">અમારો મેળ</strong> ફેલાવવો સે.<br />
          ભઈ ભઈ ની ભલામણ — એ જ marketing.&quot;
        </motion.p>

        {/* CTA */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 rounded-lg border border-primary/50 bg-transparent px-8 py-3 text-sm font-medium tracking-wide text-primary transition-colors hover:bg-primary/5"
        >
          Referral System implement કઈ રીતે?
          <ArrowUpRight className="h-4 w-4" />
        </motion.button>

        {/* Disclaimer */}
        <p className="mt-6 text-[11px] text-muted-foreground/50">
          Referral available when ordering opens · June 2026
        </p>
      </div>
    </section>
  );
}
