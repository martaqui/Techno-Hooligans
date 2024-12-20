const express = require("express");
const { verifyAdmin, verifyToken } = require("../controllers/auth.controllers");
const orderControllers = require("../controllers/order.controllers");
const router = express.Router();

router.get("/", verifyToken, orderControllers.getOrders);
router.post("/", verifyToken, orderControllers.createOrder);
router.get("/:id", verifyToken, orderControllers.getOneOrder);
router.put("/:id", verifyToken, orderControllers.updateOrder);
router.delete("/:id", verifyToken, verifyAdmin, orderControllers.deleteOrder);

module.exports = router;
