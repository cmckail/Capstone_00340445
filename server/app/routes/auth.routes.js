const { validation } = require("../middleware");
const auth = require("../controllers/auth.controller");

module.exports = function (app) {
  // handles the sing up of a new user
  app.post(
    "/api/auth/signup",
    [validation.validateSignup],
    auth.signup
  );
  // handles the signin of a user
  app.post("/api/auth/signin", auth.signin);
};
