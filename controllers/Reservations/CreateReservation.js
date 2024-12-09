const { response } = require("express");
const { Reservation } = require("../../models/ReservationSchema");
const { Room } = require("../../models/RoomSchema");

const CreateReservation = async (req, res = response) => {
  try {
    const { roomId, employeeName, startDateTime, endDateTime, userId } = req.body;
    console.log(startDateTime, endDateTime);

    const reservationStart = new Date(startDateTime + "Z");
    const reservationEnd = new Date(endDateTime + "Z");

    console.log(reservationStart);


    if (reservationStart >= reservationEnd) {
      return res.status(400).json({
        message: "La fecha de inicio debe ser anterior a la fecha de fin",
      });
    }


    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Sala no encontrada" });
    }

    const baseDate = reservationStart.toISOString().split("T")[0];
    const roomStart = new Date(`${baseDate}T${room.schedule.start}:00Z`);
    const roomEnd = new Date(`${baseDate}T${room.schedule.end}:00Z`);

    if (reservationStart < roomStart || reservationEnd > roomEnd) {
      console.log(reservationStart, roomStart);

      return res.status(400).json({
        message: `La reserva debe estar entre ${room.schedule.start} y ${room.schedule.end}`,
      });
    }

    const conflicts = await Reservation.find({
      roomId,
      $and: [
        {
          $expr: {
            $eq: [
              { $dateToString: { format: "%Y-%m-%d", date: "$startDateTime" } },
              baseDate,
            ],
          },
        },
        {
          $or: [
            { startDateTime: { $lt: reservationEnd, $gte: reservationStart } },
            { endDateTime: { $gt: reservationStart, $lte: reservationEnd } },
            {
              startDateTime: { $lte: reservationStart },
              endDateTime: { $gte: reservationEnd },
            },
          ],
        },
      ],
    });

    if (conflicts.length > 0) {
      return res.status(400).json({
        message: "Conflicto de horarios para esta sala en la fecha seleccionada",
      });
    }

    const reservation = new Reservation({
      roomId,
      employeeName,
      startDateTime: reservationStart.toISOString(),
      endDateTime: reservationEnd.toISOString(),
      userId,
    });

    await reservation.save();

    res.status(200).json(reservation);
  } catch (error) {
    console.error("Error al crear la reserva:", error);
    res.status(400).json({
      error,
      message: "La reservación no se ha creado correctamente",
    });
  }
};

module.exports = { CreateReservation };
