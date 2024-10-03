"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const client_1 = require("@prisma/client");
let db;
if (process.env.NODE_ENV === "production") {
    exports.db = db = new client_1.PrismaClient();
}
else {
    if (!global.databaseInstance) {
        global.databaseInstance = new client_1.PrismaClient();
    }
    exports.db = db = global.databaseInstance;
}
