const app_db = require('../../models/app_db');

const getUserStatusAlias = async (userStatusId) => {
    const userStatus = await app_db.UserStatus.findByPk(userStatusId, {
        attributes: ['alias'],
    });

    if (!userStatus)
        throw new Error(`UserStatus with ID ${userStatusId} not found`);

    return userStatus.alias;
};

const getUserStatusIdByAlias = async (alias) => {
    const userStatus = await app_db.UserStatus.findOne({
        where: { alias },
        attributes: ['id'],
    });

    if (!userStatus)
        throw new Error(`UserStatus with alias ${alias} not found`);

    return userStatus.id;
};

module.exports = {
    getUserStatusAlias,
    getUserStatusIdByAlias,
};
