"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestableEmailService = void 0;
class TestableEmailService {
    emails = [];
    get sentEmails() {
        return this.emails;
    }
    clearSentEmails() {
        this.emails = [];
    }
    storeEmail(to, email) {
        this.emails.push({ to, email });
    }
}
exports.TestableEmailService = TestableEmailService;
