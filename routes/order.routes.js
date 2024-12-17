const express = require('express');
const orderControllers = require('../controllers/order.controllers');
const router = express.Router();

router.get('/', orderControllers.getOrders);
router.post('/', orderControllers.createOrder);
router.get('/:id', orderControllers.getOneOrder);
router.put('/:id', orderControllers.updateOrder);
router.delete('/:id', orderControllers.deleteOrder);

module.exports = router;
