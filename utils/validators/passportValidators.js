/**
 * Проверка СНИЛС
 * @param {string} snils - СНИЛС
 * @param {Array} errors - Массив для записи ошибок
 * @returns {boolean} - Результат проверки
 */
const validateSnils = (snils, errors) => {
    if (!snils || snils.length !== 11 || /\D/.test(snils)) {
        errors.push('СНИЛС должен содержать 11 цифр');
        return false;
    }

    const sum = snils
        .slice(0, 9)
        .split('')
        .reduce((acc, digit, index) => acc + digit * (9 - index), 0);
    const checkDigit = sum < 100 ? sum : (sum % 101) % 100;

    if (checkDigit !== parseInt(snils.slice(-2), 10)) {
        errors.push('Неправильное контрольное число СНИЛС');
        return false;
    }

    return true;
};

/**
 * Проверка ИНН
 * @param {string} inn - ИНН
 * @param {Array} errors - Массив для записи ошибок
 * @returns {boolean} - Результат проверки
 */
const validateInn = (inn, errors) => {
    if (!inn || !/^\d{10,12}$/.test(inn)) {
        errors.push('ИНН должен содержать 10 или 12 цифр');
        return false;
    }

    const checkDigit = (coefficients, innSlice) =>
        (coefficients.reduce(
            (acc, coeff, index) => acc + coeff * parseInt(innSlice[index], 10),
            0
        ) %
            11) %
        10;

    if (inn.length === 10) {
        const check = checkDigit([2, 4, 10, 3, 5, 9, 4, 6, 8], inn);
        if (check !== parseInt(inn[9], 10)) {
            errors.push('Неправильное контрольное число ИНН (10 цифр)');
            return false;
        }
    } else if (inn.length === 12) {
        const check1 = checkDigit([7, 2, 4, 10, 3, 5, 9, 4, 6, 8], inn);
        const check2 = checkDigit([3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8], inn);
        if (
            check1 !== parseInt(inn[10], 10) ||
            check2 !== parseInt(inn[11], 10)
        ) {
            errors.push('Неправильное контрольное число ИНН (12 цифр)');
            return false;
        }
    }

    return true;
};

/**
 * Проверка данных паспорта
 * @param {Object} passportData - Данные паспорта
 * @returns {boolean} - Результат проверки
 */
const validatePassportData = (passportData) => {
    const { series, number, issue_date, issuing_authority, place_of_birth } =
        passportData;

    if (
        !passportData.country_id ||
        !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(
            passportData.country_id
        )
    )
        return false;
    if (!/^\d{4}$/.test(series)) return false;
    if (!/^\d{6}$/.test(number)) return false;
    if (
        passportData.department_code &&
        !/^\d{3}-\d{3}$/.test(passportData.department_code)
    )
        return false;
    if (!issue_date || isNaN(Date.parse(issue_date))) return false;
    if (!issuing_authority || typeof issuing_authority !== 'string')
        return false;
    return !(!place_of_birth || typeof place_of_birth !== 'string');
};

module.exports = {
    validateSnils,
    validateInn,
    validatePassportData,
};
