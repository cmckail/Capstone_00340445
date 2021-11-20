/**
 * Methods related to verifying the token
 * 
 * future implementation will include middleware to refresh token
 */
const jwt = require("jsonwebtoken");
const config = require("../config/config.js");

/**
 * verifies the token is value
 * if the token cannot be decoded a error message is returned to user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const verifyToken = (req, res, next) => {
  // fetch token from request
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "Invalid Token" });
  }

  // call jwt verify method to decode/validate token
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Authentication is Expired or Invalid" });
    }
    // If token does exist store the userId
    // this will be used by other methods to validate user to update and etc
    req.userId = decoded.id;
    next();
  });
};

/**
 * TODO:
 * IsMerchant (validate if merchant)
 * RefreshToken (Attempt to refresh token if within exp time)
 */

const authJwt = {
  verifyToken: verifyToken,
};
module.exports = authJwt;
