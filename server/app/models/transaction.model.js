/**
 * Represents a Sequelize ORM mode of a transaction
 *
 * a transaction is created after stripe checkout process is complete
 * @param {*} sequelize
 * @param {*} Sequelize
 * @returns
 */
module.exports = (sequelize, Sequelize) => {
  const Transaction = sequelize.define('transaction', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    stripe_session_id: {
      type: Sequelize.STRING,
    },
    amount: {
      type: Sequelize.DOUBLE,
    },
  },
    {
      index: [{
        unique: true,
        fields: ['id'],
      }],
    });

  return Transaction;
};
