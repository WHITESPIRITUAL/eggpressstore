import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroLady from "../../assets/hero-lady-nobg.png";
import logoImg from "../../assets/eggpress-logo-nobg.png";

interface HeroProps {
  onOrder: () => void;
  onTrack: () => void;
}

function EggCrate({ x, y, size = 100, delay = 0, rotate = 0 }: { x: string; y: string; size?: number; delay?: number; rotate?: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      animate={{ y: [0, -14, 0], rotate: [rotate, rotate + 4, rotate] }}
      transition={{ duration: 6, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width={size} height={Math.round(size * 0.75)} viewBox="0 0 140 105" fill="none">
        <rect x="4" y="36" width="132" height="65" rx="6" fill="#6B3410" stroke="#3D1800" strokeWidth="2.5"/>
        <line x1="4" y1="58" x2="136" y2="58" stroke="#3D1800" strokeWidth="2"/>
        <line x1="4" y1="78" x2="136" y2="78" stroke="#3D1800" strokeWidth="2"/>
        <line x1="48" y1="36" x2="48" y2="101" stroke="#3D1800" strokeWidth="2"/>
        <line x1="92" y1="36" x2="92" y2="101" stroke="#3D1800" strokeWidth="2"/>
        <rect x="4" y="36" width="132" height="8" rx="3" fill="#8B4513" opacity="0.6"/>
        <ellipse cx="26" cy="49" rx="14" ry="10" fill="#FFF8E7" stroke="#D4B87A" strokeWidth="1.5"/>
        <ellipse cx="70" cy="49" rx="14" ry="10" fill="#FFFCF0" stroke="#D4B87A" strokeWidth="1.5"/>
        <ellipse cx="114" cy="49" rx="14" ry="10" fill="#FFF8E7" stroke="#D4B87A" strokeWidth="1.5"/>
        <ellipse cx="26" cy="68" rx="14" ry="10" fill="#FFFCF0" stroke="#D4B87A" strokeWidth="1.5"/>
        <ellipse cx="70" cy="68" rx="14" ry="10" fill="#FFF8E7" stroke="#D4B87A" strokeWidth="1.5"/>
        <ellipse cx="114" cy="68" rx="14" ry="10" fill="#FFFCF0" stroke="#D4B87A" strokeWidth="1.5"/>
        <ellipse cx="26" cy="88" rx="14" ry="10" fill="#FFF8E7" stroke="#D4B87A" strokeWidth="1.5"/>
        <ellipse cx="70" cy="88" rx="14" ry="10" fill="#FFFCF0" stroke="#D4B87A" strokeWidth="1.5"/>
        <ellipse cx="114" cy="88" rx="14" ry="10" fill="#FFF8E7" stroke="#D4B87A" strokeWidth="1.5"/>
        <path d="M32 36 Q70 10 108 36" stroke="#8B4513" strokeWidth="4" fill="none" strokeLinecap="round"/>
      </svg>
    </motion.div>
  );
}

function FloatingEgg({ x, y, size, delay, duration, rotate }: { x: string; y: string; size: number; delay: number; duration: number; rotate: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      animate={{ y: [0, -24, 0], rotate: [rotate, rotate + 10, rotate] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width={size} height={Math.round(size * 1.25)} viewBox="0 0 80 100" fill="none">
        <ellipse cx="40" cy="58" rx="32" ry="38" fill="#F5DFA0" stroke="#C8923A" strokeWidth="2"/>
        <ellipse cx="40" cy="30" rx="22" ry="28" fill="#FFF8E7" stroke="#D4A855" strokeWidth="1.5"/>
        <ellipse cx="30" cy="22" rx="7" ry="9" fill="white" opacity="0.4" />
      </svg>
    </motion.div>
  );
}

function Sparkle({ x, y, delay }: { x: string; y: string; delay: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      animate={{ opacity: [0, 1, 0], scale: [0.5, 1.3, 0.5] }}
      transition={{ duration: 2.8, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <path d="M8 0 L9.2 6.8 L16 8 L9.2 9.2 L8 16 L6.8 9.2 L0 8 L6.8 6.8 Z" fill="#F5B800"/>
      </svg>
    </motion.div>
  );
}

export default function Hero({ onOrder, onTrack }: HeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const eggs = [
    { x: "5%", y: "10%", size: 64, delay: 0, duration: 5.5, rotate: -12 },
    { x: "88%", y: "7%", size: 80, delay: 0.8, duration: 6.2, rotate: 15 },
    { x: "2%", y: "60%", size: 48, delay: 0.4, duration: 7, rotate: 20 },
    { x: "28%", y: "4%", size: 40, delay: 2, duration: 6.5, rotate: 8 },
    { x: "91%", y: "65%", size: 42, delay: 0.6, duration: 5.8, rotate: -5 },
    { x: "20%", y: "80%", size: 36, delay: 1.4, duration: 7.5, rotate: 30 },
    { x: "75%", y: "18%", size: 30, delay: 3, duration: 5, rotate: -20 },
  ];

  const sparkles = [
    { x: "15%", y: "35%", delay: 0 },
    { x: "40%", y: "15%", delay: 1 },
    { x: "65%", y: "45%", delay: 0.5 },
    { x: "82%", y: "30%", delay: 1.8 },
    { x: "55%", y: "72%", delay: 2.3 },
    { x: "8%", y: "48%", delay: 0.9 },
    { x: "72%", y: "60%", delay: 3.2 },
  ];

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background — rich multi-layer */}
      <div className="absolute inset-0" style={{ background: "#0A0500" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 90% 70% at 25% 40%, rgba(245,184,0,0.18) 0%, rgba(232,130,12,0.10) 40%, transparent 75%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 80% at 80% 65%, rgba(180,60,0,0.12) 0%, transparent 65%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 40% 50% at 50% 100%, rgba(245,100,0,0.08) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "repeating-linear-gradient(45deg, #F5B800 0px, #F5B800 1px, transparent 1px, transparent 40px)" }} />
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "repeating-linear-gradient(0deg, #F5B800 0px, #F5B800 1px, transparent 1px, transparent 60px)" }} />
      </div>

      {/* Sparkles */}
      <motion.div className="absolute inset-0" style={{ y }}>
        {sparkles.map((s, i) => <Sparkle key={i} {...s} />)}
      </motion.div>

      {/* Floating eggs */}
      <motion.div className="absolute inset-0" style={{ y }}>
        {eggs.map((egg, i) => <FloatingEgg key={i} {...egg} />)}
      </motion.div>

      {/* Egg crates */}
      <EggCrate x="1%" y="72%" size={90} delay={0.5} rotate={-8} />
      <EggCrate x="84%" y="55%" size={75} delay={1.5} rotate={12} />
      <EggCrate x="55%" y="5%" size={60} delay={2.5} rotate={-5} />

      {/* Lady image — right side */}
      <motion.div
        className="absolute bottom-0 right-0 h-full w-[48%] max-w-[640px] pointer-events-none hidden lg:block"
        style={{ y: imageY }}
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bottom-0 left-[10%]" style={{ background: "radial-gradient(ellipse 70% 80% at 50% 80%, rgba(245,184,0,0.22) 0%, rgba(232,100,0,0.12) 50%, transparent 80%)" }} />
        <img
          src={heroLady}
          alt="Fresh eggs delivery"
          className="w-full h-full object-contain object-bottom"
          style={{ filter: "drop-shadow(0 0 80px rgba(245,184,0,0.4)) drop-shadow(0 0 30px rgba(232,130,12,0.3))" }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-left px-8 md:px-16 max-w-5xl w-full mx-auto pt-24"
        style={{ opacity }}
      >
        <div className="max-w-2xl">
          {/* Logo + badge row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4 mb-6"
          >
            <motion.img
              src={logoImg}
              alt="Eggpress Logo"
              className="w-14 h-14 object-contain"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ filter: "drop-shadow(0 0 16px rgba(245,184,0,0.6))" }}
            />
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium tracking-wide"
              style={{ border: "1px solid rgba(245,184,0,0.30)", background: "rgba(245,184,0,0.08)", color: "#F5B800" }}
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Now delivering in Benin City, Nigeria
            </div>
          </motion.div>

          {/* Giant split wordmark — hairline stroke */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div
              className="leading-[0.86] mb-5 tracking-wider select-none"
              style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(5rem,15vw,12rem)" }}
            >
              <motion.span
                style={{
                  color: "#F5B800",
                  WebkitTextStroke: "1px rgba(61,28,0,0.8)",
                  paintOrder: "stroke fill",
                  display: "inline-block",
                  filter: "drop-shadow(0 4px 30px rgba(245,184,0,0.5))",
                }}
                animate={{ filter: ["drop-shadow(0 4px 30px rgba(245,184,0,0.4))", "drop-shadow(0 4px 50px rgba(245,184,0,0.75))", "drop-shadow(0 4px 30px rgba(245,184,0,0.4))"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >EGG</motion.span>
              <motion.span
                style={{
                  color: "#FF5500",
                  WebkitTextStroke: "1px rgba(26,8,0,0.8)",
                  paintOrder: "stroke fill",
                  display: "inline-block",
                  filter: "drop-shadow(0 4px 30px rgba(255,85,0,0.4))",
                }}
                animate={{ filter: ["drop-shadow(0 4px 30px rgba(255,85,0,0.4))", "drop-shadow(0 4px 50px rgba(255,85,0,0.65))", "drop-shadow(0 4px 30px rgba(255,85,0,0.4))"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              >PRESS</motion.span>
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-heading font-black text-3xl md:text-5xl text-foreground leading-tight mb-4"
          >
            Fresh Eggs, <span style={{ color: "#F5B800" }}>Delivered Fast.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="text-muted-foreground text-lg max-w-lg mb-10 leading-relaxed font-sans"
          >
            Farm-fresh eggs from trusted Nigerian farms, delivered straight to your doorstep in Benin City. Quality you can taste.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              onClick={onOrder}
              whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(245,184,0,0.6)" }}
              whileTap={{ scale: 0.97 }}
              data-testid="button-order-now"
              className="px-10 py-4 rounded-full font-heading font-bold text-lg tracking-wide text-primary-foreground relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #F5B800 0%, #E8820C 100%)", border: "1px solid rgba(61,28,0,0.6)", boxShadow: "0 4px 30px rgba(245,184,0,0.35), inset 0 1px 0 rgba(255,255,255,0.25)" }}
            >
              🥚 Order Now
            </motion.button>
            <motion.button
              onClick={onTrack}
              whileHover={{ scale: 1.05, borderColor: "rgba(245,184,0,0.7)", backgroundColor: "rgba(245,184,0,0.08)" }}
              whileTap={{ scale: 0.97 }}
              data-testid="button-track-order"
              className="px-10 py-4 rounded-full text-foreground font-heading font-semibold text-lg tracking-wide transition-all duration-300"
              style={{ border: "1px solid rgba(245,184,0,0.35)", background: "rgba(255,255,255,0.04)", backdropFilter: "blur(8px)" }}
            >
              Track Order
            </motion.button>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex gap-6 mt-10"
          >
            {[
              { label: "Orders Today", value: "200+" },
              { label: "Happy Customers", value: "5,000+" },
              { label: "Delivery Time", value: "< 2hrs" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-heading font-bold text-xl" style={{ color: "#F5B800" }}>{stat.value}</div>
                <div className="text-xs text-muted-foreground tracking-wide">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-8 md:left-16"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full flex justify-center pt-2"
            style={{ border: "1px solid rgba(245,184,0,0.4)" }}
          >
            <div className="w-1.5 h-2.5 rounded-full" style={{ background: "#F5B800" }} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
