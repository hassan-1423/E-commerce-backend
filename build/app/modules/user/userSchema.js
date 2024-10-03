"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetUserStatusSchema = exports.CreateUserSchema = exports.UpdateUserProfileSchema = exports.ListUsersQuerySchema = void 0;
const authConfig_1 = require("@/app/config/authConfig");
exports.ListUsersQuerySchema = {
    type: "object",
    properties: {
        page: { type: "integer" },
        query: { type: "string" },
    },
    additionalProperties: false,
};
exports.UpdateUserProfileSchema = {
    type: "object",
    properties: {
        name: { type: "string" },
        phone: { type: "string" },
        mobile: { type: "string" },
    },
    required: ["name"],
    additionalProperties: false,
};
exports.CreateUserSchema = {
    type: "object",
    properties: {
        name: { type: "string" },
        email: { type: "string" },
        password: { type: "string", minLength: authConfig_1.authConfig.password.minLength },
        confirmPassword: { type: "string" },
    },
    required: ["name", "email", "password", "confirmPassword"],
    additionalProperties: false,
};
exports.SetUserStatusSchema = {
    type: "object",
    properties: {
        userId: { type: "integer" },
        status: { type: "boolean" },
    },
    required: ["userId", "status"],
    additionalProperties: false,
};
