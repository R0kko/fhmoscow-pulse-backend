'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const existingCountries = await queryInterface.sequelize.query(
            `SELECT * FROM countries LIMIT 1`
        );

        if (existingCountries[0].length === 0) {
            await queryInterface.bulkInsert('countries', [
                {
                    id: Sequelize.literal('uuid_generate_v4()'),
                    name: 'Российская Федерация',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ]);
        }
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('countries', {
            name: 'Российская Федерация',
        });
    },
};
