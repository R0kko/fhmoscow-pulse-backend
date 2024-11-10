const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Система мониторинга "PULSE". Backend API',
        version: '1.0.0',
        description:
            'Автоматизированная система учета результатов хоккейных матчей в рамках соревнований Федерации хоккея Москвы',
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Локальный сервер',
        },
        {
            url: 'http://pulse-backend.fhmoscow.com',
            description: 'Продакшен сервер',
        },
    ],
    components: {
        securitySchemes: {
            apiKeyAuth: {
                type: 'apiKey',
                in: 'header',
                name: 'X-API-KEY',
                description: 'API ключ для авторизации',
            },
        },
    },
    security: [
        {
            apiKeyAuth: [], // Применяет apiKeyAuth ко всем защищенным маршрутам
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js', './controllers/*.js'], // Убедитесь, что пути соответствуют всем аннотациям
};

module.exports = swaggerJSDoc(options);
