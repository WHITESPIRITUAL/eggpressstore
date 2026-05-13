import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SubscriptionProps {
  onSubscribe: () => void;
}

const frequencies = [
  { key: "weekly", label: "Weekly", desc: "Fresh eggs every week", icon: "🔄", color: "#F5B800" },
  { key: "biweekly", label: "Bi-Weekly", desc: "Every two weeks", icon: "📅", color: "#E8820C" },
  { key: "monthly", label: "Monthly", desc: "Once a month", icon: "🗓️", color: "#FF5500" },
];

export default function Subscription({ onSubscribe }: SubscriptionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 px-6 relative overflow-hidden">
      {/* Rich background */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 90% 70% at 50% 50%, rgba(245,184,0,0.09) 0%, rgba(255,85,0,0.04) 50%, transparent 80%)" }} />
      <div className="absolute inset-0 grid-texture" />

      {/* Animated rings */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {[200, 320, 440, 560].map((r, i) => (
          <motion.div
            key={r}
            className="absolute rounded-full border"
            style={{ width: r, height: r, top: -r/2, left: -r/2, borderColor: `rgba(245,184,0,${0.06 - i * 0.012})` }}
            animate={{ scale: [1, 1.04, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }}
          />
        ))}
      </div>

      {/* Corner egg crate decorations */}
      <motion.div className="absolute bottom-8 right-8 opacity-15 pointer-events-none"
        animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
        <svg width="80" height="60" viewBox="0 0 140 105" fill="none">
          <rect x="4" y="36" width="132" height="65" rx="6" fill="#6B3410"/>
          <ellipse cx="26" cy="49" rx="14" ry="10" fill="#FFF8E7"/>
          <ellipse cx="70" cy="49" rx="14" ry="10" fill="#FFF8E7"/>
          <ellipse cx="114" cy="49" rx="14" ry="10" fill="#FFF8E7"/>
          <path d="M32 36 Q70 10 108 36" stroke="#8B4513" strokeWidth="4" fill="none"/>
        </svg>
      </motion.div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <motion.p
            className="font-sans text-sm uppercase tracking-[0.2em] mb-3 font-semibold"
            style={{ color: "#F5B800" }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >✦ Never Run Out ✦</motion.p>
          <h2 className="font-heading font-black text-4xl md:text-6xl text-foreground">Recurring Delivery</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Set up a subscription and we'll deliver fresh eggs on your schedule — automatically</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {frequencies.map((f, i) => (
            <motion.div
              key={f.key}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -6, boxShadow: `0 16px 40px rgba(245,184,0,0.15)` }}
              className="rounded-2xl p-6 text-center transition-all duration-300 relative overflow-hidden"
              style={{ background: "rgba(15,8,0,0.65)", border: `1px solid ${f.color}25`, backdropFilter: "blur(16px)" }}
            >
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${f.color}70, transparent)` }} />
              <motion.div
                className="text-4xl mb-4 block"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
              >{f.icon}</motion.div>
              <h3 className="font-heading font-bold text-lg text-foreground mb-1" style={{ color: f.color }}>{f.label}</h3>
              <p className="text-muted-foreground text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-center"
        >
          <motion.button
            onClick={onSubscribe}
            whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(245,184,0,0.5)" }}
            whileTap={{ scale: 0.97 }}
            data-testid="button-subscribe"
            className="px-12 py-4 rounded-full font-heading font-bold text-lg tracking-wide relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #F5B800 0%, #FF5500 100%)", color: "#1A0A00", border: "1px solid rgba(61,28,0,0.5)" }}
          >
            <motion.span
              className="absolute inset-0 rounded-full"
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ background: "linear-gradient(135deg, white, transparent)" }}
            />
            <span className="relative z-10">🥚 Set Up Recurring Delivery</span>
          </motion.button>
          <p className="mt-4 text-muted-foreground text-sm">No lock-in. Cancel or adjust anytime.</p>
        </motion.div>
      </div>
    </section>
  );
}
