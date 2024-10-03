"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
const marked_1 = require("marked");
const config_1 = require("@/app/config");
class Email {
    subject;
    appConfig = config_1.appConfig;
    constructor(subject) {
        this.subject = subject;
    }
    html() {
        const md = this.template().trim();
        return marked_1.marked.parse(md, { mangle: false, headerIds: false });
    }
}
exports.Email = Email;
