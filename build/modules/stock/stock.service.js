"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = __importDefault(require("../../postgres"));
const utils_1 = require("../utils");
class StockService {
    constructor(id = "", productId = "", quantity = 0) {
        this.id = id;
        this.productId = productId;
        this.quantity = quantity;
    }
    async addStock(params) {
        const query = `
        INSERT INTO stocks (product_id, quantity)
        VALUES ($1, $2)
        RETURNING id, batch_id, product_id, quantity
        `;
        const values = [params.product_id, params.quantity];
        const stock = await postgres_1.default.query(query, values).catch((e) => {
            throw (0, utils_1.customError)(e === null || e === void 0 ? void 0 : e.message, 500);
        });
        return stock === null || stock === void 0 ? void 0 : stock.rows[0];
    }
    async findStocks(page, size) {
        const values = [];
        const conditions = [];
        if (this.productId) {
            conditions.push(`product_id = $${values.length + 1}`);
            values.push(this.productId);
        }
        if (this.quantity) {
            conditions.push(`quantity = $${values.length + 1}`);
            values.push(this.quantity);
        }
        values.push((page - 1) * size);
        values.push(size);
        const query = `
    SELECT * from stocks
    ${conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : ``}
    OFFSET ($${values.length - 1})
    LIMIT ($${values.length})
    `;
        const stocks = await postgres_1.default.query(query, values).catch((e) => {
            throw (0, utils_1.customError)(e === null || e === void 0 ? void 0 : e.message, 500);
        });
        return { rows: stocks === null || stocks === void 0 ? void 0 : stocks.rows, count: stocks === null || stocks === void 0 ? void 0 : stocks.rowCount };
    }
    async findById() {
        const query = `
    SELECT * FROM stocks
    WHERE id = ($1)`;
        const values = [this.id];
        const stock = await postgres_1.default.query(query, values).catch((e) => {
            throw (0, utils_1.customError)((e === null || e === void 0 ? void 0 : e.message) || "Error retrieving stock", 500);
        });
        return stock === null || stock === void 0 ? void 0 : stock.rows[0];
    }
}
exports.default = StockService;
