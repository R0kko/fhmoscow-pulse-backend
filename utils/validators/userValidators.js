const { body, param, query } = require('express-validator');

/**
 * Валидация параметра `id` пользователя.
 */
const validateUserId = [
    param('id').isUUID().withMessage('User ID должен быть в формате UUID.'),
];

/**
 * Валидация параметра `statusId`.
 */
const validateUserStatusId = [
    param('statusId')
        .isUUID()
        .withMessage('Status ID должен быть в формате UUID.'),
];

/**
 * Валидация для создания нового пользователя.
 */
const validateCreateUser = [
    body('last_name')
        .notEmpty()
        .withMessage('Фамилия обязательна.')
        .isString()
        .withMessage('Фамилия должна быть строкой.'),
    body('first_name')
        .notEmpty()
        .withMessage('Имя обязательно.')
        .isString()
        .withMessage('Имя должно быть строкой.'),
    body('middle_name')
        .optional()
        .isString()
        .withMessage('Отчество должно быть строкой.'),
    body('birth_date')
        .notEmpty()
        .withMessage('Дата рождения обязательна.')
        .isDate()
        .withMessage('Дата рождения должна быть в формате YYYY-MM-DD.'),
    body('email')
        .notEmpty()
        .withMessage('Email обязателен.')
        .isEmail()
        .withMessage('Email должен быть корректным.'),
];

/**
 * Валидация параметров пагинации.
 */
const validatePagination = [
    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Номер страницы должен быть положительным целым числом.'),
    query('limit')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Лимит должен быть положительным целым числом.'),
];

const isUUID = (value) => {
    const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(value);
};

module.exports = {
    validateUserId,
    validateUserStatusId,
    validateCreateUser,
    validatePagination,
    isUUID,
};
