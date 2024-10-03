"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsAPIController = void 0;
const middleware_1 = require("@/core/server/middleware");
const productsAPISchema_1 = require("./productsAPISchema");
const productsAPIService_1 = require("./productsAPIService");
exports.productsAPIController = {
    createProduct: {
        preValidation: [middleware_1.validateToken],
        schema: {
            body: productsAPISchema_1.productsAPISchema,
        },
        handler: async (req) => {
            const body = req.body;
            console.log(body);
            return await productsAPIService_1.productsAPIService.createProduct(body);
            return {
                status: "Success",
            };
        },
    },
    GetProducts: {
        preValidation: [middleware_1.validateToken],
        handler: async (req) => {
            const body = req.body;
            return await productsAPIService_1.productsAPIService.GetProducts(body);
            return {
                status: "Success",
            };
        },
    },
    GetProductById: {
        preValidation: [middleware_1.validateToken],
        handler: async (req) => {
            const body = req.params;
            return await productsAPIService_1.productsAPIService.GetProductById(body);
            return {
                status: "Success",
            };
        },
    },
    GetProductBySearch: {
        preValidation: [middleware_1.validateToken],
        handler: async (req) => {
            const body = req.query;
            console.log(body);
            return await productsAPIService_1.productsAPIService.GetProductBySearch(body);
            return {
                status: "Success",
            };
        },
    },
    favouriteProduct: {
        preValidation: [middleware_1.validateToken],
        handler: async (req) => {
            const body = req.body;
            return await productsAPIService_1.productsAPIService.favouriteProduct(body);
            return {
                status: "Success",
            };
        },
    },
    GetfavouriteProduct: {
        preValidation: [middleware_1.validateToken],
        handler: async (req) => {
            const body = req.body;
            return await productsAPIService_1.productsAPIService.GetfavouriteProduct(body);
            return {
                status: "Success",
            };
        },
    },
    deletedProduct: {
        preValidation: [middleware_1.validateToken],
        handler: async (req) => {
            const body = req.body;
            console.log("hello world");
            console.log(body);
            return {
                status: "Success",
            };
            return await productsAPIService_1.productsAPIService.deleteProduct(body);
        },
    },
    updateProduct: {
        preValidation: [middleware_1.validateToken],
        handler: async (req) => {
            const body = req.body;
            return await productsAPIService_1.productsAPIService.updateProduct(body);
            return {
                status: "Success",
            };
        },
    },
};
