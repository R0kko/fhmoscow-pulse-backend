const app_db = require('../../models/prod_db');

/**
 * Получает список всех активных сезонов
 * @returns {Promise<Array>} - Массив сезонов
 */
const getAllSeasons = async () => {
    return await app_db.Season.findAll({
        attributes: ['id', 'name'],
        where: { object_status: 'active' },
        order: [['date_create', 'DESC']],
    });
};

/**
 * Получает сезон по ID
 * @param {number} id - ID сезона
 * @returns {Promise<Object|null>} - Сезон или null, если не найден
 */
const getSeasonById = async (id) => {
    return await app_db.Season.findByPk(id, {
        attributes: ['id', 'name'],
    });
};

module.exports = {
    getAllSeasons,
    getSeasonById,
};
