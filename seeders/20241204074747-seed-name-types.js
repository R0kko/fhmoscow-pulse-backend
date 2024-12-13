'use strict';

module.exports = {
    async up(queryInterface) {
        const nameTypes = [
            { name: 'Именительный', alias: 'NOMINATIVE' },
            { name: 'Родительный', alias: 'GENITIVE' },
            { name: 'Дательный', alias: 'DATIVE' },
            { name: 'Творительный', alias: 'ABLATIVE' },
        ];

        const existingNameTypes = await queryInterface.sequelize.query(
            `SELECT * FROM name_types LIMIT 1`
        );

        if (existingNameTypes[0].length > 0) {
            return;
        }

        await queryInterface.bulkInsert(
            'name_types',
            nameTypes.map((type) => ({
                id: require('uuid').v4(),
                name: type.name,
                alias: type.alias,
                createdAt: new Date(),
                updatedAt: new Date(),
            })),
            {}
        );
    },

    async down(queryInterface) {
        await queryInterface.bulkDelete('name_types', null, {});
    },
};
