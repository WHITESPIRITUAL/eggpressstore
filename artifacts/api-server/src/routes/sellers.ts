import { Router } from "express";
import { db } from "@workspace/db";
import { sellersTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";

const router = Router();

function validateSellerInput(body: unknown): { businessName: string; ownerName: string; phone: string; address: string; landmark: string; description?: string } | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;
  if (typeof b.businessName !== "string" || !b.businessName.trim()) return null;
  if (typeof b.ownerName !== "string" || !b.ownerName.trim()) return null;
  if (typeof b.phone !== "string" || !b.phone.trim()) return null;
  if (typeof b.address !== "string" || !b.address.trim()) return null;
  if (typeof b.landmark !== "string" || !b.landmark.trim()) return null;
  return {
    businessName: b.businessName.trim(),
    ownerName: b.ownerName.trim(),
    phone: b.phone.trim(),
    address: b.address.trim(),
    landmark: b.landmark.trim(),
    description: typeof b.description === "string" ? b.description.trim() : undefined,
  };
}

function validateSellerStatus(body: unknown): "pending" | "approved" | "rejected" | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;
  if (b.status === "pending" || b.status === "approved" || b.status === "rejected") return b.status;
  return null;
}

function serializeSeller(s: typeof sellersTable.$inferSelect) {
  return {
    id: s.id,
    businessName: s.businessName,
    ownerName: s.ownerName,
    phone: s.phone,
    address: s.address,
    landmark: s.landmark,
    description: s.description ?? null,
    status: s.status,
    createdAt: s.createdAt.toISOString(),
  };
}

router.get("/sellers", async (req, res) => {
  try {
    const sellers = await db
      .select()
      .from(sellersTable)
      .where(eq(sellersTable.status, "approved"))
      .orderBy(desc(sellersTable.createdAt));
    res.json(sellers.map(serializeSeller));
  } catch (err) {
    req.log.error({ err }, "Failed to list sellers");
    res.status(500).json({ error: "Failed to list sellers" });
  }
});

router.get("/sellers/all", async (req, res) => {
  try {
    const sellers = await db
      .select()
      .from(sellersTable)
      .orderBy(desc(sellersTable.createdAt));
    res.json(sellers.map(serializeSeller));
  } catch (err) {
    req.log.error({ err }, "Failed to list all sellers");
    res.status(500).json({ error: "Failed to list sellers" });
  }
});

router.post("/sellers", async (req, res) => {
  const data = validateSellerInput(req.body);
  if (!data) {
    res.status(400).json({ error: "Invalid seller data" });
    return;
  }

  try {
    const inserted = await db
      .insert(sellersTable)
      .values({
        businessName: data.businessName,
        ownerName: data.ownerName,
        phone: data.phone,
        address: data.address,
        landmark: data.landmark,
        description: data.description ?? null,
        status: "pending",
      })
      .returning();

    res.status(201).json(serializeSeller(inserted[0]));
  } catch (err) {
    req.log.error({ err }, "Failed to register seller");
    res.status(500).json({ error: "Failed to register seller" });
  }
});

router.patch("/sellers/:id/status", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid seller ID" });
    return;
  }

  const status = validateSellerStatus(req.body);
  if (!status) {
    res.status(400).json({ error: "Invalid status" });
    return;
  }

  try {
    const updated = await db
      .update(sellersTable)
      .set({ status })
      .where(eq(sellersTable.id, id))
      .returning();

    if (updated.length === 0) {
      res.status(404).json({ error: "Seller not found" });
      return;
    }

    res.json(serializeSeller(updated[0]));
  } catch (err) {
    req.log.error({ err }, "Failed to update seller status");
    res.status(500).json({ error: "Failed to update seller status" });
  }
});

export default router;
