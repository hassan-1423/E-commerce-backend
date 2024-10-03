"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordService = void 0;
const exceptions_1 = require("@/core/entities/exceptions");
const userRepository_1 = require("@/app/modules/user/userRepository");
const passwordRepository_1 = require("./passwordRepository");
const helpers_1 = require("@/core/helpers");
exports.PasswordService = {
    async updateUserPassword(userId, args) {
        if (args.password !== args.confirmPassword) {
            throw (0, exceptions_1.BadRequestException)("password confirmation failed");
        }
        const user = await userRepository_1.UserRepository.findById(userId);
        if (!user) {
            throw (0, exceptions_1.AuthException)("cannot update user password", {
                userId,
                message: "non-existent user id in json token",
            });
        }
        await passwordRepository_1.PasswordRepository.updateUserPassword(user, args.password);
    },
    async setFirstPassword(args) {
        if (args.password !== args.confirmPassword) {
            throw (0, exceptions_1.BadRequestException)("password confirmation failed", {
                message: "password confirmation mismatch when setting first password",
            });
        }
        const userId = await helpers_1.Auth.validateFirstPasswordToken(args.passwordToken);
        const user = await userRepository_1.UserRepository.findByIdWithPassword(userId);
        if (!user)
            throw (0, exceptions_1.BadRequestException)("invalid password token provided", {
                userId,
                message: "non-existent userId in password token",
            });
        if (user.password)
            throw (0, exceptions_1.BadRequestException)("user account already configured", {
                userId,
                message: "trying to configure already configured account",
            });
        await passwordRepository_1.PasswordRepository.setUserPassword(user, args.password);
    },
};
