'use strict';

module.exports = {
    async up(queryInterface) {
        const existingStatuses = await queryInterface.sequelize.query(
            `SELECT * FROM user_statuses LIMIT 1`
        );

        if (existingStatuses[0].length === 0) {
            await queryInterface.bulkInsert('user_statuses', [
                {
                    id: '8e0493c6-d262-4150-a034-47e300f6a61c',
                    alias: 'ACTIVE',
                    name: 'Активирован',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: 'ddf31360-f4bf-4bcc-b8d2-38100cc9d25e',
                    alias: 'BLOCKED',
                    name: 'Заблокирован',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ]);
        }
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('user_statuses', null, {});
    },
};
