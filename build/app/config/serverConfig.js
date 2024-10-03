"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverConfig = void 0;
exports.serverConfig = {
    host: "0.0.0.0",
    port: 4000,
    rateLimit: {
        max: 100,
        timeWindow: 60000,
    },
};
