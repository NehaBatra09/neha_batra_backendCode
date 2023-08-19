var express = require('express');
const { ProductController } = require('../controller/product');
var router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API for managing products
 */
/**
 * @swagger
 * /api/products/{categoryId}:
 *   get:
 *     summary: Get Product List  By categoryId
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the categroy
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Product List Empty
 *       402:
 *         description: Category Not Found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/products/product/{productId}:
 *   get:
 *     summary: Get details of a specific product by productId
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */


router.get(`/:categoryId`, ProductController.getProductListByCategoryId)

router.get(`/product/:productId`, ProductController.getProductById);

module.exports = router;
