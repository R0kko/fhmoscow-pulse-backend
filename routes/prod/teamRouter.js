const express = require('express');
const teamController = require('../../controllers/prod/teamController');
const router = express.Router();

router.get('/', teamController.getAllTeams);
router.get('/:id', teamController.getTeamById);

module.exports = router;
