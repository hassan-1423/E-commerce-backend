"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordController = void 0;
const helpers_1 = require("@/core/helpers");
const forgotPasswordSchema_1 = require("./forgotPasswordSchema");
const forgotPasswordService_1 = require("./forgotPasswordService");
exports.ForgotPasswordController = {
    requestPasswordReset: {
        schema: { body: forgotPasswordSchema_1.RequestPasswordResetSchema },
        handler: async (req) => {
            const body = req.body;
            await forgotPasswordService_1.ForgotPasswordService.requestPasswordReset(body);
            return {
                message: "password reset request will be processed",
            };
        },
    },
    validatePasswordResetToken: {
        schema: { body: forgotPasswordSchema_1.ValidatePasswordResetTokenSchema },
        handler: async (req) => {
            const body = req.body;
            const isValid = await helpers_1.Auth.validatePasswordResetToken(body.token);
            return {
                isValid: isValid !== 0,
            };
        },
    },
    resetForgottenPassword: {
        schema: {
            body: forgotPasswordSchema_1.ResetForgottenPasswordSchema,
        },
        handler: async (req) => {
            const body = req.body;
            await forgotPasswordService_1.ForgotPasswordService.resetForgottenPassword(body);
            return {
                message: "password updated successfully",
            };
        },
    },
};
