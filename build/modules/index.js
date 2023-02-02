"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_routes_1 = __importDefault(require("./admin/admin.routes"));
const stock_routes_1 = __importDefault(require("./stock/stock.routes"));
const product_routes_1 = __importDefault(require("./product/product.routes"));
const router = (0, express_1.Router)();
router.use("/admin", admin_routes_1.default);
router.use("/stock", stock_routes_1.default);
router.use("/product", product_routes_1.default);
router.use("/", (_req, res, _next) => res.send("Successfully hit"));
exports.default = router;
