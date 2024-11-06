'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
    async up(queryInterface) {
        const existingUsers = await queryInterface.sequelize.query(
            `SELECT * FROM users LIMIT 1`
        );

        if (existingUsers[0].length === 0) {
            const hashedPassword = await bcrypt.hash('TestPassword', 12);
            await queryInterface.bulkInsert('users', [
                {
                    id: '01a04850-1706-40ad-b922-2028bf55db5a',
                    last_name: 'Дробот',
                    first_name: 'Алексей',
                    middle_name: 'Андреевич',
                    birth_date: new Date('2003-06-23'),
                    email: 'aadrobot@fhmoscow.com',
                    password: hashedPassword,
                    user_status_id: '8e0493c6-d262-4150-a034-47e300f6a61c',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ]);
        }
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('users', null, {});
    },
};
