"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordController = void 0;
const helpers_1 = require("@/core/helpers");
const middleware_1 = require("@/core/server/middleware");
const passwordSchema_1 = require("./passwordSchema");
const passwordService_1 = require("./passwordService");
exports.PasswordController = {
    updateUserPassword: {
        preValidation: [middleware_1.validateToken],
        schema: {
            body: passwordSchema_1.UpdateUserPasswordSchema,
        },
        handler: async (req) => {
            const body = req.body;
            const { userId } = (0, helpers_1.requestMeta)(req);
            await passwordService_1.PasswordService.updateUserPassword(userId, body);
            return {
                message: "account password updated successfully",
            };
        },
    },
    setFirstPassword: {
        schema: {
            body: passwordSchema_1.SetFirstPasswordSchema,
        },
        handler: async (req) => {
            const body = req.body;
            await passwordService_1.PasswordService.setFirstPassword(body);
            return {
                message: "account configured successfully",
            };
        },
    },
    checkPasswordStrength: {
        schema: {
            body: passwordSchema_1.CheckPasswordStrengthSchema,
        },
        handler: async (req) => {
            const body = req.body;
            return helpers_1.Password.checkStrength(body.password);
        },
    },
};
