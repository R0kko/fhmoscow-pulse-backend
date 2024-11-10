const prod_db = require('../../models/prod_db');
const {
    getLatestCalculatedTourId,
} = require('../../utils/helpers/tournamentHelper');
const {
    formatTournamentTableData,
} = require('../../utils/helpers/tournamentTableHelper');

/**
 * Получает турнирную таблицу для указанного сезона, турнира и группы, используя последний рассчитанный тур.
 * @param {number} seasonId - ID сезона
 * @param {number} tournamentId - ID турнира
 * @param {number} groupId - ID группы
 * @returns {Promise<Array>} - Отформатированные данные турнирной таблицы
 * @throws {Error} - Если данные не найдены
 */
const getTournamentTable = async (seasonId, tournamentId, groupId) => {
    const latestTourId = await getLatestCalculatedTourId(
        seasonId,
        tournamentId,
        groupId
    );

    const rawTournamentData = await prod_db.TournamentTable.findAll({
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
                model: prod_db.Team,
                as: 'Team',
                attributes: ['id', 'year'],
                include: [
                    {
                        model: prod_db.Club,
                        as: 'Club',
                        attributes: ['id', 'short_name'],
                    },
                ],
            },
        ],
        where: {
            season_id: seasonId,
            tournament_id: tournamentId,
            tournament_group_id: groupId,
            tour_id: latestTourId,
        },
        order: [['position', 'ASC']],
    });

    return formatTournamentTableData(rawTournamentData);
};

module.exports = {
    getTournamentTable,
};
