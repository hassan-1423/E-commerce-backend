"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestMeta = void 0;
const logger_1 = require("@/core/server/logger");
function requestMeta(req) {
    const userId = req.requestContext.get("userId");
    const userRole = req.requestContext.get("userRole");
    if (!userId || !userRole) {
        logger_1.logger.error("missing expected components in the verified JWT");
        throw new Error("failed to process request");
    }
    return { userId, userRole };
}
exports.requestMeta = requestMeta;
