var express = require('express');
const { CategoryController } = require('../controller/category');
var router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API for managing product categories
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get a list of categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal server error
 */

// Similar annotations for creating, updating, and deleting categories


router.get('/', CategoryController.getCategoryList);

module.exports = router;
