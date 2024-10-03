"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const fastify_1 = __importDefault(require("fastify"));
const request_context_1 = require("@fastify/request-context");
const cors_1 = __importDefault(require("@fastify/cors"));
const helmet_1 = __importDefault(require("@fastify/helmet"));
const rate_limit_1 = __importDefault(require("@fastify/rate-limit"));
const plugins_1 = require("./plugins");
const config_1 = require("@/app/config");
exports.Server = {
    new() {
        const app = (0, fastify_1.default)({ logger: true });
        app
            .register(cors_1.default)
            .register(helmet_1.default, { global: true })
            .register(rate_limit_1.default, plugins_1.rateLimitPluginOptions)
            .register(request_context_1.fastifyRequestContextPlugin, plugins_1.requestContextPluginOptions)
            .register(plugins_1.routesPlugin.plug());
        return app;
    },
    start(app) {
        return new Promise((_resolve, reject) => {
            app.listen(config_1.serverConfig, (err) => {
                if (err) {
                    reject(err);
                }
            });
        });
    },
    newTestServer(router) {
        const instance = (0, fastify_1.default)({ logger: false });
        instance.register(request_context_1.fastifyRequestContextPlugin, plugins_1.requestContextPluginOptions);
        instance.register(router);
        return instance;
    },
};
