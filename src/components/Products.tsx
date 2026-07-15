"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { ShoppingCart, Check } from "lucide-react";
import { useRef, useState } from "react";
import { products, productCategories, type Product } from "@/data/site-data";
import { useCart } from "@/contexts/CartContext";

function ProductCard({ product, index }: { product: Product; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.4), ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl border border-charcoal-light bg-card overflow-hidden hover:shadow-lg hover:shadow-[var(--color-shadow-amber)] transition-all duration-500"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-charcoal">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {product.badge && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-amber text-background text-xs font-semibold">{product.badge}</span>
        )}
      </div>

      <div className="p-5">
        <span className="text-xs uppercase tracking-widest text-muted">{product.category}</span>
        <h3 className="text-base sm:text-lg font-semibold mt-2 mb-2 group-hover:text-amber transition-colors duration-300">{product.name}</h3>
        <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-2">{product.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.specs.slice(0, 3).map((spec) => (
            <span key={spec} className="text-xs px-2.5 py-1 rounded-full bg-charcoal text-muted">{spec}</span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-charcoal-light">
          <span className="text-lg font-bold text-amber">{product.price}</span>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleAdd}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${
              added
                ? "bg-sage text-background border-sage"
                : "border-charcoal-light hover:bg-amber hover:text-background hover:border-amber"
            }`}
          >
            {added ? (
              <span className="flex items-center gap-1">
                <Check size={14} strokeWidth={2.5} />
                Added
              </span>
            ) : (
              "Add to Cart"
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("All");
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  const filtered = activeCategory === "All" ? products : products.filter((p) => p.category === activeCategory);

  return (
    <section id="products" className="py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={headerRef} initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-10 sm:mb-16">
          <span className="text-sm uppercase tracking-widest text-amber mb-3 block">Our Catalogue</span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight italic">
            Solar products,
            <br />
            built for Kenya
          </h2>
          <p className="mt-3 text-muted text-base sm:text-lg max-w-lg">
            From single panels to complete home systems. Everything we sell, we install and service.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }} className="flex gap-2 overflow-x-auto pb-4 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap" style={{ scrollbarWidth: "none" }}>
          {productCategories.map((cat) => (
            <motion.button key={cat} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-200 ${activeCategory === cat ? "bg-amber text-background font-medium" : "bg-charcoal text-muted hover:text-foreground hover:bg-charcoal-light"}`}>
              {cat}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={activeCategory} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
