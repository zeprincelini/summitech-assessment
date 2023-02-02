"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const product_controller_1 = require("./product.controller");
const middlewares_1 = require("../utils/middlewares");
const product_validate_1 = require("./product.validate");
const router = (0, express_1.Router)();
router
    .route("/")
    .post(middlewares_1.isAuthenticated, middlewares_1.isAdmin, (0, celebrate_1.celebrate)({ body: product_validate_1.addProductSchema }), product_controller_1.addProduct)
    .get(middlewares_1.isAuthenticated, middlewares_1.isAdmin, (0, celebrate_1.celebrate)({ body: product_validate_1.getProductsSchema }), product_controller_1.getProducts);
exports.default = router;
