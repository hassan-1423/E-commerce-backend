"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestPasswordResetEmail = void 0;
const email_1 = require("@/core/email");
class RequestPasswordResetEmail extends email_1.Email {
    args;
    constructor(args) {
        super("Forgot Password");
        this.args = args;
    }
    template() {
        return `
# Reset forgotten password
A request was made for resetting the password of your account for ${this.appConfig.appName}. Please click the following link to reset your account password.

[Reset Password](${this.appConfig.urls.resetPassword}${this.args.resetToken})

**Note**: If you did not request a password reset for your account, you can safely ignore this email.
`;
    }
}
exports.RequestPasswordResetEmail = RequestPasswordResetEmail;
