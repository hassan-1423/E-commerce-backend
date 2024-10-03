"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetForgottenPasswordSchema = exports.ValidatePasswordResetTokenSchema = exports.RequestPasswordResetSchema = void 0;
const config_1 = require("@/app/config");
exports.RequestPasswordResetSchema = {
    type: "object",
    properties: {
        email: { type: "string" },
    },
    required: ["email"],
    additionalProperties: false,
};
exports.ValidatePasswordResetTokenSchema = {
    type: "object",
    properties: {
        token: { type: "string" },
    },
    required: ["token"],
    additionalProperties: false,
};
exports.ResetForgottenPasswordSchema = {
    type: "object",
    properties: {
        token: { type: "string" },
        password: { type: "string", minLength: config_1.authConfig.password.minLength },
        confirmPassword: {
            type: "string",
            minLength: config_1.authConfig.password.minLength,
        },
    },
    required: ["token", "password", "confirmPassword"],
    additionalProperties: false,
};
