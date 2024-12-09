const { response } = require("express");
const { Reservation } = require("../../models/ReservationSchema");

const AllReservations = async (req, res = response) => {
  try {
    const allReservations = await Reservation.find();
    if (allReservations.length <= 0) {
      return res
        .status(200)
        .json({ message: "No se encutran reservas en este momento" });
    }
    res.status(200).json(allReservations);
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ error, message: "No se encuentra ninguna sala reservada" });
  }
};

module.exports = { AllReservations };
