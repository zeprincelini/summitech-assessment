"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsSchema = exports.addProductSchema = void 0;
const celebrate_1 = require("celebrate");
exports.addProductSchema = celebrate_1.Joi.object({
    name: celebrate_1.Joi.string().required(),
    description: celebrate_1.Joi.string().required(),
});
exports.getProductsSchema = celebrate_1.Joi.object({
    name: celebrate_1.Joi.string().optional(),
    adminId: celebrate_1.Joi.string().optional(),
    page: celebrate_1.Joi.number().min(1).optional(),
    size: celebrate_1.Joi.number().min(5).optional(),
});
