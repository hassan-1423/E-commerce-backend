"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("@/core/database");
const vitest_1 = require("vitest");
const faker_1 = require("@faker-js/faker");
const userFactory_1 = require("@/app/modules/user/userFactory");
const passwordFactory_1 = require("@/app/modules/password/passwordFactory");
const authRouter_1 = require("../authRouter");
const server_1 = require("@/core/server");
(0, vitest_1.describe)("login", async () => {
    const server = server_1.Server.newTestServer(authRouter_1.AuthRouter);
    const url = "/login";
    const method = "POST";
    (0, vitest_1.afterAll)(() => server.close());
    (0, vitest_1.it)("valid credentials", async () => {
        const password = faker_1.faker.string.alphanumeric({ length: 10 });
        const user = await database_1.db.user.create({
            data: {
                ...userFactory_1.UserFactory.make(),
                password: {
                    create: await passwordFactory_1.PasswordFactory.make(password),
                },
            },
        });
        const payload = {
            email: user.email,
            password: password,
        };
        const res = await server.inject({
            url,
            method,
            payload,
        });
        (0, vitest_1.expect)(res.statusCode).toBe(200);
        const body = JSON.parse(res.body);
        (0, vitest_1.expect)(body.user).toBeTruthy();
        (0, vitest_1.expect)(body.password).toBeFalsy();
        (0, vitest_1.expect)(body.auth.token).toBeTruthy();
    });
    (0, vitest_1.it)("invalid credentials", async () => {
        const payload = {
            email: userFactory_1.UserFactory.make().email,
            password: "some-random-wrong-password",
        };
        const res = await server.inject({
            url,
            method,
            payload,
        });
        (0, vitest_1.expect)(res.statusCode).toBe(401);
    });
});
