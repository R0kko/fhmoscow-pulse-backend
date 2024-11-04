'use strict'
const { DataTypes } = require('sequelize')

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('api_keys', {
            id: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.literal('uuid_generate_v4()'),
                primaryKey: true,
            },
            key: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            active_from: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            active_to: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.UUID,
                references: {
                    model: 'users',
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
        await queryInterface.dropTable('api_keys')
    },
}
