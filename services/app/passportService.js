const axios = require('axios');
const app_db = require('../../models/app_db');
const {
    formatPassportData,
} = require('../../utils/formatters/passportFormatter');
const {
    validatePassportData,
} = require('../../utils/validators/passportValidators');

const DADATA_PASSPORT_URL = 'https://cleaner.dadata.ru/api/v1/clean/passport';
const DADATA_API_KEY = process.env.DADATA_API_KEY;
const DADATA_SECRET_KEY = process.env.DADATA_SECRET_KEY;

/**
 * Проверить паспорт через DaData
 * @param {string} series - Серия паспорта
 * @param {string} number - Номер паспорта
 * @returns {Promise<void>} - Бросает ошибку, если паспорт недействителен
 */
const validatePassportWithDaData = async (series, number) => {
    const passportInput = `${series.replace(/\s/g, '')} ${number}`;
    try {
        const response = await axios.post(
            DADATA_PASSPORT_URL,
            [passportInput],
            {
                headers: {
                    Authorization: `Token ${DADATA_API_KEY}`,
                    'X-Secret': DADATA_SECRET_KEY,
                    'Content-Type': 'application/json',
                },
            }
        );

        const data = response.data[0];
        if (!data || data.qc !== 0) {
            const errorMessages = {
                1: 'Неправильный формат серии или номера паспорта',
                10: 'Паспорт недействителен',
            };
            throw new Error(
                errorMessages[data.qc] || 'Паспорт не прошел проверку'
            );
        }
    } catch (error) {
        console.error('Ошибка проверки паспорта через DaData:', error.message);
        throw new Error('Не удалось проверить паспорт через DaData');
    }
};

/**
 * Получить паспорт пользователя по ID пользователя
 * @param {string} userId - UUID пользователя
 * @returns {Promise<Object|null>} - Паспорт пользователя или null
 */
const getUserPassport = async (userId) => {
    try {
        const passport = await app_db.Passport.findOne({
            where: { user_id: userId },
            include: [
                {
                    model: app_db.Country,
                    as: 'Country',
                    attributes: ['name'],
                },
            ],
        });

        return formatPassportData(passport);
    } catch (error) {
        console.error('Ошибка получения паспорта:', error);
        throw new Error('Ошибка при обращении к базе данных');
    }
};

/**
 * Добавить паспорт пользователя
 * @param {string} userId - UUID пользователя
 * @param {Object} passportData - Данные паспорта
 * @returns {Promise<Object>} - Созданный паспорт
 */
const addUserPassport = async (userId, passportData) => {
    try {
        // Проверяем, существует ли пользователь
        const userExists = await app_db.User.findByPk(userId);
        if (!userExists) {
            throw new Error(`Пользователь с ID ${userId} не найден`);
        }

        // Проверка обязательных полей
        const requiredFields = [
            'country_id',
            'series',
            'number',
            'issue_date',
            'issuing_authority',
            'place_of_birth',
        ];
        const missingFields = requiredFields.filter(
            (field) => !passportData[field]
        );

        if (missingFields.length) {
            throw new Error(
                `Отсутствуют обязательные поля: ${missingFields.join(', ')}`
            );
        }

        // Удаляем пробелы из серии и номера паспорта
        passportData.series = passportData.series.replace(/\D/g, '');
        passportData.number = passportData.number.replace(/\D/g, '');

        // Проверяем, есть ли уже паспорт у пользователя
        const existingPassport = await app_db.Passport.findOne({
            where: { user_id: userId },
        });

        if (existingPassport) {
            throw new Error('У пользователя уже есть паспорт');
        }

        // Проверка через DaData
        await validatePassportWithDaData(
            passportData.series,
            passportData.number
        );

        // Валидируем данные паспорта
        if (!validatePassportData(passportData)) {
            throw new Error('Ошибка валидации паспорта');
        }

        // Создаем паспорт
        return await app_db.Passport.create({
            ...passportData,
            user_id: userId,
        });
    } catch (error) {
        console.error('Ошибка добавления паспорта:', error.message);
        throw new Error(error.message || 'Ошибка при добавлении паспорта');
    }
};

/**
 * Обновить паспорт пользователя
 * @param {string} userId - UUID пользователя
 * @param {Object} passportData - Данные паспорта
 * @returns {Promise<Object>} - Обновленный паспорт
 */
const updateUserPassport = async (userId, passportData) => {
    try {
        const passport = await app_db.Passport.findOne({
            where: { user_id: userId },
        });

        if (!passport) {
            throw new Error('Паспорт не найден');
        }

        // Проверка через DaData
        await validatePassportWithDaData(
            passportData.series,
            passportData.number
        );

        await passport.update(passportData);
        return passport;
    } catch (error) {
        console.error('Ошибка обновления паспорта:', error);
        throw new Error('Ошибка при обновлении паспорта');
    }
};

/**
 * Добавить или обновить паспорт пользователя
 * @param {string} userId - UUID пользователя
 * @param {Object} passportData - Данные паспорта
 * @returns {Promise<Object>} - Созданный или обновленный паспорт
 */
const addOrUpdateUserPassport = async (userId, passportData) => {
    try {
        // Удалить пробелы из серии и номера паспорта
        passportData.series = passportData.series.replace(/\D/g, '');
        passportData.number = passportData.number.replace(/\D/g, '');

        const passport = await app_db.Passport.findOne({
            where: { user_id: userId },
        });

        // Проверка через DaData
        await validatePassportWithDaData(
            passportData.series,
            passportData.number
        );

        if (passport) {
            await passport.update(passportData);
            return passport;
        }

        return await app_db.Passport.create({
            ...passportData,
            user_id: userId,
        });
    } catch (error) {
        console.error('Ошибка добавления или обновления паспорта:', error);
        throw new Error('Ошибка при добавлении или обновлении паспорта');
    }
};

module.exports = {
    getUserPassport,
    addUserPassport,
    updateUserPassport,
    addOrUpdateUserPassport,
};
