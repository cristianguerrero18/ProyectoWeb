import { AsignaturaController } from "../../controllers/Admin/asignaturas.controllers.js";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Asignaturas
 *   description: Endpoints para la gestión de asignaturas del sistema
 */

/**
 * @swagger
 * /api/asignaturas:
 *   get:
 *     summary: Obtener todas las asignaturas
 *     description: Retorna la lista completa de asignaturas registradas en el sistema.
 *     tags: [Asignaturas]
 *     responses:
 *       200:
 *         description: Lista de asignaturas obtenida correctamente
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", AsignaturaController.getAsignaturas);

/**
 * @swagger
 * /api/asignaturas/{id}:
 *   get:
 *     summary: Obtener una asignatura por ID
 *     description: Retorna la información de una asignatura específica según su identificador.
 *     tags: [Asignaturas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único de la asignatura
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Asignatura encontrada correctamente
 *       404:
 *         description: Asignatura no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get("/:id", AsignaturaController.getAsignaturaPorId);

/**
 * @swagger
 * /api/asignaturas:
 *   post:
 *     summary: Crear una o varias asignaturas
 *     description: Permite registrar una nueva asignatura o un arreglo de asignaturas en el sistema.
 *     tags: [Asignaturas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - type: object
 *                 properties:
 *                   nombre_asignatura:
 *                     type: string
 *                     example: Base de Datos
 *               - type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     nombre_asignatura:
 *                       type: string
 *                       example: Programación Web
 *     responses:
 *       201:
 *         description: Asignatura(s) registrada(s) correctamente
 *       400:
 *         description: Datos inválidos o asignatura duplicada
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", AsignaturaController.postAsignaturas);

/**
 * @swagger
 * /api/asignaturas:
 *   put:
 *     summary: Actualizar una asignatura
 *     description: Permite modificar la información de una asignatura existente.
 *     tags: [Asignaturas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_asignatura:
 *                 type: integer
 *                 example: 1
 *               nombre_asignatura:
 *                 type: string
 *                 example: Estructura de Datos
 *     responses:
 *       200:
 *         description: Asignatura actualizada correctamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Asignatura no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.put("/", AsignaturaController.putAsignatura);

/**
 * @swagger
 * /api/asignaturas/{id}:
 *   delete:
 *     summary: Eliminar una asignatura
 *     description: Elimina una asignatura del sistema según su identificador.
 *     tags: [Asignaturas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único de la asignatura
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Asignatura eliminada correctamente
 *       404:
 *         description: Asignatura no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/:id", AsignaturaController.deleteAsignatura);

export default router;