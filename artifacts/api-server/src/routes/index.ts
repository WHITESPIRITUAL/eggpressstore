import { Router, type IRouter } from "express";
import healthRouter from "./health";
import pricesRouter from "./prices";
import ordersRouter from "./orders";
import subscriptionsRouter from "./subscriptions";
import testimonialsRouter from "./testimonials";
import adminRouter from "./admin";
import sellersRouter from "./sellers";

const router: IRouter = Router();

router.use(healthRouter);
router.use(pricesRouter);
router.use(ordersRouter);
router.use(subscriptionsRouter);
router.use(testimonialsRouter);
router.use(adminRouter);
router.use(sellersRouter);

export default router;
