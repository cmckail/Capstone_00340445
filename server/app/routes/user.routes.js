const { authJwt } = require("../middleware");
const user = require("../controllers/user.controller");

module.exports = function (app) {
  //find user by username
  app.get("/api/user/:username",
    [authJwt.verifyToken],
    user.findByUsername
  )
  //update user
  app.put("/api/user",
    [authJwt.verifyToken],
    user.update
  )

  // not implemented
  // app.get("/api/locations", user.getMerchantLocations)

};
