const app_db = require('../../models/prod_db');

const getAllTournaments = async () => {
    return await app_db.Tournament.findAll({
        attributes: ['id', 'full_name'],
        include: [
            {
                model: app_db.Season,
                as: 'Season',
                attributes: ['name'],
                where: { object_status: 'active' },
            },
        ],
        where: { object_status: 'active' },
    });
};

const getTournamentById = async (id) => {
    return await app_db.Tournament.findByPk(id, {
        attributes: [
            'id',
            'full_name',
            'short_name',
            'date_start',
            'date_end',
            'object_status',
        ],
        include: [
            {
                model: app_db.Season,
                as: 'Season',
                attributes: ['id', 'name', 'object_status'],
            },
            {
                model: app_db.File,
                as: 'File',
                attributes: ['id', 'mime_type', 'size', 'name'],
            },
        ],
    });
};

module.exports = {
    getAllTournaments,
    getTournamentById,
};
