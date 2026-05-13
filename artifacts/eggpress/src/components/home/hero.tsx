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
        <rect x="4" y="36" width="132" height="65" rx="6" fill="#6B3410" stroke="#3D1800" strokeWidth="3"/>
        <line x1="4" y1="58" x2="136" y2="58" stroke="#3D1800" strokeWidth="2.5"/>
        <line x1="4" y1="78" x2="136" y2="78" stroke="#3D1800" strokeWidth="2.5"/>
        <line x1="48" y1="36" x2="48" y2="101" stroke="#3D1800" strokeWidth="2.5"/>
        <line x1="92" y1="36" x2="92" y2="101" stroke="#3D1800" strokeWidth="2.5"/>
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
        <path d="M32 36 Q70 10 108 36" stroke="#8B4513" strokeWidth="5" fill="none" strokeLinecap="round"/>
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
        <ellipse cx="40" cy="58" rx="32" ry="38" fill="#F5DFA0" stroke="#C8923A" strokeWidth="2.5"/>
        <ellipse cx="40" cy="30" rx="22" ry="28" fill="#FFF8E7" stroke="#D4A855" strokeWidth="2"/>
        <ellipse cx="30" cy="22" rx="7" ry="9" fill="white" opacity="0.4" />
      </svg>
    </motion.div>
  );
}

function DeliveryBike() {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ bottom: "12%", left: 0, zIndex: 5 }}
      animate={{ x: ["-160px", "110vw"] }}
      transition={{ duration: 14, repeat: Infinity, ease: "linear", delay: 3 }}
    >
      <svg width="200" height="110" viewBox="0 0 200 110" fill="none">
        <circle cx="38" cy="82" r="22" stroke="#F5B800" strokeWidth="4" fill="rgba(245,184,0,0.08)"/>
        <circle cx="38" cy="82" r="8" fill="#F5B800" opacity="0.4"/>
        <circle cx="162" cy="82" r="22" stroke="#F5B800" strokeWidth="4" fill="rgba(245,184,0,0.08)"/>
        <circle cx="162" cy="82" r="8" fill="#F5B800" opacity="0.4"/>
        <path d="M38 82 L75 44 L110 44 L162 82" stroke="#E8820C" strokeWidth="4" strokeLinecap="round" fill="none"/>
        <path d="M75 44 L88 20 L118 44" stroke="#E8820C" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
        <path d="M110 44 L130 62 L162 62" stroke="#F5B800" strokeWidth="3" strokeLinecap="round" fill="none"/>
        <rect x="90" y="8" width="52" height="36" rx="5" fill="rgba(245,184,0,0.12)" stroke="#F5B800" strokeWidth="2.5"/>
        <line x1="90" y1="22" x2="142" y2="22" stroke="#F5B800" strokeWidth="1.5" opacity="0.6"/>
        <ellipse cx="106" cy="15" rx="6" ry="5" fill="#FFF8E7" stroke="#D4B87A" strokeWidth="1"/>
        <ellipse cx="120" cy="15" rx="6" ry="5" fill="#FFF8E7" stroke="#D4B87A" strokeWidth="1"/>
        <circle cx="88" cy="24" r="10" fill="rgba(245,184,0,0.15)" stroke="#F5B800" strokeWidth="2"/>
        <line x1="78" y1="24" x2="88" y2="24" stroke="#F5B800" strokeWidth="3" strokeLinecap="round"/>
        <line x1="10" y1="56" x2="26" y2="56" stroke="#F5B800" strokeWidth="3" strokeLinecap="round" opacity="0.6"/>
        <line x1="6" y1="64" x2="20" y2="64" stroke="#F5B800" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
        <line x1="12" y1="72" x2="24" y2="72" stroke="#F5B800" strokeWidth="2" strokeLinecap="round" opacity="0.25"/>
      </svg>
    </motion.div>
  );
}

function DeliveryVan() {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ bottom: "8%", left: 0, zIndex: 4 }}
      animate={{ x: ["-280px", "110vw"] }}
      transition={{ duration: 22, repeat: Infinity, ease: "linear", delay: 10 }}
    >
      <svg width="280" height="130" viewBox="0 0 280 130" fill="none">
        <rect x="20" y="38" width="220" height="72" rx="8" fill="rgba(245,184,0,0.10)" stroke="#F5B800" strokeWidth="3"/>
        <path d="M20 72 L20 38 Q20 30 28 30 L180 30 L220 60 L240 60 L240 110 L20 110 Z" fill="rgba(232,130,12,0.08)" stroke="#E8820C" strokeWidth="2.5"/>
        <rect x="30" y="38" width="70" height="42" rx="4" fill="rgba(255,255,255,0.05)" stroke="#F5B800" strokeWidth="2"/>
        <rect x="110" y="38" width="70" height="42" rx="4" fill="rgba(255,255,255,0.05)" stroke="#F5B800" strokeWidth="2"/>
        <line x1="20" y1="75" x2="240" y2="75" stroke="#F5B800" strokeWidth="1.5" opacity="0.3"/>
        <text x="60" y="95" textAnchor="middle" fill="#F5B800" fontSize="11" fontFamily="'Bebas Neue', sans-serif" letterSpacing="2" opacity="0.8">EGGPRESS</text>
        <circle cx="60" cy="118" r="18" stroke="#F5B800" strokeWidth="3.5" fill="rgba(245,184,0,0.08)"/>
        <circle cx="60" cy="118" r="7" fill="#F5B800" opacity="0.35"/>
        <circle cx="200" cy="118" r="18" stroke="#F5B800" strokeWidth="3.5" fill="rgba(245,184,0,0.08)"/>
        <circle cx="200" cy="118" r="7" fill="#F5B800" opacity="0.35"/>
        <line x1="2" y1="80" x2="16" y2="80" stroke="#F5B800" strokeWidth="3" strokeLinecap="round" opacity="0.5"/>
        <line x1="0" y1="90" x2="14" y2="90" strokeWidth="2" stroke="#F5B800" strokeLinecap="round" opacity="0.3"/>
      </svg>
    </motion.div>
  );
}

