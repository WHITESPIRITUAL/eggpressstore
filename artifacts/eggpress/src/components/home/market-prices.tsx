import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useGetPrices } from "@workspace/api-client-react";

const sizeEmoji = { large: "🥚", medium: "🥚", small: "🥚" };
const sizeColors = { large: "#F5B800", medium: "#E8820C", small: "#FF5500" };

export default function MarketPrices() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { data: prices, isLoading } = useGetPrices();

  const sizes: Array<"large" | "medium" | "small"> = ["large", "medium", "small"];
  const sizeLabels = { large: "Large Eggs", medium: "Medium Eggs", small: "Small Eggs" };

  return (
    <section ref={ref} className="py-24 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 section-bg-orange" />
      <div className="absolute inset-0 grid-texture" />

      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(245,184,0,0.06) 0%, transparent 70%)", filter: "blur(40px)" }} />
      <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,85,0,0.06) 0%, transparent 70%)", filter: "blur(40px)" }} />

      {/* Floating eggs decoration */}
      {[{ top: "15%", right: "3%" }, { bottom: "20%", left: "2%" }].map((pos, i) => (
        <motion.div key={i} className="absolute pointer-events-none" style={pos}
          animate={{ y: [0, -14, 0] }} transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}>
          <svg width="30" height="38" viewBox="0 0 80 100" fill="none" opacity="0.14">
            <ellipse cx="40" cy="58" rx="32" ry="38" fill="#E8820C"/>
            <ellipse cx="40" cy="30" rx="22" ry="28" fill="#FFF8E7"/>
          </svg>
        </motion.div>
      ))}

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <motion.p
            className="font-sans text-sm uppercase tracking-[0.2em] mb-3 font-semibold"
            style={{ color: "#E8820C" }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >✦ Transparent Pricing ✦</motion.p>
          <h2 className="font-heading font-black text-4xl md:text-6xl text-foreground">Today's Market Prices</h2>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium" style={{ background: "rgba(76,175,80,0.12)", color: "#4CAF50", border: "1px solid rgba(76,175,80,0.25)" }}>
            <motion.span className="w-2 h-2 rounded-full bg-green-400" animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
            Prices updated based on current market rates
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="rounded-3xl overflow-hidden"
          style={{ background: "rgba(15,8,0,0.7)", border: "1px solid rgba(245,184,0,0.15)", backdropFilter: "blur(20px)", boxShadow: "0 24px 64px rgba(245,184,0,0.12)" }}
        >
          {/* Header row */}
          <div className="grid grid-cols-4 px-6 py-4 border-b" style={{ borderColor: "rgba(245,184,0,0.12)", background: "rgba(245,184,0,0.08)" }}>
            <div className="font-heading font-bold text-foreground text-sm uppercase tracking-widest">Egg Size</div>
            <div className="font-heading font-bold text-sm uppercase tracking-widest text-center" style={{ color: "#F5B800" }}>Full Crate<br /><span className="text-xs text-muted-foreground font-normal normal-case tracking-normal">(30 eggs)</span></div>
            <div className="font-heading font-bold text-sm uppercase tracking-widest text-center" style={{ color: "#E8820C" }}>Half Crate<br /><span className="text-xs text-muted-foreground font-normal normal-case tracking-normal">(15 eggs)</span></div>
            <div className="font-heading font-bold text-sm uppercase tracking-widest text-center" style={{ color: "#FF5500" }}>Quarter<br /><span className="text-xs text-muted-foreground font-normal normal-case tracking-normal">(8 eggs)</span></div>
          </div>

          {isLoading ? (
            <div className="p-8 space-y-4">
              {[1, 2, 3].map(i => <div key={i} className="h-14 bg-muted/50 rounded-xl animate-pulse" />)}
            </div>
          ) : (
            sizes.map((size, i) => {
              const price = prices?.find(p => p.size === size);
              const color = sizeColors[size];
              return (
                <motion.div
                  key={size}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  whileHover={{ backgroundColor: "rgba(245,184,0,0.04)" }}
                  className={`grid grid-cols-4 px-6 py-5 items-center transition-colors duration-200 ${i < 2 ? "border-b" : ""}`}
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{sizeEmoji[size]}</span>
                    <span className="font-heading font-semibold text-foreground">{sizeLabels[size]}</span>
                  </div>
                  <div className="text-center">
                    <span className="font-heading font-black text-xl" style={{ color }}>
                      {price ? `₦${Number(price.fullCrate).toLocaleString()}` : "—"}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="font-sans font-semibold text-foreground">
                      {price ? `₦${Number(price.halfCrate).toLocaleString()}` : "—"}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="font-sans font-semibold text-foreground">
                      {price ? `₦${Number(price.quarterCrate).toLocaleString()}` : "—"}
                    </span>
                  </div>
                </motion.div>
              );
            })
          )}

          <div className="px-6 py-4 border-t" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(245,184,0,0.04)" }}>
            <p className="text-xs text-muted-foreground font-sans">Prices may vary based on market conditions. Bulk discounts available — call or WhatsApp 09013698449</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
