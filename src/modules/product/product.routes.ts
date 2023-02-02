import { Router } from "express";
import { celebrate } from "celebrate";
import { addProduct, getProducts } from "./product.controller";
import { isAdmin, isAuthenticated } from "../utils/middlewares";
import { addProductSchema, getProductsSchema } from "./product.validate";

const router = Router();

router
  .route("/")
  .post(
    isAuthenticated,
    isAdmin,
    celebrate({ body: addProductSchema }),
    addProduct
  )
  .get(
    isAuthenticated,
    isAdmin,
    celebrate({ body: getProductsSchema }),
    getProducts
  );

export default router;
