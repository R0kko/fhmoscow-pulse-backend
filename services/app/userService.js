const axios = require('axios');
const app_db = require('../../models/app_db');
const {
    checkDuplicate,
    generateRandomPassword,
} = require('../../utils/helpers/userHelper');
const { getUserStatusIdByAlias } = require('./userStatusService');

const DADATA_PHONE_URL = 'https://cleaner.dadata.ru/api/v1/clean/phone';
const DADATA_EMAIL_URL = 'https://cleaner.dadata.ru/api/v1/clean/email';
const DADATA_NAME_URL = 'https://cleaner.dadata.ru/api/v1/clean/name';
const DADATA_API_KEY = process.env.DADATA_API_KEY;
const DADATA_SECRET_KEY = process.env.DADATA_SECRET_KEY;

/**
 * Проверка и стандартизация ФИО через DaData
 * @param {string} fullName - Полное имя (ФИО)
 * @returns {Promise<Object>} - Объект с информацией о ФИО
 * @throws {Error} - Если имя некорректно
 */
const validateAndStandardizeFullName = async (fullName) => {
    try {
        const response = await axios.post(DADATA_NAME_URL, [fullName], {
            headers: {
                Authorization: `Token ${DADATA_API_KEY}`,
                'X-Secret': DADATA_SECRET_KEY,
                'Content-Type': 'application/json',
            },
        });

        const data = response.data[0];
        if (!data || data.qc !== 0) {
            throw new Error(
                'ФИО должно быть корректным и распознанным уверенно'
            );
        }

        return {
            fullName: data.result,
            surname: data.surname,
            name: data.name,
            patronymic: data.patronymic,
            gender:
                data.gender === 'М'
                    ? 'MALE'
                    : data.gender === 'Ж'
                      ? 'FEMALE'
                      : 'UNDEFINED',
            genitive: data.result_genitive,
            dative: data.result_dative,
            ablative: data.result_ablative,
        };
    } catch (error) {
        console.error(`Ошибка стандартизации ФИО: ${error.message}`);
        throw new Error('Не удалось стандартизировать ФИО');
    }
};

/**
 * Проверка СНИЛС на корректность
 * @param {string} snils - СНИЛС
 * @throws {Error} - Если СНИЛС некорректен
 */
const validateSnils = (snils) => {
    const cleanedSnils = snils.replace(/\D/g, '');
    if (cleanedSnils.length !== 11) {
        throw new Error('СНИЛС должен состоять из 11 цифр');
    }
    const numbers = cleanedSnils.slice(0, 9).split('').map(Number);
    const controlSum = numbers.reduce(
        (sum, num, idx) => sum + num * (9 - idx),
        0
    );
    const controlNumber = cleanedSnils.slice(9);
    const calculatedControl =
        controlSum < 100
            ? controlSum
            : controlSum % 101 === 100
              ? 0
              : controlSum % 101;

    if (calculatedControl.toString().padStart(2, '0') !== controlNumber) {
        throw new Error('Некорректное контрольное число СНИЛС');
    }
};

/**
 * Проверка ИНН на корректность
 * @param {string} inn - ИНН
 * @throws {Error} - Если ИНН некорректен
 */
const validateInn = (inn) => {
    const cleanedInn = inn.replace(/\D/g, '');
    if (![10, 12].includes(cleanedInn.length)) {
        throw new Error('ИНН должен быть длиной 10 или 12 цифр');
    }

    const calculateControlDigit = (coefficients, innPart) =>
        (coefficients.reduce(
            (sum, coef, idx) => sum + coef * +innPart[idx],
            0
        ) %
            11) %
        10;

    const isValid =
        cleanedInn.length === 10
            ? calculateControlDigit(
                  [2, 4, 10, 3, 5, 9, 4, 6, 8],
                  cleanedInn
              ) === +cleanedInn[9]
            : calculateControlDigit(
                  [7, 2, 4, 10, 3, 5, 9, 4, 6, 8],
                  cleanedInn.slice(0, 10)
              ) === +cleanedInn[10] &&
              calculateControlDigit(
                  [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8],
                  cleanedInn.slice(0, 11)
              ) === +cleanedInn[11];

    if (!isValid) {
        throw new Error('Некорректное контрольное число ИНН');
    }
};

/**
 * Стандартизация телефона через DaData
 * @param {string} phone - Телефон
 * @returns {Promise<string>} - Стандартизованный номер
 * @throws {Error} - Если номер некорректен
 */
const validateAndStandardizePhone = async (phone) => {
    try {
        const response = await axios.post(DADATA_PHONE_URL, [phone], {
            headers: {
                Authorization: `Token ${DADATA_API_KEY}`,
                'X-Secret': DADATA_SECRET_KEY,
                'Content-Type': 'application/json',
            },
        });

        const data = response.data[0];
        if (!data || data.type !== 'Мобильный' || data.qc !== 0) {
            throw new Error('Телефон должен быть мобильным и корректным');
        }

        return data.phone.replace(/\D/g, '');
    } catch (error) {
        console.error(`Ошибка стандартизации телефона: ${error.message}`);
        throw new Error('Не удалось стандартизировать номер телефона');
    }
};

/**
 * Проверка и стандартизация email через DaData
 * @param {string} email - Email пользователя
 * @returns {Promise<string>} - Стандартизованный email
 * @throws {Error} - Если email некорректен
 */
