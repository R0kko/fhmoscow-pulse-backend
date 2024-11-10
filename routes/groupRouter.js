const express = require('express');
const groupController = require('../controllers/groupController');
const validateRequest = require('../middlewares/validateRequest');
const {
    validateGroupId,
    validateTournamentId,
} = require('../utils/validators/groupValidators');

const router = express.Router();

/**
 * @swagger
 * /api/groups/get-all-groups:
 *   get:
 *     summary: Получить список всех активных групп
 *     tags: [Группы]
 *     responses:
 *       200:
 *         description: Успешный запрос списка групп
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
 *                         type: integer
 *                       name:
 *                         type: string
 *                       tournament:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           name:
 *                             type: string
 *                       stage:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           name:
 *                             type: string
 */
router.get('/get-all-groups', groupController.getAllGroups);

/**
 * @swagger
 * /api/groups/get-group-by-id/{id}:
 *   get:
 *     summary: Получить информацию о группе по ID
 *     tags: [Группы]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID группы
 *     responses:
 *       200:
 *         description: Успешный запрос группы
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
 *                       type: integer
 *                     name:
 *                       type: string
 *                     tournament:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         name:
 *                           type: string
 *                     stage:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         name:
 *                           type: string
 *       404:
 *         description: Группа не найдена
 *       400:
 *         description: Неправильный формат ID
 */
router.get(
    '/get-group-by-id/:id',
    validateGroupId,
    validateRequest,
    groupController.getGroupById
);

/**
 * @swagger
 * /api/groups/get-groups-for-tournament/{id}:
 *   get:
 *     summary: Получить список групп по ID турнира
 *     tags: [Группы]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID турнира
 *     responses:
 *       200:
 *         description: Успешный запрос списка групп для турнира
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
 *                         type: integer
 *                       name:
 *                         type: string
 *                       tournament:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           name:
 *                             type: string
 *                       stage:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           name:
 *                             type: string
 *       404:
 *         description: Группы не найдены для указанного турнира
 *       400:
 *         description: Неправильный формат ID турнира
 */
router.get(
    '/get-groups-for-tournament/:id',
    validateTournamentId,
    validateRequest,
    groupController.getGroupsByTournamentId
);

module.exports = router;
