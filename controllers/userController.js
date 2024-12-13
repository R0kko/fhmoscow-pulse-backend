const userService = require('../services/app/userService');
const { formatUserData } = require('../utils/formatters/userFormatter');
const { isUUID } = require('../utils/validators/userValidators');

/**
 * Контроллер для получения пользователя по ID
 */
const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!isUUID(userId)) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid user ID format',
            });
        }

        const user = await userService.getUserById(userId);

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found',
            });
        }

        const userData = formatUserData(user);

        res.status(200).json({
            status: 'success',
            data: userData,
        });
    } catch (error) {
        console.error('Error fetching user:', error.message);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};

/**
 * Контроллер для получения всех пользователей с пагинацией
 */
const getAllUsers = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
            return res.status(400).json({
                status: 'error',
                message: 'Page and limit must be positive numbers',
            });
        }

        const users = await userService.getAllUsers(page, limit);

        res.status(200).json({
            status: 'success',
            data: users.data,
            meta: users.meta,
        });
    } catch (error) {
        console.error('Ошибка получения пользователей:', error.message);
        res.status(500).json({
            status: 'error',
            message: 'Ошибка сервера',
        });
    }
};

/**
 * Контроллер для создания нового пользователя
 */
const createUser = async (req, res) => {
    try {
        const userData = req.body;

        if (
            !userData.phone ||
            !userData.email ||
            !userData.snils ||
            !userData.inn
        ) {
            return res.status(400).json({
                status: 'error',
                message: 'Phone, email, SNILS, and INN are required fields',
            });
        }

        userData.phone = userData.phone.replace(/\D/g, '');

        const newUser = await userService.createUser(userData);

        res.status(201).json({
            status: 'success',
            data: newUser,
        });
    } catch (error) {
        console.error('Ошибка создания пользователя:', error.message);

        res.status(error.message.includes('уже существует') ? 400 : 500).json({
            status: 'error',
            message: error.message || 'Ошибка сервера',
        });
    }
};

/**
 * Контроллер для получения текущего пользователя
 */
const getCurrentUser = async (req, res) => {
    try {
        const user = await userService.getUserById(req.user.id);

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found',
            });
        }

        const userData = formatUserData(user);

        res.status(200).json({
            status: 'success',
            data: userData,
        });
    } catch (error) {
        console.error('Ошибка получения текущего пользователя:', error.message);
        res.status(500).json({
            status: 'error',
            message: 'Ошибка сервера',
        });
    }
};

module.exports = {
    getUserById,
    getAllUsers,
    createUser,
    getCurrentUser,
};
