import { Router } from "express";
import { celebrate } from "celebrate";
import { addStock, getStocks } from "./stock.controller";
import { isAdmin, isAuthenticated } from "../utils/middlewares";
import { addStockSchema, getStockSchema } from "./stock.validate";

const router = Router();

router
  .route("/")
  .post(isAuthenticated, isAdmin, celebrate({ body: addStockSchema }), addStock)
  .get(
    isAuthenticated,
    isAdmin,
    celebrate({ body: getStockSchema }),
    getStocks
  );

export default router;
