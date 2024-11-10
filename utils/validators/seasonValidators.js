const { param } = require('express-validator');

const validateSeasonId = param('season_id')
    .isInt({ min: 1 })
    .withMessage('Season ID must be a positive integer');

module.exports = {
    validateSeasonId,
};
