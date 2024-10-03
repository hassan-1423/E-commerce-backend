"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DummyEmailProvider = void 0;
const logger_1 = require("@/core/server/logger");
class DummyEmailProvider {
    constructor() { }
    sendEmail(to, email) {
        const body = email.html();
        logger_1.logger.info({ to, body });
    }
}
exports.DummyEmailProvider = DummyEmailProvider;
