"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStocks = exports.addStock = void 0;
const utils_1 = require("../utils");
const stock_service_1 = __importDefault(require("./stock.service"));
const addStock = async (req, res, next) => {
    try {
        const { body: { productId, quantity }, } = req;
        const stock = await new stock_service_1.default()
            .addStock({
            product_id: productId,
            quantity: Number(quantity),
        })
            .catch((e) => {
            throw e;
        });
        return res.status(200).json((0, utils_1.result)("Stock created successfully", stock));
    }
    catch (error) {
        return next(error);
    }
};
exports.addStock = addStock;
const getStocks = async (req, res, next) => {
    try {
        const { query: { page = 1, size = 10, quantity = "", productId = "" }, } = req;
        const { rows, count } = await new stock_service_1.default("", String(productId), Number(quantity))
            .findStocks(Number(page), Number(size))
            .catch((e) => {
            throw e;
        });
        return res.status(200).json((0, utils_1.result)("Stocks retrieved successfully", {
            products: rows,
            count,
        }));
    }
    catch (error) {
        return next(error);
    }
};
exports.getStocks = getStocks;
