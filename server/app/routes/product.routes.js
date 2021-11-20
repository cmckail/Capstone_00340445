const products = require("../controllers/product.controller");
const { authJwt } = require("../middleware");

module.exports = function (app) {
    //Note no Auth Token middleware on routes that require speed over security
    // (example: No harm can be done if they see a product name and image)

    //get all products
    app.get("/api/products", products.findAll);
    //get a product by id
    app.get("/api/products/:id", [authJwt.verifyToken], products.findOne);
    // create a new product
    app.post("/api/products/", [authJwt.verifyToken], products.create);
    // search all products
    app.get("/api/search/products/", products.search);
    // update a product
    app.put("/api/products/", [authJwt.verifyToken], products.update);
    // soft delete a project 
    app.delete("/api/products/:id", [authJwt.verifyToken], products.delete);

    // handles the creation of a stripe checkout based on the product
    app.post("/api/create-checkout-session", [authJwt.verifyToken], products.createCheckout);




};
