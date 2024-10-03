"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const exceptions_1 = require("@/core/entities/exceptions");
const userRepository_1 = require("@/app/modules/user/userRepository");
const helpers_1 = require("@/core/helpers");
exports.AuthService = {
    async login(args) {
        const user = await userRepository_1.UserRepository.findByEmailWithPassword(args.email);
        if (!user)
            throw (0, exceptions_1.AuthException)("invalid email or password", {
                email: args.email,
                message: "login against non-existent user",
            });
        if (!user.password)
            throw (0, exceptions_1.BadRequestException)("account not configured", {
                email: args.email,
                message: "failed login against non-configured account",
            });
        if (!user.approved)
            throw (0, exceptions_1.BadRequestException)("user account disabled by admin", {
                email: args.email,
                message: "failed login against disabled account",
            });
        const isValid = await helpers_1.Password.verify(user.password.hash, args.password);
        if (!isValid)
            throw (0, exceptions_1.AuthException)("invalid email or password", {
                email: args.email,
                message: "invalid login password",
            });
        const token = await helpers_1.Auth.generateLoginAuthToken(user.id, user.role);
        return {
            user: Object.assign(user, { password: undefined }),
            auth: token,
        };
    },
    async refreshAuthToken(userId) {
        const error = "Cannot refresh auth token";
        const user = await userRepository_1.UserRepository.findById(userId);
        if (!user) {
            throw (0, exceptions_1.AuthException)(error, {
                userId,
                message: "trying to refresh auth token for non-existent user",
            });
        }
        if (!user.approved) {
            throw (0, exceptions_1.AuthException)(error, {
                userId,
                message: "disabled user tried to refresh auth token",
            });
        }
        return await helpers_1.Auth.generateLoginAuthToken(user.id, user.role);
    },
};
