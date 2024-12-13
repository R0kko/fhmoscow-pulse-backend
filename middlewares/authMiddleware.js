const jwt = require('jsonwebtoken');
const app_db = require('../models/app_db'); // Подключите модель для проверки пользователя и ролей

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({
            status: 'error',
            message: 'Токен отсутствует',
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await app_db.User.findByPk(decoded.userId, {
            include: [
                {
                    model: app_db.Role,
                    through: 'UserRoles',
                    as: 'Roles',
                    attributes: ['name'],
                },
            ],
        });

        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'Неверный токен',
            });
        }

        // Сохраняем пользователя и роли в req
        req.user = {
            id: user.id,
            roles: user.Roles.map((role) => role.name),
        };

        next();
    } catch (error) {
        console.error('Ошибка в authMiddleware:', error);
        return res.status(401).json({
            status: 'error',
            message: 'Неверный или истекший токен',
        });
    }
};

module.exports = authMiddleware;
