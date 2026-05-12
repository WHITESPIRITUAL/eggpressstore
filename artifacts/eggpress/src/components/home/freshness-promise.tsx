import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const promises = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path d="M8 12.5c1-1.5 2.5-2.5 4-2.5s3 1 4 2.5" strokeLinecap="round" />
        <path d="M12 6v2M9 7l1 1.5M15 7l-1 1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Farm Fresh Daily",
    body: "Every egg is collected fresh from our trusted partner farms each morning and delivered to your door the same day. Zero cold storage, zero compromise.",
    color: "#4CAF50",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Reliable Supply",
    body: "Never run short. We maintain consistent stock levels through our established supply chain, ensuring your orders are always fulfilled — rain or shine.",
    color: "#F5B800",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Lightning Fast Delivery",
    body: "Order before noon, receive your eggs today. Our Benin City delivery network is optimized for speed, reliability and careful handling.",
    color: "#E8820C",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: "Quality Guaranteed",
    body: "If you're ever unhappy with your eggs, we make it right. Our quality guarantee means every single egg meets our farm-fresh standard.",
    color: "#E8820C",
  },
];

export default function FreshnessPromise() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(76,175,80,0.06) 0%, transparent 70%)" }} />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-accent font-sans text-sm uppercase tracking-[0.2em] mb-3">Our Promise</p>
          <h2 className="font-heading font-black text-4xl md:text-6xl text-foreground">The Eggpress Standard</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Every order is backed by our four non-negotiable commitments</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {promises.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="glassmorphism rounded-2xl p-6 group hover:border-white/20 transition-all duration-300"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${p.color}18`, color: p.color }}
              >
                {p.icon}
              </div>
              <h3 className="font-heading font-bold text-lg text-foreground mb-3">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Cinematic quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <blockquote className="font-heading font-light text-2xl md:text-3xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            "We supply to <span className="text-primary font-semibold">homes</span>, <span className="text-primary font-semibold">food vendors</span>, <span className="text-primary font-semibold">shops</span>, and <span className="text-primary font-semibold">restaurants</span> — one crate at a time."
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
