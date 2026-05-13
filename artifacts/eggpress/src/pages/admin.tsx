import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useGetAdminStats, getGetAdminStatsQueryKey,
  useListOrders, getListOrdersQueryKey,
  useUpdateOrderStatus,
  useGetPrices, getGetPricesQueryKey,
  useUpdatePrices,
  useListSubscriptions, getListSubscriptionsQueryKey,
} from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";
import logoImg from "../assets/eggpress-logo-nobg.png";

const ADMIN_PIN = "1234";

type Tab = "dashboard" | "orders" | "prices" | "subscriptions";

const statusOptions = ["received", "payment_confirmed", "preparing", "ready", "out_for_delivery", "delivered"] as const;

const statusConfig: Record<string, { color: string; bg: string; label: string; icon: string }> = {
  received: { color: "#EF4444", bg: "rgba(239,68,68,0.12)", label: "Received", icon: "📥" },
  payment_confirmed: { color: "#F97316", bg: "rgba(249,115,22,0.12)", label: "Payment Confirmed", icon: "💳" },
  preparing: { color: "#F5B800", bg: "rgba(245,184,0,0.12)", label: "Preparing", icon: "🥚" },
  ready: { color: "#A3E635", bg: "rgba(163,230,53,0.12)", label: "Ready", icon: "✅" },
  out_for_delivery: { color: "#84CC16", bg: "rgba(132,204,22,0.12)", label: "Out for Delivery", icon: "🚚" },
  delivered: { color: "#22C55E", bg: "rgba(34,197,94,0.12)", label: "Delivered", icon: "🎉" },
};

