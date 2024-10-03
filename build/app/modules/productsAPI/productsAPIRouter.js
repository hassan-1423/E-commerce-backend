"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsAPIRouter = void 0;
const productsAPIController_1 = require("./productsAPIController");
const productsAPIRouter = (app, _opts, next) => {
    app.post("/createProduct", productsAPIController_1.productsAPIController.createProduct);
    app.get("/", productsAPIController_1.productsAPIController.GetProducts);
    app.get("/:id", productsAPIController_1.productsAPIController.GetProductById);
    app.get("/search", productsAPIController_1.productsAPIController.GetProductBySearch);
    app.delete("/:id", productsAPIController_1.productsAPIController.deletedProduct);
    app.put("/updateProduct", productsAPIController_1.productsAPIController.updateProduct);
    app.post("/favouriteProduct", productsAPIController_1.productsAPIController.favouriteProduct);
    app.get("/AllFavouriteProduct", productsAPIController_1.productsAPIController.GetfavouriteProduct);
    next();
};
exports.productsAPIRouter = productsAPIRouter;
