"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const testableEmailService_1 = require("./testableEmailService");
const config_1 = require("@/app/config");
const helpers_1 = require("@/core/helpers");
class EmailService extends testableEmailService_1.TestableEmailService {
    static _instance;
    provider;
    constructor() {
        super();
        this.provider = new config_1.emailConfig.provider();
    }
    static get instance() {
        if (!this._instance) {
            this._instance = new EmailService();
        }
        return this._instance;
    }
    sendEmail(to, email) {
        if ((0, helpers_1.isTest)()) {
            this.storeEmail(to, email);
            return;
        }
        this.provider.sendEmail(to, email);
    }
}
exports.EmailService = EmailService;
