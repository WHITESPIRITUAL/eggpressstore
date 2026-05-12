import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useGetPrices } from "@workspace/api-client-react";

export default function MarketPrices() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { data: prices, isLoading } = useGetPrices();

  const sizes: Array<"large" | "medium" | "small"> = ["large", "medium", "small"];
  const sizeLabels = { large: "Large Eggs", medium: "Medium Eggs", small: "Small Eggs" };

  return (
    <section ref={ref} className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(245,184,0,0.06) 0%, transparent 70%)" }} />
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-primary font-sans text-sm uppercase tracking-[0.2em] mb-3">Transparent Pricing</p>
          <h2 className="font-heading font-black text-4xl md:text-6xl text-foreground">Today's Market Prices</h2>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/15 text-accent text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Prices updated based on current market rates
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glassmorphism rounded-3xl overflow-hidden"
          style={{ boxShadow: "0 24px 64px rgba(245,184,0,0.12)" }}
        >
          {/* Header row */}
          <div className="grid grid-cols-4 px-6 py-4 border-b border-white/10 bg-primary/10">
            <div className="font-heading font-bold text-foreground text-sm uppercase tracking-widest">Egg Size</div>
            <div className="font-heading font-bold text-primary text-sm uppercase tracking-widest text-center">Full Crate<br /><span className="text-xs text-muted-foreground font-normal normal-case tracking-normal">(30 eggs)</span></div>
            <div className="font-heading font-bold text-primary text-sm uppercase tracking-widest text-center">Half Crate<br /><span className="text-xs text-muted-foreground font-normal normal-case tracking-normal">(15 eggs)</span></div>
            <div className="font-heading font-bold text-primary text-sm uppercase tracking-widest text-center">Quarter Crate<br /><span className="text-xs text-muted-foreground font-normal normal-case tracking-normal">(8 eggs)</span></div>
          </div>

          {isLoading ? (
            <div className="p-8 space-y-4">
              {[1, 2, 3].map(i => <div key={i} className="h-14 bg-muted/50 rounded-xl animate-pulse" />)}
            </div>
          ) : (
            sizes.map((size, i) => {
              const price = prices?.find(p => p.size === size);
              return (
                <motion.div
                  key={size}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className={`grid grid-cols-4 px-6 py-5 items-center ${i < 2 ? "border-b border-white/8" : ""} hover:bg-white/4 transition-colors duration-200`}
                >
                  <div className="font-heading font-semibold text-foreground">{sizeLabels[size]}</div>
                  <div className="text-center">
                    <span className="font-heading font-black text-xl text-primary">
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

          <div className="px-6 py-4 bg-muted/30 border-t border-white/10">
            <p className="text-xs text-muted-foreground font-sans">Prices may vary based on market conditions. Bulk discounts available — call or WhatsApp 09013698449</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
