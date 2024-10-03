"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFactory = void 0;
const faker_1 = require("@faker-js/faker");
const client_1 = require("@prisma/client");
exports.UserFactory = {
    make(role = client_1.UserRole.USER) {
        return {
            email: faker_1.faker.internet.email(),
            name: faker_1.faker.internet.userName(),
            role,
        };
    },
};
