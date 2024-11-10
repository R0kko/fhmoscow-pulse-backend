const teamService = require('../services/prod/teamService');

const getAllTeams = async (req, res) => {
    try {
        const teams = await teamService.getAllTeams();
        res.json({ status: 'success', data: teams });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const getTeamById = async (req, res) => {
    try {
        const team = await teamService.getTeamById(req.params.id);
        if (!team) {
            return res
                .status(404)
                .json({ status: 'error', message: 'Team not found' });
        }
        res.json({ status: 'success', data: team });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

module.exports = {
    getAllTeams,
    getTeamById,
};
