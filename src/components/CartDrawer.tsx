"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Minus, Plus, Trash2, User, Mail, Phone, MapPin, FileText, Send, PartyPopper, ArrowRight, PhoneCall, Truck } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const ORDER_EMAIL = "braddonr@gmail.com";

export default function CartDrawer() {
  const { items, isOpen, totalItems, totalPrice, removeFromCart, updateQuantity, clearCart, closeCart } = useCart();
  const [view, setView] = useState<"cart" | "checkout" | "success">("cart");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!name || !email || !phone) return;
    setSending(true);
    setError("");

    const orderLines = items.map(
      (item, i) => `  ${i + 1}. ${item.product.name} [${item.product.category}]\n     ${item.quantity} x ${item.product.price} = KSh ${(item.product.priceValue * item.quantity).toLocaleString()}`
    ).join("\n\n");

    const message = [
      "SOLARCRAFT \u2014 NEW ORDER INQUIRY",
      "=".repeat(40),
      "",
      "CUSTOMER DETAILS",
      "-".repeat(20),
      `  Name:     ${name}`,
      `  Email:    ${email}`,
      `  Phone:    ${phone}`,
      `  Location: ${location || "Not specified"}`,
      ...(note ? [`  Notes:    ${note}`] : []),
      "",
      "ORDER ITEMS",
      "-".repeat(20),
      orderLines,
      "",
      "-".repeat(20),
      `  TOTAL:  KSh ${totalPrice.toLocaleString()}`,
      `  Items:  ${totalItems}`,
      `  Date:   ${new Date().toLocaleDateString("en-KE", { dateStyle: "long" })}`,
      "-".repeat(20),
      "",
      "Thank you for choosing Solarcraft!",
      "Our team will contact you within 24 hours.",
    ].join("\n");

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${ORDER_EMAIL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          _subject: `New Order \u2014 ${name} (${totalItems} items, KSh ${totalPrice.toLocaleString()})`,
          message,
        }),
      });
      if (res.ok) {
        setView("success");
        clearCart();
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setSending(false);
    }
  };

  const resetAndClose = () => {
    setView("cart");
    setName(""); setEmail(""); setPhone(""); setLocation(""); setNote(""); setError("");
    closeCart();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={resetAndClose} className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm" />
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-background border-l border-charcoal-light z-[70] flex flex-col cart-drawer">
            
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-charcoal-light shrink-0">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                {view === "success" ? (
                  <span className="flex items-center gap-2 text-sage">All done!</span>
                ) : view === "checkout" ? (
                  <span className="flex items-center gap-2"><User size={18} /> Your Details</span>
                ) : (
                  <span className="flex items-center gap-2"><ShoppingBag size={18} /> Your Cart ({totalItems})</span>
                )}
              </h2>
              <button onClick={resetAndClose} className="w-8 h-8 rounded-full hover:bg-charcoal flex items-center justify-center transition-colors" aria-label="Close">
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5">
              <AnimatePresence mode="wait">
                {/* SUCCESS VIEW */}
                {view === "success" && (
                  <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-full text-center px-4">
                    {/* Animated celebration icon */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", damping: 8, stiffness: 80, delay: 0.1 }}
                      className="relative mb-6"
                    >
                      <div className="w-24 h-24 rounded-full bg-sage/10 flex items-center justify-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                        >
                          <PartyPopper size={40} className="text-sage" />
                        </motion.div>
                      </div>
                      {/* Orbiting dots */}
                      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                        <motion.div
                          key={deg}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 + i * 0.08 }}
                          className="absolute w-2 h-2 rounded-full bg-amber/40"
                          style={{
                            top: `${50 + 55 * Math.sin((deg * Math.PI) / 180)}%`,
                            left: `${50 + 55 * Math.cos((deg * Math.PI) / 180)}%`,
                          }}
                        />
                      ))}
                    </motion.div>

                    <motion.h3 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-xl font-bold mb-2">
                      Thank you{name ? `, ${name.split(" ")[0]}` : ""}!
                    </motion.h3>
                    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-muted leading-relaxed max-w-sm mb-6">
                      Our sales team will reach out within 24 hours about your order.
                    </motion.p>

                    {/* Animated steps */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="w-full max-w-xs space-y-3">
                      {[
                        { icon: FileText, label: "We review your inquiry", delay: 0.7 },
                        { icon: PhoneCall, label: "Our team calls or emails you", delay: 0.85 },
                        { icon: Truck, label: "We confirm & arrange delivery", delay: 1.0 },
                      ].map((step, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: step.delay }}
                          className="flex items-center gap-3 p-3 rounded-xl bg-card border border-charcoal-light"
                        >
                          <div className="w-8 h-8 rounded-full bg-amber/10 flex items-center justify-center shrink-0">
                            <step.icon size={14} className="text-amber" />
                          </div>
                          <span className="text-sm text-left">{step.label}</span>
                          <span className="ml-auto text-xs text-muted/40">{i + 1}/3</span>
                        </motion.div>
                      ))}
                    </motion.div>

                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      onClick={resetAndClose}
                      className="mt-8 px-8 py-3 rounded-full bg-amber text-background font-medium hover:bg-amber-light transition-colors text-sm"
                    >
                      Continue Browsing
                    </motion.button>
                  </motion.div>
                )}

                {/* CHECKOUT VIEW */}
                {view === "checkout" && (
                  <motion.div key="checkout" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                    <p className="text-sm text-muted mb-2">Tell us how to reach you about your order.</p>
                    <div>
                      <label className="text-xs font-medium text-muted mb-1 block">Full name *</label>
                      <div className="relative">
                        <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted/40" />
                        <input type="text" placeholder="e.g. Jane Wanjiku" value={name} onChange={(e) => setName(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-charcoal-light text-foreground placeholder:text-muted/40 focus:outline-none focus:border-amber/50 text-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted mb-1 block">Email address *</label>
                      <div className="relative">
                        <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted/40" />
                        <input type="email" placeholder="e.g. jane@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-charcoal-light text-foreground placeholder:text-muted/40 focus:outline-none focus:border-amber/50 text-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted mb-1 block">Phone number *</label>
                      <div className="relative">
                        <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted/40" />
                        <input type="tel" placeholder="e.g. 0712 345 678" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-charcoal-light text-foreground placeholder:text-muted/40 focus:outline-none focus:border-amber/50 text-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted mb-1 block">Delivery location</label>
                      <div className="relative">
                        <MapPin size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted/40" />
                        <input type="text" placeholder="e.g. Kilimani, Nairobi" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-charcoal-light text-foreground placeholder:text-muted/40 focus:outline-none focus:border-amber/50 text-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted mb-1 block">Additional notes</label>
                      <textarea rows={2} placeholder="Installation needs, preferred delivery date..." value={note} onChange={(e) => setNote(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-card border border-charcoal-light text-foreground placeholder:text-muted/40 focus:outline-none focus:border-amber/50 text-sm resize-none" />
                    </div>
                    {error && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-500 bg-red-500/10 px-3 py-2 rounded-lg">{error}</motion.p>
                    )}
                    <button onClick={() => setView("cart")} className="text-sm text-muted hover:text-foreground transition-colors flex items-center gap-1">
                      <ArrowRight size={14} className="rotate-180" /> Back to cart
                    </button>
                  </motion.div>
                )}

                {/* CART VIEW */}
                {view === "cart" && (
                  <motion.div key="cart" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {items.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-center py-12">
                        <div className="w-16 h-16 rounded-full bg-charcoal flex items-center justify-center mb-4">
                          <ShoppingBag size={24} className="text-muted" />
                        </div>
                        <p className="font-medium text-sm mb-1">Your cart is empty</p>
                        <p className="text-muted/60 text-xs">Browse our catalogue to add products</p>
                        <button onClick={resetAndClose} className="mt-4 px-6 py-2 rounded-full border border-charcoal-light text-sm hover:bg-charcoal transition-colors">
                          Browse Products
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <AnimatePresence>
                          {items.map((item) => (
                            <motion.div
                              key={item.product.id}
                              layout
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, x: 50, height: 0, marginBottom: 0 }}
                              transition={{ duration: 0.2 }}
                              className="flex gap-3 p-3 rounded-xl bg-card border border-charcoal-light"
                            >
                              <img src={item.product.image} alt={item.product.name} className="w-14 h-14 rounded-lg object-cover shrink-0" />
                              <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-medium truncate">{item.product.name}</h3>
                                <p className="text-xs text-muted">{item.product.category}</p>
                                <div className="flex items-center justify-between mt-1.5">
                                  <div className="flex items-center gap-1.5">
                                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-6 h-6 rounded-full bg-charcoal flex items-center justify-center hover:bg-charcoal-light transition-colors"><Minus size={12} /></button>
                                    <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-6 h-6 rounded-full bg-charcoal flex items-center justify-center hover:bg-charcoal-light transition-colors"><Plus size={12} /></button>
                                  </div>
                                  <span className="text-sm font-semibold text-amber">{item.product.price}</span>
                                </div>
                              </div>
                              <button onClick={() => removeFromCart(item.product.id)} className="text-muted/30 hover:text-red-500 transition-colors self-start p-1" aria-label="Remove">
                                <Trash2 size={12} />
                              </button>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && view !== "success" && (
              <div className="border-t border-charcoal-light p-5 space-y-3 shrink-0">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted">Estimated total</span>
                  <span className="text-xl font-bold text-amber">KSh {totalPrice.toLocaleString()}</span>
                </div>
                {view === "cart" ? (
                  <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} onClick={() => setView("checkout")} className="w-full py-3 rounded-full bg-amber text-background font-medium hover:bg-amber-light transition-colors text-sm flex items-center justify-center gap-2">
                    Proceed to Inquiry <ArrowRight size={14} />
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                    onClick={handleSubmit}
                    disabled={!name || !email || !phone || sending}
                    className="w-full py-3 rounded-full bg-amber text-background font-medium hover:bg-amber-light transition-colors text-sm disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {sending ? (
                      <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Sending...</>
                    ) : (
                      <><Send size={14} /> Send Order Inquiry</>
                    )}
                  </motion.button>
                )}
                {view === "cart" && (
                  <button onClick={clearCart} className="w-full text-center text-xs text-muted/50 hover:text-muted transition-colors">Clear cart</button>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
