const app_db = require('../../models/prod_db');

const getAllTeams = async () => {
    return await app_db.Team.findAll({
        attributes: ['id', 'short_name', 'year'],
        include: [
            {
                model: app_db.Club,
                as: 'Club',
                attributes: ['id', 'short_name'],
                where: { object_status: 'active' },
            },
        ],
        where: { object_status: 'active' },
    });
};

const getTeamById = async (id) => {
    return await app_db.Team.findByPk(id, {
        include: [
            {
                model: app_db.Club,
                as: 'Club',
                attributes: ['id', 'full_name', 'short_name', 'object_status'],
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
    getAllTeams,
    getTeamById,
};
