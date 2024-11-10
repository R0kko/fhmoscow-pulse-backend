const express = require('express');
const seasonController = require('../controllers/seasonController');
const validateRequest = require('../middlewares/validateRequest');
const { validateSeasonId } = require('../utils/validators/seasonValidators');
const router = express.Router();

/**
 * @swagger
 * /api/seasons/get-all-seasons:
 *   get:
 *     summary: Получить список всех активных сезонов
 *     tags: [Сезоны]
 *     responses:
 *       200:
 *         description: Успешный запрос списка сезонов
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
 */
router.get('/get-all-seasons', seasonController.getAllSeasons);

/**
 * @swagger
 * /api/seasons/{season_id}:
 *   get:
 *     summary: Получить информацию о сезоне по ID
 *     tags: [Сезоны]
 *     parameters:
 *       - in: path
 *         name: season_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID сезона
 *     responses:
 *       200:
 *         description: Успешный запрос информации о сезоне
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
 *       404:
 *         description: Сезон не найден
 *       400:
 *         description: Неправильный формат season_id
 */
router.get(
    '/:season_id',
    validateSeasonId,
    validateRequest,
    seasonController.getSeasonById
);

module.exports = router;
