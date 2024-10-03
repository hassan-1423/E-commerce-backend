"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckPasswordStrengthSchema = exports.SetFirstPasswordSchema = exports.UpdateUserPasswordSchema = void 0;
const config_1 = require("@/app/config");
exports.UpdateUserPasswordSchema = {
    type: "object",
    properties: {
        password: { type: "string", minLength: config_1.authConfig.password.minLength },
        confirmPassword: {
            type: "string",
            minLength: config_1.authConfig.password.minLength,
        },
    },
    required: ["password", "confirmPassword"],
    additionalProperties: false,
};
exports.SetFirstPasswordSchema = {
    type: "object",
    properties: {
        passwordToken: { type: "string" },
        password: { type: "string", minLength: config_1.authConfig.password.minLength },
        confirmPassword: {
            type: "string",
            minLength: config_1.authConfig.password.minLength,
        },
    },
    required: ["passwordToken", "password", "confirmPassword"],
    additionalProperties: false,
};
exports.CheckPasswordStrengthSchema = {
    type: "object",
    properties: {
        password: { type: "string" },
    },
    required: ["password"],
    additionalProperties: false,
};
