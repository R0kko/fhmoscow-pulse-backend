const addressService = require('../services/app/addressService');

/**
 * Контроллер для стандартизации и сохранения адреса
 * @param {Object} req - Экземпляр запроса Express
 * @param {Object} res - Экземпляр ответа Express
 */
const addOrUpdateAddress = async (req, res) => {
    const { userId } = req.params;
    const { address, alias, associationDate } = req.body;

    // Валидация входных данных
    if (!userId) {
        return res.status(400).json({
            status: 'error',
            message: 'Не указан идентификатор пользователя (userId)',
        });
    }
    if (!address || typeof address !== 'string') {
        return res.status(400).json({
            status: 'error',
            message: 'Параметр "address" обязателен и должен быть строкой',
        });
    }
    if (!alias || typeof alias !== 'string') {
        return res.status(400).json({
            status: 'error',
            message: 'Параметр "alias" обязателен и должен быть строкой',
        });
    }
    if (associationDate && isNaN(new Date(associationDate).getTime())) {
        return res.status(400).json({
            status: 'error',
            message: 'Некорректный формат даты "associationDate"',
        });
    }

    try {
        // Обработка адреса
        const savedAddress = await addressService.processAddress(
            userId,
            alias,
            address,
            associationDate
        );

        return res.status(200).json({
            status: 'success',
            data: savedAddress,
        });
    } catch (error) {
        console.error(
            'Ошибка при добавлении или обновлении адреса:',
            error.message
        );

        // Обработка конфликта (409 Conflict)
        if (error.status === 409) {
            return res.status(409).json({
                status: 'error',
                message: error.message,
            });
        }

        // Внутренняя ошибка сервера
        return res.status(500).json({
            status: 'error',
            message: error.message || 'Внутренняя ошибка сервера',
        });
    }
};

/**
 * Контроллер для получения адресов пользователя
 * @param {Object} req - Экземпляр запроса Express
 * @param {Object} res - Экземпляр ответа Express
 */
const getUserAddresses = async (req, res) => {
    const { userId } = req.params;

    // Валидация входных данных
    if (!userId) {
        return res.status(400).json({
            status: 'error',
            message: 'Не указан идентификатор пользователя (userId)',
        });
    }

    try {
        // Получение адресов пользователя
        const addresses = await addressService.getUserAddresses(userId);

        return res.status(200).json({
            status: 'success',
            data: addresses,
        });
    } catch (error) {
        console.error(
            'Ошибка при получении адресов пользователя:',
            error.message
        );

        // Внутренняя ошибка сервера
        return res.status(500).json({
            status: 'error',
            message: error.message || 'Внутренняя ошибка сервера',
        });
    }
};

/**
 * Контроллер для удаления адреса
 * @param {Object} req - Экземпляр запроса Express
 * @param {Object} res - Экземпляр ответа Express
 */
const deleteAddress = async (req, res) => {
    const { addressId } = req.params;

    // Валидация входных данных
    if (!addressId) {
        return res.status(400).json({
            status: 'error',
            message: 'Не указан идентификатор адреса (addressId)',
        });
    }

    try {
        // Удаление адреса
        const result = await addressService.deleteAddress(addressId);

        return res.status(200).json({
            status: 'success',
            message: 'Адрес успешно удален',
            data: result,
        });
    } catch (error) {
        console.error('Ошибка при удалении адреса:', error.message);

        // Внутренняя ошибка сервера
        return res.status(500).json({
            status: 'error',
            message: error.message || 'Внутренняя ошибка сервера',
        });
    }
};

module.exports = {
    addOrUpdateAddress,
    getUserAddresses,
    deleteAddress,
};
