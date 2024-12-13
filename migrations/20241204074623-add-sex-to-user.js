'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('users', 'gender', {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                isIn: [['MALE', 'FEMALE', 'UNDEFINED']],
            },
            comment: 'Пол пользователя (MALE, FEMALE, UNDEFINED)',
        });
    },

    async down(queryInterface) {
        await queryInterface.removeColumn('users', 'gender');

        await queryInterface.sequelize.query(
            'DROP TYPE IF EXISTS "enum_users_gender";'
        );
    },
};
