const jwt = require('jsonwebtoken');
const User = require('./model/userSchema').User;

const SECRET_KEY = process.env.SECRET_KEY;

const authenticateUser = async (req, res, next) => {
    let token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    token = token.replace("Bearer ", "")
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log(decoded, "id")
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

module.exports = authenticateUser;
