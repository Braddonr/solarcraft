"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { heroContent, stats } from "@/data/site-data";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] sm:min-h-screen flex items-center overflow-hidden pt-28 sm:pt-[88px]">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(196,127,23,0.06)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
        backgroundSize: "80px 80px"
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text content */}
          <div className="order-2 lg:order-1">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mb-5">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-charcoal-light text-sm text-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
                {heroContent.badge}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95]"
            >
              {heroContent.title.map((line, i) => (
                <span key={i} className="block">
                  {i === heroContent.title.length - 1 ? <span className="text-amber font-display italic">{line}</span> : line}
                </span>
              ))}
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="mt-5 sm:mt-8 text-sm sm:text-lg text-muted max-w-lg leading-relaxed">
              {heroContent.subtitle}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }} className="mt-6 sm:mt-10 flex flex-wrap gap-3">
              <a href={heroContent.primaryCta.href} className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-amber text-background font-medium hover:bg-amber-light transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base">
                {heroContent.primaryCta.label} <ArrowRight size={16} />
              </a>
              <a href={heroContent.secondaryCta.href} className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-full border border-charcoal-light font-medium hover:bg-charcoal transition-all duration-200 text-sm sm:text-base">
                {heroContent.secondaryCta.label}
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.9 }} className="mt-10 sm:mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0 sm:divide-x sm:divide-charcoal-light">
              {stats.map((stat) => (
                <div key={stat.label} className="sm:px-6 py-2">
                  <div className="text-lg sm:text-2xl font-bold text-amber">{stat.value}</div>
                  <div className="text-[11px] sm:text-sm text-muted mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Hero image — visible on ALL screens now */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[16/10] lg:aspect-[4/5]">
              <img src={heroContent.image} alt="Solar panels on a rooftop" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
            </div>
            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="absolute -bottom-4 sm:-bottom-6 left-3 sm:-left-6 bg-card border border-charcoal-light rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg max-w-[180px] sm:max-w-[200px]"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-sage/10 flex items-center justify-center shrink-0">
                  <Zap size={16} className="text-sage" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-semibold">KSh 15k+ saved</div>
                  <div className="text-[10px] sm:text-xs text-muted">avg. per month</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
