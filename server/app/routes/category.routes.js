const category = require("../controllers/category.controller");

module.exports = function (app) {
  // fetches all categories
  app.get("/api/categories", category.findAll);
};
