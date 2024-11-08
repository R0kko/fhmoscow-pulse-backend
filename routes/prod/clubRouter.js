const express = require('express');
const clubController = require('../../controllers/prod/clubController');
const router = express.Router();

router.get('/', clubController.getAllClubs);
router.get('/:id', clubController.getClubById);

module.exports = router;
