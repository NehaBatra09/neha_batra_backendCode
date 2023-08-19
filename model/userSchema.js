const mongoose = require('mongoose');
// Define User Schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
});
const User = mongoose.model('User', userSchema);
module.exports = {
    User,
};