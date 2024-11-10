const seasonService = require('../services/prod/seasonSevice');

/**
 * Контроллер для получения списка сезонов
 */
const getAllSeasons = async (req, res) => {
    try {
        const seasons = await seasonService.getAllSeasons();
        res.json({ status: 'success', data: seasons });
    } catch {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};

/**
 * Контроллер для получения сезона по ID
 */
const getSeasonById = async (req, res) => {
    try {
        const season = await seasonService.getSeasonById(req.params.season_id);
        if (!season) {
            return res
                .status(404)
                .json({ status: 'error', message: 'Season not found' });
        }
        res.json({ status: 'success', data: season });
    } catch {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};

module.exports = {
    getAllSeasons,
    getSeasonById,
};
