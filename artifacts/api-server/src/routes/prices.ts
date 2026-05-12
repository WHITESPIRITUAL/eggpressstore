import { Router } from "express";
import { db } from "@workspace/db";
import { eggPricesTable } from "@workspace/db";
import { UpdatePricesBody } from "@workspace/api-zod";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/prices", async (req, res) => {
  try {
    const prices = await db.select().from(eggPricesTable).orderBy(eggPricesTable.size);
    res.json(prices.map((p) => ({
      id: p.id,
      size: p.size,
      fullCrate: parseFloat(p.fullCrate),
      halfCrate: parseFloat(p.halfCrate),
      quarterCrate: parseFloat(p.quarterCrate),
      updatedAt: p.updatedAt.toISOString(),
    })));
  } catch (err) {
    req.log.error({ err }, "Failed to fetch prices");
    res.status(500).json({ error: "Failed to fetch prices" });
  }
});

router.put("/prices", async (req, res) => {
  const parsed = UpdatePricesBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const { size, fullCrate, halfCrate, quarterCrate } = parsed.data;

  try {
    const existing = await db.select().from(eggPricesTable).where(eq(eggPricesTable.size, size));

    let result;
    if (existing.length > 0) {
      const updated = await db
        .update(eggPricesTable)
        .set({
          fullCrate: fullCrate.toString(),
          halfCrate: halfCrate.toString(),
          quarterCrate: quarterCrate.toString(),
          updatedAt: new Date(),
        })
        .where(eq(eggPricesTable.size, size))
        .returning();
      result = updated[0];
    } else {
      const inserted = await db
        .insert(eggPricesTable)
        .values({
          size,
          fullCrate: fullCrate.toString(),
          halfCrate: halfCrate.toString(),
          quarterCrate: quarterCrate.toString(),
        })
        .returning();
      result = inserted[0];
    }

    res.json({
      id: result.id,
      size: result.size,
      fullCrate: parseFloat(result.fullCrate),
      halfCrate: parseFloat(result.halfCrate),
      quarterCrate: parseFloat(result.quarterCrate),
      updatedAt: result.updatedAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to update prices");
    res.status(500).json({ error: "Failed to update prices" });
  }
});

export default router;
