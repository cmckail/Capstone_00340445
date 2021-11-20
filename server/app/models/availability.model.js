/**
 * Represents the availability of a Merchant
 * NOT IMPLEMENTED
 * @param {*} sequelize 
 * @param {*} Sequelize 
 * @returns 
 */
module.exports = (sequelize, Sequelize) => {
  const Availability = sequelize.define('availability', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    merchant_id: {
      type: Sequelize.INTEGER,
    },
    weekday: {
      type: Sequelize.INTEGER,
    },
    hour: {
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    valid: {
      type: Sequelize.BOOLEAN,
    },
    expire: {
      type: Sequelize.DATE,
    },
  },
    {
      index: [{
        unique: true,
        fields: ['id'],
      }],
    });

  return Availability;
};
