const mongoose = require("mongoose");
const { Schema } = mongoose;

const RoomSchema = new Schema({
  name: { type: String },
  maxCapacity: { type: Number },
  schedule: {
    start: { type: String },
    end: { type: String },
  },
});

const Room = mongoose.model("Room", RoomSchema);
module.exports = { Room };
