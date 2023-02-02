"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = __importDefault(require("../../postgres"));
const utils_1 = require("../utils");
class ProductService {
    constructor(id = "", name = "", adminId = "") {
        this.id = id;
        this.name = name;
        this.adminId = adminId;
    }
    async createProduct(params) {
        const query = `
        INSERT INTO products (name, description, admin_id)
        VALUES ($1, $2, $3)
        RETURNING id, name, description, admin_id
        `;
        const values = [params.name, params.description, params.admin_id];
        const product = await postgres_1.default.query(query, values).catch((e) => {
            throw (0, utils_1.customError)((e === null || e === void 0 ? void 0 : e.message) || "Error creating Product", 500);
        });
        return product === null || product === void 0 ? void 0 : product.rows[0];
    }
    async findProducts(page, size) {
        const values = [];
        const conditions = [];
        if (this.adminId) {
            conditions.push(`admin_id = $${values.length + 1}`);
            values.push(this.adminId);
        }
        if (this.name) {
            conditions.push(`name ILIKE $${values.length + 1}`);
            values.push(`%${this.name}%`);
        }
        values.push((page - 1) * size);
        values.push(size);
        const query = `
    SELECT * from products
    ${conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : ``}
    OFFSET ($${values.length - 1})
    LIMIT ($${values.length})
    `;
        const products = await postgres_1.default.query(query, values).catch((e) => {
            throw (0, utils_1.customError)(e === null || e === void 0 ? void 0 : e.message, 500);
        });
        return { rows: products === null || products === void 0 ? void 0 : products.rows, count: products === null || products === void 0 ? void 0 : products.rowCount };
    }
    async findById() {
        const query = `
    SELECT * FROM products
    WHERE id = ($1)`;
        const values = [this.id];
        const product = await postgres_1.default.query(query, values).catch((e) => {
            throw (0, utils_1.customError)((e === null || e === void 0 ? void 0 : e.message) || "Error retrieving product", 500);
        });
        return product === null || product === void 0 ? void 0 : product.rows[0];
    }
}
exports.default = ProductService;
