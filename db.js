const mongoose = require('mongoose');
const { Product } = require('./model/productSchema');
const { Category } = require('./model/categorySchema');
const { CategoryService } = require("./services/category")
const { ProductService } = require("./services/product");



const MONGODB_URI = process.env.DB_URL;

const connectDB = async () => {
    try {

        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const findCategory = await Category.find({}).limit(1)
        const findProduct = await Product.find({}).limit(1)
        if (findCategory.length == 0 && findProduct.length == 0) {
            CategoryService.createCategory()
            ProductService.createProduct()
        }

        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit the process with an error
    }
};

module.exports = connectDB;
