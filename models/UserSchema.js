const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: { type: String },
  nameUser: { type: String },
  password: { type: String },
  rol: { type: String },
});

const User = mongoose.model("User", UserSchema);
module.exports = { User };
