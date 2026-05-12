import { Router } from "express";
import { db } from "@workspace/db";
import { testimonialsTable } from "@workspace/db";

const router = Router();

router.get("/testimonials", async (req, res) => {
  try {
    const testimonials = await db.select().from(testimonialsTable).orderBy(testimonialsTable.id);
    res.json(
      testimonials.map((t) => ({
        id: t.id,
        name: t.name,
        location: t.location,
        review: t.review,
        rating: t.rating,
        verified: t.verified,
        createdAt: t.createdAt.toISOString(),
      }))
    );
  } catch (err) {
    req.log.error({ err }, "Failed to fetch testimonials");
    res.status(500).json({ error: "Failed to fetch testimonials" });
  }
});

export default router;
