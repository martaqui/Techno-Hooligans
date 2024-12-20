// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const signupUser = (req, res) => {
  const { email, password, username, role = "user" } = req.body; // El rol por defecto es 'user'

  if (!email || !password || !username) {
    return res.status(400).json({ message: "All fields are required" });
  }
  // bcrypt.hash(password, 10, (err, hashedPassword) => {
  //   if (err) return res.status(500).json({ message: "Error hashing password" });

  const newUser = new User({
    email,
    password, // La contraseña se guarda tal cual sin encriptación
    username,
    role, // Este rol se asigna cuando se registra un usuario
  });

  newUser
    .save()
    .then((user) => res.status(201).json(user))
    .catch((err) =>
      res.status(500).json({ message: "Error saving user", err })
    );
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return next(new Error("User not found"));
      }

      // Aquí comparamos directamente la contraseña en texto plano
      if (user.password !== password) {
        return res.status(401).json({ message: "Incorrect password" });
      }

      const { _id, email, username, role } = user;
      const payLoad = { _id, email, username, role };

      const authToken = jwt.sign(
        payLoad,
        // eslint-disable-next-line no-undef
        process.env.TOKEN_SECRET,
        { algorithm: "HS256", expiresIn: "6h" } // El token expira en 6 horas
      );
      res.json({ authToken });
    })
    .catch((err) => next(err));
};

const verifyAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "You are not authorized to access this route" });
  }
  next();
};
const verifyUser = (req, res) => {
  res.json(req.payload);
};
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // eslint-disable-next-line no-undef
    const validTokenPayload = jwt.verify(token, process.env.TOKEN_SECRET);
    req.payload = validTokenPayload;
    next();
  } catch (err) {
    res.status(401).json({
      message: "token not provided or not valid",
      rawError: JSON.stringify(err),
    });
  }
};

module.exports = {
  loginUser,
  signupUser,
  verifyAdmin,
  verifyToken,
  verifyUser,
};
