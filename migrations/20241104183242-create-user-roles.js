'use strict'
const { DataTypes } = require('sequelize')

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('user_roles', {
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
            role_id: {
                type: DataTypes.UUID,
                references: {
                    model: 'roles',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
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
        await queryInterface.dropTable('user_roles')
    },
}
