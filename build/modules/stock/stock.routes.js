"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const stock_controller_1 = require("./stock.controller");
const middlewares_1 = require("../utils/middlewares");
const stock_validate_1 = require("./stock.validate");
const router = (0, express_1.Router)();
router
    .route("/")
    .post(middlewares_1.isAuthenticated, middlewares_1.isAdmin, (0, celebrate_1.celebrate)({ body: stock_validate_1.addStockSchema }), stock_controller_1.addStock)
    .get(middlewares_1.isAuthenticated, middlewares_1.isAdmin, (0, celebrate_1.celebrate)({ body: stock_validate_1.getStockSchema }), stock_controller_1.getStocks);
exports.default = router;
