"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const RequestPasswordResetEmail_1 = require("./RequestPasswordResetEmail");
const config_1 = require("@/app/config");
(0, vitest_1.describe)("RequestPasswordResetEmail test", () => {
    (0, vitest_1.it)("email html has all provided fields", () => {
        const args = {
            resetToken: "http://site.com/reset",
        };
        const email = new RequestPasswordResetEmail_1.RequestPasswordResetEmail(args);
        const html = email.html();
        (0, vitest_1.expect)(html.includes(config_1.appConfig.appName)).toBe(true);
        (0, vitest_1.expect)(html.includes(args.resetToken)).toBe(true);
    });
});
