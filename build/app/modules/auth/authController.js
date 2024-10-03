"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const helpers_1 = require("@/core/helpers");
const authService_1 = require("./authService");
const authSchema_1 = require("./authSchema");
const middleware_1 = require("@/core/server/middleware");
exports.AuthController = {
    login: {
        config: {
            rateLimit: {
                max: 7,
                timeWindow: 1000 * 60,
            },
        },
        schema: {
            body: authSchema_1.LoginSchema,
        },
        handler: async (req) => {
            const body = req.body;
            return await authService_1.AuthService.login(body);
        },
    },
    refreshAuthToken: {
        preValidation: [middleware_1.validateToken],
        handler: async (req) => {
            const { userId } = (0, helpers_1.requestMeta)(req);
            return await authService_1.AuthService.refreshAuthToken(userId);
        },
    },
};
