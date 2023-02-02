import { Response, NextFunction } from "express";
import { AuthRequest } from "../../types";
import { result } from "../utils";
import ProductService from "./product.service";

export const addProduct = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      body: { name, description },
      admin: { id },
    } = req;

    const product = await new ProductService()
      .createProduct({
        name,
        description,
        admin_id: id,
      })
      .catch((e) => {
        throw e;
      });

    return res
      .status(200)
      .json(result("Product created successfully", product));
  } catch (error) {
    return next(error);
  }
};

export const getProducts = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      query: { page = 1, size = 10, name = "", adminId = "" },
    } = req;

    const { rows, count } = await new ProductService(
      "",
      String(name),
      String(adminId)
    )
      .findProducts(Number(page), Number(size))
      .catch((e) => {
        throw e;
      });

    return res.status(200).json(
      result("Products retrieved successfully", {
        products: rows,
        count,
      })
    );
  } catch (error) {
    return next(error);
  }
};
