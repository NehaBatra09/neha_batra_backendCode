const Cart = require('../model/cartSchema').Cart;
const CartItem = require('../model/cartSchema').CartItem;

const createCart = async (userId) => {
    try {
        const cart = new Cart({ userId, createdAt: new Date() });
        await cart.save();
        return cart;
    } catch (error) {
        throw error;
    }
}

const getCartById = async (cartId) => {
    try {
        const cart = await Cart.findById(cartId);
        return cart;
    } catch (error) {
        throw error;
    }
}

const addItemToCart = async (cartId, productId, quantity) => {
    try {
        const cartItem = new CartItem({ cartId, productId, quantity });
        await cartItem.save();
        return cartItem;
    } catch (error) {
        throw error;
    }
}

const updateCartItemQuantity = async (cartItemId, newQuantity) => {
    try {
        const cartItem = await CartItem.findByIdAndUpdate(cartItemId, { quantity: newQuantity }, { new: true });
        console.log(cartItemId, newQuantity, cartItem)
        return cartItem;
    } catch (error) {
        throw error;
    }
}

const removeCartItem = async (cartItemId) => {
    try {
        await CartItem.findByIdAndRemove(cartItemId);
    } catch (error) {
        throw error;
    }
}
module.exports = { CartService: { createCart, getCartById, addItemToCart, updateCartItemQuantity, removeCartItem } }