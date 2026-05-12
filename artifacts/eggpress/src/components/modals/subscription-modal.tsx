import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCreateSubscription } from "@workspace/api-client-react";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Size = "large" | "medium" | "small";
type QtyType = "full_crate" | "half_crate" | "quarter_crate" | "custom";
type Freq = "weekly" | "biweekly" | "monthly";

export default function SubscriptionModal({ isOpen, onClose }: SubscriptionModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [size, setSize] = useState<Size>("large");
  const [qty, setQty] = useState<QtyType>("full_crate");
  const [freq, setFreq] = useState<Freq>("weekly");
  const [done, setDone] = useState(false);

  const createSub = useCreateSubscription();

  function handleSubmit() {
    createSub.mutate({
      data: { customerName: name, phone, address, eggSize: size, quantityType: qty, frequency: freq },
    }, {
      onSuccess: () => setDone(true),
    });
  }

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(10,5,0,0.85)", backdropFilter: "blur(12px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="w-full max-w-lg glassmorphism rounded-3xl overflow-hidden"
        style={{ boxShadow: "0 32px 80px rgba(76,175,80,0.18)" }}
      >
        <div className="flex items-center justify-between px-8 pt-8 pb-4">
          <h2 className="font-heading font-black text-2xl text-foreground">{done ? "You're Subscribed!" : "Set Up Recurring Delivery"}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" data-testid="button-close-sub">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="px-8 pb-8">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }} className="w-20 h-20 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center mx-auto mb-5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2" className="w-10 h-10"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </motion.div>
                <h3 className="font-heading font-black text-xl text-foreground mb-2">Subscription Confirmed!</h3>
                <p className="text-muted-foreground text-sm max-w-xs mx-auto">We'll contact you on <span className="text-foreground font-medium">{phone}</span> to confirm your first delivery and payment details.</p>
                <button onClick={onClose} className="mt-6 w-full py-4 rounded-2xl font-heading font-bold text-primary-foreground" style={{ background: "linear-gradient(135deg, #F5B800, #E8820C)" }} data-testid="button-sub-done">Done</button>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <p className="text-muted-foreground text-sm mb-5">Never run out of eggs again</p>

                {/* Frequency */}
                <div className="mb-4">
                  <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-2">Delivery Frequency</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["weekly", "biweekly", "monthly"] as Freq[]).map(f => (
                      <button key={f} onClick={() => setFreq(f)} data-testid={`option-freq-${f}`}
                        className="py-2.5 rounded-xl text-sm font-heading font-semibold border transition-all capitalize"
                        style={{ borderColor: freq === f ? "#F5B800" : "rgba(255,255,255,0.1)", background: freq === f ? "rgba(245,184,0,0.12)" : "transparent", color: freq === f ? "#F5B800" : "hsl(var(--muted-foreground))" }}>
                        {f === "biweekly" ? "Bi-Weekly" : f.charAt(0).toUpperCase() + f.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size + Qty */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-2">Egg Size</label>
                    <select value={size} onChange={e => setSize(e.target.value as Size)} data-testid="select-sub-size" className="w-full px-3 py-3 rounded-xl bg-card border border-border text-foreground focus:border-primary focus:outline-none text-sm">
                      <option value="large">Large</option>
                      <option value="medium">Medium</option>
                      <option value="small">Small</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-2">Quantity</label>
                    <select value={qty} onChange={e => setQty(e.target.value as QtyType)} data-testid="select-sub-qty" className="w-full px-3 py-3 rounded-xl bg-card border border-border text-foreground focus:border-primary focus:outline-none text-sm">
                      <option value="full_crate">Full Crate</option>
                      <option value="half_crate">Half Crate</option>
                      <option value="quarter_crate">Quarter Crate</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>
                </div>

                {/* Personal info */}
                <div className="space-y-3">
                  <input value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" data-testid="input-sub-name" className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none" />
                  <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone Number" type="tel" data-testid="input-sub-phone" className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none" />
                  <input value={address} onChange={e => setAddress(e.target.value)} placeholder="Delivery Address" data-testid="input-sub-address" className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none" />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!name || !phone || !address || createSub.isPending}
                  data-testid="button-confirm-subscription"
                  className="mt-6 w-full py-4 rounded-2xl font-heading font-bold text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: "linear-gradient(135deg, #F5B800, #E8820C)" }}
                >
                  {createSub.isPending ? "Setting Up..." : "Confirm Subscription"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
