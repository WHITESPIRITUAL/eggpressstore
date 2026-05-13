import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useGetPrices } from "@/lib/api";

interface EggCategoriesProps {
  onSelect: (size: "large" | "medium" | "small") => void;
}

function EggIllustration({ size }: { size: "large" | "medium" | "small" }) {
  const dims = size === "large" ? 90 : size === "medium" ? 72 : 58;
  const fill = size === "large" ? "#F5B800" : size === "medium" ? "#E8820C" : "#FF5500";
  return (
    <svg width={dims} height={Math.round(dims * 1.25)} viewBox="0 0 80 100" fill="none" className="mx-auto drop-shadow-lg">
      <ellipse cx="40" cy="58" rx="32" ry="38" fill="#FFF0C0" stroke={fill} strokeWidth="2"/>
      <ellipse cx="40" cy="30" rx="22" ry="28" fill="#FFFDF5" stroke={fill} strokeWidth="1.5"/>
      <ellipse cx="30" cy="22" rx="8" ry="10" fill="white" opacity="0.35" />
    </svg>
  );
}

const sizeInfo = {
  large: {
    label: "Large Eggs",
    description: "Premium grade A, perfect for restaurants, caterers & bulk buyers",
    tag: "Most Popular",
    accent: "#F5B800",
    glow: "rgba(245,184,0,0.2)",
  },
  medium: {
    label: "Medium Eggs",
    description: "Versatile everyday eggs, ideal for homes and food vendors",
    tag: "Best Value",
    accent: "#E8820C",
    glow: "rgba(232,130,12,0.2)",
  },
  small: {
    label: "Small Eggs",
    description: "Light & affordable, great for baking and quick meals",
    tag: "Budget Pick",
    accent: "#FF5500",
    glow: "rgba(255,85,0,0.2)",
  },
};

function FloatEgg({ style }: { style: React.CSSProperties }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={style}
      animate={{ y: [0, -18, 0], rotate: [0, 8, 0] }}
      transition={{ duration: 5 + Math.random() * 3, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}
    >
      <svg width="28" height="35" viewBox="0 0 80 100" fill="none" opacity="0.18">
        <ellipse cx="40" cy="58" rx="32" ry="38" fill="#F5B800"/>
        <ellipse cx="40" cy="30" rx="22" ry="28" fill="#FFF8E7"/>
      </svg>
    </motion.div>
  );
}

export default function EggCategories({ onSelect }: EggCategoriesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { data: pricesData } = useGetPrices();
  const prices = Array.isArray(pricesData) ? pricesData : [];

  const sizes: Array<"large" | "medium" | "small"> = ["large", "medium", "small"];

  return (
    <section ref={ref} className="py-24 px-6 relative overflow-hidden">
      {/* Section background */}
      <div className="absolute inset-0 section-bg-amber" />
      <div className="absolute inset-0 stripe-texture opacity-60" />

      {/* Decorative floating eggs */}
      <FloatEgg style={{ left: "2%", top: "15%" }} />
      <FloatEgg style={{ right: "3%", top: "30%" }} />
      <FloatEgg style={{ left: "8%", bottom: "20%" }} />
      <FloatEgg style={{ right: "7%", bottom: "15%" }} />

      {/* Glowing orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(245,184,0,0.05) 0%, transparent 70%)", filter: "blur(40px)" }} />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,85,0,0.05) 0%, transparent 70%)", filter: "blur(40px)" }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <motion.p
            className="font-sans text-sm uppercase tracking-[0.2em] mb-3 font-semibold"
            style={{ color: "#F5B800" }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >✦ Our Products ✦</motion.p>
          <h2 className="font-heading font-black text-4xl md:text-6xl text-foreground">Premium Egg Sizes</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Sourced fresh every morning from trusted farms across Nigeria</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sizes.map((size, i) => {
            const info = sizeInfo[size];
            const price = prices.find((p) => p.size === size);
            return (
              <motion.div
                key={size}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                whileHover={{ y: -10, boxShadow: `0 28px 70px ${info.glow}` }}
                onClick={() => onSelect(size)}
                data-testid={`card-egg-${size}`}
                className="rounded-2xl p-8 cursor-pointer group relative overflow-hidden transition-all duration-300"
                style={{
                  background: "rgba(20,10,0,0.6)",
                  border: `1px solid ${info.accent}28`,
                  backdropFilter: "blur(16px)",
                }}
              >
                {/* Top color accent bar */}
                <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl" style={{ background: `linear-gradient(90deg, transparent, ${info.accent}, transparent)` }} />

                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(ellipse at 50% 0%, ${info.glow} 0%, transparent 70%)` }} />

                {/* Tag */}
                <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide mb-6" style={{ background: `${info.accent}18`, color: info.accent, border: `1px solid ${info.accent}30` }}>
                  {info.tag}
                </div>

                {/* Egg illustration */}
                <motion.div
                  whileHover={{ scale: 1.12, rotate: 6 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="mb-6"
                >
                  <EggIllustration size={size} />
                </motion.div>

                <h3 className="font-heading font-bold text-2xl text-foreground mb-2">{info.label}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">{info.description}</p>

                {/* Prices */}
                {price ? (
                  <div className="space-y-2 border-t pt-4" style={{ borderColor: `${info.accent}20` }}>
                    <div className="flex justify-between text-sm items-center">
                      <span className="text-muted-foreground">Full Crate</span>
                      <span className="font-bold text-base" style={{ color: info.accent }}>₦{price.fullCrate.toLocaleString()}</span>
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
                  <div className="space-y-2 border-t border-white/10 pt-4">
                    {[1, 2, 3].map(j => <div key={j} className="h-4 bg-muted rounded animate-pulse" />)}
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  data-testid={`button-order-${size}`}
                  className="mt-6 w-full py-3 rounded-xl font-heading font-semibold text-sm tracking-wide transition-all duration-300"
                  style={{ background: `${info.accent}22`, border: `1px solid ${info.accent}40`, color: info.accent }}
                >
                  Order {info.label} →
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
