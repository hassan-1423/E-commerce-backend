"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordService = void 0;
const logger_1 = require("@/core/server/logger");
const userRepository_1 = require("@/app/modules/user/userRepository");
const helpers_1 = require("@/core/helpers");
const exceptions_1 = require("@/core/entities/exceptions");
const passwordRepository_1 = require("@/app/modules/password/passwordRepository");
const requestPasswordResetEvent_1 = require("./events/requestPasswordResetEvent");
exports.ForgotPasswordService = {
    async requestPasswordReset(args) {
        const user = await userRepository_1.UserRepository.findByEmail(args.email);
        if (!user) {
            logger_1.logger.info({ email: args.email }, "password reset request for non-existent user");
            return;
        }
        new requestPasswordResetEvent_1.RequestPasswordResetEvent(user).process();
    },
    async resetForgottenPassword(args) {
        if (args.password !== args.confirmPassword) {
            throw (0, exceptions_1.BadRequestException)("password confirmation failed");
        }
        const userId = await helpers_1.Auth.validatePasswordResetToken(args.token);
        const user = await userRepository_1.UserRepository.findById(userId);
        if (!user) {
            throw (0, exceptions_1.AuthException)("cannot reset password", {
                userId,
                message: "id of non-existent user in json token",
            });
        }
        await passwordRepository_1.PasswordRepository.updateUserPassword(user, args.password);
    },
};
