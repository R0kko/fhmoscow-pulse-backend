const express = require('express');
const tournamentController = require('../controllers/tournamentController');
const validateRequest = require('../middlewares/validateRequest');
const {
    validateTournamentId,
    validateSeasonId,
} = require('../utils/validators/tournamentValidators');

const router = express.Router();

/**
 * @swagger
 * /api/tournaments/get-all-tournaments:
 *   get:
 *     summary: Получить список всех активных турниров
 *     tags: [Турниры]
 *     responses:
 *       200:
 *         description: Успешный запрос списка турниров
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Московский чемпионат"
 *                       season:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           name:
 *                             type: string
 *                             example: "Сезон 2024/2025"
 */
router.get('/get-all-tournaments', tournamentController.getAllTournaments);

/**
 * @swagger
 * /api/tournaments/get-tournament-by-id/{id}:
 *   get:
 *     summary: Получить информацию о турнире по ID
 *     tags: [Турниры]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID турнира
 *     responses:
 *       200:
 *         description: Успешный запрос турнира
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Московский чемпионат"
 *                     short_name:
 *                       type: string
 *                       example: "Чемпионат Москвы"
 *                     date_start:
 *                       type: string
 *                       format: date
 *                       example: "2024-09-06T00:00:00.000Z"
 *                     date_end:
 *                       type: string
 *                       format: date
 *                       example: "2024-09-06T00:00:00.000Z"
 *                     season:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           example: 1
 *                         name:
 *                           type: string
 *                           example: "Сезон 2024/2025"
 *       404:
 *         description: Турнир не найден
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: "Tournament not found"
 *       400:
 *         description: Неправильный формат ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: "ID must be a positive integer"
 */
router.get(
    '/get-tournament-by-id/:id',
    validateTournamentId,
    validateRequest,
    tournamentController.getTournamentById
);

/**
 * @swagger
 * /api/tournaments/get-tournaments-for-season/{season_id}:
 *   get:
 *     summary: Получить список турниров по ID сезона
 *     tags: [Турниры]
 *     parameters:
 *       - in: path
 *         name: season_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID сезона
 *     responses:
 *       200:
 *         description: Успешный запрос списка турниров для сезона
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Московский чемпионат"
 *       404:
 *         description: Сезон или турниры для этого сезона не найдены
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: "No tournaments found for this season"
 *       400:
 *         description: Неправильный формат season_id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: "Season ID must be a positive integer"
 */
router.get(
    '/get-tournaments-for-season/:season_id',
    validateSeasonId,
    validateRequest,
    tournamentController.getTournamentsListBySeason
);

module.exports = router;
