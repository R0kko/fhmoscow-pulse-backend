'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('roles', {
            id: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.literal('uuid_generate_v4()'),
                primaryKey: true,
            },
            alias: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
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
        await queryInterface.dropTable('roles');
    },
};
