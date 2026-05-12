import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SubscriptionProps {
  onSubscribe: () => void;
}

const frequencies = [
  { key: "weekly", label: "Weekly", desc: "Fresh eggs every week" },
  { key: "biweekly", label: "Bi-Weekly", desc: "Every two weeks" },
  { key: "monthly", label: "Monthly", desc: "Once a month" },
];

export default function Subscription({ onSubscribe }: SubscriptionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(245,184,0,0.07) 0%, transparent 100%)" }} />

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-primary font-sans text-sm uppercase tracking-[0.2em] mb-3">Never Run Out</p>
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
              className="glassmorphism rounded-2xl p-6 text-center hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="#F5B800" strokeWidth="1.5" className="w-6 h-6">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-lg text-foreground mb-1">{f.label}</h3>
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
            whileHover={{ scale: 1.04, boxShadow: "0 0 50px rgba(245,184,0,0.4)" }}
            whileTap={{ scale: 0.97 }}
            data-testid="button-subscribe"
            className="px-12 py-4 rounded-full font-heading font-bold text-lg tracking-wide"
            style={{ background: "linear-gradient(135deg, #F5B800 0%, #E8820C 100%)", color: "#1A0A00" }}
          >
            Set Up Recurring Delivery
          </motion.button>
          <p className="mt-4 text-muted-foreground text-sm">No lock-in. Cancel or adjust anytime.</p>
        </motion.div>
      </div>
    </section>
  );
}
