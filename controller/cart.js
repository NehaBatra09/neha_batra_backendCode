const { CartItem } = require("../model/cartSchema");
const { CartService } = require("../services/cart");
const { ProductService } = require("../services/product");

const createCart = async (req, res) => {
    const { userId } = req.body
    if (!userId) {
        return res.status(404).json({ message: "Bad Request" })
    }
    try {
        const cart = await CartService.createCart(userId);
        return res.status(200).json({ message: 'Cart created successfully' });
    } catch (error) {
        console.error('Error in creating  cart:', error);
        return res.status(500).json({ message: 'Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer' });
    }
}

const getCartById = async (req, res) => {
    const { cartId } = req.params

    try {
        const cart = await CartService.getCartById(cartId);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        return res.status(200).json(cart);
    } catch (error) {
        console.error('Error retrieving cart:', error);
        return res.status(500).json({ message: " Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer" });
    }
}
const addItemToCart = async (req, res) => {
    const { cartId, } = req.params
    const { productId, quantity } = req.body
    if (!productId && !quantity) {
        return res.status(404).json({ message: "Bad Request" })
    }


    try {
        const findCart = await CartService.getCartById(cartId)
        const findProduct = await ProductService.getProductById(productId)
        if (!findCart) {
            return res.status(200).json({ message: 'Cart  Not Found. Please create Cart.' });

        }
        if (!findProduct) {
            return res.status(200).json({ message: 'Product Not Found.' });

        }
        const cartItem = await CartService.addItemToCart(cartId, productId, quantity);
        return res.status(200).json({ message: 'Item added to cart successfully' });

    } catch (error) {
        console.error('Error adding item to cart:', error);
        return res.status(500).json({ message: ' Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer' });
    }
}

const updateCartItemQuantity = async (req, res) => {
    const { cartItemId } = req.params
    const { newQuantity } = req.body
    if (!newQuantity) {
        return res.status(404).json({ message: "Bad Request" })
    }
    let findCartItemId = await CartItem.findById(cartItemId)
    if (!findCartItemId) {
        return res.status(404).json({ message: "Cart Item Not found." })
    }
    try {
        const cartItem = await CartService.updateCartItemQuantity(cartItemId, newQuantity);
        return res.status(201).json({ message: 'Item quantity updated successfully' });
    } catch (error) {
        console.error('Error updating item quantity:', error);
        return res.status(500).json({ message: ' Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer' });
    }
}

const removeCartItem = async (req, res) => {
    const { cartItemId } = req.params

    try {
        let findCartItemId = await CartItem.findById(cartItemId)
        if (!findCartItemId) {
            return res.status(404).json({ message: "Cart Item Not found." })
        }
        await CartService.removeCartItem(cartItemId);
        return res.status(201).json({ message: 'Item removed successfully' });
    } catch (error) {
        console.error('Error removing cart item :', error);
        return res.status(500).json({ message: ' Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer' });
    }
}
module.exports = { CartController: { createCart, removeCartItem, updateCartItemQuantity, getCartById, addItemToCart } }