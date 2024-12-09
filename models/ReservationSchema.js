const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReservationSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  employeeName: { type: String },
  startDateTime: { type: String },
  endDateTime: { type: String },
});
ReservationSchema.index({ roomId: 1, startDateTime: 1, endDateTime: 1 });
const Reservation = mongoose.model("Reservation", ReservationSchema);
module.exports = { Reservation };
