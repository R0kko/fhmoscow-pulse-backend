/**
 * Утилита для преобразования данных паспорта
 */
const formatPassportData = (passportData) => {
    if (!passportData) {
        return null;
    }

    return {
        country: passportData.Country?.name || null,
        series: passportData.series,
        number: passportData.number,
        issue_date: passportData.issue_date,
        issuing_authority: passportData.issuing_authority,
        department_code: passportData.department_code,
        place_of_birth: passportData.place_of_birth,
    };
};

module.exports = {
    formatPassportData,
};
