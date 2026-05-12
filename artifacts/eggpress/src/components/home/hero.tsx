import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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
        <ellipse cx="40" cy="58" rx="32" ry="38" fill="url(#eggGrad1)" opacity="0.85" />
        <ellipse cx="40" cy="30" rx="22" ry="28" fill="url(#eggGrad2)" opacity="0.9" />
        <ellipse cx="32" cy="22" rx="7" ry="9" fill="white" opacity="0.3" />
        <defs>
          <radialGradient id="eggGrad1" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#FFFDF5" />
            <stop offset="60%" stopColor="#F5D080" />
            <stop offset="100%" stopColor="#E8820C" />
          </radialGradient>
          <radialGradient id="eggGrad2" cx="40%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#FFFDF5" />
            <stop offset="100%" stopColor="#F5B800" />
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

  const eggs = [
    { x: "8%", y: "15%", size: 70, delay: 0, duration: 5.5, rotate: -12 },
    { x: "85%", y: "10%", size: 90, delay: 0.8, duration: 6.2, rotate: 15 },
    { x: "75%", y: "55%", size: 55, delay: 1.6, duration: 4.8, rotate: -6 },
    { x: "2%", y: "60%", size: 48, delay: 0.4, duration: 7, rotate: 20 },
    { x: "60%", y: "75%", size: 65, delay: 1.2, duration: 5.2, rotate: -18 },
    { x: "30%", y: "8%", size: 40, delay: 2, duration: 6.5, rotate: 8 },
    { x: "92%", y: "70%", size: 42, delay: 0.6, duration: 5.8, rotate: -5 },
  ];

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(245,184,0,0.12) 0%, rgba(232,130,12,0.06) 50%, transparent 100%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 40% at 80% 20%, rgba(245,184,0,0.08) 0%, transparent 70%)" }} />
      </div>

      {/* Floating eggs */}
      <motion.div className="absolute inset-0" style={{ y }}>
        {eggs.map((egg, i) => <FloatingEgg key={i} {...egg} />)}
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        style={{ opacity }}
      >
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

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-heading font-black text-6xl md:text-8xl lg:text-9xl leading-[0.9] mb-6 tracking-tight"
        >
          <span className="block text-foreground">Fresh Eggs,</span>
          <span className="block" style={{ WebkitTextFillColor: "transparent", WebkitBackgroundClip: "text", backgroundClip: "text", backgroundImage: "linear-gradient(135deg, #F5B800 0%, #E8820C 60%, #F5B800 100%)" }}>
            Delivered Fast.
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-sans"
        >
          Farm-fresh eggs from trusted Nigerian farms, delivered straight to your doorstep in Benin City. Quality you can taste. Speed you can trust.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            onClick={onOrder}
            whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(245,184,0,0.5)" }}
            whileTap={{ scale: 0.97 }}
            data-testid="button-order-now"
            className="px-10 py-4 rounded-full bg-primary text-primary-foreground font-heading font-bold text-lg tracking-wide transition-all duration-300"
            style={{ background: "linear-gradient(135deg, #F5B800 0%, #E8820C 100%)" }}
          >
            Order Now
          </motion.button>
          <motion.button
            onClick={onTrack}
            whileHover={{ scale: 1.04, borderColor: "#F5B800" }}
            whileTap={{ scale: 0.97 }}
            data-testid="button-track-order"
            className="px-10 py-4 rounded-full border-2 border-primary/40 text-foreground font-heading font-semibold text-lg tracking-wide backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300"
          >
            Track Order
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
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
