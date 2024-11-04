'use strict'
const { DataTypes } = require('sequelize')

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.sequelize.query(
            'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
        )
        await queryInterface.createTable('user_statuses', {
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
        await queryInterface.dropTable('user_statuses')
        await queryInterface.sequelize.query(
            'DROP EXTENSION IF EXISTS "uuid-ossp";'
        )
    },
}
