const Category = require('../model/categorySchema').Category;

const createCategory = async () => {
    const categoryDataList = [
        { name: "Electronics" },
        { name: "Clothing" },
        { name: "Books" },
        { name: "Furniture" }
    ]
    try {
        const categories = await Category.insertMany(categoryDataList);
        return categories;
    } catch (error) {
        throw error;
    }

}

const getCategoryList = async () => {
    try {
        const categories = await Category.find();
        return categories;
    } catch (error) {
        throw error;
    }
}
module.exports = { CategoryService: { getCategoryList, createCategory } }