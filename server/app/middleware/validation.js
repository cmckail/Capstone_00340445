/**
 * Contains middleware related to validation.
 * 
 * Currently due to time contraints it only contains a method to 
 * validate if username and email are unique.
 * 
 * 
 * FUTURE:
 * WIth more time I would like to eventually validate all fields here
 * instead of relying on client side and have more methods for other 
 * data validation
 */
const db = require("../models");
const User = db.user;

const validateSignup = (req, res, next) => {
  username = req.body.username || "";
  // confirm its within valid length (client side also handles this)
  if (username.length < 3 || username.length > 20) {
    res.status(400).send({
      message: "Username must be between 3 and 20 characters!"
    });
    return
  }
  // check if user exists
  User.findOne({
    where: {
      username: username.toLowerCase()
    }
  }).then(user => {
    if (user) {
      res.status(400).send({ message: "Username is already in use!" }
      );
      return;
    }

    let email = req.body.email || "";
    if (!email) {
      res.status(400).json({
        message: "Email not present"
      });
      return
    }
    // validate email is unique
    User.findOne({
      where: {
        email: email.toLowerCase()
      }
    }).then(user => {
      if (user) {
        res.status(400).json({
          message: "Email is already in use!"
        });
        return;
      }
      // pass to signup
      next();
    });
  });
};

const validation = {
  validateSignup: validateSignup
}

module.exports = validation;
