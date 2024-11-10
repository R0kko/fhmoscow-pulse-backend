const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'Log',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            method: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: 'HTTP метод запроса (GET, POST и т.д.)',
            },
            url: {
                type: DataTypes.STRING,
                allowNull: false,
                comment: 'URL, к которому был выполнен запрос',
            },
            status: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: 'HTTP статус код ответа',
            },
            response_time: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: 'Время выполнения запроса в миллисекундах',
            },
            error: {
                type: DataTypes.TEXT,
                allowNull: true,
                comment: 'Описание ошибки, если возникла',
            },
            ip_address: {
                type: DataTypes.STRING,
                allowNull: true,
                comment: 'IP адрес клиента, откуда был запрос',
            },
            headers: {
                type: DataTypes.JSON,
                allowNull: true,
                comment: 'Заголовки запроса в формате JSON',
            },
            body: {
                type: DataTypes.JSON,
                allowNull: true,
                comment: 'Тело запроса в формате JSON',
            },
            api_key: {
                type: DataTypes.STRING,
                allowNull: true,
                comment: 'API ключ, если был передан',
            },
            user_agent: {
                type: DataTypes.STRING,
                allowNull: true,
                comment: 'Пользовательский агент клиента',
            },
            timestamp: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
                comment: 'Время, когда запрос был выполнен',
            },
        },
        {
            tableName: 'logs',
            timestamps: false,
        }
    );
};
