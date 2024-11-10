const tournamentService = require('../services/prod/tournamentService');

const getAllTournaments = async (req, res) => {
    try {
        const tournaments = await tournamentService.getAllTournaments();
        res.json({ status: 'success', data: tournaments });
    } catch {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};

const getTournamentById = async (req, res) => {
    try {
        const tournament = await tournamentService.getTournamentById(
            req.params.id
        );

        // Если турнир не найден, возвращаем 404
        if (!tournament) {
            return res.status(404).json({
                status: 'error',
                message: 'Tournament not found',
            });
        }

        res.json({ status: 'success', data: tournament });
    } catch {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};

const getTournamentsListBySeason = async (req, res) => {
    try {
        const tournaments = await tournamentService.getTournamentsBySeason(
            req.params.season_id
        );

        // Если турниры для сезона не найдены, возвращаем 404
        if (!tournaments || tournaments.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'No tournaments found for this season',
            });
        }

        res.json({ status: 'success', data: tournaments });
    } catch {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};

module.exports = {
    getAllTournaments,
    getTournamentById,
    getTournamentsListBySeason,
};
