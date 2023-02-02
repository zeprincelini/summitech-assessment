"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = exports.addProduct = void 0;
const utils_1 = require("../utils");
const product_service_1 = __importDefault(require("./product.service"));
const addProduct = async (req, res, next) => {
    try {
        const { body: { name, description }, admin: { id }, } = req;
        const product = await new product_service_1.default()
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
            .json((0, utils_1.result)("Product created successfully", product));
    }
    catch (error) {
        return next(error);
    }
};
exports.addProduct = addProduct;
const getProducts = async (req, res, next) => {
    try {
        const { query: { page = 1, size = 10, name = "", adminId = "" }, } = req;
        const { rows, count } = await new product_service_1.default("", String(name), String(adminId))
            .findProducts(Number(page), Number(size))
            .catch((e) => {
            throw e;
        });
        return res.status(200).json((0, utils_1.result)("Products retrieved successfully", {
            products: rows,
            count,
        }));
    }
    catch (error) {
        return next(error);
    }
};
exports.getProducts = getProducts;
