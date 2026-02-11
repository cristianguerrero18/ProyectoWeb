import { PQRSController } from "../../controllers/Admin/pqrs.controllers.js";
import { Router } from "express";
import { verificarToken } from "../../middlewares/auth.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: PQRS (Admin)
 *     description: Endpoints de administración de PQRS
 *   - name: PQRS (Usuario)
 *     description: Endpoints de usuario para PQRS
 */

// ======================
// ADMIN
// ======================

/**
 * @swagger
 * /pqrs:
 *   get:
 *     summary: Obtener todos los PQRS (Admin)
 *     tags: [PQRS (Admin)]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: estado
 *         schema:
 *           type: string
 *           enum: [pendiente, respondido, cerrado]
 *         description: Filtrar por estado
 *       - in: query
 *         name: tipo
 *         schema:
 *           type: integer
 *         description: Filtrar por tipo de PQRS
 *     responses:
 *       200:
 *         description: Lista de PQRS obtenida
 */
router.get("/", PQRSController.getPQRS);

/**
 * @swagger
 * /pqrs/{id_pqr}:
 *   get:
 *     summary: Obtener PQR por ID (Admin)
 *     tags: [PQRS (Admin)]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_pqr
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del PQRS
 *     responses:
 *       200:
 *         description: PQRS encontrado
 *       404:
 *         description: PQRS no encontrado
 */
router.get("/:id_pqr", PQRSController.getPQRSPorId);

/**
 * @swagger
 * /pqrs/tipos/todos:
 *   get:
 *     summary: Obtener tipos de PQRS
 *     tags: [PQRS (Admin)]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tipos de PQRS obtenidos
 */
router.get("/tipos/todos", PQRSController.getTiposPQRS);

/**
 * @swagger
 * /pqrs/responder:
 *   put:
 *     summary: Responder a un PQRS (Admin)
 *     tags: [PQRS (Admin)]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_pqr
 *               - respuesta
 *             properties:
 *               id_pqr:
 *                 type: integer
 *                 example: 1
 *               respuesta:
 *                 type: string
 *                 example: "Gracias por su comentario, hemos solucionado el problema"
 *               id_admin_responde:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: PQRS respondido exitosamente
 *       404:
 *         description: PQRS no encontrado
 */
router.put("/responder", PQRSController.responderPQRS);

/**
 * @swagger
 * /pqrs/{id_pqr}:
 *   delete:
 *     summary: Eliminar PQRS (Admin)
 *     tags: [PQRS (Admin)]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_pqr
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del PQRS a eliminar
 *     responses:
 *       200:
 *         description: PQRS eliminado exitosamente
 *       404:
 *         description: PQRS no encontrado
 */
router.delete("/:id_pqr", PQRSController.deletePQRS);

// ======================
// CLIENTE
// ======================

/**
 * @swagger
 * /pqrs:
 *   post:
 *     summary: Crear nuevo PQRS (Usuario)
 *     tags: [PQRS (Usuario)]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_usuario
 *               - id_tipo_pqr
 *               - asunto
 *               - descripcion
 *             properties:
 *               id_usuario:
 *                 type: integer
 *                 example: 1
 *               id_tipo_pqr:
 *                 type: integer
 *                 example: 1
 *               asunto:
 *                 type: string
 *                 example: "Problema con recurso subido"
 *               descripcion:
 *                 type: string
 *                 example: "El recurso no se puede descargar correctamente"
 *               adjuntos:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: URLs de archivos adjuntos
 *     responses:
 *       201:
 *         description: PQRS creado exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post("/", PQRSController.createPQRS);

/**
 * @swagger
 * /pqrs/usuario/{id_usuario}:
 *   get:
 *     summary: Obtener PQRS por usuario
 *     tags: [PQRS (Usuario)]
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Límite de resultados
 *     responses:
 *       200:
 *         description: PQRS del usuario obtenidos
 *       404:
 *         description: Usuario no encontrado
 */
router.get("/usuario/:id_usuario", PQRSController.getPQRSPorUsuario);

export default router;