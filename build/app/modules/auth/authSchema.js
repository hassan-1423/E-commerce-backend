"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = void 0;
const config_1 = require("@/app/config");
exports.LoginSchema = {
    type: "object",
    properties: {
        email: { type: "string" },
        password: { type: "string", minLength: config_1.authConfig.password.minLength },
    },
    required: ["email", "password"],
    additionalProperties: false,
};
