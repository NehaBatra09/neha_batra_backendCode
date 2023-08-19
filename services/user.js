const bcrypt = require('bcryptjs');
const User = require('../model/userSchema').User;
const register = async (username, password, email) => {



    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        username,
        password: hashedPassword,
        email,
    });

    await newUser.save();
    return newUser;
}

const login = async (username, password) => {
    const user = await User.findOne({ username });

    if (!user) {
        return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return null;
    }

    return user;
}
module.exports = { UserService: { register, login } }