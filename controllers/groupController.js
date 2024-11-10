const groupService = require('../services/prod/groupService');
const { formatGroupData } = require('../utils/helpers/groupHelper');

const getAllGroups = async (req, res) => {
    try {
        const groups = await groupService.getAllGroups();
        res.json({ status: 'success', data: formatGroupData(groups) });
    } catch {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};

const getGroupById = async (req, res) => {
    try {
        const group = await groupService.getGroupById(req.params.id);
        if (!group) {
            return res
                .status(404)
                .json({ status: 'error', message: 'Group not found' });
        }
        res.json({ status: 'success', data: formatGroupData([group])[0] });
    } catch {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};

const getGroupsByTournamentId = async (req, res) => {
    try {
        const groups = await groupService.getGroupsByTournamentId(
            req.params.id
        );

        if (!groups || groups.length === 0) {
            return res
                .status(404)
                .json({ status: 'error', message: 'Groups not found' });
        }

        res.json({ status: 'success', data: formatGroupData(groups) });
    } catch {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
};

module.exports = {
    getAllGroups,
    getGroupById,
    getGroupsByTournamentId,
};
