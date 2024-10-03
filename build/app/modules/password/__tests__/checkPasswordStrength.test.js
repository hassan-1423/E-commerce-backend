"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const passwordRouter_1 = require("../passwordRouter");
const server_1 = require("@/core/server");
(0, vitest_1.describe)("checkPasswordStrength", () => {
    const server = server_1.Server.newTestServer(passwordRouter_1.PasswordRouter);
    const url = "/check-strength";
    const method = "POST";
    (0, vitest_1.afterAll)(() => server.close());
    (0, vitest_1.it)("strong password", async () => {
        const res = await server.inject({
            url,
            method,
            payload: {
                password: "Wvx.#$1Hfv&s^33",
            },
        });
        (0, vitest_1.expect)(res.statusCode).toBe(200);
        const body = JSON.parse(res.body);
        (0, vitest_1.expect)(body.strong).toBe(true);
        (0, vitest_1.expect)(body.errors.length).toBeFalsy();
    });
    (0, vitest_1.it)("weak password", async () => {
        const res = await server.inject({
            url,
            method,
            payload: {
                password: "abc123",
            },
        });
        (0, vitest_1.expect)(res.statusCode).toBe(200);
        const body = JSON.parse(res.body);
        (0, vitest_1.expect)(body.strong).toBe(false);
        (0, vitest_1.expect)(body.errors.length).toBeTruthy();
    });
});
