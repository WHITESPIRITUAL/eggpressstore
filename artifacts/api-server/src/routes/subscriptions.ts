import { Router } from "express";
import { db } from "@workspace/db";
import { subscriptionsTable } from "@workspace/db";
import { CreateSubscriptionBody } from "@workspace/api-zod";
import { desc } from "drizzle-orm";
import { notifyOwner, buildNewSubscriptionMessage } from "../services/notify.js";

const router = Router();

function serializeSub(s: typeof subscriptionsTable.$inferSelect) {
  return {
    id: s.id,
    customerName: s.customerName,
    phone: s.phone,
    address: s.address,
    eggSize: s.eggSize,
    quantityType: s.quantityType,
    frequency: s.frequency,
    active: s.active,
    createdAt: s.createdAt.toISOString(),
  };
}

router.get("/subscriptions", async (req, res) => {
  try {
    const subs = await db.select().from(subscriptionsTable).orderBy(desc(subscriptionsTable.createdAt));
    res.json(subs.map(serializeSub));
  } catch (err) {
    req.log.error({ err }, "Failed to list subscriptions");
    res.status(500).json({ error: "Failed to list subscriptions" });
  }
});

router.post("/subscriptions", async (req, res) => {
  const parsed = CreateSubscriptionBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid subscription data" });
    return;
  }

  const data = parsed.data;

  try {
    const inserted = await db
      .insert(subscriptionsTable)
      .values({
        customerName: data.customerName,
        phone: data.phone,
        address: data.address,
        eggSize: data.eggSize,
        quantityType: data.quantityType,
        frequency: data.frequency,
        active: true,
      })
      .returning();

    res.status(201).json(serializeSub(inserted[0]));

    // Notify owner of new subscription async
    const ownerMsg = buildNewSubscriptionMessage({
      customerName: data.customerName,
      phone: data.phone,
      eggSize: data.eggSize,
      quantityType: data.quantityType,
      frequency: data.frequency,
      address: data.address,
    });
    notifyOwner(ownerMsg).then(() =>
      req.log.info({ phone: data.phone }, "Owner notified of new subscription")
    );
  } catch (err) {
    req.log.error({ err }, "Failed to create subscription");
    res.status(500).json({ error: "Failed to create subscription" });
  }
});

export default router;
