import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "../../assets/eggpress-logo-nobg.png";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function Navbar({ onTrackOrder }: { onTrackOrder: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => setInstalled(true));
    if (window.matchMedia("(display-mode: standalone)").matches) setInstalled(true);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  async function handleInstall() {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === "accepted") { setInstalled(true); setInstallPrompt(null); }
  }

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 transition-all duration-300" style={{
        background: "rgba(10,5,0,0.80)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: "2px solid rgba(245,184,0,0.18)",
        boxShadow: "0 4px 32px rgba(0,0,0,0.4)",
      }}>
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">

          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 relative z-50 group">
            <motion.img
              src={logoImg}
              alt="Eggpress"
              className="w-10 h-10 object-contain"
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
              style={{ filter: "drop-shadow(0 0 10px rgba(245,184,0,0.5))" }}
            />
            <div className="flex flex-col leading-none">
              <span
                className="hidden sm:block text-3xl tracking-[0.15em] transition-all duration-300"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.18em" }}
              >
                <span style={{ color: "#F5B800", WebkitTextStroke: "2px #3D1C00", paintOrder: "stroke fill", textShadow: "0 0 20px rgba(245,184,0,0.5)" }}>EGG</span>
                <span style={{ color: "#FF5500", WebkitTextStroke: "2px #1A0800", paintOrder: "stroke fill", textShadow: "0 0 20px rgba(255,85,0,0.4)" }}>PRESS</span>
              </span>
              <span className="hidden sm:block text-[9px] tracking-[0.35em] font-sans uppercase -mt-0.5" style={{ color: "rgba(245,184,0,0.8)" }}>
                Fresh · Fast · Farm
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 font-sans font-medium text-sm">
            <button onClick={() => scrollTo("products")} className="transition-colors tracking-wide" style={{ color: "rgba(255,248,220,0.88)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#F5B800")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,248,220,0.88)")}
            >Products</button>
            <button onClick={() => scrollTo("about")} className="transition-colors tracking-wide" style={{ color: "rgba(255,248,220,0.88)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#F5B800")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,248,220,0.88)")}
            >About</button>
            <Link href="/sellers" className="transition-colors tracking-wide" style={{ color: "rgba(255,248,220,0.88)" }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "#F5B800"}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,248,220,0.88)"}
            >Find Sellers</Link>
            <button onClick={() => scrollTo("contact")} className="transition-colors tracking-wide" style={{ color: "rgba(255,248,220,0.88)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#F5B800")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,248,220,0.88)")}
            >Contact</button>

            {installPrompt && !installed && (
              <motion.button
                onClick={handleInstall}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all"
                style={{ background: "rgba(76,175,80,0.15)", border: "1px solid rgba(76,175,80,0.4)", color: "#4CAF50" }}
                title="Install Eggpress as an app"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                  <path d="M12 16l-4-4h3V4h2v8h3l-4 4z" />
                  <path d="M20 18H4v2h16v-2z" />
                </svg>
                Install App
              </motion.button>
            )}

            <button
              onClick={onTrackOrder}
              className="px-5 py-2 rounded-full font-medium tracking-wide transition-all duration-200"
              style={{ border: "2px solid rgba(245,184,0,0.45)", color: "#F5B800", background: "transparent" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(245,184,0,0.12)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(245,184,0,0.7)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(245,184,0,0.45)";
              }}
            >
              Track Order
            </button>
          </div>

          {/* Mobile Menu toggle */}
          <button
            className="relative z-50 w-12 h-12 flex flex-col items-center justify-center md:hidden gap-1.5"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            <motion.span animate={{ y: isOpen ? 8 : 0, rotate: isOpen ? 45 : 0 }} className="block w-7 h-0.5 rounded-full origin-center" style={{ background: "#F5B800" }} />
            <motion.span animate={{ opacity: isOpen ? 0 : 1, scaleX: isOpen ? 0 : 1 }} className="block w-5 h-0.5 rounded-full self-start ml-1" style={{ background: "#FF5500" }} />
            <motion.span animate={{ y: isOpen ? -8 : 0, rotate: isOpen ? -45 : 0 }} className="block w-7 h-0.5 rounded-full origin-center" style={{ background: "#F5B800" }} />
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
            className="fixed inset-0 z-40 flex items-center justify-center"
            style={{ background: "rgba(8,4,0,0.97)", backdropFilter: "blur(24px)" }}
          >
            <div className="flex flex-col items-center gap-8">
              <div className="flex items-center gap-3">
                <img src={logoImg} alt="Eggpress" className="w-16 h-16 object-contain" style={{ filter: "drop-shadow(0 0 20px rgba(245,184,0,0.6))" }} />
                <span className="text-6xl" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.2em" }}>
                  <span style={{ color: "#F5B800", WebkitTextStroke: "3px #3D1C00", paintOrder: "stroke fill" }}>EGG</span>
                  <span style={{ color: "#FF5500", WebkitTextStroke: "3px #1A0800", paintOrder: "stroke fill" }}>PRESS</span>
                </span>
              </div>
              <div className="flex flex-col items-center gap-6 text-2xl font-heading font-bold">
                <button onClick={() => scrollTo("products")} style={{ color: "#FFF8DC" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#F5B800")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#FFF8DC")}
                >Products</button>
                <button onClick={() => scrollTo("about")} style={{ color: "#FFF8DC" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#F5B800")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#FFF8DC")}
                >About</button>
                <Link href="/sellers" onClick={() => setIsOpen(false)} style={{ color: "#FFF8DC" }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "#F5B800"}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "#FFF8DC"}
                >Find Sellers</Link>
                <button onClick={() => scrollTo("contact")} style={{ color: "#FFF8DC" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#F5B800")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#FFF8DC")}
                >Contact</button>
                <button onClick={() => { setIsOpen(false); onTrackOrder(); }} style={{ color: "#F5B800" }}>
                  Track Order
                </button>
                {installPrompt && !installed && (
                  <button onClick={() => { setIsOpen(false); handleInstall(); }}
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl text-lg font-bold"
                    style={{ background: "rgba(76,175,80,0.15)", border: "1px solid rgba(76,175,80,0.4)", color: "#4CAF50" }}
                  >
                    📲 Install App
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
