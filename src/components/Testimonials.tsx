"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Quote } from "lucide-react";
import { testimonials } from "@/data/site-data";

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  return (
    <section id="testimonials" className="py-16 sm:py-24 lg:py-32 border-t border-charcoal-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-10 sm:mb-16">
          <span className="text-sm uppercase tracking-widest text-amber mb-3 block">Real Customers</span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight">Don&apos;t <span className="font-display italic">take our word</span> for it</h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-12">
          {/* Active testimonial */}
          <div className="lg:col-span-3">
            <motion.div key={active} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="relative bg-card border border-charcoal-light rounded-2xl p-5 sm:p-10">
              <Quote size={32} className="text-amber/15 mb-3 sm:mb-4" />
              <p className="text-base sm:text-xl lg:text-2xl leading-relaxed mb-6 sm:mb-8">{testimonials[active].quote}</p>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-charcoal shrink-0">
                  <img src={testimonials[active].avatar} alt={testimonials[active].name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-sm sm:text-base font-semibold">{testimonials[active].name}</div>
                  <div className="text-xs sm:text-sm text-muted">{testimonials[active].location} &middot; {testimonials[active].system}</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Selector buttons */}
          <div className="lg:col-span-2 flex lg:flex-col gap-2 sm:gap-3 overflow-x-auto pb-2 lg:pb-0" style={{ scrollbarWidth: "none" }}>
            {testimonials.map((t, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActive(i)}
                className={`flex-1 lg:flex-none text-left p-3 sm:p-4 rounded-xl border transition-all duration-300 min-w-[140px] ${i === active ? "border-amber/40 bg-card shadow-sm" : "border-charcoal-light hover:border-amber/20 bg-transparent"}`}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-charcoal shrink-0">
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-medium text-xs sm:text-sm">{t.name}</div>
                    <div className="text-[10px] sm:text-xs text-muted">{t.location}</div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
