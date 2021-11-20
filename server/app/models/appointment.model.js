/**
 * Represents an appointment between a client and merchant
 * @param {*} sequelize 
 * @param {*} Sequelize 
 * @returns 
 */
module.exports = (sequelize, Sequelize) => {
  const Appointment = sequelize.define('appointment', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    start: {
      type: Sequelize.DATE,
    },
    end: {
      type: Sequelize.DATE,
    },
    covidCheck: {
      type: Sequelize.BOOLEAN,
    },
    healthCheck: {
      type: Sequelize.BOOLEAN,
    },
    booked: {
      type: Sequelize.BOOLEAN,
    }
  },
    {
      index: [{
        unique: true,
        fields: ['id'],
      }],
    });

  return Appointment;
};
