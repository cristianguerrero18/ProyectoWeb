import { RecursoLikesController } from "../../controllers/Usuarios/recursoLikes.controllers.js";
import { Router } from "express";
import { verificarToken } from "../../middlewares/auth.js";

const router = Router();
router.use(verificarToken);

/**
 * @swagger
 * tags:
 *   name: Likes de Recursos
 *   description: Gestión de likes y dislikes en recursos
 */

/**
 * @swagger
 * /recurso-likes/recurso/{id_recurso}:
 *   get:
 *     summary: Obtener likes de un recurso
 *     tags: [Likes de Recursos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_recurso
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del recurso
 *     responses:
 *       200:
 *         description: Likes del recurso obtenidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_likes:
 *                   type: integer
 *                   example: 15
 *                 total_dislikes:
 *                   type: integer
 *                   example: 2
 */
router.get("/recurso/:id_recurso", RecursoLikesController.getLikesPorRecurso);

/**
 * @swagger
 * /recurso-likes/usuario/{id_usuario}:
 *   get:
 *     summary: Obtener likes de un usuario
 *     tags: [Likes de Recursos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Likes del usuario obtenidos
 */
router.get("/usuario/:id_usuario", RecursoLikesController.getLikesPorUsuario);

/**
 * @swagger
 * /recurso-likes/status/{id_recurso}/{id_usuario}:
 *   get:
 *     summary: Verificar si usuario ya dio like a un recurso
 *     tags: [Likes de Recursos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_recurso
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del recurso
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Estado del like obtenido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ha_votado:
 *                   type: boolean
 *                   example: true
 *                 tipo_voto:
 *                   type: string
 *                   enum: [like, dislike]
 *                   example: "like"
 */
router.get("/status/:id_recurso/:id_usuario", RecursoLikesController.getLikeStatus);

/**
 * @swagger
 * /recurso-likes/estadisticas/{id_recurso}:
 *   get:
 *     summary: Obtener estadísticas completas de un recurso
 *     tags: [Likes de Recursos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_recurso
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del recurso
 *     responses:
 *       200:
 *         description: Estadísticas obtenidas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_likes:
 *                   type: integer
 *                 total_dislikes:
 *                   type: integer
 *                 ratio:
 *                   type: number
 *                   format: float
 *                   description: Ratio likes/dislikes
 *                 usuarios_like:
 *                   type: array
 *                   items:
 *                     type: integer
 *                   description: IDs de usuarios que dieron like
 */
router.get("/estadisticas/:id_recurso", RecursoLikesController.getEstadisticas);

/**
 * @swagger
 * /recurso-likes:
 *   post:
 *     summary: Dar like/dislike a un recurso
 *     tags: [Likes de Recursos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_recurso
 *               - id_usuario
 *               - tipo
 *             properties:
 *               id_recurso:
 *                 type: integer
 *                 example: 1
 *               id_usuario:
 *                 type: integer
 *                 example: 1
 *               tipo:
 *                 type: string
 *                 enum: [like, dislike]
 *                 example: "like"
 *     responses:
 *       201:
 *         description: Voto registrado exitosamente
 *       200:
 *         description: Voto actualizado exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post("/", RecursoLikesController.postLike);

/**
 * @swagger
 * /recurso-likes/{id_recurso}/{id_usuario}:
 *   delete:
 *     summary: Eliminar like/dislike
 *     tags: [Likes de Recursos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_recurso
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del recurso
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Voto eliminado exitosamente
 *       404:
 *         description: Voto no encontrado
 */
router.delete("/:id_recurso/:id_usuario", RecursoLikesController.deleteLike);

export default router;