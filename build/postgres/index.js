"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const { DB_PORT, DB_NAME, DB_HOST, DB_USER, DB_PASSWORD } = process.env;
const pool = new pg_1.Pool({
    host: DB_HOST,
    user: DB_USER,
    database: DB_NAME,
    port: Number(DB_PORT),
    password: DB_PASSWORD,
});
exports.default = pool;
