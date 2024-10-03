"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const database_1 = require("@/core/database");
const email_1 = require("@/core/email");
const helpers_1 = require("@/core/helpers");
const userFactory_1 = require("@/app/modules/user/userFactory");
const forgotPasswordRouter_1 = require("@/app/modules/forgotPassword/forgotPasswordRouter");
const server_1 = require("@/core/server");
(0, vitest_1.describe)("requestPasswordReset", () => {
    const server = server_1.Server.newTestServer(forgotPasswordRouter_1.ForgotPasswordRouter);
    const url = "/request-reset";
    const method = "POST";
    (0, vitest_1.afterAll)(() => server.close());
    (0, vitest_1.it)("valid request", async () => {
        const user = await database_1.db.user.create({
            data: userFactory_1.UserFactory.make(),
        });
        const res = await server.inject({
            url,
            method,
            payload: {
                email: user.email,
            },
        });
        (0, vitest_1.expect)(res.statusCode).toBe(200);
        const isEmailSent = email_1.EmailService.instance.sentEmails.find((e) => e.to == user.email);
        const emailArgs = isEmailSent?.email.args;
        (0, vitest_1.expect)(emailArgs.resetToken).toBeTruthy();
        const isTokenValid = await helpers_1.Auth.validatePasswordResetToken(emailArgs.resetToken);
        (0, vitest_1.expect)(isTokenValid !== 0).toBe(true);
        await database_1.db.user.delete({ where: { id: user.id } });
        email_1.EmailService.instance.clearSentEmails();
    });
    (0, vitest_1.it)("invalid email address", async () => {
        const email = userFactory_1.UserFactory.make().email;
        const res = await server.inject({
            url,
            method,
            payload: {
                email,
            },
        });
        (0, vitest_1.expect)(res.statusCode).toBe(200);
        const isEmailSent = email_1.EmailService.instance.sentEmails.find((e) => e.to == email);
        (0, vitest_1.expect)(isEmailSent).toBeFalsy();
    });
});
