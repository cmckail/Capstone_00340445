const { authJwt } = require("../middleware");
const transactions = require("../controllers/transaction.controller");

module.exports = function (app) {

    //Following Stripe Best Practices route should be check_transaction
    app.post("/api/transactions/check_transaction",
        [authJwt.verifyToken],
        transactions.create);
};
