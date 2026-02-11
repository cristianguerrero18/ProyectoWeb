import { RecursoController } from "../../controllers/Admin/recursos.controllers.js";
import { Router } from "express";
import multer from "multer";
import { verificarToken } from "../../middlewares/auth.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

/**
 * @swagger
 * tags:
 *   name: Recursos
 *   description: Gestión de recursos educativos
 */

/**
 * @swagger
 * /recursos:
 *   get:
 *     summary: Obtener todos los recursos
 *     tags: [Recursos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: estado
 *         schema:
 *           type: string
 *           enum: [pendiente, aprobado, rechazado]
 *         description: Filtrar por estado
 *       - in: query
 *         name: categoria
 *         schema:
 *           type: integer
 *         description: Filtrar por categoría
 *     responses:
 *       200:
 *         description: Lista de recursos obtenida
 */
router.get("/", RecursoController.getRecurso);

/**
 * @swagger
 * /recursos/{id}:
 *   get:
 *     summary: Obtener recurso por ID
 *     tags: [Recursos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del recurso
 *     responses:
 *       200:
 *         description: Recurso encontrado
 *       404:
 *         description: Recurso no encontrado
 */
router.get("/:id", RecursoController.getRecursoPorId);

/**
 * @swagger
 * /recursos/asignatura/{id_asignatura}:
 *   get:
 *     summary: Obtener recursos por asignatura
 *     tags: [Recursos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_asignatura
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la asignatura
 *       - in: query
 *         name: solo_aprobados
 *         schema:
 *           type: boolean
 *           default: true
 *         description: Solo mostrar recursos aprobados
 *     responses:
 *       200:
 *         description: Recursos de la asignatura obtenidos
 */
router.get("/asignatura/:id_asignatura", RecursoController.getRecursosPorAsignatura);

/**
 * @swagger
 * /recursos/usuario/{id_usuario}:
 *   get:
 *     summary: Obtener recursos por usuario
 *     tags: [Recursos]
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
 *         description: Recursos del usuario obtenidos
 */
router.get("/usuario/:id_usuario", RecursoController.getRecursosPorUsuario);

/**
 * @swagger
 * /recursos:
 *   post:
 *     summary: Crear nuevo recurso con archivo
 *     tags: [Recursos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - id_usuario
 *               - id_asignatura
 *               - titulo
 *               - descripcion
 *               - archivo
 *             properties:
 *               id_usuario:
 *                 type: integer
 *               id_asignatura:
 *                 type: integer
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               tags:
 *                 type: string
 *                 description: Tags separados por comas
 *               archivo:
 *                 type: string
 *                 format: binary
 *                 description: Archivo del recurso
 *     responses:
 *       201:
 *         description: Recurso creado exitosamente
 *       400:
 *         description: Error en los datos o archivo
 */
router.post("/", upload.single("archivo"), RecursoController.postRecurso);

/**
 * @swagger
 * /recursos:
 *   put:
 *     summary: Actualizar recurso
 *     tags: [Recursos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 required: true
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               tags:
 *                 type: string
 *     responses:
 *       200:
 *         description: Recurso actualizado
 *       404:
 *         description: Recurso no encontrado
 */
router.put("/", RecursoController.putRecurso);

/**
 * @swagger
 * /recursos/{id}:
 *   delete:
 *     summary: Eliminar recurso
 *     tags: [Recursos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del recurso
 *     responses:
 *       200:
 *         description: Recurso eliminado
 *       404:
 *         description: Recurso no encontrado
 */
router.delete("/:id", RecursoController.deleteRecursos);

/**
 * @swagger
 * /recursos/estado/{id_recurso}:
 *   put:
 *     summary: Cambiar estado del recurso (Admin)
 *     tags: [Recursos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_recurso
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del recurso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - estado
 *             properties:
 *               estado:
 *                 type: string
 *                 enum: [pendiente, aprobado, rechazado]
 *                 example: "aprobado"
 *               motivo_rechazo:
 *                 type: string
 *                 description: Obligatorio si se rechaza
 *     responses:
 *       200:
 *         description: Estado actualizado
 *       404:
 *         description: Recurso no encontrado
 */
router.put("/estado/:id_recurso", RecursoController.cambiarEstadoRecurso);

/**
 * @swagger
 * /recursos/detalle/{id_recurso}:
 *   get:
 *     summary: Obtener detalle completo del recurso
 *     tags: [Recursos]
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
 *         description: Detalle completo del recurso obtenido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecursoDetalle'
 *       404:
 *         description: Recurso no encontrado
 */
router.get("/detalle/:id_recurso", RecursoController.getRecursoDetalle);

export default router;