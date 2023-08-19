const mongoose = require('mongoose');
// Define Cart Schema
const cartSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    createdAt: Date,
});

// Define CartItem Schema
const cartItemSchema = new mongoose.Schema({
    cartId: mongoose.Schema.Types.ObjectId,
    productId: mongoose.Schema.Types.ObjectId,
    quantity: Number,
});
const Cart = mongoose.model('Cart', cartSchema);
const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = {
    Cart,
    CartItem,
};