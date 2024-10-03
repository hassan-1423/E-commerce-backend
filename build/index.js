"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
require("@/app/config");
const server_1 = require("@/core/server");
const logger_1 = require("./core/server/logger");
async function main() {
    const server = server_1.Server.new();
    await server_1.Server.start(server);
}
main().catch((err) => logger_1.logger.error(err));
