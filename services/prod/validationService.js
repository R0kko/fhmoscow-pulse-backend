const prod_db = require('../../models/prod_db');

/**
 * Проверяет существование сезона, турнира и группы по их ID.
 * @param {number} seasonId - ID сезона
 * @param {number} tournamentId - ID турнира
 * @param {number} groupId - ID группы
 * @returns {Promise<Object>} - Объект, указывающий существование параметров
 */
const validateParamsExistence = async (seasonId, tournamentId, groupId) => {
    const seasonExists = await prod_db.Season.findByPk(seasonId);
    const tournamentExists = await prod_db.Tournament.findByPk(tournamentId);
    const groupExists = await prod_db.Group.findByPk(groupId);

    return {
        seasonExists: !!seasonExists,
        tournamentExists: !!tournamentExists,
        groupExists: !!groupExists,
    };
};

module.exports = {
    validateParamsExistence,
};
