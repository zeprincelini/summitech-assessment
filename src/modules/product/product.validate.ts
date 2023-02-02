import { Joi } from "celebrate";

export const addProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
});

export const getProductsSchema = Joi.object({
  name: Joi.string().optional(),
  adminId: Joi.string().optional(),
  page: Joi.number().min(1).optional(),
  size: Joi.number().min(5).optional(),
});
