import { FastifyPlugin } from "@/core/server/plugins"
import { productsAPIController } from "./productsAPIController"




export const productsAPIRouter: FastifyPlugin = (app, _opts, next) =>{
    app.post("/createProduct", productsAPIController.createProduct)
    app.get("/", productsAPIController.GetProducts)
    app.get("/:id",productsAPIController.GetProductById)
    app.get("/search",productsAPIController.GetProductBySearch)
    app.delete("/:id",productsAPIController.deletedProduct)
    app.put("/updateProduct",productsAPIController.updateProduct)
    app.post("/favouriteProduct",productsAPIController.favouriteProduct)
    app.get("/AllFavouriteProduct", productsAPIController.GetfavouriteProduct)
  
    next()
}