"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const database_1 = require("@/core/database");
const helpers_1 = require("@/core/helpers");
const userFactory_1 = require("@/app/modules/user/userFactory");
const healthCheckRouter_1 = require("../healthCheckRouter");
const server_1 = require("@/core/server");
(0, vitest_1.describe)("memoryUsage", () => {
    const server = server_1.Server.newTestServer(healthCheckRouter_1.HealthCheckRouter);
    const url = "/memory";
    const method = "GET";
    (0, vitest_1.afterAll)(() => server.close());
    (0, vitest_1.it)("admin auith token is required", async () => {
        const user = await database_1.db.user.create({
            data: userFactory_1.UserFactory.make(),
        });
        const authToken = await helpers_1.Auth.generateLoginAuthToken(user.id, user.role);
        const res = await server.inject({
            url,
            method,
            headers: {
                authorization: "Bearer " + authToken.token,
            },
        });
        (0, vitest_1.expect)(res.statusCode).toBe(401);
        await database_1.db.user.delete({ where: { id: user.id } });
    });
});
