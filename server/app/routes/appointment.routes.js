const { authJwt } = require("../middleware");
const appointment = require("../controllers/appointment.controller");
const user = require("../controllers/user.controller");


module.exports = function (app) {
    // fetches appointments for a specific client
    app.get("/api/appointments/user",
        [authJwt.verifyToken], user.getUserAppointments);
    // fetches appointments for a specific merchant
    app.get("/api/appointments/merchant",
        [authJwt.verifyToken], user.getMerchantAppointments);
    // books or cancels an appointment
    app.post("/api/appointments/book",
        [authJwt.verifyToken], appointment.update);

};
