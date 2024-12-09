const { response } = require("express");
const { User } = require("../../models/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Login = async (req, res = response) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Correo y contraseña son requeridos." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(500).json({ message: "Credenciales inválidas." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Credenciales inválidas." });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Login exitoso.", token, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error al iniciar sesión." });
  }
};
module.exports = { Login };
