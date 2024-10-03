"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordFactory = void 0;
const helpers_1 = require("@/core/helpers");
const faker_1 = require("@faker-js/faker");
exports.PasswordFactory = {
    async make(password = undefined) {
        return {
            hash: await helpers_1.Password.hash(password ?? faker_1.faker.string.alphanumeric({ length: 10 })),
        };
    },
};
