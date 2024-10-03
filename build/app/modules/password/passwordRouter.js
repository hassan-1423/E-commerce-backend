"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordRouter = void 0;
const passwordController_1 = require("./passwordController");
const PasswordRouter = (app, _opts, next) => {
    app.post("/update", passwordController_1.PasswordController.updateUserPassword);
    app.post("/create", passwordController_1.PasswordController.setFirstPassword);
    app.post("/check-strength", passwordController_1.PasswordController.checkPasswordStrength);
    next();
};
exports.PasswordRouter = PasswordRouter;
