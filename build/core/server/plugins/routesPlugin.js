"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesPlugin = void 0;
const routers_1 = require("@/app/routers");
exports.routesPlugin = {
    plug() {
        return async (app) => {
            for (const [prefix, router] of routers_1.routers) {
                app.register(router, { prefix });
            }
        };
    },
};
