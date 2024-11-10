const { param } = require('express-validator');

const validateGroupId = param('id')
    .isInt({ min: 1 })
    .withMessage('Group ID must be a positive integer');

const validateTournamentId = param('id')
    .isInt({ min: 1 })
    .withMessage('Tournament ID must be a positive integer');

module.exports = {
    validateGroupId,
    validateTournamentId,
};
