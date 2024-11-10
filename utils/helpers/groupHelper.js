/**
 * Форматирует данные групп для API-ответа
 * @param {Array} groups - Список групп из базы данных
 * @returns {Array} - Отформатированные данные групп
 */
const formatGroupData = (groups) => {
    return groups.map((group) => ({
        id: group.id,
        name: group.name,
        tournament: {
            id: group.Tournament.id,
            name: group.Tournament.full_name,
        },
        stage: {
            id: group.Stage.id,
            name: group.Stage.name,
        },
    }));
};

module.exports = {
    formatGroupData,
};
