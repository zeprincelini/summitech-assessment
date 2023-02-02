"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = __importDefault(require("../../postgres"));
const utils_1 = require("../utils");
class AdminService {
    constructor(id = "", email = "") {
        this.id = id;
        this.email = email;
    }
    async create(params) {
        const query = `
        INSERT INTO admins (first_name, last_name, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING id, first_name, last_name, email, is_active, last_login
        `;
        const values = [
            params.first_name,
            params.last_name,
            params.email,
            params.password,
        ];
        const admin = await postgres_1.default.query(query, values).catch((e) => {
            throw (0, utils_1.customError)(e === null || e === void 0 ? void 0 : e.message, 500);
        });
        return admin === null || admin === void 0 ? void 0 : admin.rows[0];
    }
    async findOne() {
        const query = `
    SELECT *
    FROM admins WHERE ${this.id ? `id = ($1)` : this.email ? `email = ($1)` : ``}
    `;
        const admin = await postgres_1.default
            .query(query, [this.id || this.email])
            .catch((e) => {
            throw (0, utils_1.customError)(e === null || e === void 0 ? void 0 : e.message, 500);
        });
        return admin === null || admin === void 0 ? void 0 : admin.rows[0];
    }
    async update(data) {
        const keys = Object.keys(data);
        const values = Object.values(data);
        let query = `UPDATE admins SET`;
        keys.forEach((key, i) => (query += ` ${key} = $${i + 1}`));
        query += ` WHERE id = $${(keys === null || keys === void 0 ? void 0 : keys.length) + 1}`;
        await postgres_1.default.query(query, [...[values, this.id]]).catch((e) => {
            throw (0, utils_1.customError)(e === null || e === void 0 ? void 0 : e.message, 500);
        });
    }
}
exports.default = AdminService;
