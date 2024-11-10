'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('logs', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.literal('uuid_generate_v4()'),
                primaryKey: true,
            },
            method: {
                type: Sequelize.STRING,
                allowNull: false,
                comment: 'HTTP метод запроса (GET, POST и т.д.)',
            },
            url: {
                type: Sequelize.STRING,
                allowNull: false,
                comment: 'URL, к которому был выполнен запрос',
            },
            status: {
                type: Sequelize.INTEGER,
                allowNull: false,
                comment: 'HTTP статус код ответа',
            },
            response_time: {
                type: Sequelize.INTEGER,
                allowNull: false,
                comment: 'Время выполнения запроса в миллисекундах',
            },
            error: {
                type: Sequelize.TEXT,
                allowNull: true,
                comment: 'Описание ошибки, если возникла',
            },
            ip_address: {
                type: Sequelize.STRING,
                allowNull: true,
                comment: 'IP адрес клиента, откуда был запрос',
            },
            headers: {
                type: Sequelize.JSON,
                allowNull: true,
                comment: 'Заголовки запроса в формате JSON',
            },
            api_key: {
                type: Sequelize.STRING,
                allowNull: true,
                comment: 'API ключ, если был передан',
            },
            body: {
                type: Sequelize.JSON,
                allowNull: true,
                comment: 'Тело запроса в формате JSON',
            },
            user_agent: {
                type: Sequelize.STRING,
                allowNull: true,
                comment: 'Пользовательский агент клиента',
            },
            timestamp: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                comment: 'Время, когда запрос был выполнен',
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('logs');
    },
};
