const express = require('express');
const userController = require('../controllers/userController');
const validateRequest = require('../middlewares/validateRequest'); // Middleware для проверки запросов
const { validateUserId } = require('../utils/validators/userValidators');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API для управления пользователями
 */

/**
 * @swagger
 * /api/users/get-user/{id}:
 *   get:
 *     summary: Получить информацию о пользователе по ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID пользователя
 *     responses:
 *       200:
 *         description: Успешно. Возвращает данные пользователя.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     last_name:
 *                       type: string
 *                     first_name:
 *                       type: string
 *                     middle_name:
 *                       type: string
 *                     birth_date:
 *                       type: string
 *                       format: date
 *                     email:
 *                       type: string
 *                     user_status:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           format: uuid
 *                         name:
 *                           type: string
 *       404:
 *         description: Пользователь не найден.
 *       400:
 *         description: Неверный формат ID.
 */
router.get(
    '/get-user/:id',
    validateUserId,
    validateRequest,
    userController.getUserById
);

/**
 * @swagger
 * /api/users/get-users-list-with-data:
 *   get:
 *     summary: Получить список всех пользователей
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Номер страницы.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Количество записей на страницу.
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Поле для сортировки (по умолчанию last_name).
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Направление сортировки.
 *     responses:
 *       200:
 *         description: Успешно. Возвращает список пользователей с метаинформацией.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                       last_name:
 *                         type: string
 *                       first_name:
 *                         type: string
 *                       middle_name:
 *                         type: string
 *                       birth_date:
 *                         type: string
 *                         format: date
 *                       email:
 *                         type: string
 *                       user_status:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                           name:
 *                             type: string
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     pageSize:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 */
router.get(
    '/get-users-list-with-data',
    validateRequest,
    userController.getAllUsers
);

/**
 * @swagger
 * /api/users/create:
 *   post:
 *     summary: Создать нового пользователя
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - last_name
 *               - first_name
 *               - birth_date
 *               - email
 *               - password
 *             properties:
 *               last_name:
 *                 type: string
 *               first_name:
 *                 type: string
 *               middle_name:
 *                 type: string
 *               birth_date:
 *                 type: string
 *                 format: date
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: Пользователь успешно создан.
 *       400:
 *         description: Некорректные данные запроса.
 */
router.post('/create', validateRequest, userController.createUser);

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Получить данные текущего пользователя
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Успешно. Возвращает данные текущего пользователя.
 *       401:
 *         description: Пользователь не авторизован.
 */
router.get('/me', authMiddleware, userController.getCurrentUser);

module.exports = router;
