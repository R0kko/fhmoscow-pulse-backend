const { param } = require('express-validator');

/**
 * Валидатор для ID турнира
 */
const validateTournamentId = [
    param('id')
        .isInt({ gt: 0 })
        .withMessage('Tournament ID must be a positive integer'),
];

/**
 * Валидатор для ID сезона
 */
const validateSeasonId = [
    param('season_id')
        .isInt({ gt: 0 })
        .withMessage('Season ID must be a positive integer'),
];

module.exports = {
    validateTournamentId,
    validateSeasonId,
};
