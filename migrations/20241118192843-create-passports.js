'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('passports', {
            id: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.literal('uuid_generate_v4()'),
                primaryKey: true,
            },
            user_id: {
                type: DataTypes.UUID,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            country_id: {
                type: DataTypes.UUID,
                references: {
                    model: 'countries',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            series: {
                type: DataTypes.STRING(5),
                allowNull: false,
            },
            number: {
                type: DataTypes.STRING(10),
                allowNull: false,
            },
            issue_date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            issuing_authority: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            department_code: {
                type: DataTypes.STRING(7),
                allowNull: true,
            },
            place_of_birth: {
                type: DataTypes.STRING(255),
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
        await queryInterface.dropTable('passports');
    },
};
