const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
    generateToken,
    comparePassword,
};
