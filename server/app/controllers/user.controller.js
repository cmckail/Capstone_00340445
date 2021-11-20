/**
 * All Functions related to a user
 * 
 * User overlaps with majority of the other model. 
 * Due to that it contains some methods primarily focused on its related models (appointment, etc)
 */
const db = require("../models");
const { user: User } = db;
const Op = db.Sequelize.Op;



/**
 * This method Finds a user based on the username.
 * 
 * user is validated as merchant or not.
 * if the user being fetched is a merchant or the user is the user being fetched
 * @param {*} req 
 * @param {*} res 
 */
exports.findByUsername = async (req, res) => {

  // initial attributes
  let attributes = ['username',
    'first_name', 'last_name', 'city', 'province', 'profile_picture',
  ]
  // light fetch of user
  let user = await User.findOne({
    where: { username: req.params.username },
    attributes: ["id", "is_merchant", "username"]
  });
  //If user being fetched is the fetchee or a merchant  is being fetch provide more sensitive info 
  if (user && (user.id == req.userId || user.is_merchant)) {
    attributes = ['username',
      'email', 'first_name', 'last_name', 'city', 'province', 'postal_code',
      'appt_number', 'address', 'profile_picture', 'phone_number', 'createdAt',
      'bio', 'appointment_policy', 'is_merchant'
    ]
  }
  //
  let user = await User.findOne({
    where: {
      username: { [Op.eq]: req.params.username }
    },
    attributes: attributes,
    include: [ // Sequelize ORM Relations (defined in models/index.js) allow for table joins via include field
      db.products,
      {
        model: db.reviews,
        as: 'reviews',
        include: [
          {
            model: db.products,
            attributes: ["image", "name"],
          },
          {
            model: db.user,
            attributes: ["username", "profile_picture", "city", "province"]
          }
        ]
      }]
  })
    .then(data => data)
  if (user === null) { // null returned if no user found
    res.status(404).send({ message: "User does not exist" });
  }
  else {
    res.send(foundUser);
  }

}

/**
 * This method is used to update a user
 * 
 * To validate that a user can only update their own account,
 * the userId provided by access token used to allow only users to update themselves
 * @param {*} req 
 * @param {*} res 
 */
exports.update = (req, res) => {
  const id = req.userId
  let toUpdate = {};
  // to create partial update, sort through values that are populated
  for (let [field, value] of Object.entries(req.body)) {
    if (!value || (typeof value === 'string' && value.length === 0)) {
      continue
    }
    toUpdate[field] = value
  }
  // update user 
  User.update({ ...toUpdate }, {
    where: { id: id }
  })
    .then(() => {
      res.send({
        message: "user was updated successfully."
      });
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message: "Error updating"
      });
    });
};

/**
 * Fetches all appointments for a specific client
 * 
 * inside user controller due to root model used being user
 * the userId provided by access token used to allow only users to fetch their own appointments
 * @param {*} req 
 * @param {*} res 
 */
exports.getUserAppointments = async (req, res) => {
  const user = await db.user.findByPk(req.userId)
  // get user and 
  let appointment = await user.getUser({
    include: [
      { model: db.reviews, as: 'appointmentReview' },
      {
        model: db.transactions, // transaction linked to appointment
        include: [
          {
            model: db.products, // product related to transaction

            include: [
              { model: db.user, exclude: ['password'] }, //fetches all the info on the merchant of said product
            ]
          }]
      }
    ]
  }).catch((err) => res.status(500).send({ message: 'error fetching appointments' }));

  // send any results found
  res.send(appointment);

};

/**
 * Fetches all appointments from a merchant perspective
 * 
 * inside user controller due to root model used being user
 * @param {*} req 
 * @param {*} res 
 */
exports.getMerchantAppointments = async (req, res) => {
  const user = await db.user.findByPk(req.userId)
  let data = await user.getMerchant({
    include: [
      {
        model: db.transactions, //transaction of appointment
        include: [
          {
            model: db.user, //the client of said transaction/appointment
            attributes: ["first_name", "last_name", "phone_number", "email", "city", "province", "username"]
          }
          ,
          {
            model: db.products, // product related to transaction
          },
        ]
      }
    ]
  }).catch((err) => {
    res.status(500).send({
      message:
        err.message || 'Some error occurred while retrieving appointments.',
    });
  });
  res.send(data);



};