import { Router } from "express";
import { db } from "@workspace/db";
import { ordersTable, subscriptionsTable, sellersTable } from "@workspace/db";
import { eq, sql, and } from "drizzle-orm";

const router = Router();

router.get("/admin/stats", async (req, res) => {
  try {
    const [totalResult] = await db.select({ count: sql<number>`count(*)::int` }).from(ordersTable);
    const [deliveredResult] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(ordersTable)
      .where(eq(ordersTable.status, "delivered"));
    const [pendingResult] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(ordersTable)
      .where(eq(ordersTable.status, "received"));
    const [revenueResult] = await db
      .select({ total: sql<number>`coalesce(sum(total_amount::numeric), 0)::float` })
      .from(ordersTable)
      .where(eq(ordersTable.status, "delivered"));
    const [activeSubsResult] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(subscriptionsTable)
      .where(eq(subscriptionsTable.active, true));
    const [todayResult] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(ordersTable)
      .where(sql`created_at::date = current_date`);
    const [pendingSellersResult] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(sellersTable)
      .where(eq(sellersTable.status, "pending"));

    res.json({
      totalOrders: totalResult.count,
      deliveredOrders: deliveredResult.count,
      pendingOrders: pendingResult.count,
      totalRevenue: revenueResult.total,
      activeSubscriptions: activeSubsResult.count,
      todayOrders: todayResult.count,
      pendingSellers: pendingSellersResult.count,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch admin stats");
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

export default router;
