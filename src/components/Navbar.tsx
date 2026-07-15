"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, ShoppingBag, X, Menu, ArrowRight, MapPin, Phone, Mail, Clock } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useCart } from "@/contexts/CartContext";
import { navLinks, siteConfig } from "@/data/site-data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { totalItems, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when nav is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-background/80 backdrop-blur-xl border-b border-charcoal-light shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-full bg-amber flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                <Sun strokeWidth={2.5} size={16} className="text-background" />
              </div>
              <span className="text-lg font-bold tracking-tight">Solarcraft</span>
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="text-sm text-muted hover:text-foreground transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-amber after:transition-all after:duration-300 hover:after:w-full">
                  {link.label}
                </a>
              ))}
              <button onClick={toggleTheme} className="w-9 h-9 rounded-full border border-charcoal-light flex items-center justify-center hover:border-amber transition-colors duration-200" aria-label="Toggle theme">
                <motion.span key={theme} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
                  {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
                </motion.span>
              </button>
              <button onClick={openCart} className="relative w-9 h-9 rounded-full border border-charcoal-light flex items-center justify-center hover:border-amber transition-colors duration-200" aria-label="Open cart">
                <ShoppingBag size={16} />
                <AnimatePresence>
                  {totalItems > 0 && (
                    <motion.span key={totalItems} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber text-background text-[10px] font-bold flex items-center justify-center">
                      {totalItems}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
              <a href="#contact" className="text-sm px-5 py-2 rounded-full bg-amber text-background font-medium hover:bg-amber-light transition-colors duration-200">
                Get a Quote
              </a>
            </div>

            {/* Mobile controls */}
            <div className="flex md:hidden items-center gap-2">
              <button onClick={openCart} className="relative w-9 h-9 rounded-full border border-charcoal-light flex items-center justify-center" aria-label="Open cart">
                <ShoppingBag size={14} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber text-background text-[10px] font-bold flex items-center justify-center">{totalItems}</span>
                )}
              </button>
              <button onClick={toggleTheme} className="w-9 h-9 rounded-full border border-charcoal-light flex items-center justify-center" aria-label="Toggle theme">
                {theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
              </button>
              <button onClick={() => setMobileOpen(true)} className="w-10 h-10 flex items-center justify-center" aria-label="Open menu">
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Side Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-overlay z-[60] backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-background border-l border-charcoal-light z-[70] flex flex-col overflow-y-auto"
            >
              {/* Close button */}
              <div className="flex items-center justify-between p-5 border-b border-charcoal-light shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-amber flex items-center justify-center">
                    <Sun strokeWidth={2.5} size={14} className="text-background" />
                  </div>
                  <span className="font-bold">Solarcraft</span>
                </div>
                <button onClick={() => setMobileOpen(false)} className="w-9 h-9 rounded-full hover:bg-charcoal flex items-center justify-center transition-colors" aria-label="Close menu">
                  <X size={18} />
                </button>
              </div>

              {/* Nav links */}
              <div className="p-5 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="flex items-center justify-between py-3 px-4 rounded-xl text-base font-medium hover:bg-charcoal transition-colors group"
                  >
                    {link.label}
                    <ArrowRight size={14} className="text-muted/40 group-hover:text-amber group-hover:translate-x-1 transition-all" />
                  </motion.a>
                ))}
              </div>

              {/* CTA */}
              <div className="px-5 pb-4">
                <a href="#contact" onClick={() => setMobileOpen(false)} className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-amber text-background font-medium text-sm">
                  Get a Quote <ArrowRight size={14} />
                </a>
              </div>

              {/* Divider */}
              <div className="border-t border-charcoal-light mx-5" />

              {/* Contact info */}
              <div className="p-5 space-y-4">
                <p className="text-xs uppercase tracking-widest text-muted/50 font-medium">Contact us</p>
                <div className="space-y-3">
                  <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-3 text-sm text-muted hover:text-foreground transition-colors">
                    <div className="w-8 h-8 rounded-full bg-charcoal flex items-center justify-center shrink-0"><Phone size={14} /></div>
                    {siteConfig.phone}
                  </a>
                  <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 text-sm text-muted hover:text-foreground transition-colors">
                    <div className="w-8 h-8 rounded-full bg-charcoal flex items-center justify-center shrink-0"><Mail size={14} /></div>
                    {siteConfig.email}
                  </a>
                  <div className="flex items-center gap-3 text-sm text-muted">
                    <div className="w-8 h-8 rounded-full bg-charcoal flex items-center justify-center shrink-0"><MapPin size={14} /></div>
                    {siteConfig.address.city}, {siteConfig.address.country}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted">
                    <div className="w-8 h-8 rounded-full bg-charcoal flex items-center justify-center shrink-0"><Clock size={14} /></div>
                    {siteConfig.hours}
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="mt-auto p-5 border-t border-charcoal-light">
                <div className="flex gap-3">
                  {["twitter", "instagram", "facebook", "linkedin"].map((social) => (
                    <a key={social} href={siteConfig.socials[social as keyof typeof siteConfig.socials]} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-charcoal-light flex items-center justify-center text-muted hover:text-foreground hover:border-amber/30 transition-colors" aria-label={social}>
                      {social === "twitter" && <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>}
                      {social === "instagram" && <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>}
                      {social === "facebook" && <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>}
                      {social === "linkedin" && <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
