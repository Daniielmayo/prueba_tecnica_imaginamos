const mongoose = require("mongoose");

const DataBase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.info("Conectado correctamente a la base de datos");
  } catch (error) {
    console.error(
      error,
      "No se pudo conectar correctamente con la base de datos"
    );
  }
};

module.exports = { DataBase };
