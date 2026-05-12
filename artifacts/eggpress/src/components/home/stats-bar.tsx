import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { label: "Orders Delivered", value: "500+" },
  { label: "Benin City Coverage", value: "All Areas" },
  { label: "Delivery Time", value: "Same Day" },
  { label: "Farm-Fresh Daily", value: "100%" },
  { label: "Trusted Farmers", value: "12+" },
  { label: "Happy Customers", value: "200+" },
];

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-6 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(245,184,0,0.07) 50%, transparent 100%)" }} />
      <div className="border-y border-primary/15">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-0 overflow-x-auto no-scrollbar"
        >
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center flex-shrink-0">
              <div className="px-8 py-4 text-center flex-shrink-0">
                <div className="font-heading font-black text-xl text-primary tracking-wide">{stat.value}</div>
                <div className="font-sans text-xs text-muted-foreground uppercase tracking-widest mt-0.5">{stat.label}</div>
              </div>
              {i < stats.length - 1 && (
                <div className="w-px h-10 bg-primary/20 flex-shrink-0" />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
