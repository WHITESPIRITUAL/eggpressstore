import { motion } from "framer-motion";
import logoImg from "../../assets/eggpress-logo-nobg.png";
import { useGetSettings } from "@/lib/api";

export default function Footer() {
  const { data: settings } = useGetSettings();
  const phone = settings?.phone ?? "09013698449";
  const whatsapp = settings?.whatsapp ?? "2349013698449";
  const address = settings?.address ?? "Benin City, Edo State, Nigeria";
  const hours = settings?.opening_hours ?? "7 AM \u2013 7 PM Daily";
  const aboutText = settings?.about_text ?? "Premium farm-fresh egg delivery in Benin City, Nigeria. Quality you can taste, delivered to your door.";

  return (
    <footer className="relative pt-16 pb-8 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(245,184,0,0.05) 50%, rgba(255,85,0,0.04) 100%)" }} />
      <div className="absolute inset-0 grid-texture" />

      {/* Top separator line */}
      <div className="absolute top-0 left-0 right-0" style={{ height: "1px", background: "linear-gradient(90deg, transparent 0%, rgba(245,184,0,0.5) 30%, rgba(255,85,0,0.5) 50%, rgba(245,184,0,0.5) 70%, transparent 100%)" }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <motion.img
                src={logoImg}
                alt="Eggpress"
                className="w-10 h-10 object-contain"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{ filter: "drop-shadow(0 0 12px rgba(245,184,0,0.5))" }}
              />
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.18em", fontSize: "1.6rem" }}>
                <span style={{ color: "#F5B800", WebkitTextStroke: "1px rgba(61,28,0,0.7)", paintOrder: "stroke fill" }}>EGG</span>
                <span style={{ color: "#FF5500", WebkitTextStroke: "1px rgba(26,8,0,0.7)", paintOrder: "stroke fill" }}>PRESS</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm font-sans leading-relaxed max-w-xs">
              {aboutText}
            </p>
            <div className="flex gap-3 mt-1">
              {[
                { label: "🥚", value: "500+ Orders" },
                { label: "⚡", value: "Same Day" },
              ].map(s => (
                <div key={s.value} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: "rgba(245,184,0,0.1)", border: "1px solid rgba(245,184,0,0.18)", color: "#F5B800" }}>
                  <span>{s.label}</span> {s.value}
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-widest mb-4" style={{ color: "#F5B800" }}>Quick Links</h4>
            <div className="space-y-2">
              {[
                { label: "Products", id: "products" },
                { label: "About Us", id: "about" },
                { label: "Track Order", id: "track" },
                { label: "Contact", id: "contact" },
              ].map(link => (
                <button
                  key={link.id}
                  onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" })}
                  className="block text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground font-sans"
                  onMouseEnter={e => (e.currentTarget.style.color = "#F5B800")}
                  onMouseLeave={e => (e.currentTarget.style.color = "")}
                >
                  → {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase tracking-widest mb-4" style={{ color: "#4CAF50" }}>Get In Touch</h4>
            <div className="space-y-3 text-sm font-sans text-muted-foreground">
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span>{address}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📞</span>
                <a href={`tel:${phone}`} className="hover:text-foreground transition-colors">{phone}</a>
              </div>
              <div className="flex items-center gap-2">
                <span>🟢</span>
                <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">WhatsApp Us</a>
              </div>
              <div className="flex items-center gap-2">
                <span>⏰</span>
                <span>{hours}</span>
              </div>
            </div>

            <motion.a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-footer-whatsapp"
              whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(37,211,102,0.3)" }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-heading font-semibold text-white transition-all mt-4"
              style={{ background: "linear-gradient(135deg, #25D366, #128C7E)", border: "1px solid rgba(37,211,102,0.25)" }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Order via WhatsApp
            </motion.a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: "1px solid rgba(245,184,0,0.1)" }}>
          <p className="text-xs text-muted-foreground font-sans">
            &copy; {new Date().getFullYear()} Eggpress. All rights reserved. Benin City, Edo State, Nigeria.
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-sans">
            <span>Made with</span>
            <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>❤️</motion.span>
            <span>in Nigeria</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
