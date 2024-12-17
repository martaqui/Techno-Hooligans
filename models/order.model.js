const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const orderSchema = new Schema(
    {
        products: [
            {
                product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
                quantity: { type: Number, required: true, default: 1 }
            }
        ],
        totalPrice:
        {
            type: Number,
            required: true
        },
        status:
        {
            type: String,
            enum: ['pending', 'shipped', 'delivered'],
            default: 'pending'
        },
        customerName:
        {
            type: String,
            required: true
        },
        address:
        {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const Order = model('Order', orderSchema);

module.exports = Order;
