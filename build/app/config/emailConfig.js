"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailConfig = void 0;
const helpers_1 = require("@/core/helpers");
const dummyEmailProvider_1 = require("@/core/email/providers/dummyEmailProvider");
exports.emailConfig = {
    fromEmail: (0, helpers_1.env)("FROM_EMAIL"),
    provider: dummyEmailProvider_1.DummyEmailProvider,
};
