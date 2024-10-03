"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routers = void 0;
const healthCheckRouter_1 = require("./modules/healthCheck/healthCheckRouter");
const authRouter_1 = require("./modules/auth/authRouter");
const forgotPasswordRouter_1 = require("./modules/forgotPassword/forgotPasswordRouter");
const passwordRouter_1 = require("./modules/password/passwordRouter");
const userRouter_1 = require("./modules/user/userRouter");
const productsAPIRouter_1 = require("./modules/productsAPI/productsAPIRouter");
exports.routers = new Map([
    ["/api/v1/health-check", healthCheckRouter_1.HealthCheckRouter],
    ["/api/v1/auth", authRouter_1.AuthRouter],
    ["/api/v1/forgot-password", forgotPasswordRouter_1.ForgotPasswordRouter],
    ["/api/v1/password", passwordRouter_1.PasswordRouter],
    ["/api/v1/user", userRouter_1.UserRouter],
    ["/api/v1/Product", productsAPIRouter_1.productsAPIRouter],
]);
