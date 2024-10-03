"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLoginToken = exports.validateGeneralToken = exports.generateLoginToken = exports.generateGeneralToken = void 0;
const config_1 = require("@/app/config");
const helpers_1 = require("@/core/helpers");
const exceptions_1 = require("@/core/entities/exceptions");
function generateGeneralToken(type) {
    return async (userId) => {
        const { scope, expiry } = config_1.authConfig.tokens[type];
        const claims = {
            sub: userId,
            scope,
        };
        return await helpers_1.JWT.generate(config_1.authConfig.jwt.secret, claims, expiry);
    };
}
exports.generateGeneralToken = generateGeneralToken;
function generateLoginToken(type) {
    return async (userId, userRole) => {
        const tokenConfig = config_1.authConfig.tokens[type];
        const claims = {
            sub: userId,
            scope: tokenConfig.scope,
            role: userRole,
        };
        return await helpers_1.JWT.generate(config_1.authConfig.jwt.secret, claims, tokenConfig.expiry);
    };
}
exports.generateLoginToken = generateLoginToken;
function validateGeneralToken(type) {
    return async (token) => {
        const jwtPayload = await helpers_1.JWT.validate(config_1.authConfig.jwt.secret, token);
        const result = jwtPayload;
        const { scope } = config_1.authConfig.tokens[type];
        if (!result || !result.sub || !result.scope || result.scope !== scope) {
            throw (0, exceptions_1.BadRequestException)("invalid auth token");
        }
        return result.sub;
    };
}
exports.validateGeneralToken = validateGeneralToken;
function validateLoginToken(type) {
    return async (token) => {
        const jwtPayload = await helpers_1.JWT.validate(config_1.authConfig.jwt.secret, token);
        if (!jwtPayload) {
            throw (0, exceptions_1.ForbiddenException)("invalid or expired token");
        }
        const result = jwtPayload;
        const { scope } = config_1.authConfig.tokens[type];
        if (!result ||
            !result.sub ||
            !result.role ||
            !result.scope ||
            result.scope !== scope) {
            throw (0, exceptions_1.BadRequestException)("invalid password token");
        }
        return {
            userId: result.sub,
            userRole: result.role,
        };
    };
}
exports.validateLoginToken = validateLoginToken;
