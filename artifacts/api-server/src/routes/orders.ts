import { Router } from "express";
import { db } from "@workspace/db";
import { ordersTable } from "@workspace/db";
import { CreateOrderBody, GetOrderParams, UpdateOrderStatusParams, UpdateOrderStatusBody } from "@workspace/api-zod";
import { eq, desc } from "drizzle-orm";
import { randomBytes } from "crypto";

const router = Router();

function generateOrderId(): string {
  return "EGG-" + randomBytes(3).toString("hex").toUpperCase();
}

function generateRefCode(): string {
  return "REF-" + randomBytes(4).toString("hex").toUpperCase();
}

function serializeOrder(o: typeof ordersTable.$inferSelect) {
  return {
    id: o.id,
    customerName: o.customerName,
    phone: o.phone,
    address: o.address,
    deliveryNotes: o.deliveryNotes ?? null,
    eggSize: o.eggSize,
    quantityType: o.quantityType,
    customQuantity: o.customQuantity ?? null,
    totalAmount: parseFloat(o.totalAmount),
    deliveryType: o.deliveryType,
    deliveryDate: o.deliveryDate ?? null,
    status: o.status,
    referenceCode: o.referenceCode ?? null,
    createdAt: o.createdAt.toISOString(),
  };
}

router.get("/orders", async (req, res) => {
  try {
    const orders = await db.select().from(ordersTable).orderBy(desc(ordersTable.createdAt));
    res.json(orders.map(serializeOrder));
  } catch (err) {
    req.log.error({ err }, "Failed to list orders");
    res.status(500).json({ error: "Failed to list orders" });
  }
});

router.post("/orders", async (req, res) => {
  const parsed = CreateOrderBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid order data" });
    return;
  }

  const data = parsed.data;
  const id = generateOrderId();
  const referenceCode = generateRefCode();

  try {
    const inserted = await db
      .insert(ordersTable)
      .values({
        id,
        customerName: data.customerName,
        phone: data.phone,
        address: data.address,
        deliveryNotes: data.deliveryNotes ?? null,
        eggSize: data.eggSize,
        quantityType: data.quantityType,
        customQuantity: data.customQuantity ?? null,
        totalAmount: data.totalAmount.toString(),
        deliveryType: data.deliveryType,
        deliveryDate: data.deliveryDate ?? null,
        status: "received",
        referenceCode,
      })
      .returning();

    res.status(201).json(serializeOrder(inserted[0]));
  } catch (err) {
    req.log.error({ err }, "Failed to create order");
    res.status(500).json({ error: "Failed to create order" });
  }
});

router.get("/orders/:id", async (req, res) => {
  const params = GetOrderParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: "Invalid order ID" });
    return;
  }

  try {
    const orders = await db.select().from(ordersTable).where(eq(ordersTable.id, params.data.id));
    if (orders.length === 0) {
      res.status(404).json({ error: "Order not found" });
      return;
    }
    res.json(serializeOrder(orders[0]));
  } catch (err) {
    req.log.error({ err }, "Failed to fetch order");
    res.status(500).json({ error: "Failed to fetch order" });
  }
});

router.patch("/orders/:id/status", async (req, res) => {
  const params = UpdateOrderStatusParams.safeParse(req.params);
  const body = UpdateOrderStatusBody.safeParse(req.body);

  if (!params.success || !body.success) {
    res.status(400).json({ error: "Invalid request" });
    return;
  }

  try {
    const updated = await db
      .update(ordersTable)
      .set({ status: body.data.status })
      .where(eq(ordersTable.id, params.data.id))
      .returning();

    if (updated.length === 0) {
      res.status(404).json({ error: "Order not found" });
      return;
    }

    res.json(serializeOrder(updated[0]));
  } catch (err) {
    req.log.error({ err }, "Failed to update order status");
    res.status(500).json({ error: "Failed to update order status" });
  }
});

export default router;
