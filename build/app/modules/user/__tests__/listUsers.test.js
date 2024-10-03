"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const database_1 = require("@/core/database");
const helpers_1 = require("@/core/database/helpers");
const client_1 = require("@prisma/client");
const helpers_2 = require("@/core/helpers");
const userFactory_1 = require("@/app/modules/user/userFactory");
const userRouter_1 = require("../userRouter");
const server_1 = require("@/core/server");
(0, vitest_1.describe)("listUsers", async () => {
    const server = server_1.Server.newTestServer(userRouter_1.UserRouter);
    const url = "/";
    const method = "GET";
    const admin = await database_1.db.user.create({
        data: userFactory_1.UserFactory.make(client_1.UserRole.ADMIN),
    });
    const adminToken = await helpers_2.Auth.generateLoginAuthToken(admin.id, admin.role);
    (0, vitest_1.afterAll)(async () => {
        await (0, helpers_1.clearDatabase)();
        server.close();
    });
    (0, vitest_1.it)("valid request", async () => {
        const userOne = await database_1.db.user.create({
            data: userFactory_1.UserFactory.make(),
        });
        const res = await server.inject({
            url,
            method,
            headers: {
                authorization: "Bearer " + adminToken.token,
            },
        });
        (0, vitest_1.expect)(res.statusCode).toBe(200);
        const body = JSON.parse(res.body);
        const found = body.data.find((r) => r.id === userOne.id);
        (0, vitest_1.expect)(found).toBeTruthy();
    });
    (0, vitest_1.it)("valid request - search", async () => {
        const userOne = await database_1.db.user.create({
            data: {
                ...userFactory_1.UserFactory.make(),
                email: "user-one@site.com",
            },
        });
        const res = await server.inject({
            url: url + "?query=user-one",
            method,
            headers: {
                authorization: "Bearer " + adminToken.token,
            },
        });
        (0, vitest_1.expect)(res.statusCode).toBe(200);
        const body = JSON.parse(res.body);
        (0, vitest_1.expect)(body.data.length).toBe(1);
        (0, vitest_1.expect)(body.pages).toBe(1);
        const foundOne = body.data.find((u) => u.id === userOne.id);
        (0, vitest_1.expect)(foundOne?.name).toBe(userOne.name);
    });
});
