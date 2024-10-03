"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasRole = void 0;
const exceptions_1 = require("@/core/entities/exceptions");
const helpers_1 = require("@/core/helpers");
const hasRole = (...roles) => {
    return (req, _reply, done) => {
        const { userRole } = (0, helpers_1.requestMeta)(req);
        if (!roles.includes(userRole)) {
            throw (0, exceptions_1.AuthException)(`only authorized roles can access this resource. authorized roles: ${roles}`);
        }
        done();
    };
};
exports.hasRole = hasRole;
