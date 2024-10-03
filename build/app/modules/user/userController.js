"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userRepository_1 = require("./userRepository");
const helpers_1 = require("@/core/helpers");
const middleware_1 = require("@/core/server/middleware");
const middleware_2 = require("@/core/server/middleware");
const client_1 = require("@prisma/client");
const userSchema_1 = require("./userSchema");
const userService_1 = require("./userService");
exports.UserController = {
    getUserProfile: {
        preValidation: [middleware_1.validateToken],
        handler: async (req) => {
            const { userId } = (0, helpers_1.requestMeta)(req);
            return await userService_1.UserService.getUserProfile(userId);
        },
    },
    listUsers: {
        preValidation: [middleware_1.validateToken, (0, middleware_2.hasRole)(client_1.UserRole.ADMIN)],
        schema: {
            querystring: userSchema_1.ListUsersQuerySchema,
        },
        handler: async (req) => {
            const query = req.query;
            const page = query.page ?? 1;
            return await userRepository_1.UserRepository.listUsers(page, query.query);
        },
    },
    registerUser: {
        schema: {
            body: userSchema_1.CreateUserSchema,
        },
        handler: async (req) => {
            const body = req.body;
            await userService_1.UserService.registerUser(body);
            return {
                message: "user registered successfully",
            };
        },
    },
    setUserStatus: {
        preValidation: [middleware_1.validateToken, (0, middleware_2.hasRole)(client_1.UserRole.ADMIN)],
        schema: {
            body: userSchema_1.SetUserStatusSchema,
        },
        handler: async (req) => {
            const body = req.body;
            const status = await userService_1.UserService.setUserStatus(body);
            return {
                message: "user account status updated successfully",
                updatedStatus: status,
            };
        },
    },
    updateUserProfile: {
        preValidation: [middleware_1.validateToken],
        schema: {
            body: userSchema_1.UpdateUserProfileSchema,
        },
        handler: async (req) => {
            const body = req.body;
            const { userId } = (0, helpers_1.requestMeta)(req);
            const updatedUser = await userService_1.UserService.updateUserProfile(userId, body);
            return {
                message: "user profile updated successfully",
                profile: updatedUser,
            };
        },
    },
};
