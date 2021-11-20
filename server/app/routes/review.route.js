const { authJwt } = require("../middleware");
const reviews = require("../controllers/review.controller");

module.exports = function (app) {
    // create review
    app.post("/api/reviews/",
        [authJwt.verifyToken],
        reviews.create);
    // update review
    app.put("/api/reviews/",
        [authJwt.verifyToken],
        reviews.update);
};
