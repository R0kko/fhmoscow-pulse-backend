const app_db = require('../../models/prod_db');

const getAllClubs = async () => {
    return await app_db.Club.findAll({
        include: [
            {
                model: app_db.Team,
                as: 'Teams',
                attributes: ['id', 'full_name', 'short_name', 'object_status'],
            },
            {
                model: app_db.File,
                as: 'Logo',
                attributes: ['id', 'mime_type', 'size', 'name'],
            },
        ],
    });
};

const getClubById = async (id) => {
    return await app_db.Club.findByPk(id, {
        include: [
            {
                model: app_db.Team,
                as: 'Teams',
                attributes: ['id', 'full_name', 'short_name', 'object_status'],
            },
            {
                model: app_db.File,
                as: 'Logo',
                attributes: ['id', 'mime_type', 'size', 'name'],
            },
        ],
    });
};

module.exports = {
    getAllClubs,
    getClubById,
};
