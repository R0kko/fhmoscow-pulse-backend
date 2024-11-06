const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res
            .status(401)
            .json({ status: 'error', message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        res.status(401).json({ status: 'error', message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
