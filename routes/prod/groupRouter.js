const express = require('express');
const groupController = require('../../controllers/prod/groupController');
const router = express.Router();

router.get('/', groupController.getAllGroups);
router.get('/:id', groupController.getGroupById);

module.exports = router;
