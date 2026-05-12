import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useListTestimonials } from "@workspace/api-client-react";

const liveNotifications = [
  "Chioma from GRA just ordered 2 crates of Large Eggs",
  "Mr. Osagie from Ugbowo ordered a Full Crate of Medium Eggs",
  "Blessing from Ekenwan set up a Weekly subscription",
  "Chef Emeka ordered 3 Full Crates for his restaurant",
  "Aunty Nkechi from Airport Road placed a new order",
  "James from Uselu ordered Half Crate of Large Eggs",
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} viewBox="0 0 16 16" className="w-4 h-4" fill={i <= rating ? "#F5B800" : "none"} stroke="#F5B800" strokeWidth="1.5">
          <polygon points="8,1 10,6 15,6 11,9.5 12.5,15 8,11.5 3.5,15 5,9.5 1,6 6,6" />
        </svg>
      ))}
    </div>
  );
}

function InitialAvatar({ name }: { name: string }) {
  const initials = name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div className="w-12 h-12 rounded-full flex items-center justify-center font-heading font-bold text-primary-foreground text-sm flex-shrink-0" style={{ background: "linear-gradient(135deg, #F5B800, #E8820C)" }}>
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
      setTimeout(() => setShowNotif(false), 4000);
    }, 6000);
    setTimeout(() => setShowNotif(true), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={ref} className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 30% 50%, rgba(245,184,0,0.05) 0%, transparent 70%)" }} />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-primary font-sans text-sm uppercase tracking-[0.2em] mb-3">Social Proof</p>
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
                data-testid={`card-testimonial-${t.id}`}
                className="glassmorphism rounded-2xl p-6 hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <InitialAvatar name={t.name} />
                  <div>
                    <p className="font-heading font-bold text-foreground">{t.name}</p>
                    <p className="text-muted-foreground text-xs">{t.location}</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <StarRating rating={t.rating} />
                      {t.verified && (
                        <span className="text-xs text-accent flex items-center gap-1">
                          <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3"><path d="M8 0l2 5.5L16 6l-4 4 1 6-5-2.5L3 16l1-6L0 6l6-.5z" /></svg>
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">&ldquo;{t.review}&rdquo;</p>
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
          {[["500+", "Orders Delivered"], ["4.9/5", "Average Rating"], ["100%", "Verified Reviews"]].map(([val, label]) => (
            <div key={label} className="text-center">
              <div className="font-heading font-black text-3xl text-primary">{val}</div>
              <div className="font-sans text-xs text-muted-foreground uppercase tracking-widest mt-1">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Live notification */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={showNotif ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="fixed bottom-6 right-6 z-40 max-w-sm glassmorphism rounded-2xl p-4 flex items-center gap-3"
        style={{ boxShadow: "0 12px 40px rgba(245,184,0,0.25)" }}
      >
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 24 24" fill="none" stroke="#F5B800" strokeWidth="2" className="w-5 h-5">
            <path d="M20 7H4C2.9 7 2 7.9 2 9v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2z" />
            <polyline points="16,3 12,7 8,3" />
          </svg>
        </div>
        <p className="text-xs text-foreground leading-tight">{liveNotifications[notifIndex]}</p>
      </motion.div>
    </section>
  );
}
