const tournamentService = require('../../services/prod/tournamentService');

const getAllTournaments = async (req, res) => {
    try {
        const tournaments = await tournamentService.getAllTournaments();
        res.json({ status: 'success', data: tournaments });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const getTournamentById = async (req, res) => {
    try {
        const tournament = await tournamentService.getTournamentById(
            req.params.id
        );
        if (!tournament) {
            return res
                .status(404)
                .json({ status: 'error', message: 'Tournament not found' });
        }
        res.json({ status: 'success', data: tournament });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

module.exports = {
    getAllTournaments,
    getTournamentById,
};
