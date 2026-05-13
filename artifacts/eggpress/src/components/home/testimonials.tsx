import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useListTestimonials } from "@/lib/api";

const liveNotifications = [
  "Chioma from GRA just ordered 2 crates of Large Eggs",
  "Mr. Osagie from Ugbowo ordered a Full Crate of Medium Eggs",
  "Blessing from Ekenwan set up a Weekly subscription",
  "Chef Emeka ordered 3 Full Crates for his restaurant",
  "Aunty Nkechi from Airport Road placed a new order",
  "James from Uselu ordered Half Crate of Large Eggs",
];

const avatarColors = [
  "linear-gradient(135deg, #F5B800, #E8820C)",
  "linear-gradient(135deg, #E8820C, #FF5500)",
  "linear-gradient(135deg, #4CAF50, #2E7D32)",
  "linear-gradient(135deg, #FF5500, #C62828)",
  "linear-gradient(135deg, #F5B800, #4CAF50)",
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <motion.svg key={i} viewBox="0 0 16 16" className="w-4 h-4"
          fill={i <= rating ? "#F5B800" : "none"} stroke={i <= rating ? "#F5B800" : "#555"}
          strokeWidth="1.5"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.05, type: "spring", stiffness: 400 }}
        >
          <polygon points="8,1 10,6 15,6 11,9.5 12.5,15 8,11.5 3.5,15 5,9.5 1,6 6,6" />
        </motion.svg>
      ))}
    </div>
  );
}

function InitialAvatar({ name, index }: { name: string; index: number }) {
  const initials = name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div className="w-12 h-12 rounded-full flex items-center justify-center font-heading font-bold text-white text-sm flex-shrink-0"
      style={{ background: avatarColors[index % avatarColors.length] }}>
      {initials}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { data: testimonials, isLoading } = useListTestimonials();
  const [notifIndex, setNotifIndex] = useState(0);
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setNotifIndex(i => (i + 1) % liveNotifications.length);
      setShowNotif(true);
      setTimeout(() => setShowNotif(false), 4500);
    }, 6000);
    setTimeout(() => setShowNotif(true), 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={ref} className="py-24 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 section-bg-amber" />
      <div className="absolute inset-0 stripe-texture opacity-40" />

      {/* Glowing orbs */}
      <div className="absolute top-20 left-0 w-72 h-72 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(245,184,0,0.06) 0%, transparent 70%)", filter: "blur(50px)" }} />
      <div className="absolute bottom-20 right-0 w-64 h-64 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,85,0,0.05) 0%, transparent 70%)", filter: "blur(40px)" }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <motion.p className="font-sans text-sm uppercase tracking-[0.2em] mb-3 font-semibold" style={{ color: "#F5B800" }}
            animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }}>
            ✦ Social Proof ✦
          </motion.p>
          <h2 className="font-heading font-black text-4xl md:text-6xl text-foreground">What Customers Say</h2>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => <div key={i} className="h-48 glassmorphism rounded-2xl animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(testimonials ?? []).map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -6, boxShadow: "0 20px 50px rgba(245,184,0,0.12)" }}
                data-testid={`card-testimonial-${t.id}`}
                className="rounded-2xl p-6 transition-all duration-300 relative overflow-hidden"
                style={{ background: "rgba(15,8,0,0.65)", border: "1px solid rgba(245,184,0,0.13)", backdropFilter: "blur(16px)" }}
              >
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: "linear-gradient(90deg, transparent, rgba(245,184,0,0.5), transparent)" }} />

                <div className="flex items-start gap-4 mb-4">
                  <InitialAvatar name={t.name} index={i} />
                  <div className="flex-1 min-w-0">
                    <p className="font-heading font-bold text-foreground truncate">{t.name}</p>
                    <p className="text-muted-foreground text-xs">{t.location}</p>
                    <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                      <StarRating rating={t.rating} />
                      {t.verified && (
                        <span className="text-xs flex items-center gap-1 font-medium" style={{ color: "#4CAF50" }}>
                          ✓ Verified
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Large quote mark */}
                <div className="text-5xl font-serif leading-none mb-1 -mt-1" style={{ color: "rgba(245,184,0,0.2)" }}>"</div>
                <p className="text-muted-foreground text-sm leading-relaxed">{t.review}</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-12 flex flex-wrap justify-center gap-10"
        >
          {[
            { val: "500+", label: "Orders Delivered", color: "#F5B800" },
            { val: "4.9/5", label: "Average Rating", color: "#E8820C" },
            { val: "100%", label: "Verified Reviews", color: "#4CAF50" },
          ].map(({ val, label, color }) => (
            <motion.div key={label} className="text-center" whileHover={{ scale: 1.05 }}>
              <div className="font-heading font-black text-3xl" style={{ color }}>{val}</div>
              <div className="font-sans text-xs text-muted-foreground uppercase tracking-widest mt-1">{label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Live notification */}
      <AnimatePresence>
        {showNotif && (
          <motion.div
            initial={{ opacity: 0, x: 100, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 100, y: 10 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="fixed bottom-6 right-6 z-40 max-w-xs rounded-2xl p-4 flex items-center gap-3"
            style={{ background: "rgba(10,5,0,0.92)", border: "1px solid rgba(245,184,0,0.25)", backdropFilter: "blur(20px)", boxShadow: "0 12px 40px rgba(245,184,0,0.2)" }}
          >
            <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-base" style={{ background: "rgba(245,184,0,0.15)", border: "1px solid rgba(245,184,0,0.25)" }}>
              🥚
            </div>
            <p className="text-xs text-foreground leading-tight">{liveNotifications[notifIndex]}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
