const Product = require("../models/Product.model");
const mongoose = require("mongoose");

const getProducts = (req, res, next) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) => next(err));
};

const getOneProduct = (req, res, next) => {
  const { id: productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Product.findById(productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    })
    .catch((err) => next(err));
};

const createProduct = (req, res, next) => {
  const { name, description, price, stock, imageUrl, size } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required." });
  }

  const newProduct = new Product({
    name,
    price,
    description,
    stock,
    imageUrl,
    size,
  });

  newProduct
    .save()
    .then((product) => res.status(201).json(product))
    .catch((err) => next(err));
};

const updateProduct = (req, res, next) => {
  const { id: productId } = req.params;
  const { name, description, price, stock, imageUrl, size } = req.body;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  Product.findByIdAndUpdate(
    productId,
    { name, description, price, stock, imageUrl, size },
    { new: true }
  )
    .then((updateProduct) => {
      if (!updateProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(updateProduct);
    })
    .catch((err) => next(err));
};

const deleteProduct = (req, res, next) => {
  const { id: productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  Product.findByIdAndDelete(productId)
    .then((deletedProduct) => {
      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(204).json({ message: "Product deleted successfully" });
    })
    .catch((err) => next(err));
};
module.exports = {
  getProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
