const tournamentTableService = require('../services/prod/tournamentTableService');
const validationService = require('../services/prod/validationService');

/**
 * @swagger
 * /api/tournament-table/get-actual-table/{season_id}/{tournament_id}/{group_id}:
 *   get:
 *     summary: Получить актуальную турнирную таблицу для указанного сезона, турнира и группы
 *     description: Возвращает турнирную таблицу на основе последнего рассчитанного тура для указанного сезона, турнира и группы
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
 *         description: Турнирная таблица не найдена или один из параметров не существует
 *       500:
 *         description: Внутренняя ошибка сервера
 */

const getTournamentTable = async (req, res) => {
    const { season_id, tournament_id, group_id } = req.params;

    try {
        const seasonId = parseInt(season_id, 10);
        const tournamentId = parseInt(tournament_id, 10);
        const groupId = parseInt(group_id, 10);

        // Проверка существования параметров
        const { seasonExists, tournamentExists, groupExists } =
            await validationService.validateParamsExistence(
                seasonId,
                tournamentId,
                groupId
            );

        const errors = [];
        if (!seasonExists)
            errors.push({ param: 'season_id', message: 'Season not found' });
        if (!tournamentExists)
            errors.push({
                param: 'tournament_id',
                message: 'Tournament not found',
            });
        if (!groupExists)
            errors.push({ param: 'group_id', message: 'Group not found' });

        if (errors.length > 0) {
            return res.status(404).json({
                status: 'error',
                message: 'One or more parameters were not found',
                errors,
            });
        }

        // Получение данных турнирной таблицы
        const data = await tournamentTableService.getTournamentTable(
            seasonId,
            tournamentId,
            groupId
        );

        if (!data || data.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Tournament table not found',
            });
        }

        res.json({ status: 'success', data });
    } catch (error) {
        console.error('Error fetching tournament table:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};

module.exports = {
    getTournamentTable,
};
