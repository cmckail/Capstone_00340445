/**
 * Handles the Create and Update of a review
 * 
 * a review contains a DESCRIPTION and a RATING
 * 
 * It was noticed that app stores seems to keep ratings and reviews together
 *That being said they are stored together, and raw data is manipulated by
 * client to present results desired (EG: overally merchant average rating, or list of reviews with descriptions)
 *
 */
const db = require('../models');

const Review = db.reviews;
const { Op } = db.Sequelize;

/**
 * Handles the creation of a review
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.create = async (req, res) => {
    // validate there is no review already for appointment
    //NOTE this should never happen with updates being implemented
    const reviewExist = await db.reviews.findOne({
        where: {
            appointment_id: { [Op.eq]: req.body.appointment_id }
        }
    })

    if (reviewExist) {
        res.status(500).send({ message: 'Review Already Exists' })
        return
    }

    //Create Review
    const review = {
        appointment_id: req.body.appointment_id,
        user_id: req.userId,
        merchant_id: req.body.merchant_id,
        product_id: req.body.product_id,
        rating: req.body.rating,
        description: req.body.description
    }

    Review.create(review)
        .then((data) => {
            res.send(data);
            return
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    'Some error occurred while creating the Review.',
            });
        });
};

/**
 * Updates an existing Review
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.update = (req, res) => {
    const { id } = req.body
    // update review
    Review.update({ rating: req.body.rating, description: req.body.description }, { where: { id: id } })
        .then(() =>
            res.send({ message: "successfully Updated" })
        )
        .catch((err) => {
            res.status(500).json({ message: " Error occured while updating review" })
        }
        );

}
