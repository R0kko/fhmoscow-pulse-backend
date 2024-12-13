const passportService = require('../services/app/passportService');

/**
 * Получить паспорт пользователя
 */
const getUserPassport = async (req, res) => {
    const { userId } = req.params;

    try {
        const passport = await passportService.getUserPassport(userId);

        if (!passport) {
            return res.status(404).json({
                status: 'error',
                message: 'Паспорт пользователя не найден',
            });
        }

        res.status(200).json({
            status: 'success',
            data: passport,
        });
    } catch (error) {
        console.error('Ошибка получения паспорта:', error);
        res.status(500).json({
            status: 'error',
            message: error.message || 'Ошибка сервера',
        });
    }
};

/**
 * Добавить паспорт пользователя
 */
const addUserPassport = async (req, res) => {
    const { userId } = req.params;
    const passportData = req.body;

    try {
        const passport = await passportService.addUserPassport(
            userId,
            passportData
        );

        res.status(201).json({
            status: 'success',
            data: passport,
        });
    } catch (error) {
        console.error('Ошибка добавления паспорта:', error);
        res.status(400).json({
            status: 'error',
            message: error.message || 'Ошибка при добавлении паспорта',
        });
    }
};

/**
 * Обновить паспорт пользователя
 */
const updateUserPassport = async (req, res) => {
    const { userId } = req.params;
    const passportData = req.body;

    try {
        const passport = await passportService.updateUserPassport(
            userId,
            passportData
        );

        res.status(200).json({
            status: 'success',
            data: passport,
        });
    } catch (error) {
        console.error('Ошибка обновления паспорта:', error);
        res.status(400).json({
            status: 'error',
            message: error.message || 'Ошибка при обновлении паспорта',
        });
    }
};

/**
 * Добавить или обновить паспорт пользователя
 */
const addOrUpdateUserPassport = async (req, res) => {
    const { userId } = req.params;
    const passportData = req.body;

    try {
        const passport = await passportService.addOrUpdateUserPassport(
            userId,
            passportData
        );

        res.status(200).json({
            status: 'success',
            data: passport,
        });
    } catch (error) {
        console.error('Ошибка добавления или обновления паспорта:', error);
        res.status(400).json({
            status: 'error',
            message:
                error.message ||
                'Ошибка при добавлении или обновлении паспорта',
        });
    }
};

module.exports = {
    getUserPassport,
    addUserPassport,
    updateUserPassport,
    addOrUpdateUserPassport,
};
