/**
 * Форматирует данные пользователя перед отправкой клиенту
 * @param {Object} user - Данные пользователя из базы данных
 * @returns {Object} - Отформатированные данные
 */
const formatUserData = (user) => {
    return {
        id: user.id,
        last_name: user.last_name,
        first_name: user.first_name,
        middle_name: user.middle_name,
        birth_date: user.birth_date,
        email: user.email,
        phone: user.phone,
        snils: user.snils,
        inn: user.inn,
        roles: user.Roles ? user.Roles.map((role) => role.name) : [],
    };
};

module.exports = {
    formatUserData,
};
