"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const userController_1 = require("./userController");
const UserRouter = (app, _opts, next) => {
    app.get("/", userController_1.UserController.listUsers);
    app.get("/profile", userController_1.UserController.getUserProfile);
    app.post("/register", userController_1.UserController.registerUser);
    app.post("/set-status", userController_1.UserController.setUserStatus);
    app.put("/profile", userController_1.UserController.updateUserProfile);
    next();
};
exports.UserRouter = UserRouter;
