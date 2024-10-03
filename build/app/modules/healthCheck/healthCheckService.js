"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthCheckService = void 0;
const node_process_1 = __importDefault(require("node:process"));
const database_1 = require("@/core/database");
const helpers_1 = require("@/core/database/helpers");
exports.HealthCheckService = {
    async healthcheck() {
        const isConnected = await (0, helpers_1.ping)(database_1.db);
        return {
            uptime: node_process_1.default.uptime(),
            timestamp: Date.now(),
            status: "OK",
            database: isConnected ? "CONNECTED" : "DISCONNECTED",
        };
    },
    async memoryUsage() {
        const toMB = (n) => Math.round((n / 1024 / 1024) * 100) / 100;
        const used = node_process_1.default.memoryUsage();
        const heapTotal = toMB(used.heapTotal);
        const heapUsed = toMB(used.heapUsed);
        return {
            heap_total: heapTotal + " MB",
            heap_used: heapUsed + " MB",
        };
    },
};
