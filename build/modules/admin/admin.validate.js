"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInSchema = exports.signUpSchema = void 0;
const celebrate_1 = require("celebrate");
exports.signUpSchema = celebrate_1.Joi.object({
    firstName: celebrate_1.Joi.string().required(),
    lastName: celebrate_1.Joi.string().required(),
    email: celebrate_1.Joi.string().email().required(),
    password: celebrate_1.Joi.string().min(4).max(12).required(),
});
exports.signInSchema = celebrate_1.Joi.object({
    email: celebrate_1.Joi.string().email().required(),
    password: celebrate_1.Joi.string().min(4).max(12).required(),
});
