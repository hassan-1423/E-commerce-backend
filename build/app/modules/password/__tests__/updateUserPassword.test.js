"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const database_1 = require("@/core/database");
const helpers_1 = require("@/core/helpers");
const faker_1 = require("@faker-js/faker");
const userFactory_1 = require("@/app/modules/user/userFactory");
const passwordFactory_1 = require("@/app/modules/password/passwordFactory");
const passwordRouter_1 = require("../passwordRouter");
const server_1 = require("@/core/server");
(0, vitest_1.describe)("updateUserPassword", () => {
    const server = server_1.Server.newTestServer(passwordRouter_1.PasswordRouter);
    const url = "/update";
    const method = "POST";
    (0, vitest_1.afterAll)(() => server.close());
    (0, vitest_1.it)("valid request", async () => {
        const user = await database_1.db.user.create({
            data: {
                ...userFactory_1.UserFactory.make(),
                password: {
                    create: await passwordFactory_1.PasswordFactory.make(),
                },
            },
        });
        const authToken = await helpers_1.Auth.generateLoginAuthToken(user.id, user.role);
        const updatedPassword = faker_1.faker.string.alphanumeric({ length: 10 });
        const res = await server.inject({
            url,
            method,
            headers: {
                authorization: "Bearer " + authToken.token,
            },
            payload: {
                password: updatedPassword,
                confirmPassword: updatedPassword,
            },
        });
        (0, vitest_1.expect)(res.statusCode).toBe(200);
        const updatedUser = await database_1.db.user.findUnique({
            where: { id: user.id },
            include: { password: true },
        });
        const isHashValid = await helpers_1.Password.verify(updatedUser?.password?.hash ?? "", updatedPassword);
        (0, vitest_1.expect)(isHashValid).toBe(true);
        await database_1.db.user.delete({ where: { id: user.id } });
    });
});
