const mongoose = require('mongoose');
// Define Order Schema
const orderSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    totalAmount: Number,
    orderDate: Date,
});

// Define OrderItem Schema
const orderItemSchema = new mongoose.Schema({
    orderId: mongoose.Schema.Types.ObjectId,
    productId: mongoose.Schema.Types.ObjectId,
    quantity: Number,
});
const Order = mongoose.model('Order', orderSchema);
const OrderItem = mongoose.model('OrderItem', orderItemSchema);

module.exports = {
    Order,
    OrderItem,
};