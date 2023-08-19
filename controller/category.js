const { CategoryService } = require("../services/category");

const createCategory = async (req, res) => {
    try {
        const categories = await CategoryService.createCategory()
        return res.status(200).json(categories);
    } catch (error) {
        console.error('Error adding categories:', error);
        return res.status(500).json({ error: 'Server Error', message: 'An error occurred while fetching categories' });
    }
}

const getCategoryList = async (req, res) => {
    try {
        const categories = await CategoryService.getCategoryList()
        return res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return res.status(500).json({ error: 'Server Error', message: 'An error occurred while fetching categories' });
    }
}
module.exports = { CategoryController: { getCategoryList, createCategory } }