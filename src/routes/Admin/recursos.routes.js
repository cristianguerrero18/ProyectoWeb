import { RecursoController } from "../../controllers/Admin/recursos.controllers.js";
import { Router } from "express";
import multer from "multer";

const router = Router();

const upload = multer({ storage: multer.memoryStorage() });

/**
 * @swagger
 * tags:
 *   name: Recursos
 *   description: Endpoints para la gestión de recursos educativos del sistema
 */

/**
 * @swagger
 * /api/recursos:
 *   get:
 *     summary: Obtener todos los recursos
 *     description: Retorna la lista completa de recursos educativos registrados en el sistema.
 *     tags: [Recursos]
 *     responses:
 *       200:
 *         description: Recursos obtenidos correctamente
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", RecursoController.getRecurso);

/**
 * @swagger
 * /api/recursos/asignatura/{id_asignatura}:
 *   get:
 *     summary: Obtener recursos por asignatura
 *     description: Retorna los recursos asociados a una asignatura específica.
 *     tags: [Recursos]
 *     parameters:
 *       - in: path
 *         name: id_asignatura
 *         required: true
 *         description: Identificador de la asignatura
 *         schema:
 *           type: integer
 *           example: 3
 *     responses:
 *       200:
 *         description: Recursos obtenidos correctamente
 *       404:
 *         description: No se encontraron recursos para la asignatura
 *       500:
 *         description: Error interno del servidor
 */
router.get("/asignatura/:id_asignatura", RecursoController.getRecursosPorAsignatura);

/**
 * @swagger
 * /api/recursos/usuario/{id_usuario}:
 *   get:
 *     summary: Obtener recursos por usuario
 *     description: Retorna los recursos publicados por un usuario específico.
 *     tags: [Recursos]
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         description: Identificador del usuario
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: Recursos obtenidos correctamente
 *       404:
 *         description: No se encontraron recursos para el usuario
 *       500:
 *         description: Error interno del servidor
 */
router.get("/usuario/:id_usuario", RecursoController.getRecursosPorUsuario);

/**
 * @swagger
 * /api/recursos/detalle/{id_recurso}:
 *   get:
 *     summary: Obtener detalle completo de un recurso
 *     description: Retorna el detalle completo de un recurso, incluyendo comentarios e interacciones asociadas.
 *     tags: [Recursos]
 *     parameters:
 *       - in: path
 *         name: id_recurso
 *         required: true
 *         description: Identificador del recurso
 *         schema:
 *           type: integer
 *           example: 8
 *     responses:
 *       200:
 *         description: Detalle del recurso obtenido correctamente
 *       404:
 *         description: Recurso no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/detalle/:id_recurso", RecursoController.getRecursoDetalle);

/**
 * @swagger
 * /api/recursos/{id}:
 *   get:
 *     summary: Obtener un recurso por ID
 *     description: Retorna la información de un recurso específico según su identificador.
 *     tags: [Recursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único del recurso
 *         schema:
 *           type: integer
 *           example: 8
 *     responses:
 *       200:
 *         description: Recurso encontrado correctamente
 *       404:
 *         description: Recurso no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/:id", RecursoController.getRecursoPorId);

/**
 * @swagger
 * /api/recursos:
 *   post:
 *     summary: Crear un nuevo recurso
 *     description: Permite registrar un nuevo recurso educativo, incluyendo carga de archivo y datos asociados.
 *     tags: [Recursos]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Guía de Bases de Datos
 *               tema:
 *                 type: string
 *                 example: Modelo entidad-relación
 *               id_asignatura:
 *                 type: integer
 *                 example: 3
 *               id_usuario:
 *                 type: integer
 *                 example: 5
 *               id_categoria:
 *                 type: integer
 *                 example: 2
 *               archivo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Recurso creado correctamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", upload.single("archivo"), RecursoController.postRecurso);

/**
 * @swagger
 * /api/recursos:
 *   put:
 *     summary: Actualizar un recurso
 *     description: Permite modificar la información de un recurso educativo existente.
 *     tags: [Recursos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_recurso:
 *                 type: integer
 *                 example: 8
 *               titulo:
 *                 type: string
 *                 example: Guía actualizada de Bases de Datos
 *               tema:
 *                 type: string
 *                 example: Normalización y relaciones
 *     responses:
 *       200:
 *         description: Recurso actualizado correctamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Recurso no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put("/", RecursoController.putRecurso);

/**
 * @swagger
 * /api/recursos/estado/{id_recurso}:
 *   put:
 *     summary: Cambiar estado de un recurso
 *     description: Permite modificar el estado lógico de un recurso dentro del sistema.
 *     tags: [Recursos]
 *     parameters:
 *       - in: path
 *         name: id_recurso
 *         required: true
 *         description: Identificador del recurso
 *         schema:
 *           type: integer
 *           example: 8
 *     responses:
 *       200:
 *         description: Estado actualizado correctamente
 *       404:
 *         description: Recurso no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put("/estado/:id_recurso", RecursoController.cambiarEstadoRecurso);

/**
 * @swagger
 * /api/recursos/{id}:
 *   delete:
 *     summary: Eliminar un recurso
 *     description: Elimina un recurso educativo según su identificador.
 *     tags: [Recursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único del recurso
 *         schema:
 *           type: integer
 *           example: 8
 *     responses:
 *       200:
 *         description: Recurso eliminado correctamente
 *       404:
 *         description: Recurso no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/:id", RecursoController.deleteRecursos);

export default router;