"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const database_1 = require("@/core/database");
const helpers_1 = require("@/core/helpers");
const userFactory_1 = require("@/app/modules/user/userFactory");
const forgotPasswordRouter_1 = require("../forgotPasswordRouter");
const server_1 = require("@/core/server");
(0, vitest_1.describe)("validatePasswordResetToken", () => {
    const server = server_1.Server.newTestServer(forgotPasswordRouter_1.ForgotPasswordRouter);
    const url = "/validate-reset-token";
    const method = "POST";
    (0, vitest_1.afterAll)(() => server.close());
    (0, vitest_1.it)("valid request", async () => {
        const user = await database_1.db.user.create({
            data: userFactory_1.UserFactory.make(),
        });
        const resetToken = await helpers_1.Auth.generatePasswordResetToken(user.id);
        const res = await server.inject({
            url,
            method,
            payload: {
                token: resetToken.token,
            },
        });
        (0, vitest_1.expect)(res.statusCode).toBe(200);
        const body = JSON.parse(res.body);
        (0, vitest_1.expect)(body.isValid).toBe(true);
        await database_1.db.user.delete({ where: { id: user.id } });
    });
});
