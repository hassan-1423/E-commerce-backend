"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordRepository = void 0;
const database_1 = require("@/core/database");
const helpers_1 = require("@/core/helpers");
exports.PasswordRepository = {
    async updateUserPassword(user, newPassword) {
        await database_1.db.password.update({
            where: {
                userId: user.id,
            },
            data: {
                hash: await helpers_1.Password.hash(newPassword),
            },
        });
    },
    async setUserPassword(user, password) {
        await database_1.db.password.create({
            data: {
                userId: user.id,
                hash: await helpers_1.Password.hash(password),
            },
        });
    },
};
