import { useState } from "react";
import { motion } from "framer-motion";
import {
  useGetAdminStats, getGetAdminStatsQueryKey,
  useListOrders, getListOrdersQueryKey,
  useUpdateOrderStatus,
  useGetPrices, getGetPricesQueryKey,
  useUpdatePrices,
  useListSubscriptions, getListSubscriptionsQueryKey,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";

const ADMIN_PIN = "1234";

type Tab = "dashboard" | "orders" | "prices" | "subscriptions";

const statusOptions = ["received", "payment_confirmed", "preparing", "ready", "out_for_delivery", "delivered"] as const;
const statusColors: Record<string, string> = {
  received: "#EF4444",
  payment_confirmed: "#F97316",
  preparing: "#F59E0B",
  ready: "#A3E635",
  out_for_delivery: "#84CC16",
  delivered: "#22C55E",
};

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
      <div className="min-h-screen bg-background flex items-center justify-center dark px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm glassmorphism rounded-3xl p-8 text-center" style={{ boxShadow: "0 24px 60px rgba(245,184,0,0.15)" }}>
          <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto mb-6">
            <svg viewBox="0 0 24 24" fill="none" stroke="#F5B800" strokeWidth="1.5" className="w-8 h-8"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
          </div>
          <h1 className="font-heading font-black text-2xl text-foreground mb-2">Admin Access</h1>
          <p className="text-muted-foreground text-sm mb-6">Enter your PIN to continue</p>
          <input
            type="password" value={pin} onChange={e => setPin(e.target.value)} onKeyDown={e => e.key === "Enter" && attemptLogin()}
            placeholder="PIN" maxLength={8} data-testid="input-admin-pin"
            className={`w-full px-4 py-3 rounded-xl bg-card border text-foreground text-center text-xl font-mono tracking-widest placeholder:text-muted-foreground focus:outline-none mb-3 ${pinError ? "border-destructive" : "border-border focus:border-primary"}`}
          />
          {pinError && <p className="text-destructive text-sm mb-3">Incorrect PIN</p>}
          <button onClick={attemptLogin} data-testid="button-admin-login" className="w-full py-3 rounded-xl font-heading font-bold text-primary-foreground" style={{ background: "linear-gradient(135deg, #F5B800, #E8820C)" }}>
            Enter
          </button>
        </motion.div>
      </div>
    );
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "dashboard", label: "Dashboard" },
    { key: "orders", label: "Orders" },
    { key: "prices", label: "Prices" },
    { key: "subscriptions", label: "Subscriptions" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground dark">
      {/* Sidebar */}
      <div className="flex min-h-screen">
        <aside className="w-64 border-r border-border bg-sidebar flex-shrink-0 hidden md:flex flex-col">
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <svg width="32" height="32" viewBox="0 0 100 100" fill="none"><path d="M50 10C35 10 20 35 20 60C20 76.5685 33.4315 90 50 90C66.5685 90 80 76.5685 80 60C80 35 65 10 50 10Z" fill="url(#adminEgg)" /><defs><linearGradient id="adminEgg" x1="50" y1="10" x2="50" y2="90" gradientUnits="userSpaceOnUse"><stop stopColor="#FFFDF5" /><stop offset="1" stopColor="#E8820C" /></linearGradient></defs></svg>
              <div><p className="font-heading font-black text-sm text-primary">EGGPRESS</p><p className="text-xs text-muted-foreground">Admin Panel</p></div>
            </div>
          </div>
          <nav className="p-4 flex-1 space-y-1">
            {tabs.map(t => (
              <button key={t.key} onClick={() => setActiveTab(t.key)} data-testid={`tab-${t.key}`}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-heading font-semibold transition-all duration-200 ${activeTab === t.key ? "bg-primary/15 text-primary" : "text-muted-foreground hover:bg-white/5 hover:text-foreground"}`}>
                {t.label}
              </button>
            ))}
          </nav>
          <div className="p-4 border-t border-border">
            <button onClick={() => setAuthenticated(false)} className="w-full px-4 py-2 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors font-sans">Sign Out</button>
          </div>
        </aside>

        {/* Mobile tabs */}
        <div className="flex-1 flex flex-col">
          <div className="md:hidden flex gap-1 p-3 border-b border-border overflow-x-auto">
            {tabs.map(t => (
              <button key={t.key} onClick={() => setActiveTab(t.key)} className={`px-4 py-2 rounded-lg text-xs font-heading font-semibold whitespace-nowrap transition-all ${activeTab === t.key ? "bg-primary/15 text-primary" : "text-muted-foreground"}`}>{t.label}</button>
            ))}
          </div>

          <main className="flex-1 p-6 overflow-auto">
            {/* Dashboard */}
            {activeTab === "dashboard" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h1 className="font-heading font-black text-3xl text-foreground mb-8">Dashboard</h1>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {[
                    { label: "Total Orders", value: stats?.totalOrders ?? "—", color: "#F5B800" },
                    { label: "Delivered", value: stats?.deliveredOrders ?? "—", color: "#22C55E" },
                    { label: "Pending", value: stats?.pendingOrders ?? "—", color: "#F97316" },
                    { label: "Revenue", value: stats?.totalRevenue ? `₦${Number(stats.totalRevenue).toLocaleString()}` : "—", color: "#F5B800" },
                    { label: "Subscriptions", value: stats?.activeSubscriptions ?? "—", color: "#4CAF50" },
                    { label: "Today's Orders", value: stats?.todayOrders ?? "—", color: "#E8820C" },
                  ].map(card => (
                    <div key={card.label} data-testid={`stat-${card.label.toLowerCase().replace(/\s/g, "-")}`} className="glassmorphism rounded-2xl p-5">
                      <p className="text-muted-foreground text-xs uppercase tracking-wide mb-2">{card.label}</p>
                      <p className="font-heading font-black text-3xl" style={{ color: card.color }}>{card.value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Orders */}
            {activeTab === "orders" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h1 className="font-heading font-black text-3xl text-foreground mb-8">Orders</h1>
                <div className="space-y-3">
                  {(orders ?? []).length === 0 && <p className="text-muted-foreground text-center py-12">No orders yet</p>}
                  {(orders ?? []).map(order => (
                    <div key={order.id} data-testid={`row-order-${order.id}`} className="glassmorphism rounded-2xl p-5">
                      <div className="flex items-start justify-between flex-wrap gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-heading font-bold text-primary text-sm">{order.id}</span>
                            <span className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</span>
                          </div>
                          <p className="font-heading font-semibold text-foreground">{order.customerName}</p>
                          <p className="text-sm text-muted-foreground">{order.phone} · {order.eggSize} · {order.quantityType.replace(/_/g, " ")} · {order.deliveryType}</p>
                          <p className="text-primary font-bold">₦{Number(order.totalAmount).toLocaleString()}</p>
                        </div>
                        <select
                          value={order.status}
                          onChange={e => handleStatusChange(order.id, e.target.value)}
                          data-testid={`select-status-${order.id}`}
                          className="px-3 py-2 rounded-xl bg-card border border-border text-sm font-heading font-semibold focus:outline-none focus:border-primary"
                          style={{ color: statusColors[order.status] ?? "#F5B800" }}
                        >
                          {statusOptions.map(s => <option key={s} value={s}>{s.replace(/_/g, " ")}</option>)}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Prices */}
            {activeTab === "prices" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h1 className="font-heading font-black text-3xl text-foreground mb-8">Update Prices</h1>
                <div className="max-w-md glassmorphism rounded-2xl p-6 mb-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-2">Egg Size</label>
                      <select value={priceForm.size} onChange={e => { setPriceForm(f => ({ ...f, size: e.target.value })); const p = prices?.find(x => x.size === e.target.value); if (p) setPriceForm(f => ({ ...f, size: e.target.value, fullCrate: String(p.fullCrate), halfCrate: String(p.halfCrate), quarterCrate: String(p.quarterCrate) })); }} data-testid="select-price-size" className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground focus:outline-none focus:border-primary">
                        <option value="large">Large</option>
                        <option value="medium">Medium</option>
                        <option value="small">Small</option>
                      </select>
                    </div>
                    {[["fullCrate", "Full Crate (₦)"], ["halfCrate", "Half Crate (₦)"], ["quarterCrate", "Quarter Crate (₦)"]].map(([key, label]) => (
                      <div key={key}>
                        <label className="text-xs text-muted-foreground uppercase tracking-wide block mb-2">{label}</label>
                        <input type="number" value={(priceForm as Record<string, string>)[key]} onChange={e => setPriceForm(f => ({ ...f, [key]: e.target.value }))} data-testid={`input-price-${key}`} className="w-full px-4 py-3 rounded-xl bg-card border border-border text-foreground focus:outline-none focus:border-primary" />
                      </div>
                    ))}
                    <button onClick={handlePriceSubmit} disabled={updatePrice.isPending} data-testid="button-save-prices" className="w-full py-3 rounded-xl font-heading font-bold text-primary-foreground disabled:opacity-60" style={{ background: "linear-gradient(135deg, #F5B800, #E8820C)" }}>
                      {updatePrice.isPending ? "Saving..." : "Save Prices"}
                    </button>
                    {updatePrice.isSuccess && <p className="text-accent text-sm text-center">Prices updated successfully</p>}
                  </div>
                </div>
                {/* Current prices table */}
                <div className="glassmorphism rounded-2xl overflow-hidden">
                  <div className="grid grid-cols-4 px-5 py-3 bg-primary/10 text-xs font-heading font-bold text-primary uppercase tracking-widest">
                    <span>Size</span><span>Full Crate</span><span>Half Crate</span><span>Quarter</span>
                  </div>
                  {(prices ?? []).map(p => (
                    <div key={p.id} className="grid grid-cols-4 px-5 py-4 border-t border-white/8 text-sm">
                      <span className="font-medium capitalize text-foreground">{p.size}</span>
                      <span className="text-primary font-bold">₦{Number(p.fullCrate).toLocaleString()}</span>
                      <span className="text-foreground">₦{Number(p.halfCrate).toLocaleString()}</span>
                      <span className="text-foreground">₦{Number(p.quarterCrate).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Subscriptions */}
            {activeTab === "subscriptions" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h1 className="font-heading font-black text-3xl text-foreground mb-8">Subscriptions</h1>
                <div className="space-y-3">
                  {(subscriptions ?? []).length === 0 && <p className="text-muted-foreground text-center py-12">No subscriptions yet</p>}
                  {(subscriptions ?? []).map(sub => (
                    <div key={sub.id} data-testid={`row-sub-${sub.id}`} className="glassmorphism rounded-2xl p-5">
                      <div className="flex items-center justify-between flex-wrap gap-3">
                        <div>
                          <p className="font-heading font-semibold text-foreground">{sub.customerName}</p>
                          <p className="text-sm text-muted-foreground mt-1">{sub.phone} · {sub.eggSize} eggs · {sub.quantityType.replace(/_/g, " ")} · {sub.frequency}</p>
                          <p className="text-xs text-muted-foreground mt-1">{sub.address}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-heading font-semibold ${sub.active ? "bg-accent/20 text-accent" : "bg-muted text-muted-foreground"}`}>
                          {sub.active ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
