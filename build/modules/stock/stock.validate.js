"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStockSchema = exports.addStockSchema = void 0;
const celebrate_1 = require("celebrate");
exports.addStockSchema = celebrate_1.Joi.object({
    quantity: celebrate_1.Joi.number().required(),
    productId: celebrate_1.Joi.string().required(),
});
exports.getStockSchema = celebrate_1.Joi.object({
    quantity: celebrate_1.Joi.number().optional(),
    productId: celebrate_1.Joi.string().optional(),
    page: celebrate_1.Joi.number().min(1).optional(),
    size: celebrate_1.Joi.number().min(5).optional(),
});