const tabConfig: { key: Tab; label: string; icon: string }[] = [
  { key: "dashboard", label: "Dashboard", icon: "📊" },
  { key: "orders", label: "Orders", icon: "📦" },
  { key: "prices", label: "Prices", icon: "💰" },
  { key: "subscriptions", label: "Subscriptions", icon: "🔄" },
];

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [priceForm, setPriceForm] = useState({ size: "large", fullCrate: "", halfCrate: "", quarterCrate: "" });
  const qc = useQueryClient();

  function attemptLogin() {
    if (pin === ADMIN_PIN) { setAuthenticated(true); setPinError(false); }
    else { setPinError(true); setPin(""); }
  }

  const { data: stats } = useGetAdminStats({ query: { enabled: authenticated, queryKey: getGetAdminStatsQueryKey() } });
  const { data: orders } = useListOrders({ query: { enabled: authenticated && activeTab === "orders", queryKey: getListOrdersQueryKey() } });
  const { data: prices } = useGetPrices({ query: { enabled: authenticated && activeTab === "prices", queryKey: getGetPricesQueryKey() } });
  const { data: subscriptions } = useListSubscriptions({ query: { enabled: authenticated && activeTab === "subscriptions", queryKey: getListSubscriptionsQueryKey() } });

  const updateStatus = useUpdateOrderStatus();
  const updatePrice = useUpdatePrices();

  function handleStatusChange(orderId: string, status: string) {
    updateStatus.mutate({ id: orderId, data: { status: status as typeof statusOptions[number] } }, {
      onSuccess: () => qc.invalidateQueries({ queryKey: getListOrdersQueryKey() }),
    });
  }

  function handlePriceSubmit() {
    updatePrice.mutate({
      data: {
        size: priceForm.size as "large" | "medium" | "small",
        fullCrate: parseFloat(priceForm.fullCrate),
        halfCrate: parseFloat(priceForm.halfCrate),
        quarterCrate: parseFloat(priceForm.quarterCrate),
      },
    }, {
      onSuccess: () => qc.invalidateQueries({ queryKey: getGetPricesQueryKey() }),
    });
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center dark px-6 relative overflow-hidden"
        style={{ background: "#080400" }}>
        {/* Background */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(245,184,0,0.10) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 grid-texture" />
        {/* Animated rings */}
        {[160, 280, 400].map((r, i) => (
          <motion.div key={r} className="absolute rounded-full border" style={{ width: r, height: r, top: `calc(50% - ${r/2}px)`, left: `calc(50% - ${r/2}px)`, borderColor: `rgba(245,184,0,${0.08 - i * 0.02})` }}
            animate={{ scale: [1, 1.06, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 3 + i * 0.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }} />
        ))}

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm relative z-10">
          <div className="rounded-3xl p-8 text-center" style={{ background: "rgba(12,6,0,0.85)", border: "1px solid rgba(245,184,0,0.2)", backdropFilter: "blur(24px)", boxShadow: "0 24px 60px rgba(245,184,0,0.12)" }}>
            <motion.img src={logoImg} alt="Eggpress" className="w-16 h-16 mx-auto mb-4 object-contain"
              animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ filter: "drop-shadow(0 0 20px rgba(245,184,0,0.6))" }} />
            <div className="mb-1" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.8rem", letterSpacing: "0.15em" }}>
              <span style={{ color: "#F5B800", WebkitTextStroke: "1px rgba(61,28,0,0.8)", paintOrder: "stroke fill" }}>EGG</span>
              <span style={{ color: "#FF5500", WebkitTextStroke: "1px rgba(26,8,0,0.8)", paintOrder: "stroke fill" }}>PRESS</span>
            </div>
            <p className="text-muted-foreground text-xs tracking-widest uppercase mb-6">Admin Panel</p>

            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-5 text-2xl" style={{ background: "rgba(245,184,0,0.12)", border: "1px solid rgba(245,184,0,0.2)" }}>
              🔐
            </div>
            <h1 className="font-heading font-black text-2xl text-foreground mb-1">Admin Access</h1>
            <p className="text-muted-foreground text-sm mb-6">Enter your PIN to continue</p>

            {/* PIN dots */}
            <div className="flex justify-center gap-3 mb-4">
              {[0, 1, 2, 3].map(i => (
                <div key={i} className="w-3 h-3 rounded-full transition-all duration-200"
                  style={{ background: i < pin.length ? "#F5B800" : "rgba(245,184,0,0.2)", boxShadow: i < pin.length ? "0 0 8px rgba(245,184,0,0.6)" : "none" }} />
              ))}
            </div>

            <input
              type="password" value={pin} onChange={e => setPin(e.target.value)} onKeyDown={e => e.key === "Enter" && attemptLogin()}
              placeholder="Enter PIN" maxLength={8} data-testid="input-admin-pin"
              className="w-full px-4 py-3 rounded-xl text-foreground text-center text-xl font-mono tracking-widest placeholder:text-muted-foreground focus:outline-none mb-3 transition-all"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: pinError ? "1px solid rgba(239,68,68,0.6)" : "1px solid rgba(245,184,0,0.2)",
                boxShadow: pinError ? "0 0 20px rgba(239,68,68,0.15)" : "none",
              }}
              onFocus={e => (e.target.style.borderColor = "rgba(245,184,0,0.5)")}
              onBlur={e => (e.target.style.borderColor = pinError ? "rgba(239,68,68,0.6)" : "rgba(245,184,0,0.2)")}
            />
            <AnimatePresence>
              {pinError && (
                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="text-sm mb-3" style={{ color: "#EF4444" }}>
                  ✗ Incorrect PIN
                </motion.p>
              )}
            </AnimatePresence>
            <motion.button
              onClick={attemptLogin}
              whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(245,184,0,0.4)" }}
              whileTap={{ scale: 0.97 }}
              data-testid="button-admin-login"
              className="w-full py-3 rounded-xl font-heading font-bold text-primary-foreground"
              style={{ background: "linear-gradient(135deg, #F5B800, #E8820C)", border: "1px solid rgba(61,28,0,0.4)" }}
            >
              Enter Dashboard
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-foreground dark relative" style={{ background: "#080400" }}>
      {/* Global bg */}
      <div className="fixed inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 20% 20%, rgba(245,184,0,0.05) 0%, transparent 60%), radial-gradient(ellipse 60% 60% at 80% 80%, rgba(255,85,0,0.04) 0%, transparent 60%)" }} />
      <div className="fixed inset-0 grid-texture pointer-events-none opacity-60" />

      <div className="flex min-h-screen relative z-10">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0 hidden md:flex flex-col" style={{ background: "rgba(8,4,0,0.9)", borderRight: "1px solid rgba(245,184,0,0.12)", backdropFilter: "blur(20px)" }}>
          {/* Logo */}
          <div className="p-6" style={{ borderBottom: "1px solid rgba(245,184,0,0.12)" }}>
            <div className="flex items-center gap-3">
              <img src={logoImg} alt="Eggpress" className="w-10 h-10 object-contain" style={{ filter: "drop-shadow(0 0 10px rgba(245,184,0,0.5))" }} />
              <div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.1rem", letterSpacing: "0.15em" }}>
                  <span style={{ color: "#F5B800", WebkitTextStroke: "1px rgba(61,28,0,0.7)", paintOrder: "stroke fill" }}>EGG</span>
                  <span style={{ color: "#FF5500", WebkitTextStroke: "1px rgba(26,8,0,0.7)", paintOrder: "stroke fill" }}>PRESS</span>
                </div>
                <p className="text-xs text-muted-foreground tracking-widest">Admin Panel</p>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="p-4 flex-1 space-y-1">
            {tabConfig.map(t => (
              <motion.button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                data-testid={`tab-${t.key}`}
                whileHover={{ x: 4 }}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-heading font-semibold transition-all duration-200 flex items-center gap-3"
                style={{
                  background: activeTab === t.key ? "rgba(245,184,0,0.12)" : "transparent",
                  color: activeTab === t.key ? "#F5B800" : "rgba(255,248,220,0.5)",
                  borderLeft: activeTab === t.key ? "2px solid #F5B800" : "2px solid transparent",
                }}
              >
                <span className="text-base">{t.icon}</span>
                {t.label}
                {activeTab === t.key && (
                  <motion.div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: "#F5B800" }}
                    animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
                )}
              </motion.button>
            ))}
          </nav>

          <div className="p-4" style={{ borderTop: "1px solid rgba(245,184,0,0.10)" }}>
            <button
              onClick={() => setAuthenticated(false)}
              className="w-full px-4 py-2 rounded-xl text-sm font-sans transition-colors flex items-center gap-2"
              style={{ color: "rgba(255,248,220,0.4)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = "#EF4444"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(239,68,68,0.08)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,248,220,0.4)"; (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
            >
              <span>🚪</span> Sign Out
            </button>
          </div>
        </aside>

        {/* Mobile tabs */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="md:hidden flex gap-1 p-3 overflow-x-auto" style={{ borderBottom: "1px solid rgba(245,184,0,0.12)", background: "rgba(8,4,0,0.9)" }}>
            {tabConfig.map(t => (
              <button key={t.key} onClick={() => setActiveTab(t.key)} className="px-4 py-2 rounded-lg text-xs font-heading font-semibold whitespace-nowrap transition-all flex items-center gap-1.5"
                style={{ background: activeTab === t.key ? "rgba(245,184,0,0.15)" : "transparent", color: activeTab === t.key ? "#F5B800" : "rgba(255,248,220,0.5)" }}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          <main className="flex-1 p-6 overflow-auto">
            <AnimatePresence mode="wait">

              {/* Dashboard */}
              {activeTab === "dashboard" && (
                <motion.div key="dashboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <div className="flex items-center gap-3 mb-8">
                    <span className="text-3xl">📊</span>
                    <h1 className="font-heading font-black text-3xl text-foreground">Dashboard</h1>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {[
                      { label: "Total Orders", value: stats?.totalOrders ?? "—", color: "#F5B800", bg: "rgba(245,184,0,0.10)", icon: "📦" },
                      { label: "Delivered", value: stats?.deliveredOrders ?? "—", color: "#22C55E", bg: "rgba(34,197,94,0.10)", icon: "✅" },
                      { label: "Pending", value: stats?.pendingOrders ?? "—", color: "#F97316", bg: "rgba(249,115,22,0.10)", icon: "⏳" },
                      { label: "Revenue", value: stats?.totalRevenue ? `₦${Number(stats.totalRevenue).toLocaleString()}` : "—", color: "#F5B800", bg: "rgba(245,184,0,0.10)", icon: "💰" },
                      { label: "Active Subs", value: stats?.activeSubscriptions ?? "—", color: "#4CAF50", bg: "rgba(76,175,80,0.10)", icon: "🔄" },
                      { label: "Today's Orders", value: stats?.todayOrders ?? "—", color: "#E8820C", bg: "rgba(232,130,12,0.10)", icon: "📅" },
                    ].map((card, i) => (
                      <motion.div
                        key={card.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 }}
                        whileHover={{ y: -4, boxShadow: `0 16px 40px ${card.bg}` }}
                        data-testid={`stat-${card.label.toLowerCase().replace(/\s/g, "-")}`}
                        className="rounded-2xl p-5 relative overflow-hidden transition-all duration-300"
                        style={{ background: `rgba(12,6,0,0.8)`, border: `1px solid ${card.color}20`, backdropFilter: "blur(16px)" }}
                      >
                        <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${card.color}60, transparent)` }} />
                        <div className="flex items-start justify-between mb-3">
                          <p className="text-muted-foreground text-xs uppercase tracking-wide">{card.label}</p>
                          <span className="text-xl">{card.icon}</span>
                        </div>
                        <motion.p
                          className="font-heading font-black text-3xl"
                          style={{ color: card.color }}
                          animate={{ textShadow: [`0 0 20px ${card.color}40`, `0 0 35px ${card.color}70`, `0 0 20px ${card.color}40`] }}
                          transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                        >{card.value}</motion.p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Quick info */}
                  <motion.div className="rounded-2xl p-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                    style={{ background: "rgba(245,184,0,0.05)", border: "1px solid rgba(245,184,0,0.12)" }}>
                    <p className="text-sm font-heading font-semibold mb-2" style={{ color: "#F5B800" }}>📌 Quick Info</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground font-sans">
                      <span>Payment: Opay 9013698449</span>
                      <span>Location: Benin City, Nigeria</span>
                      <span>Delivery: 7 AM – 7 PM</span>
                      <span>WhatsApp: 09013698449</span>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* Orders */}
              {activeTab === "orders" && (
                <motion.div key="orders" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <div className="flex items-center gap-3 mb-8">
                    <span className="text-3xl">📦</span>
                    <h1 className="font-heading font-black text-3xl text-foreground">Orders</h1>
                    <span className="ml-2 px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "rgba(245,184,0,0.12)", color: "#F5B800" }}>
                      {(orders ?? []).length} total
                    </span>
                  </div>
                  <div className="space-y-3">
                    {(orders ?? []).length === 0 && (
                      <div className="text-center py-16 rounded-2xl" style={{ background: "rgba(12,6,0,0.6)", border: "1px solid rgba(245,184,0,0.1)" }}>
                        <div className="text-5xl mb-4">📭</div>
                        <p className="text-muted-foreground font-heading">No orders yet</p>
                      </div>
                    )}
                    {(orders ?? []).map((order, i) => {
                      const sc = statusConfig[order.status] ?? statusConfig.received;
                      return (
                        <motion.div
                          key={order.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
                          data-testid={`row-order-${order.id}`}
                          className="rounded-2xl p-5 relative overflow-hidden transition-all duration-200"
                          style={{ background: "rgba(12,6,0,0.75)", border: `1px solid ${sc.color}20`, backdropFilter: "blur(16px)" }}
                        >
                          <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-2xl" style={{ background: sc.color }} />
                          <div className="flex items-start justify-between flex-wrap gap-4 pl-3">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-heading font-bold text-sm" style={{ color: "#F5B800" }}>{order.id}</span>
                                <span className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</span>
                                <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: sc.bg, color: sc.color }}>
                                  {sc.icon} {sc.label}
                                </span>
                              </div>
                              <p className="font-heading font-semibold text-foreground">{order.customerName}</p>
                              <p className="text-sm text-muted-foreground">{order.phone} · {order.eggSize} eggs · {order.quantityType.replace(/_/g, " ")} · {order.deliveryType}</p>
                              <p className="font-bold text-lg" style={{ color: "#F5B800" }}>₦{Number(order.totalAmount).toLocaleString()}</p>
                            </div>
                            <select
                              value={order.status}
                              onChange={e => handleStatusChange(order.id, e.target.value)}
                              data-testid={`select-status-${order.id}`}
                              className="px-3 py-2 rounded-xl text-sm font-heading font-semibold focus:outline-none transition-all"
                              style={{ background: sc.bg, border: `1px solid ${sc.color}40`, color: sc.color }}
                            >
                              {statusOptions.map(s => <option key={s} value={s}>{statusConfig[s]?.icon} {statusConfig[s]?.label ?? s}</option>)}
                            </select>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Prices */}
              {activeTab === "prices" && (
                <motion.div key="prices" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <div className="flex items-center gap-3 mb-8">
                    <span className="text-3xl">💰</span>
                    <h1 className="font-heading font-black text-3xl text-foreground">Update Prices</h1>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Form */}
                    <div className="rounded-2xl p-6" style={{ background: "rgba(12,6,0,0.8)", border: "1px solid rgba(245,184,0,0.15)", backdropFilter: "blur(16px)" }}>
                      <h3 className="font-heading font-bold text-lg mb-5" style={{ color: "#F5B800" }}>Edit Price</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-2">Egg Size</label>
                          <select
                            value={priceForm.size}
                            onChange={e => {
                              const p = prices?.find(x => x.size === e.target.value);
                              setPriceForm(f => ({ ...f, size: e.target.value, ...(p ? { fullCrate: String(p.fullCrate), halfCrate: String(p.halfCrate), quarterCrate: String(p.quarterCrate) } : {}) }));
                            }}
                            data-testid="select-price-size"
                            className="w-full px-4 py-3 rounded-xl text-foreground focus:outline-none transition-all"
                            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(245,184,0,0.2)" }}
                          >
                            <option value="large">🥚 Large</option>
                            <option value="medium">🥚 Medium</option>
                            <option value="small">🥚 Small</option>
                          </select>
                        </div>
                        {([["fullCrate", "Full Crate (₦)", "#F5B800"], ["halfCrate", "Half Crate (₦)", "#E8820C"], ["quarterCrate", "Quarter Crate (₦)", "#FF5500"]] as const).map(([key, label, color]) => (
                          <div key={key}>
                            <label className="text-xs uppercase tracking-wide block mb-2" style={{ color }}>{label}</label>
                            <input
                              type="number"
                              value={(priceForm as Record<string, string>)[key]}
                              onChange={e => setPriceForm(f => ({ ...f, [key]: e.target.value }))}
                              data-testid={`input-price-${key}`}
                              className="w-full px-4 py-3 rounded-xl text-foreground focus:outline-none transition-all"
                              style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${color}25` }}
                              onFocus={e => (e.target.style.borderColor = `${color}60`)}
                              onBlur={e => (e.target.style.borderColor = `${color}25`)}
                            />
                          </div>
                        ))}
                        <motion.button
                          onClick={handlePriceSubmit}
                          disabled={updatePrice.isPending}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          data-testid="button-save-prices"
                          className="w-full py-3 rounded-xl font-heading font-bold text-primary-foreground disabled:opacity-60 transition-all"
                          style={{ background: "linear-gradient(135deg, #F5B800, #E8820C)", border: "1px solid rgba(61,28,0,0.4)" }}
                        >
                          {updatePrice.isPending ? "Saving..." : "💾 Save Prices"}
                        </motion.button>
                        <AnimatePresence>
                          {updatePrice.isSuccess && (
                            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                              className="text-sm text-center font-semibold" style={{ color: "#4CAF50" }}>
                              ✓ Prices updated successfully!
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Current prices table */}
                    <div>
                      <h3 className="font-heading font-bold text-lg mb-4" style={{ color: "#E8820C" }}>Current Prices</h3>
                      <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(12,6,0,0.8)", border: "1px solid rgba(245,184,0,0.12)", backdropFilter: "blur(16px)" }}>
                        <div className="grid grid-cols-4 px-5 py-3 text-xs font-heading font-bold uppercase tracking-widest" style={{ background: "rgba(245,184,0,0.08)", color: "#F5B800" }}>
                          <span>Size</span><span>Full</span><span>Half</span><span>Quarter</span>
                        </div>
                        {(prices ?? []).map((p, i) => (
                          <motion.div key={p.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                            className="grid grid-cols-4 px-5 py-4 text-sm transition-colors duration-200"
                            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
                            whileHover={{ backgroundColor: "rgba(245,184,0,0.04)" }}
                          >
                            <span className="font-heading font-semibold capitalize text-foreground">🥚 {p.size}</span>
                            <span className="font-bold" style={{ color: "#F5B800" }}>₦{Number(p.fullCrate).toLocaleString()}</span>
                            <span className="text-foreground">₦{Number(p.halfCrate).toLocaleString()}</span>
                            <span className="text-foreground">₦{Number(p.quarterCrate).toLocaleString()}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Subscriptions */}
              {activeTab === "subscriptions" && (
                <motion.div key="subscriptions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <div className="flex items-center gap-3 mb-8">
                    <span className="text-3xl">🔄</span>
                    <h1 className="font-heading font-black text-3xl text-foreground">Subscriptions</h1>
                    <span className="ml-2 px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "rgba(76,175,80,0.12)", color: "#4CAF50" }}>
                      {(subscriptions ?? []).filter(s => s.active).length} active
                    </span>
                  </div>
                  <div className="space-y-3">
                    {(subscriptions ?? []).length === 0 && (
                      <div className="text-center py-16 rounded-2xl" style={{ background: "rgba(12,6,0,0.6)", border: "1px solid rgba(245,184,0,0.1)" }}>
                        <div className="text-5xl mb-4">📭</div>
                        <p className="text-muted-foreground font-heading">No subscriptions yet</p>
                      </div>
                    )}
                    {(subscriptions ?? []).map((sub, i) => (
                      <motion.div key={sub.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        data-testid={`row-sub-${sub.id}`}
                        className="rounded-2xl p-5 relative overflow-hidden"
                        style={{ background: "rgba(12,6,0,0.75)", border: `1px solid ${sub.active ? "rgba(76,175,80,0.2)" : "rgba(255,255,255,0.06)"}`, backdropFilter: "blur(16px)" }}
                      >
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-2xl" style={{ background: sub.active ? "#4CAF50" : "rgba(255,255,255,0.1)" }} />
                        <div className="flex items-center justify-between flex-wrap gap-3 pl-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-heading font-semibold text-foreground">{sub.customerName}</p>
                              <span className="px-2 py-0.5 rounded-full text-xs font-semibold"
                                style={{ background: sub.active ? "rgba(76,175,80,0.15)" : "rgba(255,255,255,0.05)", color: sub.active ? "#4CAF50" : "#888" }}>
                                {sub.active ? "● Active" : "○ Inactive"}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{sub.phone} · {sub.eggSize} eggs · {sub.quantityType.replace(/_/g, " ")} · {sub.frequency}</p>
                            <p className="text-xs text-muted-foreground mt-1">📍 {sub.address}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-muted-foreground mb-1">Frequency</div>
                            <div className="px-3 py-1.5 rounded-full text-sm font-heading font-semibold capitalize" style={{ background: "rgba(245,184,0,0.1)", color: "#F5B800", border: "1px solid rgba(245,184,0,0.2)" }}>
                              🔄 {sub.frequency}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}
