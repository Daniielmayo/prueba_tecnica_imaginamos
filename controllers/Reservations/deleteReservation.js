const { Reservation } = require("../../models/ReservationSchema");

const DeleteReservation = async (req, res) => {
  //todo validar si el id del usuario tiene una reserva en este momento y si el id de la reserva existe en este momento
  const { id, userId } = req.params;
  try {
    const reservation = await Reservation.findByIdAndDelete(id);

    if (reservation.userId != userId) {
      res.status(400).json({
        error:
          "Acceso denegado. Solo el usuario que creó la reserva puede cancelarla.",
      });
    }

    if (!reservation) {
      res
        .status(400)
        .json({ error: "Reserva no encontrada para ser cancelada" });
    }

    res
      .status(200)
      .json({ message: "La reserva ha sido cancelada exitosamente." });
  } catch (error) {
    res.status(500).json({
      error,
      message: "Ocurrió un error al intentar cancelar la reserva.",
    });
  }
};

module.exports = { DeleteReservation };
