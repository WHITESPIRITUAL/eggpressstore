import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useListSellers, useRegisterSeller } from "@/lib/api";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import TrackingModal from "@/components/modals/tracking-modal";

const BENIN_LANDMARKS = [
  "Ring Road", "Uselu", "Ugbowo (UNIBEN Area)", "Sapele Road", "Airport Road",
  "Upper Siluko", "Mission Road", "GRA (Government Reserved Area)", "Forestry Road",
  "First East Circular", "Second East Circular", "Third East Circular", "Ikpoba Hill",
  "New Benin Market", "Oba Market", "Akpakpava", "Ekenwan Road", "Aduwawa",
  "Ogida", "Isihor", "Textile Mill", "Oregbeni", "Oliha", "Sakponba Road",
  "Wire Road", "Ihama Road", "Ugbor", "Ekiosa Market", "Ramat Park",
  "Oba's Palace Area", "Upper Mission", "Dawson Road", "Lagos Street",
  "Benin City Museum Area", "Avbiama",
];

export default function Sellers() {
  const [isTrackingOpen, setTrackingOpen] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [filterLandmark, setFilterLandmark] = useState("all");
  const [form, setForm] = useState({ businessName: "", ownerName: "", phone: "", address: "", landmark: "", description: "" });
  const [success, setSuccess] = useState(false);

  const { data: sellers = [], isLoading } = useListSellers();
  const register = useRegisterSeller();

  const filtered = filterLandmark === "all" ? sellers : sellers.filter(s => s.landmark === filterLandmark);

  function handleSubmit() {
    if (!form.businessName || !form.ownerName || !form.phone || !form.address || !form.landmark) return;
    register.mutate({ data: { ...form, description: form.description || undefined } }, {
      onSuccess: () => { setSuccess(true); setForm({ businessName: "", ownerName: "", phone: "", address: "", landmark: "", description: "" }); },
    });
  }

  return (
    <main style={{ minHeight: "100dvh", background: "var(--background)", color: "var(--foreground)", overflowX: "hidden" }}>
      <Navbar onTrackOrder={() => setTrackingOpen(true)} />

      <div className="pt-28 pb-20 px-4 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-sans"
            style={{ background: "rgba(245,184,0,0.1)", border: "1px solid rgba(245,184,0,0.25)", color: "#F5B800" }}>
            🥚 Egg Sellers Near You — Benin City
          </div>
          <h1 className="font-heading font-black text-4xl md:text-6xl text-foreground mb-4">
            Find Egg Sellers
          </h1>
          <p className="text-muted-foreground font-sans max-w-xl mx-auto mb-8">
            Browse verified egg sellers closest to your area in Benin City. Get fresh eggs directly from your neighbourhood.
          </p>
          <motion.button
            onClick={() => setShowRegister(true)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 rounded-2xl font-heading font-bold text-primary-foreground"
            style={{ background: "linear-gradient(135deg, #F5B800, #E8820C)" }}
          >
            Register as a Seller
          </motion.button>
        </motion.div>

        {/* Filter */}
        <div className="mb-8 flex flex-wrap gap-2 items-center">
          <span className="text-muted-foreground text-sm font-sans">Filter by area:</span>
          <button
            onClick={() => setFilterLandmark("all")}
            className="px-4 py-1.5 rounded-full text-sm font-sans font-medium transition-all"
            style={{ background: filterLandmark === "all" ? "rgba(245,184,0,0.2)" : "rgba(255,255,255,0.05)", color: filterLandmark === "all" ? "#F5B800" : "rgba(255,248,220,0.5)", border: `1px solid ${filterLandmark === "all" ? "rgba(245,184,0,0.4)" : "rgba(255,255,255,0.1)"}` }}
          >All Areas</button>
          {[...new Set(sellers.map(s => s.landmark))].map(lm => (
            <button
              key={lm}
              onClick={() => setFilterLandmark(lm)}
              className="px-4 py-1.5 rounded-full text-sm font-sans font-medium transition-all"
              style={{ background: filterLandmark === lm ? "rgba(245,184,0,0.2)" : "rgba(255,255,255,0.05)", color: filterLandmark === lm ? "#F5B800" : "rgba(255,248,220,0.5)", border: `1px solid ${filterLandmark === lm ? "rgba(245,184,0,0.4)" : "rgba(255,255,255,0.1)"}` }}
            >{lm}</button>
          ))}
        </div>

        {/* Sellers Grid */}
        {isLoading ? (
          <div className="text-center py-20 text-muted-foreground">Loading sellers...</div>
        ) : filtered.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 rounded-3xl"
            style={{ background: "rgba(12,6,0,0.6)", border: "1px solid rgba(245,184,0,0.1)" }}>
            <div className="text-6xl mb-4">🥚</div>
            <p className="font-heading font-bold text-xl text-foreground mb-2">No sellers yet in this area</p>
            <p className="text-muted-foreground text-sm mb-6">Be the first to register in this area!</p>
            <button onClick={() => setShowRegister(true)} className="px-6 py-3 rounded-2xl font-heading font-bold text-primary-foreground" style={{ background: "linear-gradient(135deg, #F5B800, #E8820C)" }}>
              Register Now
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((seller, i) => (
              <motion.div
                key={seller.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl p-6 relative overflow-hidden"
                style={{ background: "rgba(12,6,0,0.8)", border: "1px solid rgba(245,184,0,0.15)", backdropFilter: "blur(16px)" }}
              >
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: "linear-gradient(90deg, transparent, rgba(245,184,0,0.5), transparent)" }} />
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: "rgba(245,184,0,0.12)", border: "1px solid rgba(245,184,0,0.2)" }}>🥚</div>
                  <div>
                    <h3 className="font-heading font-bold text-foreground text-lg leading-tight">{seller.businessName}</h3>
                    <p className="text-muted-foreground text-sm">{seller.ownerName}</p>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span style={{ color: "#F5B800" }}>📍</span>
                    <span className="text-foreground font-medium">{seller.landmark}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span style={{ color: "#F5B800" }}>🏠</span>
                    <span className="text-muted-foreground">{seller.address}</span>
                  </div>
                  {seller.description && (
                    <p className="text-muted-foreground text-xs pt-1 border-t border-white/5">{seller.description}</p>
                  )}
                </div>
                <a
                  href={`tel:${seller.phone}`}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-heading font-bold text-sm transition-all"
                  style={{ background: "rgba(245,184,0,0.1)", border: "1px solid rgba(245,184,0,0.25)", color: "#F5B800" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(245,184,0,0.2)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(245,184,0,0.1)"; }}
                >
                  📞 {seller.phone}
                </a>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />

      {/* Registration Modal */}
      <AnimatePresence>
        {showRegister && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(10,5,0,0.9)", backdropFilter: "blur(12px)" }}
            onClick={e => { if (e.target === e.currentTarget) { setShowRegister(false); setSuccess(false); } }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-full max-w-lg rounded-3xl overflow-hidden max-h-[90vh] overflow-y-auto"
              style={{ background: "rgba(12,6,0,0.95)", border: "1px solid rgba(245,184,0,0.25)", boxShadow: "0 32px 80px rgba(245,184,0,0.15)" }}
            >
              <div className="flex items-center justify-between px-8 pt-8 pb-4">
                <h2 className="font-heading font-black text-2xl text-foreground">
                  {success ? "Registration Submitted!" : "Register as Seller"}
                </h2>
                <button onClick={() => { setShowRegister(false); setSuccess(false); }} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M18 6 6 18M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="px-8 pb-8">
                {success ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
                    <div className="w-20 h-20 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center mx-auto mb-6">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2" className="w-10 h-10"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <h3 className="font-heading font-black text-xl text-foreground mb-2">Registration Received!</h3>
                    <p className="text-muted-foreground text-sm mb-6">Your seller profile has been submitted for review. You'll be listed once approved by the admin.</p>
                    <button onClick={() => { setShowRegister(false); setSuccess(false); }} className="w-full py-4 rounded-2xl font-heading font-bold text-primary-foreground" style={{ background: "linear-gradient(135deg, #F5B800, #E8820C)" }}>Done</button>
                  </motion.div>
                ) : (
                  <>
                    <p className="text-muted-foreground text-sm mb-5">Join the Eggpress seller network. Your listing goes live after admin approval.</p>
                    <div className="space-y-3">
                      <input value={form.businessName} onChange={e => setForm(f => ({ ...f, businessName: e.target.value }))} placeholder="Business Name (e.g. Mama Egg Farm)" className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none" />
                      <input value={form.ownerName} onChange={e => setForm(f => ({ ...f, ownerName: e.target.value }))} placeholder="Your Full Name" className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none" />
                      <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="Phone Number" type="tel" className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none" />
                      <input value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} placeholder="Shop / Home Address" className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none" />
                      <div>
                        <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-2">Closest Landmark / Area</label>
                        <select value={form.landmark} onChange={e => setForm(f => ({ ...f, landmark: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground focus:border-primary focus:outline-none"
                          style={{ background: "rgba(255,255,255,0.04)" }}>
                          <option value="">Select your area...</option>
                          {BENIN_LANDMARKS.map(lm => <option key={lm} value={lm}>{lm}</option>)}
                        </select>
                      </div>
                      <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Brief description (optional — e.g. I sell farm-fresh eggs daily)" rows={2} className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none resize-none" />
                    </div>
                    <button
                      onClick={handleSubmit}
                      disabled={register.isPending || !form.businessName || !form.ownerName || !form.phone || !form.address || !form.landmark}
                      className="mt-6 w-full py-4 rounded-2xl font-heading font-bold text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ background: "linear-gradient(135deg, #F5B800, #E8820C)" }}
                    >
                      {register.isPending ? "Submitting..." : "Submit Registration"}
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isTrackingOpen && <TrackingModal isOpen={isTrackingOpen} onClose={() => setTrackingOpen(false)} />}
      </AnimatePresence>
    </main>
  );
}
