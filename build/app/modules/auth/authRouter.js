"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const authController_1 = require("./authController");
const AuthRouter = (app, _opts, next) => {
    app.post("/login", authController_1.AuthController.login);
    app.get("/refresh-token", authController_1.AuthController.refreshAuthToken);
    next();
};
exports.AuthRouter = AuthRouter;
