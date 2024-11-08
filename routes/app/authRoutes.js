const express = require('express');
const router = express.Router();
const authController = require('../../controllers/app/authController');

// Маршрут для входа
router.post('/login', authController.login);

module.exports = router;
