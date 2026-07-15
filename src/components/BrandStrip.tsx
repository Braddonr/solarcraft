"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Zap, Award, Leaf } from "lucide-react";
import { useRef } from "react";
import { brands } from "@/data/site-data";

function BrandCard({ name, index, inView }: { name: string; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group flex items-center justify-center px-4 py-5 rounded-xl border border-charcoal-light bg-card hover:border-amber/40 hover:bg-charcoal transition-all duration-300 cursor-default"
    >
      <span className="text-sm sm:text-base font-bold tracking-wide text-foreground/70 group-hover:text-foreground transition-colors duration-300">
        {name}
      </span>
    </motion.div>
  );
}

export default function BrandStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="py-8 sm:py-12 border-b border-charcoal-light overflow-hidden">
      <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8 }}>
        <p className="text-center text-xs uppercase tracking-[0.3em] text-muted/60 mb-6 sm:mb-8">
          Trusted brands we partner with
        </p>

        {/* Logo grid */}
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {brands.map((brand, i) => (
            <BrandCard key={brand} name={brand} index={i} inView={inView} />
          ))}
        </div>

        {/* Certification badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 pt-6 border-t border-charcoal-light/50 max-w-3xl mx-auto"
        >
          {[
            { label: "Tier 1 Panels", Icon: Shield },
            { label: "EPBA Member", Icon: Zap },
            { label: "ISO 9001", Icon: Award },
            { label: "NEMA Approved", Icon: Leaf },
          ].map((cert) => (
            <div key={cert.label} className="flex items-center gap-2 text-muted/60">
              <cert.Icon size={14} />
              <span className="text-[10px] sm:text-xs uppercase tracking-wider font-medium">{cert.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
