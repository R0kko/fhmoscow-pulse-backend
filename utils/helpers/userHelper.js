const bcrypt = require('bcryptjs');
const app_db = require('../../models/app_db');

const checkDuplicate = async (whereCondition, errorMessage) => {
    const existingRecord = await app_db.User.findOne({ where: whereCondition });
    if (existingRecord) {
        throw new Error(errorMessage);
    }
};

const generateRandomPassword = async () => {
    const password = Math.random().toString(36).slice(-16);
    const hashedPassword = await bcrypt.hash(password, 12);
    return { password, hashedPassword };
};

module.exports = {
    checkDuplicate,
    generateRandomPassword,
};
