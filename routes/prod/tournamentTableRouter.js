const express = require('express');
const tournamentTableController = require('../../controllers/prod/tournamentTableController');
const router = express.Router();

router.get(
    '/:season_id/:tournament_id/:group_id',
    tournamentTableController.getTournamentTable
);

module.exports = router;
