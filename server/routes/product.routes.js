const { verifyToken, verifyAdmin } = require("../controllers/auth.controllers");
const express = require("express");
const productControllers = require("../controllers/product.controllers");
const router = express.Router();

router.get("/", verifyToken, productControllers.getProducts);
router.get("/:id", verifyToken, productControllers.getOneProduct);
router.post("/", verifyToken, verifyAdmin, productControllers.createProduct);
router.put("/:id", verifyToken, verifyAdmin, productControllers.updateProduct);
router.delete(
  "/:id",
  verifyToken,
  verifyAdmin,
  productControllers.deleteProduct
);

module.exports = router;
