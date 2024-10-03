"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const config_1 = require("@/app/config");
const database_1 = require("@/core/database");
const helpers_1 = require("@/core/helpers");
exports.UserRepository = {
    async listUsers(page = 1, query = undefined) {
        const findCondition = {
            where: {
                email: query ? { startsWith: query } : undefined,
            },
        };
        const [count, users] = await database_1.db.$transaction([
            database_1.db.user.count(findCondition),
            database_1.db.user.findMany({
                ...findCondition,
                skip: config_1.appConfig.pagination.perPage * (page - 1),
                take: config_1.appConfig.pagination.perPage,
            }),
        ]);
        return {
            pages: Math.ceil(count / config_1.appConfig.pagination.perPage),
            data: users,
        };
    },
    async findById(userId) {
        return database_1.db.user.findUnique({
            where: {
                id: userId,
            },
        });
    },
    async findByIdWithPassword(id) {
        return database_1.db.user.findFirst({
            where: { id },
            include: {
                password: true,
            },
        });
    },
    async findByEmail(email) {
        return database_1.db.user.findFirst({
            where: { email },
        });
    },
    async findByEmailWithPassword(email) {
        return database_1.db.user.findFirst({
            where: { email },
            include: {
                password: true,
            },
        });
    },
    async createUser(args, role) {
        return database_1.db.user.create({
            data: {
                email: args.email,
                name: args.name,
                role,
                password: {
                    create: {
                        hash: await helpers_1.Password.hash(args.password),
                    },
                },
            },
        });
    },
    async updateUserStatus(user, status) {
        await database_1.db.user.update({
            where: {
                id: user.id,
            },
            data: {
                approved: status,
            },
        });
    },
    async updateUserProfile(user, data) {
        return database_1.db.user.update({
            where: {
                id: user.id,
            },
            data: {
                name: data.name,
                phone: data.phone,
                mobile: data.mobile,
            },
        });
    },
};
