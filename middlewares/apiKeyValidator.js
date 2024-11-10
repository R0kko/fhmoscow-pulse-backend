const app_db = require('../models/app_db');
const { Op } = require('sequelize');

/**
 * Middleware для проверки активности API ключа
 */
const apiKeyValidator = async (req, res, next) => {
    const apiKey = req.header('X-API-KEY');
    const currentDate = new Date();

    if (!apiKey) {
        return res.status(401).json({
            status: 'error',
            message: 'API key is missing',
        });
    }

    try {
        const keyRecord = await app_db.ApiKey.findOne({
            where: {
                key: apiKey,
                active_from: { [Op.lte]: currentDate },
                active_to: { [Op.gte]: currentDate },
            },
        });

        if (!keyRecord) {
            return res.status(403).json({
                status: 'error',
                message: 'Invalid or inactive API key',
            });
        }

        next();
    } catch (error) {
        console.error('Error validating API key:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};

module.exports = apiKeyValidator;
