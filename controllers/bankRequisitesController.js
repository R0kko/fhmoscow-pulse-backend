const bankRequisitesService = require('../services/app/bankRequisitesService');

/**
 * Добавить банковские реквизиты пользователя
 * @param {Object} req - Запрос Express
 * @param {Object} res - Ответ Express
 */
const addUserBankRequisites = async (req, res) => {
    const { userId } = req.params; // ID пользователя из URL
    const { accountNumber, bic } = req.body; // Расчетный счет и БИК из тела запроса

    try {
        // Валидация входных данных
        if (!accountNumber || !bic) {
            return res.status(400).json({
                status: 'error',
                message:
                    'Поля "accountNumber" и "bic" обязательны для заполнения',
            });
        }

        // Добавление реквизитов пользователя
        const userBankRequisites =
            await bankRequisitesService.addUserBankRequisites(
                userId,
                accountNumber,
                bic
            );

        return res.status(201).json({
            status: 'success',
            data: userBankRequisites,
        });
    } catch (error) {
        console.error(
            'Ошибка при добавлении банковских реквизитов:',
            error.message
        );

        const statusCode = error.statusCode || 500;
        return res.status(statusCode).json({
            status: 'error',
            message: error.message || 'Внутренняя ошибка сервера',
        });
    }
};

/**
 * Получить банковские реквизиты пользователя
 * @param {Object} req - Запрос Express
 * @param {Object} res - Ответ Express
 */
const getUserBankRequisites = async (req, res) => {
    const { userId } = req.params;

    try {
        const preparedRequisites =
            await bankRequisitesService.getPreparedUserBankRequisites(userId);

        return res.status(200).json({
            status: 'success',
            data: preparedRequisites,
        });
    } catch (error) {
        console.error(
            'Ошибка при получении подготовленных банковских реквизитов:',
            error.message
        );

        return res.status(500).json({
            status: 'error',
            message: error.message || 'Внутренняя ошибка сервера',
        });
    }
};

/**
 * Удалить банковские реквизиты пользователя
 * @param {Object} req - Запрос Express
 * @param {Object} res - Ответ Express
 */
const deleteUserBankRequisites = async (req, res) => {
    const { userId, requisiteId } = req.params; // ID пользователя и реквизитов из URL

    try {
        await bankRequisitesService.deleteUserBankRequisites(
            userId,
            requisiteId
        );

        return res.status(200).json({
            status: 'success',
            message: 'Реквизиты успешно удалены',
        });
    } catch (error) {
        console.error(
            'Ошибка при удалении банковских реквизитов:',
            error.message
        );

        return res.status(500).json({
            status: 'error',
            message: error.message || 'Внутренняя ошибка сервера',
        });
    }
};

module.exports = {
    addUserBankRequisites,
    getUserBankRequisites,
    deleteUserBankRequisites,
};
