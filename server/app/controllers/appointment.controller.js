/**
 * Represents actions related to appointment
 * 
 * PLEASE NOTE: the creation of appointment happens within the transaction create method.
 * 
 * This was done while trying to get it to work. DUE to time constraints I did not have time
 * to split the calls by either linking calls via next(), or calling the appointment controller 
 */
const db = require('../models');
const Appointment = db.appointments;

/**
 * Updates the booked status of an appointment
 * 
 * the client sends either true(booked) or false(not booked) based 
 * on the current value of appointment
 * 
 * in the future I would like to move this decision to server side.
 * @param {*} req 
 * @param {*} res 
 */
exports.update = (req, res) => {
    console.log(req.body)
    const booked = req.body.booked;
    Appointment.update({ booked }, {
        where: { id: req.body.id },
    })
        .then(() => {
            res.send({
                message: 'Appointment was updated successfully.',
            });
        })
        .catch((err) => {
            res.status(500).send({
                message: `Error updating Appointment with id=${id}`,
            });
        });
};



