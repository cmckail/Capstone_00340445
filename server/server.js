const express = require("express");
const cors = require("cors");
const app = express();
// never ended up serving document due to host constraints
app.use(express.static('public'));
// General Express Middlewate
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Category = db.category;
// sync ORM with database
db.sequelize.sync();
// Test Route
app.get('/', (req, res) => {
  res.send('Welcome to the backend')
})
// Initialzie routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/category.routes')(app);
require('./app/routes/product.routes')(app);
require('./app/routes/transaction.routes')(app);
require('./app/routes/appointment.routes')(app);
require('./app/routes/review.route')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

/**
 * This method is called manually when database was to be dropped and reconfigured
 * 
 * Creates all basic Categories for tattoos
 */
function initial() {

  const tattooCategories = ["American Traditional", "Japanese", "Neo-Traditional", "BlackWork", "New School", "Realism", "Portrait"]

  tattooCategories.forEach((t, i) => {
    Category.create({
      name: t
    });
  })
}