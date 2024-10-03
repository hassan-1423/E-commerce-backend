"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT = void 0;
const njwt_1 = __importDefault(require("njwt"));
exports.JWT = {
    async generate(secret, claims, expiredInMinutes) {
        const token = njwt_1.default.create(claims, secret);
        const expiry = expiredInMinutes
            ? new Date().getTime() + 60 * 1000 * expiredInMinutes
            : 0;
        token.setExpiration(expiry);
        return {
            token: token.compact(),
            expiry,
        };
    },
    async validate(secret, token) {
        try {
            return njwt_1.default.verify(token, secret)?.body;
        }
        catch (err) {
            return;
        }
    },
};
