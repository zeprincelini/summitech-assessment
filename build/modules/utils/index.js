"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.result = exports.customError = exports.decrypt = exports.encrypt = exports.jwtVerify = exports.jwtSign = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const celebrate_1 = require("celebrate");
const { JWT_SECRET } = process.env;
const jwtSign = (value, expiry) => {
    const signed = jsonwebtoken_1.default.sign({ ...value }, JWT_SECRET, { expiresIn: expiry });
    return signed;
};
exports.jwtSign = jwtSign;
const jwtVerify = (value) => {
    const data = jsonwebtoken_1.default.verify(value, JWT_SECRET);
    return data;
};
exports.jwtVerify = jwtVerify;
const encrypt = (password) => {
    const salt = bcrypt_1.default.genSaltSync(10);
    const hash = bcrypt_1.default.hashSync(password, salt);
    return hash;
};
exports.encrypt = encrypt;
const decrypt = (password, hash) => {
    const isValid = bcrypt_1.default.compareSync(password, hash);
    return isValid;
};
exports.decrypt = decrypt;
const customError = (msg, code) => {
    throw { message: msg, code };
};
exports.customError = customError;
const result = (msg, data) => {
    return {
        status: true,
        message: msg,
        data,
    };
};
exports.result = result;
const validate = (schema) => {
    return (0, celebrate_1.celebrate)({
        body: schema,
    }, {
        abortEarly: true,
        messages: {
            "string.required": "{#label cannot be empty}",
        },
    });
};
exports.validate = validate;
