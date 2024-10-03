"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const jwt_1 = require("./jwt");
(0, vitest_1.describe)("JWT", () => {
    (0, vitest_1.it)("validate JWT", async () => {
        const secret = "some_random_secret";
        const payload = {
            id: 4000,
        };
        const token = await jwt_1.JWT.generate(secret, payload);
        (0, vitest_1.expect)(typeof token.token).toBe("string");
        const result = (await jwt_1.JWT.validate(secret, token.token));
        (0, vitest_1.expect)(result.id).toBe(payload.id);
    });
    (0, vitest_1.it)("invalid token", async () => {
        const secret = "some_random_secret";
        const payload = {
            id: 4000,
        };
        const token = await jwt_1.JWT.generate(secret, payload);
        const result = (await jwt_1.JWT.validate(secret + "111", token.token));
        (0, vitest_1.expect)(result).toBeFalsy();
    });
});
