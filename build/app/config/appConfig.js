"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
const helpers_1 = require("@/core/helpers");
const frontendURL = (0, helpers_1.env)("FRONT_END_URL");
exports.appConfig = {
    appName: "Node API",
    frontendURL,
    urls: {
        resetPassword: frontendURL + "forgot-password/reset?token=",
        accountSetup: frontendURL + "configure-account?token=",
    },
    pagination: {
        perPage: 20,
    },
};
