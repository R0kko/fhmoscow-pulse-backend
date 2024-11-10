const app_db = require('../../models/prod_db');

const getAllGroups = async () => {
    return await app_db.Group.findAll({
        attributes: ['id', 'name', 'object_status'],
        include: [
            {
                model: app_db.Tournament,
                as: 'Tournament',
                attributes: ['id', 'full_name', 'short_name'],
                where: { object_status: 'active' },
            },
            {
                model: app_db.Stage,
                as: 'Stage',
                attributes: ['id', 'name'],
                where: { object_status: 'active' },
            },
        ],
        where: { object_status: 'active' },
    });
};

const getGroupById = async (id) => {
    return await app_db.Group.findByPk(id, {
        attributes: ['id', 'name', 'object_status'],
        include: [
            {
                model: app_db.Tournament,
                as: 'Tournament',
                attributes: ['id', 'full_name', 'short_name'],
                where: { object_status: 'active' },
            },
            {
                model: app_db.Stage,
                as: 'Stage',
                attributes: ['id', 'name'],
                where: { object_status: 'active' },
            },
        ],
    });
};

// get group list by tournament id
const getGroupsByTournamentId = async (id) => {
    return await app_db.Group.findAll({
        attributes: ['id', 'name'],
        include: [
            {
                model: app_db.Tournament,
                as: 'Tournament',
                attributes: ['id', 'full_name', 'short_name'],
                where: { object_status: 'active' },
            },
            {
                model: app_db.Stage,
                as: 'Stage',
                attributes: ['id', 'name'],
                where: { object_status: 'active' },
            },
        ],
        where: { tournament_id: id, object_status: 'active' },
    });
};

module.exports = {
    getAllGroups,
    getGroupById,
    getGroupsByTournamentId,
};
