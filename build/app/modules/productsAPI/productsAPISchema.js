"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsAPISchema = void 0;
exports.productsAPISchema = {
    type: "object",
    properties: {
        title: { type: "string" },
        description: { type: "string" },
        category: { type: "string" },
        price: { type: "number" },
        discountPercentage: { type: "number" },
        rating: { type: "number" },
        stock: { type: "integer" },
        tags: {
            type: "array",
            items: { type: "string" }
        },
        brand: { type: "string" },
        sku: { type: "string" },
        weight: { type: "number" },
        dimensions: {
            type: "object",
            properties: {
                width: { type: "number" },
                height: { type: "number" },
                depth: { type: "number" }
            },
            required: ["width", "height", "depth"]
        },
        warrantyInformation: { type: "string" },
        shippingInformation: { type: "string" },
        availabilityStatus: { type: "string" },
        reviews: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    rating: { type: "integer" },
                    comment: { type: "string" },
                    reviewerName: { type: "string" },
                    reviewerEmail: { type: "string" }
                },
                required: []
            }
        },
        imagesURL: {
            type: "array",
            items: { type: "string" }
        },
        thumbnail: { type: "string" }
    },
    required: [],
    additionalProperties: false
};
