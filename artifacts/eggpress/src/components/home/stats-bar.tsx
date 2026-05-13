import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { label: "Orders Delivered", value: "500+", icon: "📦" },
  { label: "Benin City Coverage", value: "All Areas", icon: "🗺️" },
  { label: "Delivery Time", value: "Same Day", icon: "⚡" },
  { label: "Farm-Fresh Daily", value: "100%", icon: "🌿" },
  { label: "Trusted Farmers", value: "12+", icon: "👨‍🌾" },
  { label: "Happy Customers", value: "200+", icon: "❤️" },
];

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-0 overflow-hidden">
      {/* Glowing separator line */}
      <div className="relative">
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent 0%, rgba(245,184,0,0.5) 30%, rgba(255,85,0,0.5) 50%, rgba(245,184,0,0.5) 70%, transparent 100%)" }} />
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 h-full w-24"
          style={{ background: "linear-gradient(90deg, transparent, rgba(245,184,0,0.8), transparent)" }}
        />
      </div>

      <div
        className="relative py-5"
        style={{
          background: "linear-gradient(90deg, rgba(245,184,0,0.06) 0%, rgba(255,85,0,0.04) 50%, rgba(245,184,0,0.06) 100%)",
        }}
      >
        {/* Grid texture */}
        <div className="absolute inset-0 grid-texture pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-0 overflow-x-auto no-scrollbar"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-center flex-shrink-0"
            >
              <div className="px-8 py-3 text-center flex-shrink-0">
                <div className="text-lg mb-0.5">{stat.icon}</div>
                <div className="font-heading font-black text-xl tracking-wide" style={{ color: i % 2 === 0 ? "#F5B800" : "#FF5500" }}>{stat.value}</div>
                <div className="font-sans text-xs text-muted-foreground uppercase tracking-widest mt-0.5">{stat.label}</div>
              </div>
              {i < stats.length - 1 && (
                <div className="w-px h-12 flex-shrink-0" style={{ background: "linear-gradient(180deg, transparent, rgba(245,184,0,0.3), transparent)" }} />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent 0%, rgba(245,184,0,0.5) 30%, rgba(255,85,0,0.5) 50%, rgba(245,184,0,0.5) 70%, transparent 100%)" }} />
    </section>
  );
}
