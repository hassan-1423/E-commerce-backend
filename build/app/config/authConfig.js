"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authConfig = void 0;
const env_1 = require("@/core/helpers/env");
exports.authConfig = {
    password: {
        minLength: 10,
    },
    jwt: {
        secret: (0, env_1.env)("JWT_SECRET"),
    },
    tokens: {
        auth: { scope: "AUTH", expiry: 60 * 12 },
        firstPassword: { scope: "FIRST_PASSWORD", expiry: 60 * 72 },
        passwordReset: { scope: "RESET_PASSWORD", expiry: 15 },
    },
    authStateDefaults: {
        userId: 0,
        userRole: "",
    },
};
