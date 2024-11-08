const express = require('express');
const tournamentController = require('../../controllers/prod/tournamentController');
const router = express.Router();

router.get('/', tournamentController.getAllTournaments);
router.get('/:id', tournamentController.getTournamentById);

module.exports = router;
