"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const database_1 = require("@/core/database");
const client_1 = require("@prisma/client");
const helpers_1 = require("@/core/helpers");
const faker_1 = require("@faker-js/faker");
const userRouter_1 = require("../userRouter");
const server_1 = require("@/core/server");
(0, vitest_1.describe)("updateUserProfile", () => {
    const server = server_1.Server.newTestServer(userRouter_1.UserRouter);
    const url = "/profile";
    const method = "PUT";
    (0, vitest_1.afterAll)(() => server.close());
    (0, vitest_1.it)("valid request", async () => {
        const user = await database_1.db.user.create({
            data: {
                email: faker_1.faker.internet.email(),
                name: faker_1.faker.internet.userName(),
                role: client_1.UserRole.USER,
            },
        });
        const authToken = await helpers_1.Auth.generateLoginAuthToken(user.id, user.role);
        const updatedName = "Updated Name";
        const res = await server.inject({
            url,
            method,
            headers: {
                authorization: "Bearer " + authToken.token,
            },
            payload: {
                name: updatedName,
                phone: "123123123",
                mobile: "4545454545",
            },
        });
        (0, vitest_1.expect)(res.statusCode).toBe(200);
        const updatedUser = await database_1.db.user.findUnique({
            where: { id: user.id },
        });
        (0, vitest_1.expect)(updatedUser?.name).toBe(updatedName);
        (0, vitest_1.expect)(updatedUser?.phone).toBe("123123123");
        (0, vitest_1.expect)(updatedUser?.mobile).toBe("4545454545");
        await database_1.db.user.delete({ where: { id: user.id } });
    });
});
