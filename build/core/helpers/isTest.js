"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTest = void 0;
const node_process_1 = __importDefault(require("node:process"));
function isTest() {
    return node_process_1.default.env.NODE_ENV === "test";
}
exports.isTest = isTest;
