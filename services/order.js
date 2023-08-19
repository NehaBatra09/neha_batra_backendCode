const Order = require('../model/orderSchema').Order;
const OrderItem = require('../model/orderSchema').OrderItem;
const CartItem = require("../model/cartSchema").CartItem
const mongoose = require('mongoose');
const { Product } = require('../model/productSchema');
const placeOrder = async (userId, cartId, totalAmount) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const order = new Order({ userId, totalAmount, orderDate: new Date() });
        await order.save();

        const cartItems = await CartItem.find({ cartId });

        for (const cartItem of cartItems) {
            const orderItem = new OrderItem({ orderId: order._id, productId: cartItem.productId, quantity: cartItem.quantity });
            await orderItem.save();
        }

        await session.commitTransaction();
        session.endSession();

        return order;
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
}

const getOrderHistory = async (userId) => {
    try {
        const orders = await Order.find({ userId });
        const ordersWithDetails = await Promise.all(
            orders.map(async (orderId) => {
                const findOrder = await OrderItem.findOne({ orderId: orderId._id });
                const products = await Product.findById(findOrder.productId)
                return {
                    orderId,
                    products
                };
            })
        );
        return ordersWithDetails;
    } catch (error) {
        throw error;
    }
}

const getOrderDetails = async (orderId) => {
    try {
        const order = await Order.findById(orderId);
        const orderItems = await OrderItem.find({ orderId });
        return { order, orderItems };
    } catch (error) {
        throw error;
    }
}
module.exports = { OrderService: { placeOrder, getOrderDetails, getOrderHistory } }