var express = require('express');
const { CartController } = require('../controller/cart');
var router = express.Router();

/**
 * @swagger
 * /api/carts:
 *   post:
 *     summary: Create a cart for user
 *     tags: [Carts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *             required:
 *               - userId
 *     responses:
 *       201:
 *         description: Cart added  successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/carts/{cartId}:
 *   get:
 *     summary: Get details of a specific cart by cartId
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: cartId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the cart
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Cart not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/carts/{cartId}/items:
 *   post:
 *     summary: Add a product to the user's cart
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: cartId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *             required:
 *               - productId
 *               - quantity
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
 * /api/carts/cartId/items/{cartItemId}:
 *   put:
 *     summary: Update a product quantity from the user's cart
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: cartItemId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the cartItem
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newQuantity:
 *                 type: string
 *             required:
 *               - newQuantity
 *     responses:
 *       200:
 *         description: CartItem removed  successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/carts/items/{cartItemId}:
 *   delete:
 *     summary: Remove a product from the user's cart
 *     tags: [Carts]
 *     parameters:
 *       - in: path
 *         name: cartItemId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the cartItem
 *     responses:
 *       200:
 *         description: CartItem deleted  successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

router.post('/', CartController.createCart);

router.get('/:cartId', CartController.getCartById);

router.post('/:cartId/items', CartController.addItemToCart);

router.put('/cartId/items/:cartItemId', CartController.updateCartItemQuantity);

router.delete('/items/:cartItemId', CartController.removeCartItem);
module.exports = router;
