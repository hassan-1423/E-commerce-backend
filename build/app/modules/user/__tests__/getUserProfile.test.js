"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const database_1 = require("@/core/database");
const client_1 = require("@prisma/client");
const helpers_1 = require("@/core/helpers");
const faker_1 = require("@faker-js/faker");
const userFactory_1 = require("@/app/modules/user/userFactory");
const userRouter_1 = require("../userRouter");
const server_1 = require("@/core/server");
(0, vitest_1.describe)("getUserProfile", () => {
    const server = server_1.Server.newTestServer(userRouter_1.UserRouter);
    const url = "/profile";
    const method = "GET";
    (0, vitest_1.afterAll)(() => server.close());
    (0, vitest_1.it)("valid request", async () => {
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
        (0, vitest_1.expect)(res.statusCode).toBe(200);
        const body = JSON.parse(res.body);
        (0, vitest_1.expect)(body.email).toBe(user.email);
        (0, vitest_1.expect)(body.role).toBe(user.role);
        await database_1.db.user.delete({ where: { id: user.id } });
    });
    (0, vitest_1.it)("invalid token", async () => {
        const authToken = await helpers_1.Auth.generateLoginAuthToken(5000, client_1.UserRole.ADMIN);
        const res = await server.inject({
            url,
            method,
            headers: {
                authorization: "Bearer " + authToken.token,
            },
        });
        (0, vitest_1.expect)(res.statusCode).toBe(401);
    });
    (0, vitest_1.it)("invalid token", async () => {
        const res = await server.inject({
            url,
            method,
            headers: {
                authorization: "Bearer " + faker_1.faker.string.alpha({ length: 5 }),
            },
        });
        (0, vitest_1.expect)(res.statusCode).toBe(403);
    });
});
