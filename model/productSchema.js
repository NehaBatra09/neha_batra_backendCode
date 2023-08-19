const mongoose = require('mongoose');
// Define Product Schema
const productSchema = new mongoose.Schema({
    categoryId: mongoose.Schema.Types.ObjectId,
    title: String,
    price: Number,
    description: String,
    availability: Boolean,
});
const Product = mongoose.model('Product', productSchema);
module.exports = {
    Product,
};