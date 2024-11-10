const clubService = require('../services/prod/clubService');

const getAllClubs = async (req, res) => {
    try {
        const clubs = await clubService.getAllClubs();
        res.json({ status: 'success', data: clubs });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'error', message: error.message });
    }
};

const getClubById = async (req, res) => {
    try {
        const club = await clubService.getClubById(req.params.id);
        if (!club) {
            return res
                .status(404)
                .json({ status: 'error', message: 'Club not found' });
        }
        res.json({ status: 'success', data: club });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

module.exports = {
    getAllClubs,
    getClubById,
};
