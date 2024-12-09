const { Router } = require("express");
const {
  CreateReservation,
} = require("../../controllers/Reservations/CreateReservation");
const {
  AllReservations,
} = require("../../controllers/Reservations/allReservations");
const {
  DeleteReservation,
} = require("../../controllers/Reservations/deleteReservation");

const router = Router();

router.get("/", AllReservations);
router.post("/", CreateReservation);
router.delete("/:id/:userId", DeleteReservation);

module.exports = router;
