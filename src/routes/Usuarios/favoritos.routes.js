import { FavoritosController } from "../../controllers/Usuarios/favoritos.controllers.js";
import { Router } from "express";
import { verificarToken } from "../../middlewares/auth.js";

const router = Router();
router.use(verificarToken);

/**
 * @swagger
 * tags:
 *   name: Favoritos
 *   description: Gestión de recursos favoritos de usuarios
 */

/**
 * @swagger
 * /favoritos:
 *   get:
 *     summary: Obtener todos los favoritos (Admin)
 *     tags: [Favoritos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de favoritos obtenida
 */
router.get("/", FavoritosController.getFavoritos);

/**
 * @swagger
 * /favoritos/usuario/{id_usuario}:
 *   get:
 *     summary: Obtener favoritos de un usuario
 *     tags: [Favoritos]
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
 *         description: Favoritos del usuario obtenidos
 */
router.get("/usuario/:id_usuario", FavoritosController.getFavoritosPorUsuario);

/**
 * @swagger
 * /favoritos:
 *   post:
 *     summary: Agregar recurso a favoritos
 *     tags: [Favoritos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_usuario
 *               - id_recurso
 *             properties:
 *               id_usuario:
 *                 type: integer
 *                 example: 1
 *               id_recurso:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Recurso agregado a favoritos
 *       400:
 *         description: Recurso ya está en favoritos
 */
router.post("/", FavoritosController.postFavoritos);

/**
 * @swagger
 * /favoritos/{id_usuario}/{id_recurso}:
 *   delete:
 *     summary: Eliminar recurso de favoritos
 *     tags: [Favoritos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *       - in: path
 *         name: id_recurso
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del recurso
 *     responses:
 *       200:
 *         description: Recurso eliminado de favoritos
 *       404:
 *         description: Favorito no encontrado
 */
router.delete("/:id_usuario/:id_recurso", FavoritosController.deleteFavoritos);

export default router;