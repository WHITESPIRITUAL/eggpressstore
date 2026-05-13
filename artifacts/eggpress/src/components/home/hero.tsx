import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroLady from "../../assets/hero-lady-nobg.png";

interface HeroProps {
  onOrder: () => void;
  onTrack: () => void;
}

function FloatingEgg({ x, y, size, delay, duration, rotate }: { x: string; y: string; size: number; delay: number; duration: number; rotate: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      animate={{ y: [0, -28, 0], rotate: [rotate, rotate + 8, rotate] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width={size} height={Math.round(size * 1.25)} viewBox="0 0 80 100" fill="none">
        <ellipse cx="40" cy="58" rx="32" ry="38" fill="url(#floatEggB)" opacity="0.9" />
        <ellipse cx="40" cy="30" rx="22" ry="28" fill="url(#floatEggT)" opacity="0.95" />
        <ellipse cx="30" cy="22" rx="7" ry="9" fill="white" opacity="0.35" />
        <defs>
          <radialGradient id="floatEggB" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#FFFEF8" />
            <stop offset="50%" stopColor="#EDE0C0" />
            <stop offset="100%" stopColor="#C8A060" />
          </radialGradient>
          <radialGradient id="floatEggT" cx="40%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E8D090" />
          </radialGradient>
        </defs>
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
    { x: "4%", y: "12%", size: 60, delay: 0, duration: 5.5, rotate: -12 },
    { x: "88%", y: "8%", size: 75, delay: 0.8, duration: 6.2, rotate: 15 },
    { x: "3%", y: "62%", size: 44, delay: 0.4, duration: 7, rotate: 20 },
    { x: "30%", y: "5%", size: 36, delay: 2, duration: 6.5, rotate: 8 },
    { x: "92%", y: "68%", size: 38, delay: 0.6, duration: 5.8, rotate: -5 },
  ];

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 30% 50%, rgba(245,184,0,0.12) 0%, rgba(232,130,12,0.06) 50%, transparent 100%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 70% at 75% 60%, rgba(245,184,0,0.07) 0%, transparent 70%)" }} />
      </div>

      {/* Floating background eggs */}
      <motion.div className="absolute inset-0" style={{ y }}>
        {eggs.map((egg, i) => <FloatingEgg key={i} {...egg} />)}
      </motion.div>

      {/* Lady image — right side */}
      <motion.div
        className="absolute bottom-0 right-0 h-full w-[45%] max-w-[600px] pointer-events-none hidden lg:block"
        style={{ y: imageY }}
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
      >
        <img
          src={heroLady}
          alt="Fresh eggs delivery"
          className="w-full h-full object-contain object-bottom"
          style={{ filter: "drop-shadow(0 0 60px rgba(245,184,0,0.25))" }}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-left px-8 md:px-16 max-w-5xl w-full mx-auto"
        style={{ opacity }}
      >
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8 tracking-wide"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Now delivering in Benin City, Nigeria
          </motion.div>

          {/* Brand wordmark in hero */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div
              className="text-[clamp(5rem,14vw,11rem)] leading-[0.88] mb-4 tracking-wider"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                background: "linear-gradient(135deg, #FFFFFF 0%, #F5B800 40%, #E8820C 80%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "none",
                filter: "drop-shadow(0 0 40px rgba(245,184,0,0.35))",
              }}
            >
              EGGPRESS
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
            <span style={{ WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text", backgroundClip: "text", backgroundImage: "linear-gradient(135deg, #F5B800 0%, #E8820C 100%)" }}>
              Delivered Fast.
            </span>
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
              whileHover={{ scale: 1.04, boxShadow: "0 0 50px rgba(245,184,0,0.5)" }}
              whileTap={{ scale: 0.97 }}
              data-testid="button-order-now"
              className="px-10 py-4 rounded-full font-heading font-bold text-lg tracking-wide text-primary-foreground"
              style={{ background: "linear-gradient(135deg, #F5B800 0%, #E8820C 100%)" }}
            >
              Order Now
            </motion.button>
            <motion.button
              onClick={onTrack}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              data-testid="button-track-order"
              className="px-10 py-4 rounded-full border-2 border-primary/40 text-foreground font-heading font-semibold text-lg tracking-wide backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300"
            >
              Track Order
            </motion.button>
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
            className="w-6 h-10 rounded-full border-2 border-primary/40 flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
