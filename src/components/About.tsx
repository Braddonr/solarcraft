"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sun } from "lucide-react";
import { reasons } from "@/data/site-data";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-16 sm:py-24 lg:py-32 border-t border-charcoal-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          {/* Image — now visible on mobile too */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }} className="relative">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[16/10] lg:aspect-[3/4] lg:sticky lg:top-24">
              <img src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80&auto=format" alt="Solar installation in Kenya" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.5 }} className="absolute -bottom-4 right-4 sm:-bottom-6 sm:right-6 bg-card border border-charcoal-light rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-lg">
              <div className="flex items-center gap-2">
                <Sun size={18} className="text-amber" />
                <div>
                  <div className="text-xl sm:text-3xl font-bold text-amber">5-7 hrs</div>
                  <div className="text-xs sm:text-sm text-muted">peak sun hours daily</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div>
            <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }} className="text-sm uppercase tracking-widest text-amber mb-3 block">Why Go Solar</motion.span>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }} className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3 sm:mb-4">
              The math is<br /><span className="text-amber font-display italic">pretty simple</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="text-muted text-sm sm:text-lg leading-relaxed max-w-md mb-6 sm:mb-8">
              Solar isn&apos;t some feel-good luxury anymore. With KPLC rates climbing, it&apos;s the smartest long-term investment you can make in your property.
            </motion.p>

            <div ref={ref} className="space-y-0">
              {reasons.map((reason, i) => (
                <motion.div key={reason.number} initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }} className="group border-t border-charcoal-light py-4 sm:py-5 last:border-b">
                  <div className="flex gap-3 sm:gap-6">
                    <span className="text-xs sm:text-sm font-mono text-muted/50 mt-0.5 sm:mt-1 shrink-0">{reason.number}</span>
                    <div>
                      <h3 className="text-sm sm:text-lg font-semibold mb-1 group-hover:text-amber transition-colors duration-200">{reason.title}</h3>
                      <p className="text-xs sm:text-sm text-muted leading-relaxed">{reason.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
