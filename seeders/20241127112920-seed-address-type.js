'use strict';

module.exports = {
    async up(queryInterface) {
        const existingAddressTypes = await queryInterface.sequelize.query(
            `SELECT * FROM address_types LIMIT 1`
        );

        if (existingAddressTypes[0].length > 0) {
            return;
        }

        await queryInterface.bulkInsert('address_types', [
            {
                id: 'c9666e39-e388-4e32-ae25-10b2d5e8ef1a',
                name: 'Адрес регистрации',
                alias: 'REGISTRATION',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '7fd832ed-41f0-4236-9566-c50de86d865f',
                name: 'Фактический адрес',
                alias: 'FACTUAL',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('address_types', null, {});
    },
};
