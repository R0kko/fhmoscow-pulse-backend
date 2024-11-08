const groupService = require('../../services/prod/groupService');

const getAllGroups = async (req, res) => {
    try {
        const groups = await groupService.getAllGroups();
        res.json({ status: 'success', data: groups });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
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
        res.json({ status: 'success', data: group });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

module.exports = {
    getAllGroups,
    getGroupById,
};
