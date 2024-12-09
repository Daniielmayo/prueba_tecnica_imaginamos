const { response } = require("express");
const { Reservation } = require("../../models/ReservationSchema");
const { Room } = require("../../models/RoomSchema");

const AllRooms = async (req, res = response) => {
  try {
  
    const rooms = await Room.find();

    if (rooms.length === 0) {
      return res.status(200).json([]); 
    }

    
    const reservations = await Reservation.find();

   
    const reservationsByRoom = reservations.reduce((acc, reservation) => {
      const { roomId, startDateTime } = reservation;
      const reservationDate = new Date(startDateTime).toISOString().split("T")[0];

      if (!acc[roomId]) acc[roomId] = {};

      if (!acc[roomId][reservationDate]) {
        acc[roomId][reservationDate] = [];
      }

      acc[roomId][reservationDate].push(reservation);
      return acc;
    }, {});
  
    const roomsWithReservations = rooms.map((room) => ({
      roomId: room._id,
      name: room.name,
      maxCapacity: room.maxCapacity,
      schedule: room.schedule,
      reservations: reservationsByRoom[room._id] || [],
    }));

    res.status(200).json(roomsWithReservations);
  } catch (error) {
    console.error("Error al obtener salas y reservas:", error);
    res.status(500).json({ message: "Error al obtener las salas y sus reservas." });
  }
};

module.exports = { AllRooms };
