import { Router } from "express";
import { db } from "@workspace/db";
import { siteSettingsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

const DEFAULT_SETTINGS = [
  { key: "business_name", value: "Eggpress", label: "Business Name", group: "business" },
  { key: "tagline", value: "Fresh Eggs, Delivered Fast.", label: "Tagline", group: "business" },
  { key: "about_text", value: "Premium farm-fresh egg delivery in Benin City, Nigeria. Quality you can taste, delivered to your door.", label: "About Text", group: "business" },
  { key: "phone", value: "09013698449", label: "Phone Number", group: "contact" },
  { key: "whatsapp", value: "2349013698449", label: "WhatsApp (with country code)", group: "contact" },
  { key: "address", value: "Benin City, Edo State, Nigeria", label: "Business Address", group: "contact" },
  { key: "opening_hours", value: "7 AM \u2013 7 PM Daily", label: "Opening Hours", group: "contact" },
  { key: "payment_bank", value: "Opay", label: "Bank Name", group: "payment" },
  { key: "payment_account_number", value: "9013698449", label: "Account Number", group: "payment" },
  { key: "payment_account_name", value: "EGGPRESS", label: "Account Name", group: "payment" },
  { key: "hero_stat_orders", value: "200+", label: "Orders Today (Hero Stat)", group: "hero" },
  { key: "hero_stat_customers", value: "5,000+", label: "Happy Customers (Hero Stat)", group: "hero" },
  { key: "hero_stat_delivery", value: "< 2hrs", label: "Delivery Time (Hero Stat)", group: "hero" },
];

let defaultsSeeded = false;

async function ensureDefaults() {
  if (defaultsSeeded) return;
  for (const s of DEFAULT_SETTINGS) {
    await db.insert(siteSettingsTable).values(s).onConflictDoNothing();
  }
  defaultsSeeded = true;
}

router.get("/settings", async (req, res) => {
  try {
    await ensureDefaults();
    const rows = await db.select().from(siteSettingsTable);
    const result: Record<string, string> = {};
    for (const r of rows) result[r.key] = r.value;
    res.json(result);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch settings");
    res.status(500).json({ error: "Failed to fetch settings" });
  }
});

router.patch("/admin/settings", async (req, res) => {
  const body = req.body;
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }
  try {
    for (const [key, value] of Object.entries(body)) {
      if (typeof value === "string") {
        await db
          .update(siteSettingsTable)
          .set({ value, updatedAt: new Date() })
          .where(eq(siteSettingsTable.key, key));
      }
    }
    const rows = await db.select().from(siteSettingsTable);
    const result: Record<string, string> = {};
    for (const r of rows) result[r.key] = r.value;
    res.json(result);
  } catch (err) {
    req.log.error({ err }, "Failed to update settings");
    res.status(500).json({ error: "Failed to update settings" });
  }
});

export default router;
