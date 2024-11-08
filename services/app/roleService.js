const app_db = require('../../models/app_db');

const getUserRoles = async (userId) => {
    const user = await app_db.User.findByPk(userId, {
        include: [
            {
                model: app_db.Role,
                attributes: ['alias'],
                through: { attributes: [] },
            },
        ],
    });

    if (!user) throw new Error(`User with ID ${userId} not found`);

    return user.Roles.map((role) => role.alias);
};

module.exports = {
    getUserRoles,
};
