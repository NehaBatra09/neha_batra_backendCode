const { Category } = require("../model/categorySchema");
const { ProductService } = require("../services/product");

const createProduct = async (req, res) => {
    try {
        const products = await ProductService.createProduct()
        return res.status(200).json(products);
    } catch (error) {
        console.error('Error adding products:', error);
        return res.status(500).json({ error: 'Server Error', message: 'An error occurred while fetching categories' });
    }
}
const getProductListByCategoryId = async (req, res) => {
    const { categoryId } = req.params;

    try {
        const findCategory = await Category.findOne({ _id: categoryId });
        if (findCategory) {

            const products = await ProductService.getProductListByCategoryId(categoryId);
            if (products.length == 0) {
                return res.status(404).json({ message: "Product List Empty" })
            }
            return res.status(200).json(products);
        } else {
            return res.status(402).json({ message: "Category Not Found." })
        }
    } catch (error) {
        console.error('Error retrieving products:', error);
        return res.status(500).json({
            message: `Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an 
integer`});
    }
}
const getProductById = async (req, res) => {
    const { productId } = req.params
    console.log("done...")
    try {
        const product = await ProductService.getProductById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json(product);
    } catch (error) {
        console.error('Error retrieving product details:', error);
        return res.status(500).json({
            message: `Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an 
integer`});
    }
}
module.exports = { ProductController: { createProduct, getProductById, getProductListByCategoryId } }