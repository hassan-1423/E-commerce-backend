"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const helpers_1 = require("./helpers");
exports.Auth = {
    generateLoginAuthToken: (0, helpers_1.generateLoginToken)("auth"),
    validateLoginAuthToken: (0, helpers_1.validateLoginToken)("auth"),
    generateFirstPasswordToken: (0, helpers_1.generateGeneralToken)("firstPassword"),
    validateFirstPasswordToken: (0, helpers_1.validateGeneralToken)("firstPassword"),
    generatePasswordResetToken: (0, helpers_1.generateGeneralToken)("passwordReset"),
    validatePasswordResetToken: (0, helpers_1.validateGeneralToken)("passwordReset"),
};
