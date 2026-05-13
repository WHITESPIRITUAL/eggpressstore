import { useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { useGetOrder, getGetOrderQueryKey } from "@/lib/api";

const stages = [
  { key: "received", label: "Order Received", color: "#EF4444" },
  { key: "payment_confirmed", label: "Payment Confirmed", color: "#F97316" },
  { key: "preparing", label: "Preparing Order", color: "#F59E0B" },
  { key: "ready", label: "Ready For Delivery", color: "#A3E635" },
  { key: "out_for_delivery", label: "Out For Delivery", color: "#84CC16" },
  { key: "delivered", label: "Delivered", color: "#22C55E" },
];

function getStageIndex(status: string) {
  return stages.findIndex(s => s.key === status);
}

export default function OrderTracking() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [inputId, setInputId] = useState("");
  const [searchId, setSearchId] = useState("");

  const { data: order, isLoading, error } = useGetOrder(searchId, {
    query: {
      enabled: !!searchId,
      queryKey: getGetOrderQueryKey(searchId),
    },
  });

  const stageIndex = order ? getStageIndex(order.status) : -1;
  const progressPercent = stageIndex >= 0 ? ((stageIndex + 1) / stages.length) * 100 : 0;
  const currentStage = stageIndex >= 0 ? stages[stageIndex] : null;

  return (
    <section ref={ref} className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(232,130,12,0.06) 0%, transparent 70%)" }} />
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-secondary font-sans text-sm uppercase tracking-[0.2em] mb-3">Live Tracking</p>
          <h2 className="font-heading font-black text-4xl md:text-6xl text-foreground">Track Your Order</h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto">Enter your order ID to see real-time delivery progress</p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex gap-3 mb-10"
        >
          <input
            type="text"
            value={inputId}
            onChange={e => setInputId(e.target.value.toUpperCase())}
            onKeyDown={e => e.key === "Enter" && setSearchId(inputId)}
            placeholder="Enter Order ID (e.g. EGG-A3F2C1)"
            data-testid="input-order-id"
            className="flex-1 px-5 py-4 rounded-2xl bg-card border border-border text-foreground placeholder:text-muted-foreground font-sans focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSearchId(inputId)}
            data-testid="button-track-search"
            className="px-6 py-4 rounded-2xl font-heading font-bold text-sm tracking-wide"
            style={{ background: "linear-gradient(135deg, #F5B800 0%, #E8820C 100%)", color: "#1A0A00" }}
          >
            Track
          </motion.button>
        </motion.div>

        {/* Result */}
        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-8 text-muted-foreground">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              Searching for your order...
            </motion.div>
          )}

          {error && searchId && (
            <motion.div key="error" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-center py-8">
              <div className="glassmorphism rounded-2xl p-6 border-destructive/30">
                <p className="text-destructive font-heading font-semibold">Order not found</p>
                <p className="text-muted-foreground text-sm mt-1">Check your order ID and try again</p>
              </div>
            </motion.div>
          )}

          {order && (
            <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="glassmorphism rounded-3xl p-8" style={{ boxShadow: `0 20px 60px ${currentStage?.color ?? "#F5B800"}28` }}>
              {/* Order info */}
              <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
                <div>
                  <p className="text-muted-foreground text-sm mb-1">Order ID</p>
                  <p className="font-heading font-black text-2xl text-primary">{order.id}</p>
                </div>
                <div
                  className="px-4 py-2 rounded-full text-sm font-heading font-bold tracking-wide"
                  style={{ background: `${currentStage?.color ?? "#F5B800"}20`, color: currentStage?.color ?? "#F5B800", border: `1px solid ${currentStage?.color ?? "#F5B800"}40` }}
                >
                  {currentStage?.label ?? order.status}
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-8">
                <div className="h-3 rounded-full bg-muted overflow-hidden mb-4">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, #EF4444 0%, #F97316 20%, #F5B800 40%, #A3E635 60%, #84CC16 80%, #22C55E 100%)` }}
                  />
                </div>

                {/* Stage dots */}
                <div className="grid grid-cols-6 gap-1">
                  {stages.map((stage, i) => (
                    <div key={stage.key} className="text-center">
                      <div
                        className="w-4 h-4 rounded-full mx-auto mb-1 transition-all duration-500"
                        style={{
                          background: i <= stageIndex ? stage.color : "transparent",
                          border: `2px solid ${i <= stageIndex ? stage.color : "#ffffff20"}`,
                          boxShadow: i === stageIndex ? `0 0 12px ${stage.color}` : "none",
                        }}
                      />
                      <p className="text-[9px] md:text-[10px] text-muted-foreground leading-tight hidden sm:block">{stage.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4 text-sm border-t border-white/10 pt-6">
                <div>
                  <p className="text-muted-foreground mb-1">Customer</p>
                  <p className="text-foreground font-medium">{order.customerName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Egg Size</p>
                  <p className="text-foreground font-medium capitalize">{order.eggSize} Eggs</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Quantity</p>
                  <p className="text-foreground font-medium capitalize">{order.quantityType.replace(/_/g, " ")}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Delivery</p>
                  <p className="text-foreground font-medium capitalize">{order.deliveryType}</p>
                </div>
                {order.referenceCode && (
                  <div className="col-span-2">
                    <p className="text-muted-foreground mb-1">Reference Code</p>
                    <p className="text-primary font-bold font-heading">{order.referenceCode}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
