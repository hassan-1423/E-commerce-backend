"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsAPIService = void 0;
const database_1 = require("@/core/database");
exports.productsAPIService = {
    async createProduct(body) {
        try {
            const product = await database_1.db.product.create({
                data: {
                    title: body.title,
                    description: body.description,
                    category: body.category,
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
                        connectOrCreate: body.tags?.map((tag) => ({
                            where: { name: tag },
                            create: { name: tag },
                        })) ?? [],
                    },
                    reviews: {
                        createMany: {
                            data: body.reviews?.map((review) => ({
                                rating: review.rating,
                                comment: review.comment,
                                date: review.date,
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
        }
        catch (error) {
            console.error("Error creating product record:", error);
            throw error;
        }
    },
    async GetProducts(body) {
        try {
            const allData = await database_1.db.product.findMany({
                take: 30,
            });
            const favoriteProductIds = await database_1.db.favorite.findMany({
                where: {
                    productId: {
                        in: allData.map((product) => product.id),
                    },
                },
                select: {
                    productId: true,
                },
            });
            const favoriteProductIdSet = new Set(favoriteProductIds.map((fav) => fav.productId));
            const productsWithFavoriteStatus = allData.map((product) => ({
                ...product,
                Favorite: favoriteProductIdSet.has(product.id),
            }));
            return {
                status: "success",
                data: productsWithFavoriteStatus,
            };
        }
        catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    },
    async GetProductById(body) {
        try {
            const product = await database_1.db.product.findUnique({
                where: {
                    id: Number(body.id),
                },
            });
            if (!product) {
                return {
                    status: "error",
                    message: "Product not found",
                };
            }
            return {
                status: "success",
                data: product,
            };
        }
        catch (error) {
            console.error("Error fetching product by id:", error);
            throw error;
        }
    },
    async GetProductBySearch(body) {
        try {
            const products = await database_1.db.product.findMany({
                where: {
                    OR: [
                        {
                            title: {
                                contains: body.q,
                                mode: "insensitive",
                            },
                        },
                        {
                            description: {
                                contains: body.q,
                                mode: "insensitive",
                            },
                        },
                        {
                            category: {
                                contains: body.q,
                                mode: "insensitive",
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
        }
        catch (error) {
            console.error("Error fetching products by search:", error);
            throw error;
        }
    },
    async deleteProduct(body) {
        try {
            const deletedProduct = await database_1.db.product.delete({
                where: {
                    id: Number(body.id),
                },
            });
            console.log(deletedProduct);
            if (deletedProduct) {
                console.log("Product deleted successfully");
                return {
                    status: "success",
                    message: "Product deleted successfully",
                };
            }
            else {
                console.log("Product not found");
                return {
                    status: "failure",
                    message: "Product not found",
                };
            }
        }
        catch (error) {
            console.error("Error deleting data:", error);
            throw error;
        }
    },
    async updateProduct(body) {
        try {
            const productId = Number(body.id);
            if (isNaN(productId)) {
                return {
                    status: "failure",
                    message: "Invalid product ID",
                };
            }
            const existingProduct = await database_1.db.product.findUnique({
                where: { id: productId },
            });
            if (!existingProduct) {
                console.log("Product not found");
                return {
                    status: "failure",
                    message: "Product not found",
                };
            }
            const updatedProduct = await database_1.db.product.update({
                where: { id: productId },
                data: {
                    price: body.price !== undefined ? body.price : existingProduct.price,
                    description: body.description !== undefined
                        ? body.description
                        : existingProduct.description,
                },
            });
            console.log("Product updated successfully");
            return {
                status: "success",
                message: "Product updated successfully",
                data: updatedProduct,
            };
        }
        catch (error) {
            console.error("Error updating data:", error);
            throw error;
        }
    },
    async favouriteProduct(body) {
        try {
            const { productId } = body;
            const { userId } = body;
            const favorite = await database_1.db.favorite.create({
                data: {
                    userId,
                    productId,
                },
            });
            return {
                status: "success",
                message: "Product added to favorites",
                data: favorite,
            };
        }
        catch (error) {
            console.error("Error adding favorite product:", error);
            throw error;
        }
    },
    async GetfavouriteProduct(body) {
        try {
            const AllFavouriteProduct = await database_1.db.favorite.findMany({});
            return {
                status: "success",
                data: AllFavouriteProduct,
            };
        }
        catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    },
};
