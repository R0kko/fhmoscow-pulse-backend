const authService = require('../services/authService');

const login = async (req, res) => {
    try {
        const { token, user, roles } = await authService.login(
            req.body.email,
            req.body.password
        );
        res.json({ status: 'success', token, user, roles });
    } catch (error) {
        res.status(401).json({ status: 'error', message: error.message });
    }
};

module.exports = {
    login,
};
