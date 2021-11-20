/**
 * Represents a Sequelize ORM mode of a review
 *
 * a review is created by a user.
 * a review can only be created once a review is submitted.
 * @param {*} sequelize
 * @param {*} Sequelize
 * @returns
 */
module.exports = (sequelize, Sequelize) => {
  const Review = sequelize.define('review', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    appointment_id: {
      type: Sequelize.INTEGER,
    },
    user_id: {
      type: Sequelize.INTEGER,
    },
    merchant_id: {
      type: Sequelize.INTEGER,
    },
    product_id: {
      type: Sequelize.INTEGER,
    },
    rating: Sequelize.DOUBLE,
    description: Sequelize.STRING,
  }, {
    index: [{
      unique: true,
      fields: ['id'],
    }],
  });

  return Review;
};
