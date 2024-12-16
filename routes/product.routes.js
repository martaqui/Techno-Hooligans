const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Ruta para obtener todos los productos
router.get("/products", async (req, res) => {
    try {
        const products = await Product.find();  // Obtiene todos los productos
        res.status(200).json(products);  // Devuelve los productos en formato JSON
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Ruta para agregar un nuevo producto
router.post("/products", async (req, res) => {
    const { name, description, price, category, imageUrl } = req.body;

    try {
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            imageUrl,
        });

        await newProduct.save();  // Guarda el nuevo producto en la base de datos
        res.status(201).json(newProduct);  // Devuelve el producto recién creado
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
