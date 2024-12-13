const express = require('express');
const bankRequisitesController = require('../controllers/bankRequisitesController');

const router = express.Router();

// Добавить банковские реквизиты пользователя
router.post('/:userId', bankRequisitesController.addUserBankRequisites);
router.get('/:userId', bankRequisitesController.getUserBankRequisites);

module.exports = router;
