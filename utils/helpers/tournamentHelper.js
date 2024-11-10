const app_db = require('../../models/prod_db');

/**
 * Получает последний рассчитанный `tour_id` для указанного турнира, сезона и группы.
 */
const getLatestCalculatedTourId = async (seasonId, tournamentId, groupId) => {
    const latestTourRecord = await app_db.TournamentTable.findOne({
        where: {
            season_id: seasonId,
            tournament_id: tournamentId,
            tournament_group_id: groupId,
        },
        attributes: ['tour_id'],
        order: [[app_db.sequelize.literal('tour_id'), 'DESC']],
    });

    if (!latestTourRecord) {
        throw new Error(
            'Нет сохраненных рассчитанных туров для указанного турнира, сезона и группы'
        );
    }

    return latestTourRecord.tour_id;
};

/**
 * Форматирует ответ с информацией о турнире или турнирах.
 * @param {Array|Object} tournaments - Массив или одиночный объект с информацией о турнире.
 * @returns {Array|Object} - Отформатированный ответ.
 */
const formatTournamentResponse = (tournaments) => {
    if (Array.isArray(tournaments)) {
        return tournaments.map((tournament) => ({
            id: tournament.id,
            name: tournament.full_name,
            season: tournament.Season
                ? {
                      id: tournament.Season.id,
                      name: tournament.Season.name,
                  }
                : null,
        }));
    }

    return {
        id: tournaments.id,
        name: tournaments.full_name,
        short_name: tournaments.short_name,
        date_start: tournaments.date_start,
        date_end: tournaments.date_end,
        season: tournaments.Season
            ? {
                  id: tournaments.Season.id,
                  name: tournaments.Season.name,
              }
            : null,
    };
};

module.exports = {
    getLatestCalculatedTourId,
    formatTournamentResponse,
};
