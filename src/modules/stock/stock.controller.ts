import { Response, NextFunction } from "express";
import { AuthRequest } from "../../types";
import { result } from "../utils";
import StockService from "./stock.service";

export const addStock = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      body: { productId, quantity },
    } = req;

    const stock = await new StockService()
      .addStock({
        product_id: productId,
        quantity: Number(quantity),
      })
      .catch((e) => {
        throw e;
      });

    return res.status(200).json(result("Stock created successfully", stock));
  } catch (error) {
    return next(error);
  }
};

export const getStocks = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      query: { page = 1, size = 10, quantity = "", productId = "" },
    } = req;

    const { rows, count } = await new StockService(
      "",
      String(productId),
      Number(quantity)
    )
      .findStocks(Number(page), Number(size))
      .catch((e) => {
        throw e;
      });

    return res.status(200).json(
      result("Stocks retrieved successfully", {
        products: rows,
        count,
      })
    );
  } catch (error) {
    return next(error);
  }
};
