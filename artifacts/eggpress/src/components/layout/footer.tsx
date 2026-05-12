import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-12 px-6 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 100% at 50% 100%, rgba(245,184,0,0.05) 0%, transparent 70%)" }} />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo + tagline */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-3">
              <svg width="36" height="36" viewBox="0 0 100 100" fill="none">
                <path d="M50 10C35 10 20 35 20 60C20 76.5685 33.4315 90 50 90C66.5685 90 80 76.5685 80 60C80 35 65 10 50 10Z" fill="url(#footerEggGrad)" />
                <path d="M10 60L35 60M5 50L30 50M15 70L40 70" stroke="#F5B800" strokeWidth="4" strokeLinecap="round" />
                <defs>
                  <linearGradient id="footerEggGrad" x1="50" y1="10" x2="50" y2="90" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFFDF5" />
                    <stop offset="1" stopColor="#E8820C" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="font-heading font-black text-xl tracking-widest text-primary uppercase">EGGPRESS</span>
            </div>
            <p className="text-muted-foreground text-sm font-sans">Fresh Eggs, Delivered Fast.</p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-muted-foreground font-sans">
            <a href="https://wa.me/2349013698449" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">WhatsApp Us</a>
            <span className="opacity-30">|</span>
            <span>Benin City, Nigeria</span>
            <span className="opacity-30">|</span>
            <a href="tel:09013698449" className="hover:text-primary transition-colors">09013698449</a>
          </div>

          {/* WhatsApp button */}
          <a
            href="https://wa.me/2349013698449"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-footer-whatsapp"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-heading font-semibold text-white transition-all hover:scale-105"
            style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Order via WhatsApp
          </a>
        </div>

        <div className="mt-8 pt-6 border-t border-white/8 text-center text-xs text-muted-foreground font-sans">
          &copy; {new Date().getFullYear()} Eggpress. All rights reserved. Benin City, Edo State, Nigeria.
        </div>
      </div>
    </footer>
  );
}
