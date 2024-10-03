"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const database_1 = require("@/core/database");
const helpers_1 = require("@/core/helpers");
const userFactory_1 = require("@/app/modules/user/userFactory");
const authRouter_1 = require("../authRouter");
const server_1 = require("@/core/server");
(0, vitest_1.describe)("refreshAuthToken", async () => {
    const server = server_1.Server.newTestServer(authRouter_1.AuthRouter);
    const url = "/refresh-token";
    const method = "GET";
    const user = await database_1.db.user.create({
        data: userFactory_1.UserFactory.make(),
    });
    const userToken = await helpers_1.Auth.generateLoginAuthToken(user.id, user.role);
    (0, vitest_1.afterAll)(async () => {
        await database_1.db.user.delete({ where: { id: user.id } });
        server.close();
    });
    (0, vitest_1.it)("valid request", async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const res = await server.inject({
            url,
            method,
            headers: {
                authorization: "Bearer " + userToken.token,
            },
        });
        (0, vitest_1.expect)(res.statusCode).toBe(200);
        const body = JSON.parse(res.body);
        (0, vitest_1.expect)(body.token !== userToken.token).toBeTruthy;
        (0, vitest_1.expect)(body.expiry > userToken.expiry).toBeTruthy();
    });
    (0, vitest_1.it)("disabled user", async () => {
        await database_1.db.user.update({
            where: { id: user.id },
            data: { approved: false },
        });
        await new Promise((resolve) => setTimeout(resolve, 500));
        const res = await server.inject({
            url,
            method,
            headers: {
                authorization: "Bearer " + userToken.token,
            },
        });
        (0, vitest_1.expect)(res.statusCode).toBe(401);
        const body = JSON.parse(res.body);
        (0, vitest_1.expect)(body.message.includes("Cannot")).toBeTruthy();
    });
});
