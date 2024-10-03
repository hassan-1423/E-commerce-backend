"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const database_1 = require("@/core/database");
const client_1 = require("@prisma/client");
const helpers_1 = require("@/core/helpers");
const faker_1 = require("@faker-js/faker");
const userRouter_1 = require("../userRouter");
const server_1 = require("@/core/server");
(0, vitest_1.describe)("setUserStatus", async () => {
    const server = server_1.Server.newTestServer(userRouter_1.UserRouter);
    const url = "/set-status";
    const method = "POST";
    const admin = await database_1.db.user.create({
        data: {
            email: faker_1.faker.internet.email(),
            name: faker_1.faker.internet.userName(),
            role: client_1.UserRole.ADMIN,
        },
    });
    const adminAuthToken = await helpers_1.Auth.generateLoginAuthToken(admin.id, admin.role);
    (0, vitest_1.afterAll)(async () => {
        await database_1.db.user.delete({ where: { id: admin.id } });
        server.close();
    });
    (0, vitest_1.it)("valid request", async () => {
        const user = await database_1.db.user.create({
            data: {
                email: faker_1.faker.internet.email(),
                name: faker_1.faker.internet.userName(),
                role: client_1.UserRole.USER,
            },
        });
        const res = await server.inject({
            url,
            method,
            headers: {
                authorization: "Bearer " + adminAuthToken.token,
            },
            payload: {
                userId: user.id,
                status: false,
            },
        });
        (0, vitest_1.expect)(res.statusCode).toBe(200);
        const foundUser = await database_1.db.user.findUnique({
            where: {
                id: user.id,
            },
        });
        (0, vitest_1.expect)(foundUser).toBeTruthy();
        (0, vitest_1.expect)(foundUser?.approved).toBe(false);
        await database_1.db.user.delete({ where: { id: user.id } });
    });
});
