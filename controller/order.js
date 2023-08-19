const { OrderService } = require("../services/order");

const placeOrder = async (req, res) => {
    const { userId, cartId, totalAmount } = req.body
    if (!userId && !totalAmount && !cartId) {
        return res.status(404).json({ message: "Bad Request" })
    }
    try {
        const order = await OrderService.placeOrder(userId, cartId, totalAmount);
        return res.status(201).json({ message: 'Order placed successfully' });
    } catch (error) {
        console.error('Error placing order:', error);
        return res.status(500).json({
            message: `Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an 
integer`});
    }
}


const orderHistory = async (req, res) => {
    const { userId } = req.params

    try {
        const orders = await OrderService.getOrderHistory(userId)
        if (!orders) {
            return res.status(404).json({ message: " Order Histroy not found" })
        }
        return res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching order history:', error);
        return res.status(500).json({
            message: `Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an 
integer`});
    }
}


const orderDetails = async (req, res) => {
    const { orderId } = req.params

    try {
        const orderDetails = await OrderService.getOrderDetails(orderId);
        if (!orderDetails) {
            return res.status(404).json({ message: "Order not found" })
        }
        return res.status(200).json(orderDetails);
    } catch (error) {
        console.error('Error fetching order details:', error);
        return res.status(500).json({
            message: `Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an 
integer`});
    }
}


module.exports = { OrderController: { placeOrder, orderDetails, orderHistory } }