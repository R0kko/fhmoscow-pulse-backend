const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/**
 * Генерирует JWT токен
 * @param {object} payload - Полезная нагрузка токена
 * @returns {string} - JWT токен
 */
const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

/**
 * Сравнивает введенный пароль с хэшированным паролем
 * @param {string} plainPassword - Введенный пользователем пароль
 * @param {string} hashedPassword - Хэш пароля из базы данных
 * @returns {Promise<boolean>} - Результат сравнения
 */
const comparePassword = async (plainPassword, hashedPassword) => {
    return bcrypt.compare(plainPassword, hashedPassword);
};

module.exports = {
    generateToken,
    comparePassword,
};
