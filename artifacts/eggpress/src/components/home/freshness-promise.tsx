import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const promises = [
  {
    icon: "🌿",
    title: "Farm Fresh Daily",
    body: "Every egg is collected fresh from our trusted partner farms each morning and delivered to your door the same day. Zero cold storage, zero compromise.",
    color: "#4CAF50",
    glow: "rgba(76,175,80,0.15)",
  },
  {
    icon: "🛡️",
    title: "Reliable Supply",
    body: "Never run short. We maintain consistent stock levels through our established supply chain, ensuring your orders are always fulfilled — rain or shine.",
    color: "#F5B800",
    glow: "rgba(245,184,0,0.15)",
  },
  {
    icon: "⚡",
    title: "Lightning Delivery",
    body: "Order before noon, receive your eggs today. Our Benin City delivery network is optimized for speed, reliability and careful handling.",
    color: "#E8820C",
    glow: "rgba(232,130,12,0.15)",
  },
  {
    icon: "❤️",
    title: "Quality Guaranteed",
    body: "If you're ever unhappy with your eggs, we make it right. Our quality guarantee means every single egg meets our farm-fresh standard.",
    color: "#FF5500",
    glow: "rgba(255,85,0,0.15)",
  },
];

export default function FreshnessPromise() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 px-6 relative overflow-hidden">
      {/* Rich multi-color background */}
      <div className="absolute inset-0 section-bg-green" />
      <div className="absolute inset-0 grid-texture" />

      {/* Glowing orbs */}
      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(76,175,80,0.08) 0%, transparent 70%)", filter: "blur(50px)" }} />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(245,184,0,0.07) 0%, transparent 70%)", filter: "blur(50px)" }} />

      {/* Floating accent eggs */}
      {[
        { top: "10%", left: "1%", delay: 0 },
        { top: "60%", right: "2%", delay: 1.5 },
        { bottom: "10%", left: "5%", delay: 0.8 },
      ].map((pos, i) => (
        <motion.div key={i} className="absolute pointer-events-none" style={pos}
          animate={{ y: [0, -16, 0] }} transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: pos.delay as number }}>
          <svg width="24" height="30" viewBox="0 0 80 100" fill="none" opacity="0.15">
            <ellipse cx="40" cy="58" rx="32" ry="38" fill="#4CAF50"/>
            <ellipse cx="40" cy="30" rx="22" ry="28" fill="#A5D6A7"/>
          </svg>
        </motion.div>
      ))}

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <motion.p
            className="font-sans text-sm uppercase tracking-[0.2em] mb-3 font-semibold"
            style={{ color: "#4CAF50" }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >✦ Our Promise ✦</motion.p>
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
              whileHover={{ y: -6, boxShadow: `0 20px 50px ${p.glow}` }}
              className="rounded-2xl p-6 group transition-all duration-300 relative overflow-hidden"
              style={{ background: "rgba(15,8,0,0.65)", border: `1px solid ${p.color}22`, backdropFilter: "blur(16px)" }}
            >
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${p.color}70, transparent)` }} />

              {/* Icon */}
              <motion.div
                className="text-4xl mb-5 block"
                whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.4 }}
              >
                {p.icon}
              </motion.div>

              {/* Color dot */}
              <div className="w-2 h-2 rounded-full mb-4" style={{ background: p.color, boxShadow: `0 0 8px ${p.color}` }} />

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
          <div className="inline-block relative px-8 py-6 rounded-2xl" style={{ background: "rgba(245,184,0,0.05)", border: "1px solid rgba(245,184,0,0.12)" }}>
            <div className="absolute -top-3 left-8 text-4xl" style={{ color: "#F5B800", opacity: 0.4 }}>"</div>
            <blockquote className="font-heading font-light text-xl md:text-2xl text-foreground/75 max-w-3xl mx-auto leading-relaxed">
              We supply to{" "}
              {["homes", "food vendors", "shops", "restaurants"].map((w, i) => (
                <motion.span key={w} style={{ color: ["#F5B800", "#E8820C", "#4CAF50", "#FF5500"][i] }} className="font-semibold"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                >{w}{i < 3 ? ", " : ""}</motion.span>
              ))}
              {" "}— one crate at a time.
            </blockquote>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
