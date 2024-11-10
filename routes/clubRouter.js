const express = require('express');
const clubController = require('../controllers/clubController');
const router = express.Router();

router.get('/get-all-clubs', clubController.getAllClubs);
router.get('/get-club-by-id/:id', clubController.getClubById);

module.exports = router;
