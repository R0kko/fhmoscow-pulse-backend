const express = require('express');
const teamController = require('../controllers/teamController');
const router = express.Router();

router.get('/get-all-teams', teamController.getAllTeams);
router.get('/get-team-by-id/:id', teamController.getTeamById);

module.exports = router;
