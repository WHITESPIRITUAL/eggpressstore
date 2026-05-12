import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useGetPrices } from "@workspace/api-client-react";

interface EggCategoriesProps {
  onSelect: (size: "large" | "medium" | "small") => void;
}

function EggIllustration({ size }: { size: "large" | "medium" | "small" }) {
  const dims = size === "large" ? 90 : size === "medium" ? 72 : 58;
  return (
    <svg width={dims} height={Math.round(dims * 1.25)} viewBox="0 0 80 100" fill="none" className="mx-auto">
      <ellipse cx="40" cy="58" rx="32" ry="38" fill="url(#catEggGradB)" />
      <ellipse cx="40" cy="30" rx="22" ry="28" fill="url(#catEggGradT)" />
      <ellipse cx="30" cy="22" rx="8" ry="10" fill="white" opacity="0.25" />
      <defs>
        <radialGradient id="catEggGradB" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#FFFDF5" />
          <stop offset="55%" stopColor="#F5D080" />
          <stop offset="100%" stopColor="#C8680A" />
        </radialGradient>
        <radialGradient id="catEggGradT" cx="40%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#FFFDF5" />
          <stop offset="100%" stopColor="#F5B800" />
        </radialGradient>
      </defs>
    </svg>
  );
}

const sizeInfo = {
  large: { label: "Large Eggs", description: "Premium grade A, perfect for restaurants, caterers & bulk buyers", tag: "Most Popular" },
  medium: { label: "Medium Eggs", description: "Versatile everyday eggs, ideal for homes and food vendors", tag: "Best Value" },
  small: { label: "Small Eggs", description: "Light & affordable, great for baking and quick meals", tag: "Budget Pick" },
};

export default function EggCategories({ onSelect }: EggCategoriesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { data: prices } = useGetPrices();

  const sizes: Array<"large" | "medium" | "small"> = ["large", "medium", "small"];

  return (
    <section ref={ref} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-sans text-sm uppercase tracking-[0.2em] mb-3">Our Products</p>
          <h2 className="font-heading font-black text-4xl md:text-6xl text-foreground">Premium Egg Sizes</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Sourced fresh every morning from trusted farms across Nigeria</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sizes.map((size, i) => {
            const info = sizeInfo[size];
            const price = prices?.find((p) => p.size === size);
            return (
              <motion.div
                key={size}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                whileHover={{ y: -8, boxShadow: "0 24px 60px rgba(245,184,0,0.25)" }}
                onClick={() => onSelect(size)}
                data-testid={`card-egg-${size}`}
                className="glassmorphism rounded-2xl p-8 cursor-pointer group relative overflow-hidden transition-all duration-300"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(245,184,0,0.12) 0%, transparent 70%)" }} />

                {/* Tag */}
                <div className="inline-block px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-medium tracking-wide mb-6">
                  {info.tag}
                </div>

                {/* Egg illustration */}
                <motion.div
                  whileHover={{ scale: 1.08, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="mb-6"
                >
                  <EggIllustration size={size} />
                </motion.div>

                <h3 className="font-heading font-bold text-2xl text-foreground mb-2">{info.label}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">{info.description}</p>

                {/* Prices */}
                {price ? (
                  <div className="space-y-1 border-t border-white/10 pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Full Crate</span>
                      <span className="text-primary font-bold">₦{price.fullCrate.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Half Crate</span>
                      <span className="text-foreground font-medium">₦{price.halfCrate.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Quarter Crate</span>
                      <span className="text-foreground font-medium">₦{price.quarterCrate.toLocaleString()}</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1 border-t border-white/10 pt-4">
                    {[1, 2, 3].map(j => <div key={j} className="h-4 bg-muted rounded animate-pulse" />)}
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  data-testid={`button-order-${size}`}
                  className="mt-6 w-full py-3 rounded-xl font-heading font-semibold text-sm tracking-wide transition-all duration-300"
                  style={{ background: "linear-gradient(135deg, rgba(245,184,0,0.2) 0%, rgba(232,130,12,0.2) 100%)", border: "1px solid rgba(245,184,0,0.3)", color: "#F5B800" }}
                >
                  Order {info.label}
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
