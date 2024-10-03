"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIProvider = void 0;
const axios_1 = __importDefault(require("axios"));
const ajv_1 = __importDefault(require("ajv"));
const logger_1 = require("@/core/server/logger");
class APIProvider {
    axiosInstance;
    vInstance;
    baseURL;
    timeout;
    constructor(baseURL, timeoutSeconds = 5) {
        this.baseURL = baseURL;
        this.timeout = timeoutSeconds;
        this.axiosInstance = axios_1.default.create({ timeout: this.timeout * 1000 });
        this.vInstance = new ajv_1.default();
    }
    validate(schema, data) {
        if (data instanceof Error) {
            return data;
        }
        const isValid = this.vInstance.validate(schema, data);
        if (!isValid) {
            const message = "unknown data-structure returned from external API";
            logger_1.logger.error({ data }, message);
            return new Error(message);
        }
        return data;
    }
    async get(url, bearerToken = undefined) {
        const targetURL = this.baseURL + url;
        try {
            const res = await this.axiosInstance.get(targetURL, {
                headers: {
                    Authorization: "Bearer " + bearerToken,
                },
            });
            return res.data;
        }
        catch (err) {
            logger_1.logger.error({ error: err }, "error executing GET request");
            if (err instanceof Error) {
                return new Error(err.message);
            }
            return new Error("request failed");
        }
    }
    async post(url, payload, bearerToken = undefined) {
        const targetURL = this.baseURL + url;
        try {
            const res = await this.axiosInstance.post(targetURL, payload, {
                headers: {
                    Authorization: "Bearer " + bearerToken,
                },
            });
            return res.data;
        }
        catch (err) {
            logger_1.logger.error({ error: err }, "error executing POST request");
            if (err instanceof Error) {
                return new Error(err.message);
            }
            return new Error("request failed");
        }
    }
    async put(url, payload, bearerToken = undefined) {
        const targetURL = this.baseURL + url;
        try {
            const res = await this.axiosInstance.put(targetURL, payload, {
                headers: {
                    Authorization: "Bearer " + bearerToken,
                },
            });
            return res.data;
        }
        catch (err) {
            logger_1.logger.error({ error: err }, "error executing PUT request");
            if (err instanceof Error) {
                return new Error(err.message);
            }
            return new Error("request failed");
        }
    }
    async delete(url, bearerToken = undefined) {
        const targetURL = this.baseURL + url;
        try {
            const res = await this.axiosInstance.delete(targetURL, {
                headers: {
                    Authorization: "Bearer " + bearerToken,
                },
            });
            return res.data;
        }
        catch (err) {
            logger_1.logger.error({ error: err }, "error executing DELETE request");
            if (err instanceof Error) {
                return new Error(err.message);
            }
            return new Error("request failed");
        }
    }
}
exports.APIProvider = APIProvider;
