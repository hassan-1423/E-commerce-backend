"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const database_1 = require("@/core/database");
const faker_1 = require("@faker-js/faker");
const userRouter_1 = require("../userRouter");
const server_1 = require("@/core/server");
(0, vitest_1.describe)("registerUser", async () => {
    const server = server_1.Server.newTestServer(userRouter_1.UserRouter);
    const url = "/register";
    const method = "POST";
    (0, vitest_1.afterAll)(() => server.close());
    (0, vitest_1.it)("valid request", async () => {
        const email = faker_1.faker.internet.email();
        const password = faker_1.faker.string.alphanumeric({ length: 10 });
        const payload = {
            name: faker_1.faker.internet.userName(),
            email,
            password,
            confirmPassword: password,
        };
        const res = await server.inject({
            url,
            method,
            payload,
        });
        (0, vitest_1.expect)(res.statusCode).toBe(200);
        const foundUser = await database_1.db.user.findUnique({
            where: { email },
        });
        (0, vitest_1.expect)(foundUser?.name).toBe(payload.name);
        await database_1.db.user.delete({ where: { email } });
    });
    (0, vitest_1.it)("email already taken", async () => {
        const email = faker_1.faker.internet.email();
        const password = faker_1.faker.string.alphanumeric({ length: 10 });
        const user = await database_1.db.user.create({
            data: {
                email,
                name: faker_1.faker.internet.userName(),
            },
        });
        const payload = {
            name: "User two",
            email,
            password,
            confirmPassword: password,
        };
        const res = await server.inject({
            url,
            method,
            payload,
        });
        (0, vitest_1.expect)(res.statusCode).toBe(400);
        const body = JSON.parse(res.body);
        (0, vitest_1.expect)(body.message.includes("in use")).toBe(true);
        await database_1.db.user.delete({ where: { id: user.id } });
    });
});
