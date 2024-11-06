const app_db = require('../models/app_db');
const roleService = require('./roleService');
const userStatusService = require('./userStatusService');

const { generateToken, comparePassword } = require('../utils/authUtils');
const { sanitizeUser } = require('../utils/userUtils');

const login = async (email, password) => {
    const user = await app_db.User.findOne({ where: { email } });

    if (!user) throw new Error('User not found');

    // Проверка пароля
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    // Генерация токена
    const token = generateToken(user);

    // Получение ролей пользователя через RoleService
    const roles = await roleService.getUserRoles(user.id);

    // Получение alias статуса пользователя через UserStatusService
    const userStatusAlias = await userStatusService.getUserStatusAlias(
        user.user_status_id
    );

    const userData = sanitizeUser(user);

    userData.user_status = userStatusAlias;
    delete userData.user_status_id;

    return { token, user: userData, roles };
};

module.exports = {
    login,
};
