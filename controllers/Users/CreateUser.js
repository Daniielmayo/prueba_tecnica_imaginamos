const { response } = require("express");
const { User } = require("../../models/UserSchema");
const bcrypt = require("bcrypt");

const CreateUser = async (req, res = response) => {
  try {
    const { name, password, email } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "El correo ya está registrado. Por favor, usa otro.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      rol: "Admin",
    });

    await user.save();
    res.status(200).json({ message: "Usuario creado correctamente" });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: "No se ha creado el usuario correctamente" });
  }
};

module.exports = { CreateUser };
