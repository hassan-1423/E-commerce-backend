"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordRouter = void 0;
const forgotPasswordController_1 = require("./forgotPasswordController");
const ForgotPasswordRouter = (app, _opts, next) => {
    app.post("/request-reset", forgotPasswordController_1.ForgotPasswordController.requestPasswordReset);
    app.post("/validate-reset-token", forgotPasswordController_1.ForgotPasswordController.validatePasswordResetToken);
    app.post("/reset-password", forgotPasswordController_1.ForgotPasswordController.resetForgottenPassword);
    next();
};
exports.ForgotPasswordRouter = ForgotPasswordRouter;
