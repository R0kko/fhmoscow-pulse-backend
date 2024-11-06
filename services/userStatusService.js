const app_db = require('../models/app_db');

const getUserStatusAlias = async (userStatusId) => {
    const userStatus = await app_db.UserStatus.findByPk(userStatusId, {
        attributes: ['alias'],
    });

    if (!userStatus)
        throw new Error(`UserStatus with ID ${userStatusId} not found`);

    return userStatus.alias;
};

module.exports = {
    getUserStatusAlias,
};
