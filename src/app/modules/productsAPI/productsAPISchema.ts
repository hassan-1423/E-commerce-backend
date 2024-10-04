import { authConfig } from "@/app/config";
import { User } from "@prisma/client";
import { FromSchema } from "json-schema-to-ts";

export const productsAPISchema = {
  type: "object",
  properties: {
    title: { type: "string" },
    description: { type: "string" },
    category: { 
      type: "object",
      properties: {
        categoryName: { type: "string" },
      },
      required: []
    },
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
} as const;

export type CreateProduct = FromSchema<typeof productsAPISchema>;
