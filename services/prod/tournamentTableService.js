const app_db = require('../../models/prod_db');
const { getLatestCalculatedTourId } = require('../../helpers/tournamentHelper');
const {
    formatTournamentTableData,
} = require('../../helpers/tournamentTableFormatter');

/**
 * Получает турнирную таблицу для указанного сезона, турнира и группы, используя последний рассчитанный тур
 * @param {number} seasonId - ID сезона
 * @param {number} tournamentId - ID турнира
 * @param {number} groupId - ID группы
 * @returns {Promise<Array>} - Отформатированные данные турнирной таблицы
 * @throws {Error} - Если данные не найдены
 */
const getTournamentTable = async (seasonId, tournamentId, groupId) => {
    // Получаем ID последнего рассчитанного тура
    const latestTourId = await getLatestCalculatedTourId(
        seasonId,
        tournamentId,
        groupId
    );

    // Получаем данные из `tournament_table` для последнего рассчитанного тура
    const rawTournamentData = await app_db.TournamentTable.findAll({
        attributes: [
            'game_count',
            'win_count',
            'tie_count',
            'loss_count',
            'win_percent',
            'tie_percent',
            'loss_percent',
            'pucks_scored',
            'pucks_scored_avg',
            'pucks_missed',
            'pucks_missed_avg',
            'pucks_difference',
            'score',
            'position',
        ],
        include: [
            {
                model: app_db.Team,
                as: 'Team',
                attributes: ['id', 'full_name', 'short_name', 'year'],
            },
        ],
        where: {
            season_id: seasonId,
            tournament_id: tournamentId,
            tournament_group_id: groupId,
            tour_id: latestTourId,
        },
        order: [['position', 'ASC']], // Сортировка по позиции команды
    });

    // Форматируем данные перед возвращением
    return formatTournamentTableData(rawTournamentData);
};

module.exports = {
    getTournamentTable,
};
