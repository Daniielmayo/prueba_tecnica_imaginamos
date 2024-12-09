const express = require("express");
const { DataBase } = require("./database/database");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 8081;
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
  "Access-Control-Allow-Origin": "*",
};

const app = express();

DataBase();
app.use(cors(corsOptions));
app.use(express.static("static"));
app.use(express.json());

app.use("/reservations", require("./routes/reservationRoute"));
app.use("/rooms", require("./routes/roomsRoute"));
app.use("/auth", require("./routes/userRoute"));

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
