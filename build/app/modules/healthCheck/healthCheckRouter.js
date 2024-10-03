"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthCheckRouter = void 0;
const healthCheckController_1 = require("./healthCheckController");
const HealthCheckRouter = (app, _opts, next) => {
    app.get("/", healthCheckController_1.HealthCheckController.healthCheck);
    app.get("/memory", healthCheckController_1.HealthCheckController.memoryUsage);
    next();
};
exports.HealthCheckRouter = HealthCheckRouter;
