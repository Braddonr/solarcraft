"use client";

import React from "react";

import { motion, useInView } from "framer-motion";
import { Shield, Zap, Award, Leaf } from "lucide-react";
import { useRef } from "react";
import { brands } from "@/data/site-data";

// SVG logo components — bold, distinctive brand marks
function CanadianSolarLogo() {
  return (
    <svg viewBox="0 0 130 28" className="h-7 w-auto" fill="currentColor">
      <text x="0" y="14" fontSize="11" fontWeight="900" letterSpacing="1.5">CANADIAN</text>
      <text x="0" y="25" fontSize="9" fontWeight="600" letterSpacing="3" opacity="0.7">SOLAR</text>
      <circle cx="118" cy="14" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M118 6v16M110 14h16" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

function JASolarLogo() {
  return (
    <svg viewBox="0 0 85 28" className="h-7 w-auto" fill="currentColor">
      <text x="0" y="21" fontSize="22" fontWeight="900" letterSpacing="2">JA</text>
      <text x="40" y="21" fontSize="11" fontWeight="700" letterSpacing="2" opacity="0.7">SOLAR</text>
      <rect x="0" y="25" width="83" height="2.5" rx="1.25"/>
    </svg>
  );
}

function TrinaSolarLogo() {
  return (
    <svg viewBox="0 0 105 28" className="h-7 w-auto" fill="currentColor">
      <text x="0" y="20" fontSize="18" fontWeight="800" letterSpacing="1.5">TRINA</text>
      <text x="58" y="20" fontSize="12" fontWeight="500" letterSpacing="0.5" opacity="0.6">solar</text>
      <path d="M0 26h105" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
}

function FroniusLogo() {
  return (
    <svg viewBox="0 0 95 24" className="h-6 w-auto" fill="currentColor">
      <text x="0" y="17" fontSize="17" fontWeight="900" letterSpacing="5">FRONIUS</text>
      <rect x="0" y="21" width="95" height="2" rx="1"/>
    </svg>
  );
}

function EnphaseLogo() {
  return (
    <svg viewBox="0 0 95 24" className="h-6 w-auto" fill="currentColor">
      <circle cx="10" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M6 12c0-3 2-5 4-5s4 2 4 5-2 5-4 5-4-2-4-5z" fill="currentColor" opacity="0.25"/>
      <text x="22" y="17" fontSize="14" fontWeight="700" letterSpacing="0.5">enphase</text>
    </svg>
  );
}

function BYDLogo() {
  return (
    <svg viewBox="0 0 72 28" className="h-7 w-auto" fill="currentColor">
      <text x="0" y="22" fontSize="26" fontWeight="900" letterSpacing="8">BYD</text>
      <rect x="0" y="26" width="70" height="2" rx="1"/>
    </svg>
  );
}

function PylontechLogo() {
  return (
    <svg viewBox="0 0 105 24" className="h-6 w-auto" fill="currentColor">
      <rect x="0" y="2" width="5" height="20" rx="2" opacity="0.3"/>
      <rect x="7" y="5" width="5" height="17" rx="2" opacity="0.5"/>
      <rect x="14" y="0" width="5" height="24" rx="2" opacity="0.8"/>
      <text x="24" y="17" fontSize="13" fontWeight="800" letterSpacing="1">Pylontech</text>
    </svg>
  );
}

function VictronLogo() {
  return (
    <svg viewBox="0 0 85 26" className="h-6 w-auto" fill="currentColor">
      <text x="0" y="17" fontSize="18" fontWeight="900" letterSpacing="4">VICRON</text>
      <text x="0" y="24" fontSize="6" fontWeight="600" letterSpacing="4" opacity="0.5">ENERGY</text>
    </svg>
  );
}

function SchneiderLogo() {
  return (
    <svg viewBox="0 0 120 24" className="h-6 w-auto" fill="currentColor">
      <text x="0" y="17" fontSize="15" fontWeight="800" letterSpacing="1.5">Schneider</text>
      <text x="88" y="17" fontSize="11" fontWeight="400" opacity="0.6"> Electric</text>
      <rect x="0" y="21" width="120" height="2" rx="1" opacity="0.3"/>
    </svg>
  );
}

function HuaweiLogo() {
  return (
    <svg viewBox="0 0 95 24" className="h-6 w-auto" fill="currentColor">
      <text x="0" y="17" fontSize="16" fontWeight="800" letterSpacing="4">HUAWEI</text>
      <path d="M82 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function DeyeLogo() {
  return (
    <svg viewBox="0 0 65 28" className="h-7 w-auto" fill="currentColor">
      <text x="0" y="22" fontSize="26" fontWeight="900" letterSpacing="5">DEYE</text>
      <circle cx="55" cy="14" r="6" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="55" cy="14" r="2.5"/>
    </svg>
  );
}

function GrowattLogo() {
  return (
    <svg viewBox="0 0 95 24" className="h-6 w-auto" fill="currentColor">
      <path d="M0 12c0-6 4-10 10-10h2v3H10c-4 0-7 3-7 7s3 7 7 7h2v3h-2c-6 0-10-4-10-10z" opacity="0.4"/>
      <text x="16" y="17" fontSize="14" fontWeight="800" letterSpacing="1">Growatt</text>
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
      className="group flex items-center justify-center px-4 py-4 rounded-xl border border-charcoal-light/60 bg-card hover:border-amber/30 hover:bg-charcoal transition-all duration-300 cursor-default"
    >
      <div className="text-foreground/60 group-hover:text-foreground/90 transition-colors duration-300">
        {LogoComponent ? <LogoComponent /> : <span className="text-sm font-bold">{name}</span>}
      </div>
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
            <BrandLogo key={brand} name={brand} index={i} inView={inView} />
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
