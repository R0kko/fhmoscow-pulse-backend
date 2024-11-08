const app_db = require('../models/prod_db');

/**
 * Получает последний рассчитанный `tour_id` для указанного турнира, сезона и группы
 * @param {number} seasonId - ID сезона
 * @param {number} tournamentId - ID турнира
 * @param {number} groupId - ID группы
 * @returns {Promise<number>} - ID последнего рассчитанного тура
 * @throws {Error} - Если нет рассчитанных туров
 */
const getLatestCalculatedTourId = async (seasonId, tournamentId, groupId) => {
    const latestTourRecord = await app_db.TournamentTable.findOne({
        where: {
            season_id: seasonId,
            tournament_id: tournamentId,
            tournament_group_id: groupId,
        },
        attributes: ['tour_id'],
        order: [[app_db.sequelize.literal('tour_id'), 'DESC']], // Получаем последний tour_id
    });

    if (!latestTourRecord) {
        throw new Error(
            'No calculated tours found for the specified season, tournament, and group'
        );
    }

    return latestTourRecord.tour_id;
};

module.exports = {
    getLatestCalculatedTourId,
};
