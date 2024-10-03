"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthCheckController = void 0;
const healthCheckService_1 = require("./healthCheckService");
const middleware_1 = require("@/core/server/middleware");
const client_1 = require("@prisma/client");
exports.HealthCheckController = {
    healthCheck: {
        handler: async () => {
            return await healthCheckService_1.HealthCheckService.healthcheck();
        },
    },
    memoryUsage: {
        preValidation: [middleware_1.validateToken, (0, middleware_1.hasRole)(client_1.UserRole.ADMIN)],
        handler: async () => {
            return await healthCheckService_1.HealthCheckService.memoryUsage();
        },
    },
};
