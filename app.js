const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const indexRouter = require('./routes/index');
const errorHandler = require('./utils/errorHandler');

const app = express();

// Логирование запросов
app.use(logger(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Настройка CORS
const corsOptions = {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// Ограничение на количество запросов
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
app.use(limiter);

// Парсинг JSON и URL-encoded запросов
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Статические файлы
app.use(express.static(path.join(__dirname, 'public')));

// Меры безопасности
app.use(helmet());
app.use(helmet.frameguard({ action: 'deny' }));
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts({ maxAge: 31536000, includeSubDomains: true }));
app.use(helmet.noSniff());
app.use(helmet.xssFilter());

// Подключение маршрутов API
app.use('/api', indexRouter);

// Обработка 404 ошибок
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Resource not found',
    });
});

app.use(errorHandler);

module.exports = app;
