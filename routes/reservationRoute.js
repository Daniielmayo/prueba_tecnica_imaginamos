const { Router } = require("express");
const ReservationsRoutes = require("./reservation/reservationRoutes.js");
const AllReservations = require("./reservation/reservationRoutes.js");

const router = Router();

router.use(ReservationsRoutes);
router.use(AllReservations);

module.exports = router;
