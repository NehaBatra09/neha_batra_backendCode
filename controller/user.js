const { UserService } = require("../services/user");
const jwt = require('jsonwebtoken');
const register = async (req, res) => {
    const { username, password, email } = req.body;

    if (!username && !password && !email) {
        return res.status(404).json({ message: "Required Fields are missing" })
    }
    try {
        const newUser = await UserService.register(username, password, email);
        return res.status(201).json(newUser);
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ error: 'Server Error', message: 'An error occurred while registering user' });
    }
}
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username && !password) {
            return res.status(404).json({ message: "Bad Request" })

        }
        const user = await UserService.login(username, password);

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized', message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

        return res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ error: 'Server Error', message: 'An error occurred while logging in user' });
    }
}
module.exports = { UserController: { register, login } }