"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const admin_service_1 = __importDefault(require("./admin.service"));
const utils_1 = require("../utils");
const signUp = async (req, res, next) => {
    try {
        const { body: { firstName, lastName, email, password }, } = req;
        const exists = await new admin_service_1.default("", email).findOne().catch((e) => {
            throw e;
        });
        if (exists) {
            throw (0, utils_1.customError)("Account already exists", 403);
        }
        const hash = (0, utils_1.encrypt)(password);
        const admin = await new admin_service_1.default()
            .create({
            first_name: firstName,
            last_name: lastName,
            email,
            password: hash,
        })
            .catch((e) => {
            throw e;
        });
        return res.status(200).json((0, utils_1.result)("Sign up successful", admin));
    }
    catch (error) {
        return next(error);
    }
};
exports.signUp = signUp;
const signIn = async (req, res, next) => {
    try {
        const { body: { email, password }, } = req;
        const admin = await new admin_service_1.default("", email).findOne().catch((e) => {
            throw e;
        });
        if (!admin) {
            throw (0, utils_1.customError)("Email/Password incorrect", 403);
        }
        if (!(admin === null || admin === void 0 ? void 0 : admin.is_active)) {
            throw (0, utils_1.customError)("You have been deactivated", 403);
        }
        const unhash = (0, utils_1.decrypt)(password, admin === null || admin === void 0 ? void 0 : admin.password);
        if (!unhash) {
            throw (0, utils_1.customError)("Email/Password incorrect", 403);
        }
        await new admin_service_1.default(admin === null || admin === void 0 ? void 0 : admin.id)
            .update({ last_login: new Date() })
            .catch((e) => {
            throw e;
        });
        const token = (0, utils_1.jwtSign)(admin, "72h");
        admin === null || admin === void 0 ? true : delete admin.password;
        return res.status(200).json((0, utils_1.result)("Login successful", {
            admin,
            token,
        }));
    }
    catch (error) {
        return next(error);
    }
};
exports.signIn = signIn;
