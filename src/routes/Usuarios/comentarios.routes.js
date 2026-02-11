import { ComentariosController } from "../../controllers/Usuarios/comentarios.controllers.js";
import { Router } from "express";
import { verificarToken } from "../../middlewares/auth.js";

const router = Router();
router.use(verificarToken);

/**
 * @swagger
 * tags:
 *   name: Comentarios
 *   description: Gestión de comentarios en recursos
 */

/**
 * @swagger
 * /comentarios/recurso/{id_recurso}:
 *   get:
 *     summary: Obtener comentarios de un recurso
 *     tags: [Comentarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_recurso
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del recurso
 *       - in: query
 *         name: orden
 *         schema:
 *           type: string
 *           enum: [reciente, antiguo, populares]
 *           default: "reciente"
 *         description: Orden de los comentarios
 *     responses:
 *       200:
 *         description: Comentarios del recurso obtenidos
 */
router.get("/recurso/:id_recurso", ComentariosController.getComentariosPorRecurso);

/**
 * @swagger
 * /comentarios/usuario/{id_usuario}:
 *   get:
 *     summary: Obtener comentarios de un usuario
 *     tags: [Comentarios]
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
 *         description: Comentarios del usuario obtenidos
 */
router.get("/usuario/:id_usuario", ComentariosController.getComentariosPorUsuario);

/**
 * @swagger
 * /comentarios/{id}:
 *   get:
 *     summary: Obtener comentario por ID
 *     tags: [Comentarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del comentario
 *     responses:
 *       200:
 *         description: Comentario encontrado
 *       404:
 *         description: Comentario no encontrado
 */
router.get("/:id", ComentariosController.getComentarioPorId);

/**
 * @swagger
 * /comentarios/permisos/{id_comentario}:
 *   get:
 *     summary: Verificar permisos sobre un comentario
 *     tags: [Comentarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_comentario
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del comentario
 *     responses:
 *       200:
 *         description: Permisos verificados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 puede_editar:
 *                   type: boolean
 *                   example: true
 *                 puede_eliminar:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Comentario no encontrado
 */
router.get("/permisos/:id_comentario", ComentariosController.verificarPermisosComentario);

/**
 * @swagger
 * /comentarios/buscar:
 *   get:
 *     summary: Buscar comentarios
 *     tags: [Comentarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: texto
 *         schema:
 *           type: string
 *         description: Texto a buscar en comentarios
 *       - in: query
 *         name: id_recurso
 *         schema:
 *           type: integer
 *         description: Filtrar por recurso
 *       - in: query
 *         name: id_usuario
 *         schema:
 *           type: integer
 *         description: Filtrar por usuario
 *     responses:
 *       200:
 *         description: Resultados de búsqueda
 */
router.get("/buscar", ComentariosController.buscarComentarios);

/**
 * @swagger
 * /comentarios:
 *   get:
 *     summary: Obtener comentarios recientes
 *     tags: [Comentarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Límite de comentarios
 *     responses:
 *       200:
 *         description: Comentarios recientes obtenidos
 */
router.get("/", ComentariosController.getComentariosRecientes);

/**
 * @swagger
 * /comentarios:
 *   post:
 *     summary: Crear nuevo comentario
 *     tags: [Comentarios]
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
 *               - contenido
 *             properties:
 *               id_recurso:
 *                 type: integer
 *                 example: 1
 *               id_usuario:
 *                 type: integer
 *                 example: 1
 *               contenido:
 *                 type: string
 *                 example: "Excelente recurso, muy útil para el examen"
 *               id_comentario_padre:
 *                 type: integer
 *                 description: ID del comentario padre si es respuesta
 *     responses:
 *       201:
 *         description: Comentario creado exitosamente
 *       400:
 *         description: Recurso no existe o datos inválidos
 */
router.post("/", ComentariosController.postComentario);

/**
 * @swagger
 * /comentarios:
 *   put:
 *     summary: Actualizar comentario
 *     tags: [Comentarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - contenido
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               contenido:
 *                 type: string
 *                 example: "Contenido actualizado del comentario"
 *     responses:
 *       200:
 *         description: Comentario actualizado exitosamente
 *       403:
 *         description: No tiene permisos para editar este comentario
 *       404:
 *         description: Comentario no encontrado
 */
router.put("/", ComentariosController.putComentario);

/**
 * @swagger
 * /comentarios/{id}:
 *   delete:
 *     summary: Eliminar comentario
 *     tags: [Comentarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del comentario
 *     responses:
 *       200:
 *         description: Comentario eliminado exitosamente
 *       403:
 *         description: No tiene permisos para eliminar este comentario
 *       404:
 *         description: Comentario no encontrado
 */
router.delete("/:id", ComentariosController.deleteComentario);

export default router;