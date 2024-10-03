"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const vitest_1 = require("vitest");
const index_1 = require("./index");
(0, vitest_1.describe)("Auth", () => {
    (0, vitest_1.it)("generate and validate login auth token", async () => {
        const loginToken = await index_1.Auth.generateLoginAuthToken(10000, client_1.UserRole.ADMIN);
        const { userId, userRole } = await index_1.Auth.validateLoginAuthToken(loginToken.token);
        (0, vitest_1.expect)(userId).toBe(10000);
        (0, vitest_1.expect)(userRole).toBe(client_1.UserRole.ADMIN);
    });
    (0, vitest_1.it)("invalid login auth token", async () => {
        (0, vitest_1.expect)(() => index_1.Auth.validateLoginAuthToken("random-token")).rejects.toThrowError("invalid");
    });
    (0, vitest_1.it)("generate and validate first password token", async () => {
        const loginToken = await index_1.Auth.generateFirstPasswordToken(10000);
        const userId = await index_1.Auth.validateFirstPasswordToken(loginToken.token);
        (0, vitest_1.expect)(userId).toBe(10000);
    });
    (0, vitest_1.it)("invalid first password token", async () => {
        (0, vitest_1.expect)(() => index_1.Auth.validateFirstPasswordToken("random-token")).rejects.toThrowError("invalid");
    });
    (0, vitest_1.it)("generate and validate password reset token", async () => {
        const loginToken = await index_1.Auth.generatePasswordResetToken(10000);
        const userId = await index_1.Auth.validatePasswordResetToken(loginToken.token);
        (0, vitest_1.expect)(userId).toBe(10000);
    });
    (0, vitest_1.it)("invalid reset password token", async () => {
        (0, vitest_1.expect)(() => index_1.Auth.validatePasswordResetToken("random-token")).rejects.toThrowError("invalid");
    });
});
