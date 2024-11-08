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
                attributes: ['id', 'name', 'object_status'],
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
                attributes: ['id', 'full_name', 'short_name', 'object_status'],
            },
            {
                model: app_db.Stage,
                as: 'Stage',
                attributes: ['id', 'name', 'object_status'],
            },
        ],
    });
};

module.exports = {
    getAllGroups,
    getGroupById,
};
