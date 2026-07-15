"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Loader2, Sparkles } from "lucide-react";
import CustomSelect from "@/components/CustomSelect";
import { validateName, validateEmail, validatePhone, validateQuote } from "@/utils/validation";

const ORDER_EMAIL = "braddonr@gmail.com";

export default function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleBlur = (field: string) => {
    setTouched((t) => ({ ...t, [field]: true }));
    const validators: Record<string, () => string | null> = {
      name: () => validateName(name),
      email: () => validateEmail(email),
      phone: () => validatePhone(phone, false),
    };
    const err = validators[field]?.();
    setFieldErrors((prev) => {
      const next = { ...prev };
      if (err) next[field] = err; else delete next[field];
      return next;
    });
  };

  const handleSubmit = async () => {
    const errors = validateQuote({ name, email, phone });
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setTouched({ name: true, email: true, phone: true });
      return;
    }
    setSending(true);
    try {
      const emailBody = [
        "SOLARCRAFT \u2014 QUOTE REQUEST",
        "=".repeat(40),
        "",
        "CUSTOMER DETAILS",
        "-".repeat(20),
        `  Name:     ${name}`,
        `  Email:    ${email}`,
        `  Phone:    ${phone || "Not provided"}`,
        `  Property: ${propertyType || "Not specified"}`,
        "",
        "MESSAGE",
        "-".repeat(20),
        `  ${message || "No additional details"}`,
        "-".repeat(20),
        "",
        "Thank you for your interest in Solarcraft!",
        "Our team will prepare your quote within 48 hours.",
      ].join("\n");

      const res = await fetch(`https://formsubmit.co/ajax/${ORDER_EMAIL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name, email,
          phone: phone || "Not provided",
          property_type: propertyType || "Not specified",
          _subject: `Quote Request \u2014 ${name} (${propertyType || "Residential"})`,
          emailBody,
        }),
      });
      if (res.ok) setSent(true);
    } catch { /* silent */ }
    finally { setSending(false); }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-32 border-t border-charcoal-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl sm:rounded-3xl border border-charcoal-light bg-card p-5 sm:p-10 lg:p-16 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-amber/5 rounded-full blur-3xl" />

          <div className="relative max-w-2xl">
            {sent ? (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-6 sm:py-8 text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", damping: 8, stiffness: 80 }}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-4 relative"
                >
                  <Sparkles size={28} className="text-sage" />
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2">Quote request received!</h3>
                <p className="text-muted text-sm sm:text-base">Our team will put together a custom quote and get back to you within 48 hours.</p>
              </motion.div>
            ) : (
              <>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3 sm:mb-4">
                  Ready to make<br /><span className="font-display italic">the switch?</span>
                </h2>
                <p className="text-muted text-sm sm:text-lg leading-relaxed mb-6 sm:mb-10 max-w-lg">
                  Tell us about your property and we&apos;ll put together a custom quote within 48 hours. No pressure, no obligation.
                </p>

                <div className="grid sm:grid-cols-2 gap-3 mb-3">
                  <div>
                    <input type="text" placeholder="Your name *" value={name} onChange={(e) => { setName(e.target.value); if (touched.name) { const err = validateName(e.target.value); setFieldErrors((p) => { const n = {...p}; if (err) n.name = err; else delete n.name; return n; }); } }} onBlur={() => handleBlur("name")} className={`w-full px-4 sm:px-5 py-3 rounded-xl bg-background border ${touched.name && fieldErrors.name ? 'border-red-500' : 'border-charcoal-light'} text-foreground placeholder:text-muted/50 focus:outline-none focus:border-amber/50 transition-colors text-base sm:text-sm`} />
                    {touched.name && fieldErrors.name && <p className="text-xs text-red-500 mt-1 ml-1">{fieldErrors.name}</p>}
                  </div>
                  <div>
                    <input type="email" placeholder="Email address *" value={email} onChange={(e) => { setEmail(e.target.value); if (touched.email) { const err = validateEmail(e.target.value); setFieldErrors((p) => { const n = {...p}; if (err) n.email = err; else delete n.email; return n; }); } }} onBlur={() => handleBlur("email")} className={`w-full px-4 sm:px-5 py-3 rounded-xl bg-background border ${touched.email && fieldErrors.email ? 'border-red-500' : 'border-charcoal-light'} text-foreground placeholder:text-muted/50 focus:outline-none focus:border-amber/50 transition-colors text-base sm:text-sm`} />
                    {touched.email && fieldErrors.email && <p className="text-xs text-red-500 mt-1 ml-1">{fieldErrors.email}</p>}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 mb-3">
                  <div>
                    <input type="tel" placeholder="Phone (optional)" value={phone} onChange={(e) => { setPhone(e.target.value); if (touched.phone) { const err = validatePhone(e.target.value, false); setFieldErrors((p) => { const n = {...p}; if (err) n.phone = err; else delete n.phone; return n; }); } }} onBlur={() => handleBlur("phone")} className={`w-full px-4 sm:px-5 py-3 rounded-xl bg-background border ${touched.phone && fieldErrors.phone ? 'border-red-500' : 'border-charcoal-light'} text-foreground placeholder:text-muted/50 focus:outline-none focus:border-amber/50 transition-colors text-base sm:text-sm`} />
                    {touched.phone && fieldErrors.phone && <p className="text-xs text-red-500 mt-1 ml-1">{fieldErrors.phone}</p>}
                  </div>
                  <CustomSelect
                    options={["Residential", "Commercial", "Agricultural"]}
                    value={propertyType}
                    onChange={setPropertyType}
                    placeholder="Property type"
                  />
                </div>
                <textarea rows={3} placeholder="Tell us about your property..." value={message} onChange={(e) => setMessage(e.target.value)} className="w-full px-4 sm:px-5 py-3 rounded-xl bg-background border border-charcoal-light text-foreground placeholder:text-muted/50 focus:outline-none focus:border-amber/50 transition-colors resize-none mb-4 sm:mb-6 text-base sm:text-sm" />

                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  disabled={sending || Object.keys(validateQuote({ name, email, phone })).length > 0}
                  className="inline-flex items-center gap-2 px-6 sm:px-10 py-3 rounded-full bg-amber text-background font-medium hover:bg-amber-light transition-colors text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {sending ? <><Loader2 size={14} className="animate-spin" /> Sending...</> : <><Send size={14} /> Request a Quote</>}
                </motion.button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
