import { Router } from "express";
import adminRoutes from "./admin/admin.routes";
import stockRoutes from "./stock/stock.routes";
import productRoutes from "./product/product.routes";

const router = Router();

router.use("/admin", adminRoutes);
router.use("/stock", stockRoutes);
router.use("/product", productRoutes);
router.use("/", (_req, res, _next) => res.send("Successfully hit"));

export default router;