function Sparkle({ x, y, delay }: { x: string; y: string; delay: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
      transition={{ duration: 2.5, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
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
  ];

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background — rich multi-layer */}
      <div className="absolute inset-0" style={{ background: "#0A0500" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 90% 70% at 25% 40%, rgba(245,184,0,0.18) 0%, rgba(232,130,12,0.10) 40%, transparent 75%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 80% at 80% 65%, rgba(180,60,0,0.12) 0%, transparent 65%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 40% 50% at 50% 100%, rgba(245,100,0,0.08) 0%, transparent 70%)" }} />
        {/* Diagonal stripe texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "repeating-linear-gradient(45deg, #F5B800 0px, #F5B800 1px, transparent 1px, transparent 40px)",
        }} />
        {/* Horizontal scan lines */}
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: "repeating-linear-gradient(0deg, #F5B800 0px, #F5B800 1px, transparent 1px, transparent 60px)",
        }} />
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

      {/* Delivery bike (drives across bottom) */}
      <DeliveryBike />
      <DeliveryVan />

      {/* Lady image — right side */}
      <motion.div
        className="absolute bottom-0 right-0 h-full w-[48%] max-w-[640px] pointer-events-none hidden lg:block"
        style={{ y: imageY }}
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
      >
        {/* Lady glow ring */}
        <div className="absolute inset-0 bottom-0 left-[10%]" style={{
          background: "radial-gradient(ellipse 70% 80% at 50% 80%, rgba(245,184,0,0.22) 0%, rgba(232,100,0,0.12) 50%, transparent 80%)",
        }} />
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium tracking-wide"
              style={{ border: "2px solid rgba(245,184,0,0.35)", background: "rgba(245,184,0,0.10)", color: "#F5B800" }}
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Now delivering in Benin City, Nigeria
            </div>
          </motion.div>

          {/* Giant split wordmark */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div
              className="leading-[0.86] mb-5 tracking-wider select-none"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(5rem,15vw,12rem)",
              }}
            >
              <motion.span
                style={{
                  color: "#F5B800",
                  WebkitTextStroke: "4px #3D1C00",
                  paintOrder: "stroke fill",
                  display: "inline-block",
                  filter: "drop-shadow(0 4px 30px rgba(245,184,0,0.5))",
                }}
                animate={{ textShadow: ["0 0 40px rgba(245,184,0,0.4)", "0 0 70px rgba(245,184,0,0.7)", "0 0 40px rgba(245,184,0,0.4)"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                EGG
              </motion.span>
              <motion.span
                style={{
                  color: "#FF5500",
                  WebkitTextStroke: "4px #1A0800",
                  paintOrder: "stroke fill",
                  display: "inline-block",
                  filter: "drop-shadow(0 4px 30px rgba(255,85,0,0.4))",
                }}
                animate={{ textShadow: ["0 0 40px rgba(255,85,0,0.4)", "0 0 70px rgba(255,85,0,0.65)", "0 0 40px rgba(255,85,0,0.4)"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              >
                PRESS
              </motion.span>
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-heading font-black text-3xl md:text-5xl text-foreground leading-tight mb-4"
          >
            Fresh Eggs,{" "}
            <span style={{ color: "#F5B800" }}>Delivered Fast.</span>
          </motion.h1>

          {/* Subtext */}
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
              style={{
                background: "linear-gradient(135deg, #F5B800 0%, #E8820C 100%)",
                border: "2px solid #3D1C00",
                boxShadow: "0 4px 30px rgba(245,184,0,0.35), inset 0 1px 0 rgba(255,255,255,0.25)",
              }}
            >
              <span className="relative z-10">🥚 Order Now</span>
            </motion.button>
            <motion.button
              onClick={onTrack}
              whileHover={{ scale: 1.05, borderColor: "rgba(245,184,0,0.7)", backgroundColor: "rgba(245,184,0,0.08)" }}
              whileTap={{ scale: 0.97 }}
              data-testid="button-track-order"
              className="px-10 py-4 rounded-full text-foreground font-heading font-semibold text-lg tracking-wide transition-all duration-300"
              style={{
                border: "2px solid rgba(245,184,0,0.40)",
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(8px)",
              }}
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
            style={{ border: "2px solid rgba(245,184,0,0.45)" }}
          >
            <div className="w-1.5 h-2.5 rounded-full" style={{ background: "#F5B800" }} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
