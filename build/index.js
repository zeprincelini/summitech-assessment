"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const modules_1 = __importDefault(require("./modules"));
const middlewares_1 = require("./modules/utils/middlewares");
const { PORT, DB_NAME } = process.env;
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true, limit: "10mb" }));
app.use(express_1.default.json({ limit: "10mb" }));
app.disable("x-powered-by");
app.use("/v1", modules_1.default);
app.use(middlewares_1.handleError);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} and connected to ${DB_NAME}`);
});
