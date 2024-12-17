const Order = require('../models/order.model')
const mongoose = require('mongoose')

const getOrders = (req, res, next) => {
    Order
        .find()
        .populate('products.product')
        .then(orders => res.json(orders))
        .catch(err => next(err));
}

const getOneOrder = (req, res, next) => {
    const { id: orderId } = req.params

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        res.status(400).json({ message: 'Specified id is not valid' })
        return
    }

    Order
        .findById(orderId)
        .then(order => {
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.json(order);
        })
        .catch(err => next(err));
}

const createOrder = (req, res, next) => {
    const { products, totalPrice, customerName, address } = req.body;

    if (!products || !totalPrice || !customerName || !address) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    Order
        .create({
            products,
            totalPrice,
            customerName,
            address

        })
        .then(order => res.status(201).json(order))
        .catch(err => next(err));
};


const updateOrder = (req, res, next) => {
    const { id: orderId } = req.params
    const { products, totalPrice, customerName, address, } = req.body

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(400).json({ message: 'Invalid order ID' });
    }
    Order
        .findByIdAndUpdate(orderId, {
            products,
            totalPrice,
            customerName,
            address
        })
        .then(updatedOrder => {
            if (!updatedOrder) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.json(updatedOrder);
        })
        .catch(err => next(err));
}

const deleteOrder = (req, res, next) => {
    const { id: orderId } = req.params

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(400).json({ message: 'Invalid order ID' });
    }

    Order
        .findByIdAndDelete(orderId)
        .then(deletedOrder => {
            if (!deletedOrder) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.status(204).json({ message: 'Order deleted successfully' });
        })
        .catch(err => next(err));
}
module.exports = {
    getOrders,
    getOneOrder,
    createOrder,
    updateOrder,
    deleteOrder
}