import { PQRSController } from "../../controllers/Admin/pqrs.controllers.js";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: PQRS
 *   description: Endpoints para la gestión de peticiones, quejas, reclamos y sugerencias
 */

/**
 * @swagger
 * /api/pqrs:
 *   get:
 *     summary: Obtener todos los registros de PQRS
 *     description: Retorna la lista completa de PQRS registradas en el sistema.
 *     tags: [PQRS]
 *     responses:
 *       200:
 *         description: PQRS obtenidas correctamente
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", PQRSController.getPQRS);

/**
 * @swagger
 * /api/pqrs/tipos/todos:
 *   get:
 *     summary: Obtener todos los tipos de PQRS
 *     description: Retorna la lista completa de tipos de PQRS disponibles en el sistema.
 *     tags: [PQRS]
 *     responses:
 *       200:
 *         description: Tipos de PQRS obtenidos correctamente
 *       500:
 *         description: Error interno del servidor
 */
router.get("/tipos/todos", PQRSController.getTiposPQRS);

/**
 * @swagger
 * /api/pqrs/usuario/{id_usuario}:
 *   get:
 *     summary: Obtener PQRS por usuario
 *     description: Retorna las PQRS registradas por un usuario específico.
 *     tags: [PQRS]
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         description: Identificador del usuario
 *         schema:
 *           type: integer
 *           example: 4
 *     responses:
 *       200:
 *         description: PQRS del usuario obtenidas correctamente
 *       404:
 *         description: No se encontraron PQRS para el usuario indicado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/usuario/:id_usuario", PQRSController.getPQRSPorUsuario);

/**
 * @swagger
 * /api/pqrs/{id_pqr}:
 *   get:
 *     summary: Obtener una PQRS por ID
 *     description: Retorna la información de una PQRS específica según su identificador.
 *     tags: [PQRS]
 *     parameters:
 *       - in: path
 *         name: id_pqr
 *         required: true
 *         description: Identificador único de la PQRS
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: PQRS encontrada correctamente
 *       404:
 *         description: PQRS no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get("/:id_pqr", PQRSController.getPQRSPorId);

/**
 * @swagger
 * /api/pqrs:
 *   post:
 *     summary: Crear una nueva PQRS
 *     description: Permite registrar una nueva petición, queja, reclamo o sugerencia en el sistema.
 *     tags: [PQRS]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario:
 *                 type: integer
 *                 example: 4
 *               descripcion:
 *                 type: string
 *                 example: No puedo visualizar correctamente un recurso académico.
 *               id_tipo_pqrs:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: PQRS creada correctamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", PQRSController.createPQRS);

/**
 * @swagger
 * /api/pqrs/responder:
 *   put:
 *     summary: Responder una PQRS
 *     description: Permite registrar la respuesta administrativa a una PQRS existente.
 *     tags: [PQRS]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_pqr:
 *                 type: integer
 *                 example: 1
 *               respuesta:
 *                 type: string
 *                 example: El inconveniente fue corregido correctamente.
 *               id_admin:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: PQRS respondida correctamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: PQRS no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.put("/responder", PQRSController.responderPQRS);

/**
 * @swagger
 * /api/pqrs/{id_pqr}:
 *   delete:
 *     summary: Eliminar una PQRS
 *     description: Elimina una PQRS según su identificador.
 *     tags: [PQRS]
 *     parameters:
 *       - in: path
 *         name: id_pqr
 *         required: true
 *         description: Identificador de la PQRS
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: PQRS eliminada correctamente
 *       404:
 *         description: PQRS no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/:id_pqr", PQRSController.deletePQRS);

export default router;