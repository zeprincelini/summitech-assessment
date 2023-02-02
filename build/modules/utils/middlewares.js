"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.handleError = exports.isAuthenticated = void 0;
const _1 = require(".");
const admin_service_1 = __importDefault(require("../admin/admin.service"));
const isAuthenticated = (req, _res, next) => {
    var _a;
    if (!req.headers.authorization) {
        throw (0, _1.customError)("Authorization header not found!", 404);
    }
    const bearer = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!bearer) {
        throw (0, _1.customError)("Token not found!", 404);
    }
    const verified = (0, _1.jwtVerify)(bearer);
    if (!verified) {
        throw (0, _1.customError)("Invalid token!", 403);
    }
    const token = verified;
    delete token.password;
    req.admin = token;
    next();
};
exports.isAuthenticated = isAuthenticated;
const handleError = (err, _req, res, _next) => {
    console.log(err);
    return res.status((err === null || err === void 0 ? void 0 : err.code) || 500).json({
        status: false,
        message: err === null || err === void 0 ? void 0 : err.message,
    });
};
exports.handleError = handleError;
const isAdmin = async (req, _res, next) => {
    try {
        const { admin: { id }, } = req;
        const isAdmin = await new admin_service_1.default(id).findOne().catch((e) => {
            throw e;
        });
        if (!isAdmin) {
            throw (0, _1.customError)("You are not an admin", 500);
        }
        next();
    }
    catch (error) {
        return next(error);
    }
};
exports.isAdmin = isAdmin;
