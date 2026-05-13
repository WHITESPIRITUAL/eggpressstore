import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ onTrackOrder }: { onTrackOrder: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 glassmorphism transition-all duration-300">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">

          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 relative z-50 group">
            {/* Egg icon */}
            <motion.div whileHover={{ rotate: [0, -8, 8, 0] }} transition={{ duration: 0.5 }}>
              <svg width="36" height="44" viewBox="0 0 80 100" fill="none">
                <ellipse cx="40" cy="58" rx="32" ry="38" fill="url(#navEggB)" />
                <ellipse cx="40" cy="30" rx="22" ry="28" fill="url(#navEggT)" />
                <ellipse cx="30" cy="22" rx="8" ry="10" fill="white" opacity="0.3" />
                <defs>
                  <radialGradient id="navEggB" cx="40%" cy="35%" r="60%">
                    <stop offset="0%" stopColor="#FFFDF5" />
                    <stop offset="55%" stopColor="#F0E0B0" />
                    <stop offset="100%" stopColor="#C8A860" />
                  </radialGradient>
                  <radialGradient id="navEggT" cx="40%" cy="30%" r="60%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="100%" stopColor="#EDD890" />
                  </radialGradient>
                </defs>
              </svg>
            </motion.div>

            {/* EGGPRESS wordmark — Bebas Neue, large, premium */}
            <div className="flex flex-col leading-none">
              <span
                className="hidden sm:block text-3xl tracking-[0.15em] text-primary transition-all duration-300"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.18em", textShadow: "0 0 30px rgba(245,184,0,0.4)" }}
              >
                EGGPRESS
              </span>
              <span className="hidden sm:block text-[9px] tracking-[0.35em] text-muted-foreground font-sans uppercase -mt-0.5">
                Fresh · Fast · Farm
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 font-sans font-medium text-sm">
            <button onClick={() => scrollTo("products")} className="text-muted-foreground hover:text-foreground transition-colors tracking-wide">Products</button>
            <button onClick={() => scrollTo("about")} className="text-muted-foreground hover:text-foreground transition-colors tracking-wide">About</button>
            <button onClick={() => scrollTo("contact")} className="text-muted-foreground hover:text-foreground transition-colors tracking-wide">Contact</button>
            <button
              onClick={onTrackOrder}
              className="px-5 py-2 rounded-full border border-primary/40 text-primary hover:bg-primary/10 transition-all duration-200 font-medium tracking-wide"
            >
              Track Order
            </button>
          </div>

          {/* Eggshell Menu Icon (mobile) */}
          <button
            className="relative z-50 w-12 h-12 flex flex-col items-center justify-center md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            <motion.div animate={{ y: isOpen ? -8 : 0, rotate: isOpen ? -10 : 0 }} className="w-8 h-4 border-2 border-primary rounded-t-full border-b-0 origin-bottom-left" />
            <div className="w-8 h-[2px] bg-transparent my-[1px]" />
            <motion.div animate={{ y: isOpen ? 8 : 0, rotate: isOpen ? 10 : 0 }} className="w-8 h-4 border-2 border-primary rounded-b-full border-t-0 origin-top-right" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-10">
              <span className="text-6xl text-primary" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.2em" }}>EGGPRESS</span>
              <div className="flex flex-col items-center gap-6 text-2xl font-heading font-bold">
                <button onClick={() => scrollTo("products")} className="hover:text-primary transition-colors">Products</button>
                <button onClick={() => scrollTo("about")} className="hover:text-primary transition-colors">About</button>
                <button onClick={() => scrollTo("contact")} className="hover:text-primary transition-colors">Contact</button>
                <button onClick={() => { setIsOpen(false); onTrackOrder(); }} className="text-primary hover:text-white transition-colors">Track Order</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
