const express = require('express');
const addressController = require('../controllers/addressController');
const router = express.Router();

router.post('/:userId', addressController.addOrUpdateAddress);
router.delete('/address/:addressId', addressController.deleteAddress);
router.get('/:userId', addressController.getUserAddresses);

module.exports = router;
