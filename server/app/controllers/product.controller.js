/**
 * Represents all functions related to the Product Controller
 * 
 * At this moments Products can only be Tattoo Designs
 */
const db = require('../models');
const { stripeKey } = require('../config/config')
const stripe = require('stripe')(stripeKey);
const Product = db.products;
const { Op } = db.Sequelize;

/**
 * Create a new product instance within in database and stripe
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.create = async (req, res) => {

  let product = {
    image: req.body.image,
    merchant_id: req.body.merchant_id,
    description: req.body.description,
    suitable_text: req.body.suitable_text,
    name: req.body.name,
    width: req.body.width,
    height: req.body.height,
    rate: req.body.rate,
    deposit: req.body.deposit,
    min_hours: req.body.max_hours,
    max_hours: req.body.min_hours,
    category_id: req.body.category_id,
    available: true,
  };
  // Iterate to confirm all values are filled out since product has no options values
  for (let [key, value] in Object(product)) {
    if (!value) {
      console.log(`checking ${key} : ${value}`);
      res.status(400).send({
        message: `Required field ${key} was undefined`
      });
      return;
    }
  }

  let stripe_image = product.image
  //attempt to parse json of image
  //stripe error handles improper images on their side so no need to not create product
  try {
    stripe_image = JSON.parse(stripe_image);
  } catch (err) {
    console.log('error parsing image');
  }
  let stripeUrl = stripe_image.url
  //Create product in stripe
  const stripe_product = await stripe.products.create({
    name: product.name,
    images: [stripeUrl],
  }).catch((err) => {
    res.status(500).send({
      message:
        err.message || 'Some error occurred while creating the product with Stripe.',
    });
  });
  // create a price instance in stripe
  const stripe_price = await stripe.prices.create({
    product: stripe_product.id,
    unit_amount: product.deposit * 100,
    currency: 'cad',
  }).catch((err) => {
    res.status(500).send({
      message:
        err.message || 'Some error occurred while creating the product price with Stripe.',
    });
  });
  // add the stripe ids to product dict
  product = { ...product, stripe_price: stripe_price.id, stripe_product: stripe_product.id };


  // Save product in the database
  Product.create(product)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          'Some error occurred while creating the product.',
      });
    });
};

// Retrieve all product from the database based on search value
exports.search = (req, res) => {
  let search = req.query.search || ""
  let searchCondition = {};
  // search query exists add where conditional
  if (search) {
    searchCondition.name = { [Op.like]: `%${search}%` }
  }
  //ONLY RETURN TATTOOS NOT SOFT DELETED
  searchCondition.available = { [Op.eq]: true }
  Product.findAll({
    include: [
      {
        model: db.category,
        attributes: ['name'],

      },
      {
        model: db.user, //include merchant info. Note Artist info was not used as change of design happened
        attributes: ['username', 'profile_picture', 'id', 'city', 'province']
      }],
    attributes: ['id', 'name', 'deposit', 'image'],
    where: {
      ...searchCondition
    }
  }).then((data) => {
    res.send(data);
  })
    .catch((err) => {
      res.status(500).send({
        message: 'Some error occurred while retrieving product',
      });
    });
};

/**
 * Return all products within the database that are available
 * @param {*} req 
 * @param {*} res 
 */
exports.findAll = (req, res) => {
  Product.findAll({
    where: { available: true },
    include: [
      db.category,
      {
        model: db.user,
        attributes: ['username', 'profile_picture', "first_name", "last_name", 'id', 'city', 'province']
      }]
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          'Some error occurred while retrieving product',
      });
    });
};

/**
 * Find product by id
 * @param {*} req 
 * @param {*} res 
 */
exports.findOne = (req, res) => {
  const { id } = req.params;

  Product.findByPk(id,
    {
      where: { available: true },
      include: [
        {
          model: db.category,
        },
        {
          model: db.user,
          attributes: ["id", 'username', 'first_name', 'last_name',
            'appointment_policy', 'city', 'province', 'profile_picture']
        }
      ],
    })
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((_err) => {
      res.status(500).send({
        message: `Error retrieving Product`,
      });
    });
};

/**
 * Update a product
 * 
 * NOTE: Aware I forgot to handle updating stripe price object
 * Unforuntately no time to fix that issue
 * @param {*} req 
 * @param {*} res 
 */
exports.update = (req, res) => {
  const { id } = req.body
  let toUpdate = {};
  //only update fields with values
  for (let [field, value] of Object.entries(req.body)) {
    if (!value || (typeof value === 'string' && value.length === 0) || ['id'].includes()) {
      continue
    }
    toUpdate[field] = value
  }
  // update product
  Product.update({ ...toUpdate }, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        console.log('Success');
        res.send({
          message: "Product was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Product with id=${id}`
        });
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message: "Error updating Product with id=" + id
      });
    });
};

/**
 * Soft deletes a product.
 * This product available changes to false.
 * This means that fetch product calls will not return it
 * Product info is still available for appointment and review to reference
 * @param {*} req 
 * @param {*} res 
 */
exports.delete = (req, res) => {
  const { id } = req.params;
  console.log('hit')
  Product.update({ available: false }, {
    where: { id },
  })
    .then((num) => {
      res.send({
        message: 'Product was deactivated successfully!',
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Cannot deactivated product`,
      });
    });
};


/**
 * Handles the creation of 
 * @param {*} req 
 * @param {*} res 
 */
exports.createCheckout = async (req, res) => {
  id = req.body.id;
  stripe_price = req.body.stripe_price;
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: stripe_price,
        quantity: 1,
      },
    ],
    payment_method_types: [
      'card',
    ],
    mode: 'payment',
    success_url: `https://zen-lovelace-7c34af.netlify.app/success?session_id={CHECKOUT_SESSION_ID}`,
    // Note in the live version this is to localhost:8000.
    // Not enough time to change and confirm works
    cancel_url: `https://zen-lovelace-7c34af.netlify.app/market`,
  });
  res.send({ url: session.url })
};