const app_db = require('../models/app_db');

const requestLogger = async (req, res, next) => {
    const start = Date.now();

    // Функция для записи лога в БД
    const logRequest = async (status, error = null) => {
        const responseTime = Date.now() - start;
        try {
            await app_db.Log.create({
                method: req.method,
                url: req.originalUrl,
                status,
                response_time: responseTime,
                error,
                ip_address:
                    req.headers['x-real-ip'] || req.connection.remoteAddress,
                headers: req.headers,
                api_key: req.headers['x-api-key'],
                body: req.body,
                user_agent: req.headers['user-agent'],
                timestamp: new Date(),
            });
        } catch (dbError) {
            console.error('Error logging request:', dbError);
        }
    };

    res.on('finish', () => {
        logRequest(res.statusCode);
    });

    // Обработчик ошибок
    res.on('error', (error) => {
        logRequest(500, error.message);
    });

    next();
};

module.exports = requestLogger;
