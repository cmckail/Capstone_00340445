/**
 * This file handles the creation of the ORM and connects to the mySQL database (hosted on digital ocean)
 * 
 * THis file also handles the creation of all relationships
 * NOTE: relationships were learned mid development so you may find random identifiers still in the specific models
 * (did not want to remove and have something break)
 */
const config = require("../config/config.js");
const fs = require('fs');
// Read in the DB Cert
const ca = fs.readFileSync('ca-certificate.crt');
const Sequelize = require("sequelize");
// initialize the sequelize mdoel
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    port: 25060,
    dialectOptions: {
      ssl: {
        rejectedUnauthorized: true,
        ca: [ca],
      },
    },
    operatorsAliases: 0
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.category = require("./category.model.js")(sequelize, Sequelize);
db.products = require('./product.model.js')(sequelize, Sequelize);
db.transactions = require("./transaction.model.js")(sequelize, Sequelize);
db.appointments = require("./appointment.model.js")(sequelize, Sequelize);
db.reviews = require("./review.model.js")(sequelize, Sequelize);
db.favourites = require("./favourite.model.js")(sequelize, Sequelize);

/**
 * Below are all the relationships between models
 * 
 * Depending on the relationship a model can now be called for a join
 * by being mention in the include field of a query or by the "model.get()" function
 */
//One user to many products
db.user.hasMany(db.products,
  { foreignKey: 'merchant_id' });
db.products.belongsTo(db.user,
  { foreignKey: 'merchant_id' });

//One user to many transactions
db.user.hasMany(db.transactions,
  { foreignKey: 'user_id' }
);
db.transactions.belongsTo(db.user,
  { foreignKey: 'user_id' }
);
//one product to many transactions
db.products.hasMany(db.transactions,
  { foreignKey: 'product_id' }
);
db.transactions.belongsTo(db.products,
  { foreignKey: 'product_id' });

//One Category to Many Products
db.category.hasMany(db.products,
  { foreignKey: 'category_id' });
db.products.belongsTo(db.category,
  { foreignKey: 'category_id' });

// One transations belongs to one appointment
db.transactions.hasOne(db.appointments,
  { foreignKey: 'transaction_id' });
db.appointments.belongsTo(db.transactions,
  { foreignKey: 'transaction_id' });

//  many appointments to one user
db.user.hasMany(db.appointments,
  { foreignKey: 'user_id', as: 'user' });
db.appointments.belongsTo(db.user,
  { foreignKey: 'user_id' });
// many appointments to one merchant
db.user.hasMany(db.appointments,
  { foreignKey: 'merchant_id', as: 'merchant' });
db.appointments.belongsTo(db.user,
  { foreignKey: 'merchant_id' });
// one appointment to one review
db.appointments.hasOne(db.reviews,
  { foreignKey: 'appointment_id', as: 'appointmentReview' });
db.reviews.belongsTo(db.appointments,
  { foreignKey: 'appointment_id' })
// many reviews to one merchant
db.user.hasMany(db.reviews,
  { foreignKey: 'merchant_id', as: 'reviews' });
db.reviews.belongsTo(db.user,
  { foreignKey: 'merchant_id' });
// many reviews to one client
db.user.hasMany(db.reviews,
  { foreignKey: 'user_id', as: 'reviewed' });
db.reviews.belongsTo(db.user,
  { foreignKey: 'user_id' });
// many reviews to one product
db.products.hasMany(db.reviews,
  { foreignKey: 'product_id', as: 'reviews' });
db.reviews.belongsTo(db.products,
  { foreignKey: 'product_id' });


// NOT IMPLEMENTED but present
db.user.hasMany(db.favourites,
  { foreignKey: 'merchant_id', as: 'favourited' });
db.favourites.belongsTo(db.user,
  { foreignKey: 'merchant_id' });

db.user.hasMany(db.favourites,
  { foreignKey: 'user_id', as: 'favourites' });
db.favourites.belongsTo(db.user,
  { foreignKey: 'merchant_id' });


module.exports = db;
