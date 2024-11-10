const { param } = require('express-validator');

/**
 * Валидаторы для маршрута получения турнирной таблицы
 */
const validateTournamentTableParams = [
    param('season_id')
        .isInt({ gt: 0 })
        .withMessage('Season ID must be a positive integer'),
    param('tournament_id')
        .isInt({ gt: 0 })
        .withMessage('Tournament ID must be a positive integer'),
    param('group_id')
        .isInt({ gt: 0 })
        .withMessage('Group ID must be a positive integer'),
];

module.exports = {
    validateTournamentTableParams,
};

module.exports = {
    validateTournamentTableParams,
};
