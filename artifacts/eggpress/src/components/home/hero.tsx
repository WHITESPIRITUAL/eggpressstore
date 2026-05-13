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
      style={{ position: "absolute", left: x, top: y, pointerEvents: "none" }}
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
      style={{ position: "absolute", left: x, top: y, pointerEvents: "none" }}
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
      style={{ position: "absolute", left: x, top: y, pointerEvents: "none" }}
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
    <section
      ref={ref}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Background */}
      <div style={{ position: "absolute", inset: 0, background: "#0A0500" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 90% 70% at 25% 40%, rgba(245,184,0,0.18) 0%, rgba(232,130,12,0.10) 40%, transparent 75%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 80% at 80% 65%, rgba(180,60,0,0.12) 0%, transparent 65%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 40% 50% at 50% 100%, rgba(245,100,0,0.08) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "repeating-linear-gradient(45deg, #F5B800 0px, #F5B800 1px, transparent 1px, transparent 40px)" }} />
        <div style={{ position: "absolute", inset: 0, opacity: 0.025, backgroundImage: "repeating-linear-gradient(0deg, #F5B800 0px, #F5B800 1px, transparent 1px, transparent 60px)" }} />
      </div>

      {/* Sparkles */}
      <motion.div style={{ position: "absolute", inset: 0, y }}>
        {sparkles.map((s, i) => <Sparkle key={i} {...s} />)}
      </motion.div>

      {/* Floating eggs */}
      <motion.div style={{ position: "absolute", inset: 0, y }}>
        {eggs.map((egg, i) => <FloatingEgg key={i} {...egg} />)}
      </motion.div>

      {/* Egg crates */}
      <EggCrate x="1%" y="72%" size={90} delay={0.5} rotate={-8} />
      <EggCrate x="84%" y="55%" size={75} delay={1.5} rotate={12} />
      <EggCrate x="55%" y="5%" size={60} delay={2.5} rotate={-5} />

      {/* Hero lady — responsive, visible on all screen sizes */}
      <motion.div
        className="hero-image-wrapper"
        style={{ y: imageY }}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
      >
        {/* Glow behind the image */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 70% 80% at 50% 80%, rgba(245,184,0,0.22) 0%, rgba(232,100,0,0.12) 50%, transparent 80%)"
        }} />
        <img
          src={heroLady}
          alt="Fresh eggs delivery"
          style={{ filter: "drop-shadow(0 0 80px rgba(245,184,0,0.4)) drop-shadow(0 0 30px rgba(232,130,12,0.3))" }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "left",
          padding: "6rem 2rem 2rem",
          maxWidth: "80rem",
          width: "100%",
          margin: "0 auto",
          opacity,
        }}
      >
        <div style={{ maxWidth: "36rem" }}>
          {/* Logo + badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}
          >
            <motion.img
              src={logoImg}
              alt="Eggpress Logo"
              style={{ width: "3.5rem", height: "3.5rem", objectFit: "contain", filter: "drop-shadow(0 0 16px rgba(245,184,0,0.6))" }}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              padding: "0.5rem 1rem", borderRadius: "9999px",
              border: "1px solid rgba(245,184,0,0.30)",
              background: "rgba(245,184,0,0.08)", color: "#F5B800",
              fontSize: "0.875rem", fontWeight: 500, letterSpacing: "0.05em",
            }}>
              <motion.span
                style={{ width: "0.5rem", height: "0.5rem", borderRadius: "50%", background: "#F5B800", display: "inline-block" }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              Now delivering in Benin City, Nigeria
            </div>
          </motion.div>

          {/* Giant wordmark */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div style={{
              lineHeight: 0.86, marginBottom: "1.25rem", letterSpacing: "0.1em",
              userSelect: "none", fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(4.5rem,14vw,11rem)",
            }}>
              <motion.span
                style={{
                  color: "#F5B800",
                  WebkitTextStroke: "2px #000000",
                  paintOrder: "stroke fill",
                  display: "inline-block",
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
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(1.5rem, 4vw, 3rem)",
              lineHeight: 1.2,
              marginBottom: "1rem",
              color: "#ffffff",
              WebkitTextStroke: "3px #000000",
              paintOrder: "stroke fill",
            }}
          >
            Fresh Eggs,{" "}
            <span style={{ color: "#F5B800", WebkitTextStroke: "3px #000000", paintOrder: "stroke fill" }}>
              Delivered Fast.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            style={{
              color: "var(--muted-foreground)",
              fontSize: "1.125rem",
              maxWidth: "32rem",
              marginBottom: "2.5rem",
              lineHeight: 1.625,
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Farm-fresh eggs from trusted Nigerian farms, delivered straight to your doorstep in Benin City. Quality you can taste.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
          >
            <motion.button
              onClick={onOrder}
              whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(245,184,0,0.6)" }}
              whileTap={{ scale: 0.97 }}
              data-testid="button-order-now"
              style={{
                padding: "1rem 2.5rem",
                borderRadius: "9999px",
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: "1.125rem",
                letterSpacing: "0.05em",
                color: "#1A0A00",
                background: "linear-gradient(135deg, #F5B800 0%, #E8820C 100%)",
                border: "1px solid rgba(61,28,0,0.6)",
                boxShadow: "0 4px 30px rgba(245,184,0,0.35), inset 0 1px 0 rgba(255,255,255,0.25)",
              }}
            >
              🥚 Order Now
            </motion.button>
            <motion.button
              onClick={onTrack}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              data-testid="button-track-order"
              style={{
                padding: "1rem 2.5rem",
                borderRadius: "9999px",
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                fontSize: "1.125rem",
                letterSpacing: "0.05em",
                color: "var(--foreground)",
                border: "1px solid rgba(245,184,0,0.35)",
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(8px)",
                transition: "all 0.3s ease",
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
            style={{ display: "flex", gap: "1.5rem", marginTop: "2.5rem", flexWrap: "wrap" }}
          >
            {[
              { label: "Orders Today", value: "200+" },
              { label: "Happy Customers", value: "5,000+" },
              { label: "Delivery Time", value: "< 2hrs" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: "1.25rem", color: "#F5B800" }}>{stat.value}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", letterSpacing: "0.05em" }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          style={{ position: "absolute", bottom: "2rem", left: "2rem" }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: "1.5rem", height: "2.5rem", borderRadius: "9999px",
              display: "flex", justifyContent: "center", paddingTop: "0.5rem",
              border: "1px solid rgba(245,184,0,0.4)",
            }}
          >
            <div style={{ width: "0.375rem", height: "0.625rem", borderRadius: "9999px", background: "#F5B800" }} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
