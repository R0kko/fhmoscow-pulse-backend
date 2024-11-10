const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');
const indexRouter = require('./routes');
const errorHandler = require('./utils/errorHandler');
const postgresDb = require('./models/app_db');
const mariaDb = require('./models/prod_db');
const requestLogger = require('./middlewares/requestLogger');

const app = express();

app.set('trust proxy', 2);

const initializeDatabases = async () => {
    try {
        await postgresDb.sequelize.authenticate();
        console.log('PostgreSQL connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to PostgreSQL:', error);
    }

    try {
        await mariaDb.sequelize.authenticate();
        console.log('MariaDB connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to MariaDB:', error);
    }
};

initializeDatabases();

// Логирование запросов
app.use(logger(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.use(requestLogger);

const corsOptions = {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-API-KEY'],
};

app.use(cors(corsOptions));

// Ограничение на количество запросов
const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 100,
});
app.use(limiter);

// Парсинг JSON и URL-encoded запросов
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Меры безопасности
app.use(helmet());
app.use(helmet.frameguard({ action: 'deny' }));
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts({ maxAge: 31536000, includeSubDomains: true }));
app.use(helmet.noSniff());
app.use(helmet.xssFilter());

// Подключение маршрутов API
app.use('/api', indexRouter);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Обработка 404 ошибок
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Resource not found',
    });
});

app.use(errorHandler);

module.exports = app;
