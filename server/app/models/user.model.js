/**
 * Represents a Sequelize ORM mode of a user
 * 
 * a user can be a merchant or a general client
 * This is determined by the is_merchant boolean field
 * @param {*} sequelize 
 * @param {*} Sequelize 
 * @returns 
 */
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    city: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    province: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    postal_code: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    appt_number: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    is_merchant: {
      type: Sequelize.BOOLEAN,
    },
    bio: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    appointment_policy: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    profile_picture: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    phone_number: {
      type: Sequelize.STRING,
    },
    profile_viewers: {
      type: Sequelize.JSON
    }
  });

  return User;
};
