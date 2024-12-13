const app_db = require('../../models/app_db');
const roleService = require('./roleService');
const userStatusService = require('./userStatusService');

const { generateToken, comparePassword } = require('../../utils/authUtils');
const { sanitizeUser } = require('../../utils/userUtils');
const logger = require('../../utils/logger');

/**
 * Аутентификация пользователя и генерация токена
 * @param {string} email - Электронная почта пользователя
 * @param {string} password - Пароль пользователя
 * @returns {Promise<object>} - Токен, данные пользователя и роли
 * @throws {Error} - Если пользователь не найден или учетные данные неверны
 */
const login = async (email, password) => {
    try {
        // Поиск пользователя
        const user = await app_db.User.findOne({ where: { email } });
        if (!user) {
            logger.warn(
                `Попытка входа: пользователь с email ${email} не найден`
            );
            throw new Error('Invalid credentials'); // Единый ответ для защиты от утечек
        }

        // Проверка пароля
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            logger.warn(
                `Попытка входа: неверный пароль для пользователя ${email}`
            );
            throw new Error('Invalid credentials');
        }

        // Генерация токена
        const token = generateToken({ userId: user.id });

        // Получение ролей пользователя
        const roles = await roleService.getUserRoles(user.id);

        // Получение alias статуса пользователя
        const userStatusAlias = await userStatusService.getUserStatusAlias(
            user.user_status_id
        );

        // Форматируем данные пользователя
        const userData = sanitizeUser(user);
        userData.user_status = userStatusAlias;
        delete userData.user_status_id;

        logger.info(`Пользователь ${email} успешно аутентифицирован`);

        return { token, user: userData, roles };
    } catch (error) {
        logger.error(`Ошибка аутентификации: ${error.message}`, { email });
        throw error;
    }
};

module.exports = {
    login,
};
