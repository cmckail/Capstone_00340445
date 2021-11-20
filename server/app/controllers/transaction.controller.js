const db = require('../models');
const { stripeKey } = require('../config/config')
const stripe = require('stripe')(stripeKey);
const Transaction = db.transactions;
const { Op } = db.Sequelize;
/**
 * Creates a transaction based on information provided from stripe session id
 * 
 * ONCE a transaction is created a appointment is also created
 * (This is done in one method due to time contraints and issues)
 *
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.create = async (req, res) => {
    //session id passed
    session_id = req.body.session_id
    // attempt to fetch the stripe check out session and validate if real
    const session = await stripe.checkout.sessions.retrieve(
        session_id
    ).catch((err) => {
        res.status(500).send({ message: "Error retrieving check out session. Please contact support" })
        return;
    });
    // if no session, then error on stripes side or invalid request
    if (!session) {
        res.status(500).send({ message: "Error retrieving checkout session. Please contact support" })
        return;
    }

    // fetch product related to request
    const sessionProduct = await stripe.checkout.sessions.listLineItems(
        session_id
    )
        .then((data) => data.data[0])
        .catch((err) => {
            res.status(500).send({ message: "Error retrieving check out session" })
            return;
        });

    // Incase called more then once, make sure transaction does not exist with corresponding stripe_session_id
    let foundTransaction = await Transaction.findOne({
        where: {
            stripe_session_id: { [Op.eq]: session_id }
        }
    }).then(data => data)

    // create since transaction does not exist
    if (!foundTransaction) {
        let foundProduct = await db.products.findOne(
            {
                where: {
                    stripe_product: { [Op.eq]: sessionProduct.price.product },
                    stripe_price: { [Op.eq]: sessionProduct.price.id }
                }
            }).then((data => data))
            .catch((err) => {
                res.status(500).send({ message: 'Error confirming transaction. Please contact Support' });
                return;
            })
        //if product not found then transaction is invalid
        if (!foundProduct) {
            res.status(500).send({ message: "No product found" });
            return;
        }
        // convert sequelize model to json to use values found
        foundProduct = foundProduct.toJSON();
        Transaction.create(
            {
                stripe_session_id: session_id,
                user_id: req.userId,
                product_id: foundProduct.id,
                amount: sessionProduct.amount_total
            }
        ).then((data) => {
            // ONCE transaction is created, we call on the appointments model to create a corresponding appointment
            db.appointments.create({
                transaction_id: data.toJSON().id,
                user_id: req.userId,
                merchant_id: foundProduct.merchant_id,
                covid_check: false,
                health_check: false,
            })
        }).then((data) => {
            res.send({ message: 'success' })
        })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message || 'Some error occurred while creating the Transaction.',
                });
                return;
            });
    } else {
        // if transaction already exists
        res.send({ message: "Transaction Already Approved" })
    }
}





