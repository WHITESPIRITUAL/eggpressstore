import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCreateOrder, useGetPrices } from "@workspace/api-client-react";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSize?: "large" | "medium" | "small" | null;
}

type Size = "large" | "medium" | "small";
type QtyType = "full_crate" | "half_crate" | "quarter_crate" | "custom";
type DeliveryType = "delivery" | "pickup";

const STORAGE_KEY = "eggpress_customer";

function loadSaved() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null"); } catch { return null; }
}

function saveCustomer(data: Record<string, string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

const sizeLabels: Record<Size, string> = { large: "Large Eggs", medium: "Medium Eggs", small: "Small Eggs" };
const qtyLabels: Record<QtyType, string> = { full_crate: "Full Crate (30)", half_crate: "Half Crate (15)", quarter_crate: "Quarter Crate (8)", custom: "Custom Quantity" };

export default function OrderModal({ isOpen, onClose, initialSize }: OrderModalProps) {
  const [step, setStep] = useState(1);
  const [size, setSize] = useState<Size>(initialSize ?? "large");
  const [qty, setQty] = useState<QtyType>("full_crate");
  const [customQty, setCustomQty] = useState("6");
  const [deliveryType, setDeliveryType] = useState<DeliveryType>("delivery");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [useSaved, setUseSaved] = useState(false);
  const [savedData, setSavedData] = useState<Record<string, string> | null>(null);
  const [orderId, setOrderId] = useState("");
  const [refCode, setRefCode] = useState("");

  const { data: pricesData } = useGetPrices();
  const prices = Array.isArray(pricesData) ? pricesData : [];
  const createOrder = useCreateOrder();

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      if (initialSize) setSize(initialSize);
      const saved = loadSaved();
      if (saved) {
        setSavedData(saved);
        setUseSaved(true);
        setName(saved.name ?? "");
        setPhone(saved.phone ?? "");
        setAddress(saved.address ?? "");
      }
    }
  }, [isOpen, initialSize]);

  const priceObj = prices.find(p => p.size === size);
  const unitPrice = priceObj ? {
    full_crate: priceObj.fullCrate,
    half_crate: priceObj.halfCrate,
    quarter_crate: priceObj.quarterCrate,
    custom: priceObj.quarterCrate,
  }[qty] : 0;

  function handleSubmit() {
    const totalAmount = Number(unitPrice);
    saveCustomer({ name, phone, address });
    createOrder.mutate({
      data: {
        customerName: name,
        phone,
        address,
        deliveryNotes: notes || undefined,
        eggSize: size,
        quantityType: qty,
        customQuantity: qty === "custom" ? parseInt(customQty) : undefined,
        totalAmount,
        deliveryType,
        deliveryDate: deliveryType === "delivery" && deliveryDate ? deliveryDate : undefined,
      },
    }, {
      onSuccess: (order) => {
        setOrderId(order.id);
        setRefCode(order.referenceCode ?? "");
        setStep(6);
      },
    });
  }

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(10,5,0,0.85)", backdropFilter: "blur(12px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 30 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="w-full max-w-lg glassmorphism rounded-3xl overflow-hidden"
        style={{ boxShadow: "0 32px 80px rgba(245,184,0,0.2)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-8 pb-4">
          <h2 className="font-heading font-black text-2xl text-foreground">
            {step === 6 ? "Order Placed!" : "Place Your Order"}
          </h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" data-testid="button-close-modal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Step indicator */}
        {step < 6 && (
          <div className="px-8 pb-4 flex gap-1.5">
            {[1, 2, 3, 4, 5].map(s => (
              <div key={s} className="h-1 flex-1 rounded-full overflow-hidden bg-white/10">
                <motion.div className="h-full" style={{ background: "linear-gradient(90deg, #F5B800, #E8820C)" }} animate={{ width: s <= step ? "100%" : "0%" }} transition={{ duration: 0.4 }} />
              </div>
            ))}
          </div>
        )}

        <div className="px-8 pb-8">
          <AnimatePresence mode="wait">

            {/* Step 1: Egg Size */}
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <p className="text-muted-foreground text-sm mb-5">Choose your egg size</p>
                <div className="space-y-3">
                  {(["large", "medium", "small"] as Size[]).map(s => (
                    <button key={s} onClick={() => setSize(s)} data-testid={`option-size-${s}`}
                      className="w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-200"
                      style={{ borderColor: size === s ? "#F5B800" : "rgba(255,255,255,0.1)", background: size === s ? "rgba(245,184,0,0.1)" : "transparent" }}>
                      <span className="font-heading font-semibold text-foreground">{sizeLabels[s]}</span>
                      {size === s && <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center"><svg viewBox="0 0 16 16" fill="white" className="w-3 h-3"><path d="M13 4L6 11 3 8" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" /></svg></div>}
                    </button>
                  ))}
                </div>
                <button onClick={() => setStep(2)} className="mt-6 w-full py-4 rounded-2xl font-heading font-bold text-primary-foreground" style={{ background: "linear-gradient(135deg, #F5B800, #E8820C)" }} data-testid="button-next-step">Next</button>
              </motion.div>
            )}

            {/* Step 2: Quantity */}
            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <p className="text-muted-foreground text-sm mb-5">Select quantity type</p>
                <div className="space-y-3">
                  {(["full_crate", "half_crate", "quarter_crate", "custom"] as QtyType[]).map(q => {
                    const price = priceObj ? { full_crate: priceObj.fullCrate, half_crate: priceObj.halfCrate, quarter_crate: priceObj.quarterCrate, custom: null }[q] : null;
                    return (
                      <button key={q} onClick={() => setQty(q)} data-testid={`option-qty-${q}`}
                        className="w-full flex items-center justify-between p-4 rounded-2xl border transition-all duration-200"
                        style={{ borderColor: qty === q ? "#F5B800" : "rgba(255,255,255,0.1)", background: qty === q ? "rgba(245,184,0,0.1)" : "transparent" }}>
                        <span className="font-heading font-semibold text-foreground">{qtyLabels[q]}</span>
                        {price && <span className="text-primary font-bold">₦{Number(price).toLocaleString()}</span>}
                      </button>
                    );
                  })}
                </div>
                {qty === "custom" && (
                  <input type="number" value={customQty} onChange={e => setCustomQty(e.target.value)} placeholder="Number of eggs" className="mt-3 w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground focus:border-primary focus:outline-none" data-testid="input-custom-qty" />
                )}
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(1)} className="flex-1 py-4 rounded-2xl font-heading font-bold border border-white/20 text-foreground hover:bg-white/5 transition-colors">Back</button>
                  <button onClick={() => setStep(3)} className="flex-[2] py-4 rounded-2xl font-heading font-bold text-primary-foreground" style={{ background: "linear-gradient(135deg, #F5B800, #E8820C)" }} data-testid="button-next-step">Next</button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Delivery type */}
            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <p className="text-muted-foreground text-sm mb-5">How would you like to receive your order?</p>
                <div className="grid grid-cols-2 gap-4">
                  {(["delivery", "pickup"] as DeliveryType[]).map(d => (
                    <button key={d} onClick={() => setDeliveryType(d)} data-testid={`option-delivery-${d}`}
                      className="p-5 rounded-2xl border flex flex-col items-center gap-3 transition-all duration-200"
                      style={{ borderColor: deliveryType === d ? "#F5B800" : "rgba(255,255,255,0.1)", background: deliveryType === d ? "rgba(245,184,0,0.1)" : "transparent" }}>
                      {d === "delivery" ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="#F5B800" strokeWidth="1.5" className="w-8 h-8"><rect x="1" y="3" width="15" height="13" rx="1" /><path d="M16 8h4l3 3v5h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="1.5" className="w-8 h-8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                      )}
                      <span className="font-heading font-semibold capitalize text-foreground">{d}</span>
                    </button>
                  ))}
                </div>
                {deliveryType === "delivery" && (
                  <div className="mt-4">
                    <label className="text-muted-foreground text-xs uppercase tracking-wide block mb-2">Preferred Delivery Date</label>
                    <input type="date" value={deliveryDate} onChange={e => setDeliveryDate(e.target.value)} min={new Date().toISOString().split("T")[0]} className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground focus:border-primary focus:outline-none" data-testid="input-delivery-date" />
                  </div>
                )}
                {deliveryType === "pickup" && (
                  <div className="mt-4 p-4 rounded-2xl bg-accent/10 border border-accent/30 text-sm text-foreground/80">
                    Pickup available at our Benin City location. Your reference code will be provided after checkout.
                  </div>
                )}
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(2)} className="flex-1 py-4 rounded-2xl font-heading font-bold border border-white/20 text-foreground hover:bg-white/5 transition-colors">Back</button>
                  <button onClick={() => setStep(4)} className="flex-[2] py-4 rounded-2xl font-heading font-bold text-primary-foreground" style={{ background: "linear-gradient(135deg, #F5B800, #E8820C)" }} data-testid="button-next-step">Next</button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Personal details */}
            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                {savedData && useSaved && (
                  <div className="mb-4 p-4 rounded-2xl bg-primary/10 border border-primary/30">
                    <p className="text-primary font-heading font-semibold text-sm">Welcome back, {savedData.name}!</p>
                    <div className="flex gap-2 mt-2">
                      <button className="text-xs px-3 py-1.5 rounded-lg bg-primary/20 text-primary font-medium hover:bg-primary/30 transition-colors" data-testid="button-buy-again">Buy Again (use saved details)</button>
                      <button onClick={() => { setUseSaved(false); setName(""); setPhone(""); setAddress(""); }} className="text-xs px-3 py-1.5 rounded-lg bg-white/10 text-foreground hover:bg-white/20 transition-colors" data-testid="button-new-details">Use New Details</button>
                    </div>
                  </div>
                )}
                <p className="text-muted-foreground text-sm mb-4">Your delivery information</p>
                <div className="space-y-3">
                  <input value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" data-testid="input-name" className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none" />
                  <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone Number" type="tel" data-testid="input-phone" className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none" />
                  <input value={address} onChange={e => setAddress(e.target.value)} placeholder="Delivery Address" data-testid="input-address" className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none" />
                  <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Delivery notes (optional)" rows={2} data-testid="input-notes" className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none resize-none" />
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(3)} className="flex-1 py-4 rounded-2xl font-heading font-bold border border-white/20 text-foreground hover:bg-white/5 transition-colors">Back</button>
                  <button onClick={() => setStep(5)} disabled={!name || !phone || !address} className="flex-[2] py-4 rounded-2xl font-heading font-bold text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed" style={{ background: "linear-gradient(135deg, #F5B800, #E8820C)" }} data-testid="button-next-step">Continue</button>
                </div>
              </motion.div>
            )}

            {/* Step 5: Payment */}
            {step === 5 && (
              <motion.div key="step5" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <p className="text-muted-foreground text-sm mb-5">Bank Transfer Payment</p>

                {/* Order summary */}
                <div className="p-4 rounded-2xl bg-card border border-border mb-4 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Size</span><span className="text-foreground font-medium">{sizeLabels[size]}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Quantity</span><span className="text-foreground font-medium">{qtyLabels[qty]}</span></div>
                  <div className="flex justify-between border-t border-white/10 pt-2 mt-2"><span className="text-foreground font-bold">Total Amount</span><span className="text-primary font-black text-lg">₦{Number(unitPrice).toLocaleString()}</span></div>
                </div>

                {/* Bank details */}
                <div className="p-4 rounded-2xl border border-primary/30 bg-primary/5 mb-4">
                  <p className="text-primary font-heading font-bold text-sm mb-3">Transfer to:</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Bank Name</span><span className="text-foreground font-medium">Opay</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Account Number</span><span className="text-foreground font-mono font-bold">9013698449</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Account Name</span><span className="text-foreground font-medium">EGGPRESS</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Amount</span><span className="text-primary font-black">₦{Number(unitPrice).toLocaleString()}</span></div>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground mb-4">After completing your transfer, click the button below. Your order will be confirmed once payment is verified.</p>

                <div className="flex gap-3">
                  <button onClick={() => setStep(4)} className="flex-1 py-4 rounded-2xl font-heading font-bold border border-white/20 text-foreground hover:bg-white/5 transition-colors">Back</button>
                  <button onClick={handleSubmit} disabled={createOrder.isPending} className="flex-[2] py-4 rounded-2xl font-heading font-bold text-primary-foreground disabled:opacity-70" style={{ background: "linear-gradient(135deg, #F5B800, #E8820C)" }} data-testid="button-confirm-transfer">
                    {createOrder.isPending ? "Placing Order..." : "I've Made the Transfer"}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 6: Success */}
            {step === 6 && (
              <motion.div key="step6" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }} className="w-20 h-20 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center mx-auto mb-6">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2" className="w-10 h-10"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </motion.div>
                <h3 className="font-heading font-black text-2xl text-foreground mb-2">Order Placed!</h3>
                <p className="text-muted-foreground text-sm mb-6">We've received your order and will confirm payment shortly.</p>
                <div className="p-4 rounded-2xl bg-card border border-border text-left space-y-2 mb-6">
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Order ID</span><span className="text-primary font-black font-heading">{orderId}</span></div>
                  {refCode && <div className="flex justify-between text-sm"><span className="text-muted-foreground">Reference Code</span><span className="text-foreground font-mono font-bold">{refCode}</span></div>}
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Status</span><span className="text-accent font-medium">Order Received</span></div>
                </div>
                <p className="text-xs text-muted-foreground mb-4">Keep your Order ID to track your delivery</p>
                <button onClick={onClose} className="w-full py-4 rounded-2xl font-heading font-bold text-primary-foreground" style={{ background: "linear-gradient(135deg, #F5B800, #E8820C)" }} data-testid="button-done">
                  Done
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
