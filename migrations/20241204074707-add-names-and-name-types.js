'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        // Создаем таблицу name_types
        await queryInterface.createTable('name_types', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.literal('uuid_generate_v4()'),
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: false,
                unique: true,
                comment: 'Название падежа (Именительный, Родительный и т.д.)',
            },
            alias: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true,
                comment: 'Краткое название падежа (e.g., NOMINATIVE, GENITIVE)',
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            deletedAt: {
                type: Sequelize.DATE,
                allowNull: true,
            },
        });

        // Создаем таблицу names
        await queryInterface.createTable('names', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.literal('uuid_generate_v4()'),
                primaryKey: true,
            },
            user_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            name_type_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'name_types',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            full_name: {
                type: Sequelize.STRING(150),
                allowNull: false,
                comment: 'Полное имя в заданном падеже',
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            deletedAt: {
                type: Sequelize.DATE,
                allowNull: true,
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('names');
        await queryInterface.dropTable('name_types');
    },
};