const validateAndStandardizeEmail = async (email) => {
    try {
        const response = await axios.post(DADATA_EMAIL_URL, [email], {
            headers: {
                Authorization: `Token ${DADATA_API_KEY}`,
                'X-Secret': DADATA_SECRET_KEY,
                'Content-Type': 'application/json',
            },
        });

        const data = response.data[0];
        if (!data || data.qc !== 0 || data.type !== 'PERSONAL') {
            throw new Error('Email должен быть личным и корректным');
        }

        return data.email;
    } catch (error) {
        console.error(`Ошибка стандартизации email: ${error.message}`);
        throw new Error('Не удалось стандартизировать email');
    }
};

/**
 * Создать нового пользователя
 * @param {Object} userData - Данные пользователя
 * @returns {Promise<Object>} - Созданный пользователь
 */
const createUser = async (userData) => {
    const { fullName, birth_date, email, snils, inn, phone } = userData;

    // Инициализация транзакции
    const transaction = await app_db.sequelize.transaction();

    try {
        // Валидация обязательных полей
        if (!fullName || !snils || !inn || !phone || !email) {
            throw new Error(
                'ФИО, СНИЛС, ИНН, телефон и email являются обязательными'
            );
        }

        // Стандартизация данных
        const nameData = await validateAndStandardizeFullName(fullName);
        validateSnils(snils);
        validateInn(inn);
        const standardizedEmail = await validateAndStandardizeEmail(email);
        const standardizedPhone = await validateAndStandardizePhone(phone);

        // Проверка на дубликаты
        await checkDuplicate(
            { email: standardizedEmail },
            'Пользователь с таким email уже существует'
        );
        await checkDuplicate(
            { snils },
            'Пользователь с таким СНИЛС уже существует'
        );
        await checkDuplicate(
            { inn },
            'Пользователь с таким ИНН уже существует'
        );
        await checkDuplicate(
            { phone: standardizedPhone },
            'Пользователь с таким телефоном уже существует'
        );

        // Генерация пароля
        const { hashedPassword } = await generateRandomPassword();

        // Получение статуса пользователя
        const user_status_id = await getUserStatusIdByAlias('ACTIVE');

        // Создание пользователя
        const newUser = await app_db.User.create(
            {
                first_name: nameData.name,
                last_name: nameData.surname,
                middle_name: nameData.patronymic,
                birth_date,
                email: standardizedEmail,
                password: hashedPassword,
                user_status_id,
                snils,
                inn,
                phone: standardizedPhone,
                gender: nameData.gender,
            },
            { transaction } // Включаем транзакцию
        );

        // Сохранение склонений имени
        await saveNameData(nameData, newUser.id, transaction);

        // Завершаем транзакцию
        await transaction.commit();

        return {
            id: newUser.id,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            middle_name: newUser.middle_name,
            birth_date: newUser.birth_date,
            email: newUser.email,
            snils: newUser.snils,
            inn: newUser.inn,
            phone: newUser.phone,
        };
    } catch (error) {
        // Откатываем транзакцию при ошибке
        await transaction.rollback();
        console.error(`Ошибка создания пользователя: ${error.message}`);
        throw new Error(error.message || 'Ошибка при создании пользователя');
    }
};

/**
 * Сохранение склонений имени пользователя в таблицу names
 * @param {Object} nameData - Данные о склонениях имени
 * @param {string} userId - ID пользователя
 * @param {Object} transaction - Sequelize транзакция
 */
const saveNameData = async (nameData, userId, transaction) => {
    const { genitive, dative, ablative, fullName } = nameData;

    const nameTypes = await app_db.NameType.findAll({
        attributes: ['id', 'alias'],
        transaction,
    });

    const nameTypeMap = nameTypes.reduce((acc, type) => {
        acc[type.alias] = type.id;
        return acc;
    }, {});

    const nameRecords = [
        {
            user_id: userId,
            name_type_id: nameTypeMap.GENITIVE,
            full_name: genitive,
        },
        {
            user_id: userId,
            name_type_id: nameTypeMap.DATIVE,
            full_name: dative,
        },
        {
            user_id: userId,
            name_type_id: nameTypeMap.ABLATIVE,
            full_name: ablative,
        },
        {
            user_id: userId,
            name_type_id: nameTypeMap.NOMINATIVE,
            full_name: fullName,
        },
    ];

    await app_db.Name.bulkCreate(nameRecords, { transaction });
};

/**
 * Получить всех пользователей
 * @returns {Promise<Array>} - Список пользователей
 */
const getAllUsers = async (page = 1, limit = 10) => {
    const offset = (page - 1) * limit;
    try {
        const { count, rows } = await app_db.User.findAndCountAll({
            attributes: [
                'id',
                'last_name',
                'first_name',
                'middle_name',
                'birth_date',
                'inn',
                'snils',
                'phone',
            ],
            where: { deletedAt: null },
            limit,
            offset,
        });

        return {
            data: rows,
            meta: {
                total: count,
                page,
                limit,
                pages: Math.ceil(count / limit),
            },
        };
    } catch (error) {
        console.error(`Ошибка при получении пользователей: ${error.message}`);
        throw new Error('Не удалось получить пользователей');
    }
};

const getUserById = async (id) => {
    try {
        const user = await app_db.User.findOne({
            where: { id },
        });

        if (!user) {
            throw new Error('Пользователь не найден');
        }

        return user;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw new Error('Ошибка при получении пользователя');
    }
};

module.exports = {
    createUser,
    validateSnils,
    validateInn,
    validateAndStandardizeEmail,
    validateAndStandardizePhone,
    getAllUsers,
    getUserById,
};
