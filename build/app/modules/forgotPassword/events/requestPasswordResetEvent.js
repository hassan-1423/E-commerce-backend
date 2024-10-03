"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestPasswordResetEvent = void 0;
const auth_1 = require("@/core/helpers/auth");
const RequestPasswordResetEmail_1 = require("@/app/modules/forgotPassword/emails/RequestPasswordResetEmail");
const email_1 = require("@/core/email");
const logger_1 = require("@/core/server/logger");
class RequestPasswordResetEvent {
    user;
    constructor(user) {
        this.user = user;
    }
    async process() {
        const token = await auth_1.Auth.generatePasswordResetToken(this.user.id);
        const email = new RequestPasswordResetEmail_1.RequestPasswordResetEmail({ resetToken: token.token });
        email_1.EmailService.instance.sendEmail(this.user.email, email);
        logger_1.logger.info({ email: this.user.email }, "sending forgot password (password reset) email");
    }
}
exports.RequestPasswordResetEvent = RequestPasswordResetEvent;
