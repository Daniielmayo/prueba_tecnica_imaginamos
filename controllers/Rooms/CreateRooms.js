const { response } = require("express");
const { Room } = require("../../models/RoomSchema");

const CreateRoom = async (req, res = response) => {
  try {
    const { name, maxCapacity, start, end } = req.body;

    const room = new Room({
      name,
      maxCapacity,
      schedule: {
        start: start,
        end: end,
      },
    });
    await room.save();
    res.status(200).json({ name, maxCapacity, start, end });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error });
  }
};

module.exports = { CreateRoom };
