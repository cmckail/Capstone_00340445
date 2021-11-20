/**
 * Handles processing the login and signup of merchants/users
 * 
 * 
 */
const db = require("../models");
const config = require("../config/config");
const { user: User } = db;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

/**
 * Handles the signup of a user.
 * 
 * If a user reaches this method then
 * they passed the verify signup middleware
 * due to that this method only handles the creation
 * @param {*} req 
 * @param {*} res 
 */
exports.signup = (req, res) => {
  User.create({
    username: req.body.username.toLowerCase(),
    email: req.body.email.toLowerCase(),
    password: bcrypt.hashSync(req.body.password, 8),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    city: req.body.city.toLowerCase(),
    province: req.body.province.toUpperCase(),
    postal_code: req.body.postal_code.toUpperCase(),
    appt_number: req.body.appt || null,
    address: req.body.address,
    phone_number: req.body.phone_number,
    profile_picture: req.body.profile_picture ? req.body.profile_picture : null,
    is_merchant: req.body.role,
  })
    .then(() => {
      console.log('user Successfully made');
      res.send({ message: "User registered successfully!" })
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({ message: "Unexpected Error Occured on Signup" });
    });
};

/**
 * This method handles the login of a user
 * 
 * if a user is successful in logging in a
 * access token is passed back. This token is
 * stored client side and is used to make api 
 * calls on behalf of the user
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.signin = async (req, res) => {
  //find user
  const user = await User.findOne({
    where: {
      username: req.body.username
    }
  });
  if (!user) {
    return res.status(404).send({ message: "User does not exist" });
  }

  // compare the password passed with the password stored
  const validPass = await bcrypt.compare(req.body.password, user.password);
  //incorrect credentials
  if (!validPass) {
    return res.status(401).send({
      accessToken: null,
      message: "User and Password do no match"
    });
  }

  // sign the token with secret and pass a token containing the id of user
  const token = jwt.sign({ id: user.id }, config.secret, {
    expiresIn: config.jwtExpiration
  });

  // return basic user info and token to store in localstorage
  res.status(200).send({
    id: user.id,
    username: user.username,
    is_merchant: user.is_merchant,
    accessToken: token,
  });

};