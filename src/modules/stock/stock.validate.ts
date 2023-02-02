import { Joi } from "celebrate";

export const addStockSchema = Joi.object({
  quantity: Joi.number().required(),
  productId: Joi.string().required(),
});

export const getStockSchema = Joi.object({
  quantity: Joi.number().optional(),
  productId: Joi.string().optional(),
  page: Joi.number().min(1).optional(),
  size: Joi.number().min(5).optional(),
});
