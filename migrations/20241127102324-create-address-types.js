'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('address_types', {
            id: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.literal('uuid_generate_v4()'),
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                comment: 'Название типа адреса',
            },
            alias: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                comment: 'Алиас типа адреса',
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                comment: 'Время создания записи',
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
                comment: 'Время последнего обновления записи',
            },
            deletedAt: {
                type: DataTypes.DATE,
                allowNull: true,
                comment: 'Время удаления записи',
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('address_types');
    },
};
