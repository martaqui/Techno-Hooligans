require("dotenv").config()
require("./db")
const express = require("express")
const app = express()


require("./config")(app)

const productRoutes = require("./routes/product.routes");
app.use("/api/products", productRoutes);

const orderRoutes = require('./routes/order.routes')
app.use('/api/orders', orderRoutes);

// Importar las rutas de autenticación
const authRoutes = require("./routes/auth.routes"); // Asegúrate de que el archivo esté en la ruta correcta
app.use("/api/auth", authRoutes); // Añadir el prefijo '/api/auth' para las rutas de autenticación

require("./error-handling")(app)
const { handle404 } = require("./config");
app.use(handle404);
module.exports = app