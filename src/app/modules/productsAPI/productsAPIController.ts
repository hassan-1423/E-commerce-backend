import {
  FastifyBaseLogger,
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  FastifySchema,
  FastifyTypeProviderDefault,
  RawServerDefault,
  RouteGenericInterface,
  RouteShorthandOptionsWithHandler,
} from "fastify"
import { requestMeta } from "@/core/helpers"
import { validateToken } from "@/core/server/middleware"
import { productsAPISchema } from "./productsAPISchema"
import { productsAPIService } from "./productsAPIService"
import { id_ID } from "@faker-js/faker"

export const productsAPIController: Record<
  string,
  RouteShorthandOptionsWithHandler
> = {
  createProduct: {
    preValidation: [validateToken],
    schema: {
      body: productsAPISchema,
    },
    handler: async (req) => {
      const body = req.body
      console.log(body)
      return await productsAPIService.createProduct(body)
      return {
        status: "Success",
      }
    },
  },
  GetProducts: {
    preValidation: [validateToken],
    handler: async (req) => {
      const body = req.body
      return await productsAPIService.GetProducts(body)
      return {
        status: "Success",
      }
    },
  },
  GetProductById: {
    preValidation: [validateToken],
    handler: async (req) => {
      const body = req.params
      return await productsAPIService.GetProductById(body)
      return {
        status: "Success",
      }
    },
  },
  GetProductBySearch: {
    preValidation: [validateToken],
    handler: async (req) => {
      const body = req.query
      console.log(body)
      return await productsAPIService.GetProductBySearch(body)
      return {
        status: "Success",
      }
    },
  },
  favouriteProduct: {
    preValidation: [validateToken],
    handler: async (req) => {
      const body = req.body
      return await productsAPIService.favouriteProduct(body)
      return {
        status: "Success",
      }
    },
  },
  GetfavouriteProduct: {
    preValidation: [validateToken],
    handler: async (req) => {
      const body = req.body
      return await productsAPIService.GetfavouriteProduct(body)
      return {
        status: "Success",
      }
    },
  },
  deletedProduct: {
    preValidation: [validateToken],
    handler: async (req) => {
      const body = req.body
      console.log("hello world")
      console.log(body)
      return {
        status: "Success",
      }
      return await productsAPIService.deleteProduct(body)
     
    },
  },
  updateProduct: {
    preValidation: [validateToken],
    //  schema: {
    //   body: productsAPISchema,
    // },
    handler: async (req) => {
      const body = req.body
      return await productsAPIService.updateProduct(body)
      return {
        status: "Success",
      }
    },
  },
}
