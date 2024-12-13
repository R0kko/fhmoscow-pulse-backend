const express = require('express');
const passportController = require('../controllers/passportController');

const router = express.Router();

router.get('/:userId', passportController.getUserPassport);
router.post('/:userId', passportController.addUserPassport);
router.put('/:userId', passportController.updateUserPassport);
router.patch('/:userId', passportController.addOrUpdateUserPassport);

module.exports = router;
