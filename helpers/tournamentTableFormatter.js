/**
 * Форматирует данные турнирной таблицы, разделяя информацию о команде и статистику
 * @param {Array} tournamentData - Сырые данные турнирной таблицы с включением команды
 * @returns {Array} - Отформатированные данные с раздельной информацией по команде и статистике
 */
const formatTournamentTableData = (tournamentData) => {
    return tournamentData.map((entry) => {
        return {
            team: {
                id: entry.Team.id,
                name: entry.Team.short_name,
                year: entry.Team.year,
            },
            tournament_table: {
                game_count: entry.game_count,
                win_count: entry.win_count,
                tie_count: entry.tie_count,
                loss_count: entry.loss_count,
                win_percent: entry.win_percent,
                tie_percent: entry.tie_percent,
                loss_percent: entry.loss_percent,
                pucks_scored: entry.pucks_scored,
                pucks_scored_avg: entry.pucks_scored_avg,
                pucks_missed: entry.pucks_missed,
                pucks_missed_avg: entry.pucks_missed_avg,
                pucks_difference: entry.pucks_difference,
                score: entry.score,
                position: entry.position,
            },
        };
    });
};

module.exports = {
    formatTournamentTableData,
};
