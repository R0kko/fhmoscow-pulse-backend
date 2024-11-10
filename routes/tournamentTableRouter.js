const express = require('express');
const tournamentTableController = require('../controllers/tournamentTableController');
const {
    validateTournamentTableParams,
} = require('../utils/validators/tournamentTableValidators');
const validateRequest = require('../middlewares/validateRequest');

const router = express.Router();

/**
 * @swagger
 * /api/tournament-table/get-actual-table/{season_id}/{tournament_id}/{group_id}:
 *   get:
 *     summary: Получить актуальную турнирную таблицу для указанного сезона, турнира и группы
 *     description: Возвращает данные турнирной таблицы с последним рассчитанным туром для указанного сезона, турнира и группы
 *     tags: [Турнирные таблицы]
 *     parameters:
 *       - in: path
 *         name: season_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID сезона
 *       - in: path
 *         name: tournament_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID турнира
 *       - in: path
 *         name: group_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID группы
 *     responses:
 *       200:
 *         description: Успешный ответ с данными турнирной таблицы
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
 *                       club:
 *                         type: object
 *                         properties:
 *                           team_id:
 *                             type: integer
 *                           name:
 *                             type: string
 *                           year:
 *                             type: integer
 *                       tournament_table:
 *                         type: object
 *                         properties:
 *                           game_count:
 *                             type: integer
 *                           win_count:
 *                             type: integer
 *                           tie_count:
 *                             type: integer
 *                           loss_count:
 *                             type: integer
 *                           win_percent:
 *                             type: number
 *                           tie_percent:
 *                             type: number
 *                           loss_percent:
 *                             type: number
 *                           pucks_scored:
 *                             type: integer
 *                           pucks_scored_avg:
 *                             type: number
 *                           pucks_missed:
 *                             type: integer
 *                           pucks_missed_avg:
 *                             type: number
 *                           pucks_difference:
 *                             type: number
 *                           score:
 *                             type: integer
 *                           position:
 *                             type: integer
 *       400:
 *         description: Неправильный запрос (ошибка в параметрах)
 *       404:
 *         description: Турнирная таблица не найдена
 *       500:
 *         description: Внутренняя ошибка сервера
 */

router.get(
    '/get-actual-table/:season_id/:tournament_id/:group_id',
    validateTournamentTableParams,
    validateRequest,
    tournamentTableController.getTournamentTable
);

module.exports = router;

module.exports = router;
