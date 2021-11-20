/**
 * Handles the Categories primarily used in the select inputs
 * 
 * Please Note User cannot manipulate this in current scope. (only view)
 */
const db = require('../models');
const Category = db.category;

/**
 * Retrieves all categories
 * @param {*} req 
 * @param {*} res 
 */
exports.findAll = (req, res) => {
  Category.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          'Some error occurred while retrieving categories.',
      });
    });
};


/**
 * NOT IMPLEMENTED.
 *
 * CURRENTLY Categories are made with the initialize method in server.js.
 * This method only runs once on first startup
 * @param {*} req
 * @param {*} res
 * @returns
 */
// exports.create = (req, res) => {

//   const category = {
//     name: req.body.name,
//   };

//   // Save Category in the database
//   Category.create(category)
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           'Some error occurred while creating the Category.',
//       });
//     });
// };



