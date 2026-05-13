import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGetOrder, getGetOrderQueryKey } from "@/lib/api";

interface TrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const stages = [
  { key: "received", label: "Order Received", color: "#EF4444" },
  { key: "payment_confirmed", label: "Payment Confirmed", color: "#F97316" },
  { key: "preparing", label: "Preparing", color: "#F59E0B" },
  { key: "ready", label: "Ready", color: "#A3E635" },
  { key: "out_for_delivery", label: "Out For Delivery", color: "#84CC16" },
  { key: "delivered", label: "Delivered", color: "#22C55E" },
];

export default function TrackingModal({ isOpen, onClose }: TrackingModalProps) {
  const [inputId, setInputId] = useState("");
  const [searchId, setSearchId] = useState("");

  const { data: order, isLoading, isError } = useGetOrder(searchId, {
    query: { enabled: !!searchId, queryKey: getGetOrderQueryKey(searchId) },
  });

  const stageIndex = order ? stages.findIndex(s => s.key === order.status) : -1;
  const currentStage = stageIndex >= 0 ? stages[stageIndex] : null;
  const progressPercent = stageIndex >= 0 ? ((stageIndex + 1) / stages.length) * 100 : 0;

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
        style={{ boxShadow: "0 32px 80px rgba(232,130,12,0.2)" }}
      >
        <div className="flex items-center justify-between px-8 pt-8 pb-6">
          <div>
            <h2 className="font-heading font-black text-2xl text-foreground">Track Order</h2>
            <p className="text-muted-foreground text-sm mt-1">Enter your order ID to see delivery progress</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" data-testid="button-close-tracking">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="px-8 pb-8">
          {/* Search */}
          <div className="flex gap-3 mb-6">
            <input
              type="text" value={inputId} onChange={e => setInputId(e.target.value.toUpperCase())}
              onKeyDown={e => e.key === "Enter" && setSearchId(inputId)}
              placeholder="Order ID (e.g. EGG-A3F2C1)" data-testid="input-tracking-id"
              className="flex-1 px-4 py-3 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
            <button onClick={() => setSearchId(inputId)} className="px-5 py-3 rounded-xl font-heading font-bold text-sm text-primary-foreground" style={{ background: "linear-gradient(135deg, #F5B800, #E8820C)" }} data-testid="button-track-submit">
              Track
            </button>
          </div>

          <AnimatePresence mode="wait">
            {isLoading && <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-6 text-muted-foreground"><div className="w-7 h-7 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />Searching...</motion.div>}

            {isError && searchId && (
              <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4 rounded-2xl bg-destructive/10 border border-destructive/30 text-center">
                <p className="text-destructive font-heading font-semibold">Order not found</p>
                <p className="text-muted-foreground text-sm mt-1">Double-check your order ID and try again</p>
              </motion.div>
            )}

            {order && (
              <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Order ID</p>
                    <p className="font-heading font-black text-xl text-primary">{order.id}</p>
                  </div>
                  <div className="px-3 py-1.5 rounded-full text-sm font-heading font-semibold" style={{ background: `${currentStage?.color ?? "#F5B800"}18`, color: currentStage?.color ?? "#F5B800", border: `1px solid ${currentStage?.color ?? "#F5B800"}35` }}>
                    {currentStage?.label ?? order.status}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-2.5 rounded-full bg-white/10 overflow-hidden mb-3">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${progressPercent}%` }} transition={{ duration: 1, ease: "easeOut" }} className="h-full rounded-full" style={{ background: "linear-gradient(90deg, #EF4444 0%, #F97316 20%, #F5B800 40%, #A3E635 65%, #84CC16 80%, #22C55E 100%)" }} />
                </div>

                {/* Stage dots */}
                <div className="grid grid-cols-6 gap-1 mb-6">
                  {stages.map((stage, i) => (
                    <div key={stage.key} className="flex flex-col items-center gap-1">
                      <div className="w-3 h-3 rounded-full transition-all duration-500" style={{ background: i <= stageIndex ? stage.color : "transparent", border: `2px solid ${i <= stageIndex ? stage.color : "#ffffff20"}`, boxShadow: i === stageIndex ? `0 0 8px ${stage.color}` : "none" }} />
                      <p className="text-[9px] text-muted-foreground text-center leading-tight hidden sm:block">{stage.label}</p>
                    </div>
                  ))}
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-2 gap-3 text-sm border-t border-white/10 pt-5">
                  {[["Customer", order.customerName], ["Egg Size", `${order.eggSize} Eggs`], ["Quantity", order.quantityType.replace(/_/g, " ")], ["Delivery", order.deliveryType]].map(([label, val]) => (
                    <div key={label}><p className="text-muted-foreground text-xs mb-1 capitalize">{label}</p><p className="text-foreground font-medium capitalize">{val}</p></div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
