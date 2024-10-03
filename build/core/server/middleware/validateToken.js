"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const exceptions_1 = require("@/core/entities/exceptions");
const helpers_1 = require("@/core/helpers");
const validateToken = async (req) => {
    const token = parseBearerToken(req);
    if (!token) {
        throw (0, exceptions_1.AuthException)("invalid bearer token");
    }
    const { userId, userRole } = await helpers_1.Auth.validateLoginAuthToken(token);
    req.requestContext.set("userId", userId);
    req.requestContext.set("userRole", userRole);
};
exports.validateToken = validateToken;
function parseBearerToken(req) {
    const header = req.headers["authorization"];
    if (!header)
        return;
    const token = header.replace("Bearer ", "");
    if (!token)
        return;
    return token;
}
