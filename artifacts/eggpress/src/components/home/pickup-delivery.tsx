import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function PickupDelivery() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 section-bg-green" />
      <div className="absolute inset-0 grid-texture" />

      {/* Glowing orbs */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(76,175,80,0.07) 0%, transparent 70%)", filter: "blur(50px)" }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(245,184,0,0.06) 0%, transparent 70%)", filter: "blur(40px)" }} />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <motion.p className="font-sans text-sm uppercase tracking-[0.2em] mb-3 font-semibold" style={{ color: "#4CAF50" }}
            animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }}>
            ✦ How To Get Your Eggs ✦
          </motion.p>
          <h2 className="font-heading font-black text-4xl md:text-6xl text-foreground">Delivery & Pickup</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Delivery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-3xl p-8 relative overflow-hidden"
            style={{ background: "rgba(15,8,0,0.65)", border: "1px solid rgba(245,184,0,0.18)", backdropFilter: "blur(20px)", boxShadow: "0 20px 60px rgba(245,184,0,0.1)" }}
          >
            <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: "linear-gradient(90deg, transparent, rgba(245,184,0,0.6), transparent)" }} />
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-3xl" style={{ background: "rgba(245,184,0,0.12)", border: "1px solid rgba(245,184,0,0.2)" }}>
              🚚
            </div>
            <h3 className="font-heading font-black text-2xl text-foreground mb-6">Home Delivery</h3>
            <div className="space-y-4">
              {[
                { icon: "📍", label: "Coverage Area", value: "All of Benin City & Environs" },
                { icon: "⏰", label: "Delivery Hours", value: "7:00 AM – 7:00 PM daily" },
                { icon: "📅", label: "Schedule", value: "Same-day or next-day delivery" },
                { icon: "💰", label: "Delivery Fee", value: "Calculated at checkout (by area)" },
              ].map((item, i) => (
                <motion.div key={item.label} className="flex gap-3 items-start p-3 rounded-xl transition-all duration-200"
                  whileHover={{ backgroundColor: "rgba(245,184,0,0.06)" }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                >
                  <span className="text-lg mt-0.5 flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-muted-foreground text-xs uppercase tracking-wide mb-0.5">{item.label}</p>
                    <p className="text-foreground font-medium text-sm">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Pickup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="rounded-3xl p-8 relative overflow-hidden"
            style={{ background: "rgba(15,8,0,0.65)", border: "1px solid rgba(76,175,80,0.18)", backdropFilter: "blur(20px)", boxShadow: "0 20px 60px rgba(76,175,80,0.08)" }}
          >
            <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: "linear-gradient(90deg, transparent, rgba(76,175,80,0.6), transparent)" }} />
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-3xl" style={{ background: "rgba(76,175,80,0.12)", border: "1px solid rgba(76,175,80,0.2)" }}>
              🏪
            </div>
            <h3 className="font-heading font-black text-2xl text-foreground mb-6">Self Pickup</h3>
            <div className="space-y-4">
              {[
                { icon: "🏪", label: "Pickup Location", value: "Benin City (address provided at checkout)" },
                { icon: "⏰", label: "Pickup Hours", value: "8:00 AM – 6:00 PM, Mon – Sat" },
                { icon: "🔑", label: "Reference Code", value: "Provided instantly after your order" },
                { icon: "💚", label: "Pickup Benefit", value: "No delivery fee charged" },
              ].map((item, i) => (
                <motion.div key={item.label} className="flex gap-3 items-start p-3 rounded-xl transition-all duration-200"
                  whileHover={{ backgroundColor: "rgba(76,175,80,0.06)" }}
                  initial={{ opacity: 0, x: 10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08 }}
                >
                  <span className="text-lg mt-0.5 flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-muted-foreground text-xs uppercase tracking-wide mb-0.5">{item.label}</p>
                    <p className="text-foreground font-medium text-sm">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* WhatsApp CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-10 text-center"
        >
          <p className="text-muted-foreground mb-5 font-sans">Questions? We're always available on WhatsApp</p>
          <motion.a
            href="https://wa.me/2349013698449"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="link-whatsapp"
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(37,211,102,0.35)" }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-heading font-bold text-white transition-all duration-300"
            style={{ background: "linear-gradient(135deg, #25D366, #128C7E)", border: "1px solid rgba(37,211,102,0.3)" }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat on WhatsApp: 09013698449
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
