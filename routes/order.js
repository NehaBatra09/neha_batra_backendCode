var express = require('express');
const { OrderController } = require('../controller/order');
var router = express.Router();
/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Place an order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               cartId:
 *                 type: string
 *               totalAmount:
 *                 type: integer
 *             required:
 *               - userId
 *               - cartId
 *               - totalAmount   
 *     responses:
 *       201:
 *         description: Product added to cart successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API for managing orders
 */

/**
 * @swagger
 * /api/orders/{userId}:
 *   get:
 *     summary: Get History of user order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the order
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Order Histroy not found
 *       500:
 *         description: Internal server error
 */



/**
 * @swagger
 * /api/orders/{orderId}:
 *   get:
 *     summary: Get details of a specific order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the order
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */


router.post('/', OrderController.placeOrder);
router.get('/:userId', OrderController.orderHistory);
router.get('/:orderId', OrderController.orderDetails);

module.exports = router;
