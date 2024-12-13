'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('bank_requisites', {
            id: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.literal('uuid_generate_v4()'),
                primaryKey: true,
            },
            bic: {
                type: DataTypes.STRING(9),
                allowNull: false,
                comment: 'Банковский идентификационный код (БИК)',
            },
            swift: {
                type: DataTypes.STRING(11),
                allowNull: true,
                comment: 'SWIFT код банка',
            },
            inn: {
                type: DataTypes.STRING(12),
                allowNull: true,
                comment: 'ИНН банка',
            },
            kpp: {
                type: DataTypes.STRING(9),
                allowNull: true,
                comment: 'КПП банка',
            },
            registration_number: {
                type: DataTypes.STRING(9),
                allowNull: true,
                comment: 'Регистрационный номер в ЦБ РФ',
            },
            correspondent_account: {
                type: DataTypes.STRING(20),
                allowNull: true,
                comment: 'Корреспондентский счет в ЦБ РФ',
            },
            bank_name: {
                type: DataTypes.STRING(255),
                allowNull: false,
                comment: 'Наименование банка',
            },
            payment_city: {
                type: DataTypes.STRING(255),
                allowNull: true,
                comment: 'Город для платежного поручения',
            },
            bank_address: {
                type: DataTypes.STRING(255),
                allowNull: true,
                comment: 'Адрес банка',
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            deletedAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('bank_requisites');
    },
};
