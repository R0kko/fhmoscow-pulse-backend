const axios = require('axios');
const app_db = require('../../models/app_db');

/**
 * Конфигурация для DaData
 */
const DADATA_BANK_URL =
    'http://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/bank';
const DADATA_API_KEY = process.env.DADATA_API_KEY;

/**
 * Валидация расчетного счета
 * @param {string} accountNumber - Расчетный счет
 * @param {string} bic - БИК банка
 * @throws {Error} - Если расчетный счет некорректен
 */
const validateAccountNumber = (accountNumber, bic) => {
    if (!/^\d{20}$/.test(accountNumber)) {
        throw new Error('Расчетный счет должен содержать 20 цифр');
    }

    const bicLastThree = bic.slice(-3);
    const controlString = bicLastThree + accountNumber;
    const coefficients = [7, 1, 3];

    let sum = 0;
    for (let i = 0; i < controlString.length; i++) {
        sum += Number(controlString[i]) * coefficients[i % coefficients.length];
    }

    if (sum % 10 !== 0) {
        throw new Error('Неверный расчетный счет');
    }
};

/**
 * Получить данные банка по БИК
 * @param {string} bic - БИК банка
 * @returns {Promise<Object>} - Данные банка из DaData
 */
const getBankDataByBic = async (bic) => {
    try {
        const response = await axios.post(
            DADATA_BANK_URL,
            { query: bic },
            {
                headers: {
                    Authorization: `Token ${DADATA_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (
            !response.data ||
            !response.data.suggestions ||
            response.data.suggestions.length === 0
        ) {
            throw new Error('Данные банка не найдены');
        }

        return response.data.suggestions[0];
    } catch (error) {
        console.error('Ошибка при запросе к DaData:', error.message);
        throw new Error('Не удалось получить данные банка');
    }
};

/**
 * Проверить существование реквизитов у пользователя
 * @param {string} userId - ID пользователя
 * @param {string} accountNumber - Расчетный счет
 * @param {string} bic - БИК банка
 * @returns {Promise<boolean>} - True, если реквизиты существуют
 */
const checkRequisitesExist = async (userId, accountNumber, bic) => {
    const userRequisite = await app_db.UserBankRequisite.findOne({
        where: {
            user_id: userId,
            account_number: accountNumber,
        },
        include: [
            {
                model: app_db.BankRequisite,
                as: 'BankRequisite',
                where: { bic },
            },
        ],
    });

    return !!userRequisite;
};

/**
 * Сохранить реквизиты банка
 * @param {Object} bankData - Данные банка
 * @returns {Promise<Object>} - Сохраненные реквизиты
 */
const saveBankRequisites = async (bankData) => {
    const transaction = await app_db.sequelize.transaction();

    try {
        const [bankRequisite] = await app_db.BankRequisite.findOrCreate({
            where: { bic: bankData.bic },
            defaults: {
                bic: bankData.bic,
                swift: bankData.swift,
                inn: bankData.inn,
                kpp: bankData.kpp,
                registration_number: bankData.registration_number,
                correspondent_account: bankData.correspondent_account,
                bank_name: bankData.name.payment,
                payment_city: bankData.payment_city,
                bank_address: bankData.address.unrestricted_value,
            },
            transaction,
        });

        await transaction.commit();
        return bankRequisite;
    } catch (error) {
        await transaction.rollback();
        console.error('Ошибка сохранения реквизитов банка:', error.message);
        throw new Error('Не удалось сохранить реквизиты банка');
    }
};

/**
 * Связать пользователя с банковским реквизитом
 * @param {string} userId - ID пользователя
 * @param {Object} bankRequisite - Реквизиты банка
 * @param {string} accountNumber - Расчетный счет
 * @returns {Promise<Object>} - Связанные реквизиты
 */
const linkUserBankRequisites = async (userId, bankRequisite, accountNumber) => {
    const transaction = await app_db.sequelize.transaction();

    try {
        const userBankRequisite = await app_db.UserBankRequisite.create(
            {
                user_id: userId,
                bank_requisite_id: bankRequisite.id,
                account_number: accountNumber,
            },
            { transaction }
        );

        await transaction.commit();
        return userBankRequisite;
    } catch (error) {
        await transaction.rollback();
        console.error(
            'Ошибка связывания пользователя с реквизитами:',
            error.message
        );
        throw new Error('Не удалось связать пользователя с реквизитами');
    }
};

/**
 * Добавить банковские реквизиты пользователя
 * @param {string} userId - ID пользователя
 * @param {string} accountNumber - Расчетный счет
 * @param {string} bic - БИК банка
 * @returns {Promise<Object>} - Связанные реквизиты пользователя
 */
const addUserBankRequisites = async (userId, accountNumber, bic) => {
    validateAccountNumber(accountNumber, bic);

    const requisitesExist = await checkRequisitesExist(
        userId,
        accountNumber,
        bic
    );
    if (requisitesExist) {
        throw new Error(
            'Реквизиты с данным расчетным счетом и БИК уже добавлены для пользователя'
        );
    }

    const bankData = await getBankDataByBic(bic);
    const bankRequisite = await saveBankRequisites(bankData.data);

    return await linkUserBankRequisites(userId, bankRequisite, accountNumber);
};

/**
 * Получить подготовленные банковские реквизиты пользователя
 * @param {string} userId - ID пользователя
 * @returns {Promise<Array>} - Список подготовленных банковских реквизитов пользователя
 */
const getPreparedUserBankRequisites = async (userId) => {
    try {
        const userRequisites = await app_db.UserBankRequisite.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: app_db.BankRequisite,
                    as: 'BankRequisite',
                    attributes: [
                        'bic',
                        'swift',
                        'inn',
                        'kpp',
                        'registration_number',
                        'correspondent_account',
                        'bank_name',
                        'payment_city',
                    ],
                },
            ],
            attributes: ['id', 'account_number'],
        });

        return userRequisites.map((requisite) => ({
            id: requisite.id,
            account_number: requisite.account_number,
            bic: requisite.BankRequisite.bic,
            swift: requisite.BankRequisite.swift,
            inn: requisite.BankRequisite.inn,
            kpp: requisite.BankRequisite.kpp,
            registration_number: requisite.BankRequisite.registration_number,
            correspondent_account:
                requisite.BankRequisite.correspondent_account,
            bank_name: requisite.BankRequisite.bank_name,
            payment_city: requisite.BankRequisite.payment_city,
        }));
    } catch (error) {
        console.error(
            'Ошибка получения подготовленных банковских реквизитов пользователя:',
            error.message
        );
        throw new Error(
            'Не удалось получить банковские реквизиты пользователя'
        );
    }
};

module.exports = {
    addUserBankRequisites,
    getPreparedUserBankRequisites,
};
