/**
 * Note not implemented as outside of scope
 * wanted to keep code for future use.
 * @param {*} sequelize 
 * @param {*} Sequelize 
 * @returns 
 */
module.exports = (sequelize, Sequelize) => {
  const Favourite = sequelize.define('favourite', {
    client_id: {
      type: Sequelize.INTEGER,
    },
    merchant_id: {
      type: Sequelize.INTEGER,
    },
  },
    {
      index: [{
        unique: true,
        fields: ['id'],
      }],
    });

  return Favourite;
};
