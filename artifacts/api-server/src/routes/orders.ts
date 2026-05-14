import { Router } from "express";
import { db } from "@workspace/db";
import { ordersTable } from "@workspace/db";
import { CreateOrderBody, GetOrderParams, UpdateOrderStatusParams, UpdateOrderStatusBody } from "@workspace/api-zod";
import { eq, desc } from "drizzle-orm";
import { randomBytes } from "crypto";
import {
  notifyOwner,
  notifyCustomer,
  buildOrderConfirmationMessage,
  buildOwnerNewOrderMessage,
  buildStatusUpdateMessage,
  buildOwnerStatusUpdateMessage,
} from "../services/notify.js";

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
    landmark: o.landmark ?? null,
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
        landmark: (data as Record<string, unknown>).landmark as string | undefined ?? null,
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

    const order = inserted[0];
    const serialized = serializeOrder(order);
    res.status(201).json(serialized);

    // Fire notifications async (don't block response)
    const customerMsg = buildOrderConfirmationMessage({
      customerName: data.customerName,
      orderId: id,
      eggSize: data.eggSize,
      quantityType: data.quantityType,
      totalAmount: data.totalAmount,
      deliveryType: data.deliveryType,
      referenceCode,
    });
    const ownerMsg = buildOwnerNewOrderMessage({
      orderId: id,
      customerName: data.customerName,
      phone: data.phone,
      eggSize: data.eggSize,
      quantityType: data.quantityType,
      totalAmount: data.totalAmount,
      deliveryType: data.deliveryType,
      address: data.address,
    });
    Promise.allSettled([
      notifyCustomer(data.phone, customerMsg),
      notifyOwner(ownerMsg),
    ]).then(() => req.log.info({ orderId: id }, "Notifications sent for new order"));
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

    const order = updated[0];
    const serialized = serializeOrder(order);
    res.json(serialized);

    // Send status update notifications async
    const customerMsg = buildStatusUpdateMessage({
      customerName: order.customerName,
      orderId: order.id,
      status: body.data.status,
    });
    const ownerMsg = buildOwnerStatusUpdateMessage({
      orderId: order.id,
      customerName: order.customerName,
      status: body.data.status,
    });
    Promise.allSettled([
      notifyCustomer(order.phone, customerMsg),
      notifyOwner(ownerMsg),
    ]).then(() => req.log.info({ orderId: order.id, status: body.data.status }, "Notifications sent for status update"));
  } catch (err) {
    req.log.error({ err }, "Failed to update order status");
    res.status(500).json({ error: "Failed to update order status" });
  }
});

export default router;
