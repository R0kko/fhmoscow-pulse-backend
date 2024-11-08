const tournamentTableService = require('../../services/prod/tournamentTableService');

/**
 * Контроллер для получения турнирной таблицы на основе сезона, турнира и группы
 */
const getTournamentTable = async (req, res) => {
    const { season_id, tournament_id, group_id } = req.params;

    try {
        const tournamentTable = await tournamentTableService.getTournamentTable(
            season_id,
            tournament_id,
            group_id
        );
        res.json({ status: 'success', data: tournamentTable });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

module.exports = {
    getTournamentTable,
};
