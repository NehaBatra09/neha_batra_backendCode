const { Category } = require('../model/categorySchema');
const Product = require('../model/productSchema').Product;

const createProduct = async () => {
    const eletroCategory = await Category.findOne({ name: "Electronics" });
    const clothCategory = await Category.findOne({ name: "Clothing" });
    const bookCategory = await Category.findOne({ name: "Books" });
    const furnitureCategory = await Category.findOne({ name: "Furniture" });
    const productDataList = [
    ]
    if (eletroCategory) {
        productDataList.push({ categoryId: eletroCategory._id, title: "Smart TV", price: 599, description: "4K Ultra HD Smart TV with built-in streaming apps.", availability: true },)
    }
    if (clothCategory) {
        productDataList.push({ categoryId: clothCategory._id, title: "Women's Sundress", price: 129, description: " Floral-printed sundress for women, perfect for summer ", availability: false }, { categoryId: clothCategory._id, title: "Women's Sundress", price: 129, description: " Floral-printed sundress for women, perfect for summer ", availability: false })
    }
    if (bookCategory) {
        productDataList.push({ categoryId: bookCategory._id, title: "The Great Gatsby by F.Scott Fitzgerald", price: 12, description: " Classic novel set in the Roaring Twenties, exploring themes of wealth and decadence.", availability: true })
    }
    if (furnitureCategory) {
        productDataList.push({ categoryId: furnitureCategory._id, title: "Sectional Sofa", price: 7990, description: " L-shaped sectional sofa with plush cushions and modern design.", availability: true })
    }

    try {
        const products = await Product.insertMany(productDataList);
        return products;
    } catch (error) {
        throw error;
    }

}

const getProductListByCategoryId = async (categoryId) => {
    try {
        const products = await Product.find({ categoryId });
        return products;
    } catch (error) {
        throw error;
    }
}

const getProductById = async (productId) => {
    try {
        const product = await Product.findById(productId);
        return product;
    } catch (error) {
        throw error;
    }
}
module.exports = { ProductService: { createProduct, getProductListByCategoryId, getProductById } }