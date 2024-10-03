"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearDatabase = exports.ping = void 0;
const index_1 = require("./index");
async function ping(client) {
    try {
        await client.$queryRawUnsafe("SELECT 1");
    }
    catch (_) {
        return false;
    }
    return true;
}
exports.ping = ping;
async function clearDatabase() {
    const tablenames = await index_1.db.$queryRaw `SELECT tablename FROM pg_tables WHERE schemaname='public'`;
    const tables = tablenames
        .map(({ tablename }) => tablename)
        .filter((name) => name !== "_prisma_migrations")
        .map((name) => `"public"."${name}"`)
        .join(", ");
    try {
        await index_1.db.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`);
    }
    catch (error) {
        console.log({ error });
    }
}
exports.clearDatabase = clearDatabase;
