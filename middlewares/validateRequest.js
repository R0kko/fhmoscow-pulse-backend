const { validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            message: 'Ошибка валидации',
            errors: errors.array().map((err) => ({
                param: err.param,
                message: err.msg,
            })),
        });
    }
    next();
};

module.exports = validateRequest;
