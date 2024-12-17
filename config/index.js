const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");



const FRONTEND_URL = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/techno-hooligans";
module.exports = (app) => {
  app.set("trust proxy", 1);

  app.use(
    cors({
      origin: [FRONTEND_URL]
    })
  );

  app.use(logger("dev"));

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};
module.exports.handle404 = (req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
};