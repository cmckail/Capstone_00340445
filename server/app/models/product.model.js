/**
 * Represents a product.
 * 
 * Currently products can only be a tattoo design
 * 
 * @param {*} sequelize 
 * @param {*} Sequelize 
 * @returns 
 */
module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define('product', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    image: {
      type: Sequelize.JSON,
    },
    description: {
      type: Sequelize.STRING,
    },
    suitable_text: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    width: {
      type: Sequelize.DOUBLE,
    },
    height: {
      type: Sequelize.DOUBLE,
    },
    rate: {
      type: Sequelize.DOUBLE,
    },
    unique: {
      type: Sequelize.BOOLEAN,
    },
    deposit: {
      type: Sequelize.DOUBLE,
    },
    min_hours: {
      type: Sequelize.INTEGER,
    },
    max_hours: {
      type: Sequelize.INTEGER,
    },
    stripe_product: {
      type: Sequelize.STRING,
    },
    stripe_price: {
      type: Sequelize.STRING,
    },
    available: {
      type: Sequelize.BOOLEAN,
    }
  }, {
    indexes: [{
      unique: true,
      fields: ['id'],
    }],
  });

  return Product;
};
