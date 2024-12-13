const axios = require('axios');
const app_db = require('../../models/app_db');

/**
 * Конфигурация для DaData
 */
const DADATA_CLEAN_URL = 'https://cleaner.dadata.ru/api/v1/clean/address';
const DADATA_API_KEY = process.env.DADATA_API_KEY;
const DADATA_SECRET_KEY = process.env.DADATA_SECRET_KEY;

/**
 * Валидация входных данных для стандартизации
 * @param {string} addressString - Входной адрес
 * @param {string} addressAlias - Alias типа адреса
 * @param {string} associationDate - Дата ассоциации
 * @throws {Error} - Если данные некорректны
 */
const validateInput = (addressString, addressAlias, associationDate) => {
    if (!addressString || typeof addressString !== 'string') {
        throw new Error('Некорректный адрес');
    }
    if (!addressAlias || typeof addressAlias !== 'string') {
        throw new Error('Некорректный alias типа адреса');
    }
    if (associationDate && isNaN(new Date(associationDate).getTime())) {
        throw new Error('Некорректная дата ассоциации');
    }
    if (!DADATA_API_KEY || !DADATA_SECRET_KEY) {
        throw new Error('Отсутствуют ключи для DaData');
    }
};

/**
 * Отправить запрос в DaData для стандартизации адреса
 * @param {string} addressString - Входной адрес
 * @returns {Promise<Object>} - Ответ от DaData
 */
const standardizeAddress = async (addressString) => {
    try {
        const response = await axios.post(DADATA_CLEAN_URL, [addressString], {
            headers: {
                Authorization: `Token ${DADATA_API_KEY}`,
                'Content-Type': 'application/json',
                'X-Secret': `${DADATA_SECRET_KEY}`,
            },
        });

        if (!response.data || response.data.length === 0) {
            throw new Error('DaData не вернула результат');
        }
        return response.data[0];
    } catch (error) {
        console.error('Ошибка при запросе к DaData:', error.message);
        throw new Error('Не удалось стандартизировать адрес');
    }
};

/**
 * Найти тип адреса по alias
 * @param {string} addressAlias - Alias типа адреса
 * @returns {Promise<Object>} - Тип адреса
 */
const getAddressType = async (addressAlias) => {
    try {
        const addressType = await app_db.AddressType.findOne({
            where: { alias: addressAlias },
        });

        if (!addressType) {
            throw new Error('Указанный тип адреса не найден');
        }

        return addressType;
    } catch (error) {
        console.error('Ошибка при получении типа адреса:', error.message);
        throw new Error('Не удалось получить тип адреса');
    }
};

/**
 * Проверить существование адреса пользователя с таким типом
 * @param {string} userId - ID пользователя
 * @param {string} addressTypeId - ID типа адреса
 * @returns {Promise<boolean>} - True, если адрес существует
 */
const checkAddressExists = async (userId, addressTypeId) => {
    try {
        const userAddress = await app_db.UserAddress.findOne({
            where: { user_id: userId },
            include: [
                {
                    model: app_db.Address,
                    as: 'Address',
                    where: { address_type_id: addressTypeId },
                },
            ],
        });
        return !!userAddress;
    } catch (error) {
        console.error(
            'Ошибка при проверке существования адреса:',
            error.message
        );
        throw new Error('Не удалось проверить существование адреса');
    }
};

/**
 * Сохранить адрес и связать его с пользователем
 * @param {string} userId - ID пользователя
 * @param {Object} standardizedData - Стандартизированные данные адреса
 * @param {Object} addressType - Тип адреса
 * @param {string} associationDate - Дата ассоциации
 * @param {Object} transaction - Текущая транзакция
 * @returns {Promise<Object>} - Сохраненный адрес
 */
const saveAddressWithAssociation = async (
    userId,
    standardizedData,
    addressType,
    associationDate,
    transaction
) => {
    try {
        // Создаем адрес
        const address = await app_db.Address.create(
            {
                address_type_id: addressType.id,
                ...standardizedData,
            },
            { transaction }
        );

        // Связываем адрес с пользователем
        await app_db.UserAddress.create(
            {
                user_id: userId,
                address_id: address.id,
                assign_date: associationDate || new Date(),
            },
            { transaction }
        );

        return address;
    } catch (error) {
        console.error(
            'Ошибка при сохранении адреса и ассоциации:',
            error.message
        );
        throw new Error('Не удалось сохранить адрес и ассоциацию');
    }
};

/**
 * Получить адреса пользователя в упрощенном формате
 * @param {string} userId - ID пользователя
 * @returns {Promise<Array>} - Список адресов
 */
const getUserAddresses = async (userId) => {
    try {
        const userAddresses = await app_db.User.findByPk(userId, {
            include: [
                {
                    model: app_db.Address,
                    as: 'Addresses',
                    attributes: [
                        'id',
                        'result',
                        'postal_code',
                        'fias_id',
                        'okato',
                        'oktmo',
                        'tax_office',
                        'tax_office_legal',
                    ],
                    include: [
                        {
                            model: app_db.AddressType,
                            as: 'AddressType',
                            attributes: ['alias'],
                        },
                    ],
                    through: { attributes: [] },
                },
            ],
        });

        if (!userAddresses) {
            throw new Error('Пользователь не найден');
        }

        // Преобразуем результат
        return userAddresses.Addresses.map((address) => ({
            id: address.id,
            alias: address.AddressType?.alias || null,
            address: address.result || null,
            postal_code: address.postal_code || null,
            fias_id: address.fias_id || null,
            okato: address.okato || null,
            oktmo: address.oktmo || null,
            tax_office: address.tax_office || null,
            tax_office_legal: address.tax_office_legal || null,
        }));
    } catch (error) {
        console.error('Ошибка получения адресов пользователя:', error.message);
        throw new Error('Не удалось получить адреса пользователя');
    }
};

/**
 * Главная функция: стандартизировать и сохранить адрес
 * @param {string} userId - ID пользователя
 * @param {string} addressAlias - Alias типа адреса
 * @param {string} addressString - Входной адрес
 * @param {string} associationDate - Дата ассоциации
 * @returns {Promise<Object>} - Сохраненный адрес
 */
const processAddress = async (
    userId,
    addressAlias,
    addressString,
    associationDate
) => {
    validateInput(addressString, addressAlias, associationDate);

    const transaction = await app_db.sequelize.transaction();

    try {
        const standardizedData = await standardizeAddress(addressString);
        const addressType = await getAddressType(addressAlias);

        // Проверяем существование адреса
        const addressExists = await checkAddressExists(userId, addressType.id);
        if (addressExists) {
            throw {
                status: 409,
                message:
                    'Адрес с таким типом уже существует для данного пользователя',
            };
        }

        const savedAddress = await saveAddressWithAssociation(
            userId,
            standardizedData,
            addressType,
            associationDate,
            transaction
        );

        await transaction.commit();
        return savedAddress;
    } catch (error) {
        await transaction.rollback();
        console.error('Ошибка при обработке адреса:', error.message);

        if (error.status && error.message) {
            throw error; // Прокидываем пользовательскую ошибку
        }
        throw new Error('Не удалось обработать адрес');
    }
};

module.exports = {
    processAddress,
    getUserAddresses,
};
