'use strict';

module.exports = {
    async up(queryInterface) {
        const existingUserRoles = await queryInterface.sequelize.query(
            `SELECT * FROM user_roles LIMIT 1`
        );

        if (existingUserRoles[0].length === 0) {
            await queryInterface.bulkInsert('user_roles', [
                {
                    id: 'c62260d7-e086-4a15-ad48-ce8667aa8458',
                    user_id: '01a04850-1706-40ad-b922-2028bf55db5a',
                    role_id: '3adb933f-6f41-43a7-906c-0f466957d62e',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ]);
        }
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('user_roles', null, {});
    },
};
