const { response } = require("express");
const { Reservation } = require("../../models/ReservationSchema");
const { Room } = require("../../models/RoomSchema");

const CreateReservation = async (req, res = response) => {
  try {
    const { roomId, employeeName, startDateTime, endDateTime, userId } = req.body;

    const reservationStart = new Date(startDateTime);
    const reservationEnd = new Date(endDateTime);

    if (reservationStart >= reservationEnd) {
      return res.status(400).json({
        error: "La fecha de inicio debe ser anterior a la fecha de fin",
      });
    }

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: "Sala no encontrada" });
    }

    const baseDate = reservationStart.toISOString().split("T")[0];
    const roomStart = new Date(`${baseDate}T${room.schedule.start}:00Z`);
    const roomEnd = new Date(`${baseDate}T${room.schedule.end}:00Z`);

    if (reservationStart < roomStart || reservationEnd > roomEnd) {
      return res.status(400).json({
        message: `La reserva debe estar entre ${room.schedule.start} y ${room.schedule.end}`,
      });
    }

    const conflicts = await Reservation.find({
      roomId,
      $or: [
        { startDateTime: { $lt: reservationEnd, $gte: reservationStart } },
        { endDateTime: { $gt: reservationStart, $lte: reservationEnd } },
        {
          startDateTime: { $lte: reservationStart },
          endDateTime: { $gte: reservationEnd },
        },
      ],
    });

    if (conflicts.length > 0) {
      return res.status(400).json({ message: "Conflicto de horarios para esta sala" });
    }

    const reservation = new Reservation({
      roomId,
      employeeName,
      startDateTime: reservationStart.toISOString(),
      endDateTime: reservationEnd.toISOString(),
      userId,
    });
    console.log("epa", reservation)
    await reservation.save();
    res.status(200).json(reservation);
  } catch (error) {
    console.error({ error });
    res.status(400).json({ error, message: "La reservación no se ha creado correctamente" });
  }
};

module.exports = { CreateReservation };
