import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ onTrackOrder }: { onTrackOrder: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 glassmorphism transition-all duration-300">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 relative z-50">
            <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 10C35 10 20 35 20 60C20 76.5685 33.4315 90 50 90C66.5685 90 80 76.5685 80 60C80 35 65 10 50 10Z" fill="url(#paint0_linear)"/>
              <path d="M10 60L35 60M5 50L30 50M15 70L40 70" stroke="#F5B800" strokeWidth="4" strokeLinecap="round"/>
              <defs>
                <linearGradient id="paint0_linear" x1="50" y1="10" x2="50" y2="90" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FFFDF5"/>
                  <stop offset="1" stopColor="#E8820C"/>
                </linearGradient>
              </defs>
            </svg>
            <span className="font-heading font-black text-2xl tracking-widest text-primary hidden sm:block uppercase">EGGPRESS</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 font-sans font-medium">
            <button onClick={() => scrollTo("products")} className="hover:text-primary transition-colors">Products</button>
            <button onClick={() => scrollTo("about")} className="hover:text-primary transition-colors">About</button>
            <button onClick={() => scrollTo("contact")} className="hover:text-primary transition-colors">Contact</button>
            <button 
              onClick={onTrackOrder}
              className="text-primary hover:text-white transition-colors"
            >
              Track Order
            </button>
          </div>

          {/* Eggshell Menu Icon */}
          <button 
            className="relative z-50 w-12 h-12 flex flex-col items-center justify-center md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <motion.div
              animate={{ y: isOpen ? -8 : 0, rotate: isOpen ? -10 : 0 }}
              className="w-8 h-4 border-2 border-primary rounded-t-full border-b-0 origin-bottom-left transition-all"
            />
            <div className="w-8 h-[2px] bg-transparent my-[1px]" />
            <motion.div
              animate={{ y: isOpen ? 8 : 0, rotate: isOpen ? 10 : 0 }}
              className="w-8 h-4 border-2 border-primary rounded-b-full border-t-0 origin-top-right transition-all"
            />
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
            <div className="flex flex-col items-center gap-8 text-2xl font-heading font-bold">
              <button onClick={() => scrollTo("products")} className="hover:text-primary transition-colors">Products</button>
              <button onClick={() => scrollTo("about")} className="hover:text-primary transition-colors">About</button>
              <button onClick={() => scrollTo("contact")} className="hover:text-primary transition-colors">Contact</button>
              <button onClick={() => { setIsOpen(false); onTrackOrder(); }} className="text-primary hover:text-white transition-colors">Track Order</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
