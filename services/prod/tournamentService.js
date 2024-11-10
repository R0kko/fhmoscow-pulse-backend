const app_db = require('../../models/prod_db');
const {
    formatTournamentResponse,
} = require('../../utils/helpers/tournamentHelper');

const getAllTournaments = async () => {
    const rawTournamentData = await app_db.Tournament.findAll({
        attributes: ['id', 'full_name'],
        include: [
            {
                model: app_db.Season,
                as: 'Season',
                attributes: ['id', 'name'],
                where: { object_status: 'active' },
            },
        ],
        where: { object_status: 'active' },
    });

    return formatTournamentResponse(rawTournamentData);
};

const getTournamentById = async (id) => {
    const rawTournamentData = await app_db.Tournament.findByPk(id, {
        attributes: ['id', 'full_name', 'short_name', 'date_start', 'date_end'],
        include: [
            {
                model: app_db.Season,
                as: 'Season',
                attributes: ['id', 'name'],
            },
        ],
    });

    // Если турнир не найден, возвращаем null
    if (!rawTournamentData) {
        return null;
    }

    return formatTournamentResponse(rawTournamentData);
};

const getTournamentsBySeason = async (seasonId) => {
    const rawTournamentData = await app_db.Tournament.findAll({
        attributes: ['id', 'full_name'],
        where: { season_id: seasonId, object_status: 'active' },
    });

    if (rawTournamentData.length === 0) {
        return [];
    }

    return rawTournamentData.map((tournament) => ({
        id: tournament.id,
        name: tournament.full_name,
    }));
};

module.exports = {
    getAllTournaments,
    getTournamentById,
    getTournamentsBySeason,
};
