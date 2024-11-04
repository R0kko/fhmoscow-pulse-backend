'use strict'
const { DataTypes } = require('sequelize')

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            id: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.literal('uuid_generate_v4()'),
                primaryKey: true,
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            first_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            middle_name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            birth_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            user_status_id: {
                type: DataTypes.UUID,
                references: {
                    model: 'user_statuses',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            deleted_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        })
    },

    async down(queryInterface) {
        await queryInterface.dropTable('users')
    },
}
