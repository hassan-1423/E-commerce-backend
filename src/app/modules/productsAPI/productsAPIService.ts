import { AuthException, BadRequestException } from "@/core/entities/exceptions"
import { UserRepository } from "@/app/modules/user/userRepository"
import { Auth, Password } from "@/core/helpers"
import { db } from "@/core/database"

export const productsAPIService = {
  async createProduct(body: any) {
    try {
      const product = await db.product.create({
        data: {
          title: body.title,
          description: body.description,
          category: {
            create: {
              categoryName: body.category.categoryName,
            },
          },
          price: body.price,
          discountPercentage: body.discountPercentage,
          rating: body.rating,
          stock: body.stock,
          brand: body.brand,
          sku: body.sku,
          weight: body.weight,
          dimensions: {
            create: {
              width: body.dimensions.width,
              height: body.dimensions.height,
              depth: body.dimensions.depth,
            },
          },
          warrantyInformation: body.warrantyInformation,
          shippingInformation: body.shippingInformation,
          availabilityStatus: body.availabilityStatus,
          imagesURL: body.imagesURL,
          thumbnail: body.thumbnail,
          tags: {
            connectOrCreate:
              body.tags?.map((tag: string) => ({
                where: { name: tag },
                create: { name: tag },
              })) ?? [],
          },
          reviews: {
            createMany: {
              data:
                body.reviews?.map((review: any) => ({
                  rating: review.rating,
                  comment: review.comment,
                  date:review.date,
                  reviewerName: review.reviewerName,
                  reviewerEmail: review.reviewerEmail,
                })) ?? [],
            },
          },
        },
      });

      console.log("Product record created successfully");
      return {
        status: "success",
        product,
      };
    } catch (error) {
      console.error("Error creating product record:", error);
      throw error; // Re-throwing the error to be handled by the caller
    }
  },
  async GetProducts(body: any) {
    try {
      // Fetch products without including related data like tags or favorites
      const allData = await db.product.findMany({
        take: 30, // Limit the number of products to 30
      })

      // Fetch the list of product IDs that are marked as favorites
      const favoriteProductIds = await db.favorite.findMany({
        where: {
          productId: {
            in: allData.map((product) => product.id),
          },
        },
        select: {
          productId: true, // Only select product IDs
        },
      })
      const favoriteProductIdSet = new Set(
        favoriteProductIds.map((fav) => fav.productId),
      )
      const productsWithFavoriteStatus = allData.map((product) => ({
        ...product,
        Favorite: favoriteProductIdSet.has(product.id),
      }))

      return {
        status: "success",
        data: productsWithFavoriteStatus,
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      throw error
    }
  },

  async GetProductById(body: any) {
    try {
      const product = await db.product.findUnique({
        where: {
          id: Number(body.id),
        },
      })

      if (!product) {
        return {
          status: "error",
          message: "Product not found",
        }
      }

      return {
        status: "success",
        data: product,
      }
    } catch (error) {
      console.error("Error fetching product by id:", error)
      throw error
    }
  },
  async GetProductBySearch(body: any) {
    try {
      const products = await db.product.findMany({
        where: {
          OR: [
            {
              title: {
                contains: body.q,
                mode: "insensitive", // Case-insensitive search
              },
            },
            {
              description: {
                contains: body.q,
                mode: "insensitive", // Case-insensitive search
              },
            },
            {
              category: {
                categoryName: {
                  contains: body.q,
                  mode: "insensitive", // Case-insensitive search
                },
              },
            },
          ],
        },
      });
  
      if (products.length === 0) {
        return {
          status: "error",
          message: "No products found",
        };
      }
  
      return {
        status: "success",
        data: products,
      };
    } catch (error) {
      console.error("Error fetching products by search:", error);
      throw error;
    }
  },
  
  async deleteProduct(body: any) {
    try {
      const deletedProduct = await db.product.delete({
        where: {
          id: Number(body.id),
        },
      })
      console.log(deletedProduct)
      if (deletedProduct) {
        console.log("Product deleted successfully")
        return {
          status: "success",
          message: "Product deleted successfully",
        }
      } else {
        console.log("Product not found")
        return {
          status: "failure",
          message: "Product not found",
        }
      }
    } catch (error) {
      console.error("Error deleting data:", error)
      throw error
    }
  },
  async updateProduct(body: any) {
    try {
      const productId = Number(body.id)
      if (isNaN(productId)) {
        return {
          status: "failure",
          message: "Invalid product ID",
        }
      }
      const existingProduct = await db.product.findUnique({
        where: { id: productId },
      })

      if (!existingProduct) {
        console.log("Product not found")
        return {
          status: "failure",
          message: "Product not found",
        }
      }
      const updatedProduct = await db.product.update({
        where: { id: productId },
        data: {
          price: body.price !== undefined ? body.price : existingProduct.price,
          description:
            body.description !== undefined
              ? body.description
              : existingProduct.description,
        },
      })

      console.log("Product updated successfully")
      return {
        status: "success",
        message: "Product updated successfully",
        data: updatedProduct,
      }
    } catch (error) {
      console.error("Error updating data:", error)
      throw error
    }
  },

  async favouriteProduct(body: any) {
    try {
      const { productId } = body
      const { userId } = body

      // Assuming you have a favorites model and a user context
      const favorite = await db.favorite.create({
        data: {
          userId,
          productId,
        },
      })

      return {
        status: "success",
        message: "Product added to favorites",
        data: favorite,
      }
    } catch (error) {
      console.error("Error adding favorite product:", error)
      throw error
    }
  },
  async GetfavouriteProduct(body: any) {
    try {
      const AllFavouriteProduct = await db.favorite.findMany({})
      return {
        status: "success",
        data: AllFavouriteProduct,
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      throw error
    }
  },
}
