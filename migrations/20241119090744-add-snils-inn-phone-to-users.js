'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('users', 'snils', {
            type: Sequelize.STRING(11),
            allowNull: true,
            unique: true,
            comment: 'СНИЛС пользователя',
        });

        await queryInterface.addColumn('users', 'inn', {
            type: Sequelize.STRING(12),
            allowNull: true,
            unique: true,
            comment: 'ИНН пользователя',
        });

        await queryInterface.addColumn('users', 'phone', {
            type: Sequelize.STRING(15),
            allowNull: true,
            unique: true,
            validate: {
                isNumeric: true,
            },
            comment: 'Телефон пользователя (только цифры)',
        });
    },

    async down(queryInterface) {
        await queryInterface.removeColumn('users', 'snils');
        await queryInterface.removeColumn('users', 'inn');
        await queryInterface.removeColumn('users', 'phone');
    },
};
