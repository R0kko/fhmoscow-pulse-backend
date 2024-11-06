'use strict';

module.exports = {
    async up(queryInterface) {
        const existingRoles = await queryInterface.sequelize.query(
            `SELECT * FROM roles LIMIT 1`
        );
        if (existingRoles[0].length === 0) {
            await queryInterface.bulkInsert('roles', [
                {
                    id: '3adb933f-6f41-43a7-906c-0f466957d62e',
                    alias: 'SUPER-ADMIN',
                    name: 'Главный администратор',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: 'b4d12632-631a-4f79-b994-5ee2464d9524',
                    alias: 'VSPORTE-ADMIN',
                    name: 'User',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: '7b0498a1-fc31-4258-9411-2c4e08e48ec9',
                    alias: 'VSPORTE-USER',
                    name: 'Guest',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ]);
        }
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('roles', null, {});
    },
};
