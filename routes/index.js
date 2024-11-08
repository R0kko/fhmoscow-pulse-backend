const express = require('express');
const router = express.Router();

const authRoutes = require('./app/authRoutes');
const clubRouter = require('./prod/clubRouter');
const teamRouter = require('./prod/teamRouter');

router.use('/auth', authRoutes);
router.use('/clubs', clubRouter);
router.use('/teams', teamRouter);
router.use('/groups', require('./prod/groupRouter'));
router.use('/tournaments', require('./prod/tournamentRouter'));
router.use('/tournament-table', require('./prod/tournamentTableRouter'));

module.exports = router;
