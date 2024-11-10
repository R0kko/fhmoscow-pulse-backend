/**
 * @swagger
 * tags:
 *   - name: Аутентификация
 *     description: Авторизация и аутентификация пользователей
 *     tags: [Аутентификация]
 *   - name: Клубы
 *     description: Управление клубами (требуется API ключ и соответствующие права)
 *     tags: [Клубы]
 *   - name: Команды
 *     description: Управление командами (требуется API ключ и соответствующие права)
 *     tags: [Команды]
 *   - name: Группы
 *     description: Управление группами турниров (требуется API ключ и соответствующие права)
 *     tags: [Группы]
 *   - name: Турниры
 *     description: Управление турнирами (требуется API ключ и соответствующие права)
 *     tags: [Турниры]
 *   - name: Турнирные таблицы
 *     description: Доступ к турнирной таблице (требуется API ключ и соответствующие права)
 *     tags: [Турнирные таблицы]
 *   - name: Сезоны
 *     description: Доступ к данным сезонов
 *     tags: [Сезоны]
 */

const express = require('express');
const router = express.Router();
const apiKeyValidator = require('../middlewares/apiKeyValidator');

const authRoutes = require('./authRoutes');
const clubRouter = require('./clubRouter');
const teamRouter = require('./teamRouter');
const groupRouter = require('./groupRouter');
const tournamentRouter = require('./tournamentRouter');
const tournamentTableRouter = require('./tournamentTableRouter');
const seasonRouter = require('./seasonRouter');

// Подключение маршрутов с описанием
router.use('/auth', authRoutes);
router.use('/clubs', apiKeyValidator, clubRouter);
router.use('/teams', apiKeyValidator, teamRouter);
router.use('/groups', apiKeyValidator, groupRouter);
router.use('/tournaments', apiKeyValidator, tournamentRouter);
router.use('/tournament-table', apiKeyValidator, tournamentTableRouter);
router.use('/seasons', apiKeyValidator, seasonRouter);

module.exports = router;
