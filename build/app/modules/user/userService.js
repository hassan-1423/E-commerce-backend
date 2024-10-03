"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const client_1 = require("@prisma/client");
const userRepository_1 = require("./userRepository");
const exceptions_1 = require("@/core/entities/exceptions");
exports.UserService = {
    async getUserProfile(userId) {
        const user = await userRepository_1.UserRepository.findById(userId);
        if (!user) {
            throw (0, exceptions_1.AuthException)("cannot view profile", {
                userId,
                message: "non-existent user id in json token",
            });
        }
        return user;
    },
    async registerUser(args) {
        const isEmailTaken = await userRepository_1.UserRepository.findByEmail(args.email);
        if (isEmailTaken) {
            throw (0, exceptions_1.BadRequestException)("email address already in use", {
                email: args.email,
                message: "registration request against existing email address",
            });
        }
        if (args.password !== args.confirmPassword) {
            throw (0, exceptions_1.BadRequestException)("password confirmation failed", {
                error: "password confirmation failed during user registration",
            });
        }
        return await userRepository_1.UserRepository.createUser(args, client_1.UserRole.USER);
    },
    async setUserStatus(args) {
        const user = await userRepository_1.UserRepository.findById(args.userId);
        if (!user) {
            throw (0, exceptions_1.BadRequestException)("invalid user id", {
                userId: args.userId,
                message: "request to set account status for non-existent user",
            });
        }
        await userRepository_1.UserRepository.updateUserStatus(user, args.status);
        return args.status;
    },
    async updateUserProfile(userId, args) {
        const user = await userRepository_1.UserRepository.findById(userId);
        if (!user) {
            throw (0, exceptions_1.AuthException)("cannot update user profile", {
                userId,
                message: "non-existent user in json token",
            });
        }
        return await userRepository_1.UserRepository.updateUserProfile(user, args);
    },
};
