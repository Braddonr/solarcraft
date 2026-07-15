"use client";

import React from "react";

import { motion, useInView } from "framer-motion";
import { Shield, Zap, Award, Leaf } from "lucide-react";
import { useRef } from "react";
import { brands } from "@/data/site-data";

// SVG logo components for each brand
function CanadianSolarLogo() {
  return (
    <svg viewBox="0 0 120 32" className="h-6 w-auto" fill="currentColor">
      <text x="0" y="22" fontSize="14" fontWeight="800" letterSpacing="0.5">CANADIAN</text>
      <text x="0" y="30" fontSize="7" fontWeight="500" letterSpacing="2">SOLAR</text>
      <circle cx="108" cy="10" r="6" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M108 4v12M102 10h12" stroke="currentColor" strokeWidth="1"/>
    </svg>
  );
}

function JASolarLogo() {
  return (
    <svg viewBox="0 0 80 28" className="h-6 w-auto" fill="currentColor">
      <text x="0" y="20" fontSize="18" fontWeight="900" letterSpacing="3">JA</text>
      <text x="36" y="20" fontSize="12" fontWeight="600" letterSpacing="1">SOLAR</text>
      <rect x="0" y="24" width="78" height="2" rx="1"/>
    </svg>
  );
}

function TrinaSolarLogo() {
  return (
    <svg viewBox="0 0 100 28" className="h-6 w-auto" fill="currentColor">
      <text x="0" y="20" fontSize="16" fontWeight="700" letterSpacing="1">TRINA</text>
      <text x="52" y="20" fontSize="10" fontWeight="400" letterSpacing="0.5">solar</text>
      <path d="M0 24h100" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2"/>
    </svg>
  );
}

function FroniusLogo() {
  return (
    <svg viewBox="0 0 90 24" className="h-5 w-auto" fill="currentColor">
      <text x="0" y="18" fontSize="16" fontWeight="800" letterSpacing="4">FRONIUS</text>
      <rect x="0" y="21" width="90" height="1.5" rx="0.75"/>
    </svg>
  );
}

function EnphaseLogo() {
  return (
    <svg viewBox="0 0 90 24" className="h-5 w-auto" fill="currentColor">
      <circle cx="8" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M5 12c0-2 1.5-4 3-4s3 2 3 4-1.5 4-3 4-3-2-3-4z" fill="currentColor" opacity="0.3"/>
      <text x="18" y="17" fontSize="13" fontWeight="600" letterSpacing="0.5">enphase</text>
    </svg>
  );
}

function BYDLogo() {
  return (
    <svg viewBox="0 0 70 28" className="h-6 w-auto" fill="currentColor">
      <text x="0" y="22" fontSize="22" fontWeight="900" letterSpacing="6">BYD</text>
      <rect x="0" y="25" width="68" height="1.5" rx="0.75"/>
    </svg>
  );
}

function PylontechLogo() {
  return (
    <svg viewBox="0 0 100 24" className="h-5 w-auto" fill="currentColor">
      <rect x="0" y="2" width="4" height="20" rx="1" opacity="0.4"/>
      <rect x="6" y="6" width="4" height="16" rx="1" opacity="0.6"/>
      <rect x="12" y="0" width="4" height="24" rx="1" opacity="0.8"/>
      <text x="20" y="17" fontSize="12" fontWeight="700" letterSpacing="1">Pylontech</text>
    </svg>
  );
}

function VictronLogo() {
  return (
    <svg viewBox="0 0 80 24" className="h-5 w-auto" fill="currentColor">
      <text x="0" y="18" fontSize="16" fontWeight="800" letterSpacing="3">VICRON</text>
      <text x="0" y="23" fontSize="5" fontWeight="500" letterSpacing="3" opacity="0.6">ENERGY</text>
    </svg>
  );
}

function SchneiderLogo() {
  return (
    <svg viewBox="0 0 110 24" className="h-5 w-auto" fill="currentColor">
      <text x="0" y="18" fontSize="14" fontWeight="700" letterSpacing="1">Schneider</text>
      <text x="82" y="18" fontSize="10" fontWeight="400"> Electric</text>
      <rect x="0" y="21" width="110" height="1" rx="0.5" opacity="0.4"/>
    </svg>
  );
}

function HuaweiLogo() {
  return (
    <svg viewBox="0 0 90 24" className="h-5 w-auto" fill="currentColor">
      <text x="0" y="18" fontSize="15" fontWeight="700" letterSpacing="3">HUAWEI</text>
      <path d="M78 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

function DeyeLogo() {
  return (
    <svg viewBox="0 0 60 28" className="h-6 w-auto" fill="currentColor">
      <text x="0" y="22" fontSize="22" fontWeight="900" letterSpacing="4">DEYE</text>
      <circle cx="54" cy="14" r="4" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="54" cy="14" r="1.5"/>
    </svg>
  );
}

function GrowattLogo() {
  return (
    <svg viewBox="0 0 90 24" className="h-5 w-auto" fill="currentColor">
      <path d="M0 12c0-6 4-10 10-10h2v3H10c-4 0-7 3-7 7s3 7 7 7h2v3h-2c-6 0-10-4-10-10z" opacity="0.5"/>
      <text x="16" y="17" fontSize="13" fontWeight="700" letterSpacing="1">Growatt</text>
    </svg>
  );
}

const logoMap: Record<string, () => React.JSX.Element> = {
  "Canadian Solar": CanadianSolarLogo,
  "JA Solar": JASolarLogo,
  "Trina Solar": TrinaSolarLogo,
  "Fronius": FroniusLogo,
  "Enphase": EnphaseLogo,
  "BYD": BYDLogo,
  "Pylontech": PylontechLogo,
  "Victron": VictronLogo,
  "Schneider Electric": SchneiderLogo,
  "Huawei": HuaweiLogo,
  "Deye": DeyeLogo,
  "Growatt": GrowattLogo,
};

function BrandLogo({ name, index, inView }: { name: string; index: number; inView: boolean }) {
  const LogoComponent = logoMap[name];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group flex items-center justify-center px-4 py-4 rounded-xl border border-charcoal-light/60 bg-card/50 hover:border-amber/30 hover:bg-card transition-all duration-300 cursor-default"
    >
      <div className="text-muted/50 group-hover:text-foreground/70 transition-colors duration-300">
        {LogoComponent ? <LogoComponent /> : <span className="text-sm font-bold">{name}</span>}
      </div>
    </motion.div>
  );
}

export default function BrandStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="py-12 sm:py-16 border-t border-b border-charcoal-light overflow-hidden">
      <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8 }}>
        <p className="text-center text-xs uppercase tracking-[0.3em] text-muted/40 mb-8 sm:mb-10">
          Trusted brands we partner with
        </p>

        {/* Logo grid */}
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {brands.map((brand, i) => (
            <BrandLogo key={brand} name={brand} index={i} inView={inView} />
          ))}
        </div>

        {/* Certification badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-10 pt-8 border-t border-charcoal-light/50 max-w-3xl mx-auto"
        >
          {[
            { label: "Tier 1 Panels", Icon: Shield },
            { label: "EPBA Member", Icon: Zap },
            { label: "ISO 9001", Icon: Award },
            { label: "NEMA Approved", Icon: Leaf },
          ].map((cert) => (
            <div key={cert.label} className="flex items-center gap-2 text-muted/40">
              <cert.Icon size={14} />
              <span className="text-[10px] sm:text-xs uppercase tracking-wider font-medium">{cert.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
