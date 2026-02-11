import { AsignaturaController } from "../../controllers/Admin/asignaturas.controllers.js";
import { Router } from "express";
import { verificarToken } from "../../middlewares/auth.js";

const router = Router();
router.use(verificarToken);

/**
 * @swagger
 * tags:
 *   name: Asignaturas
 *   description: Gestión de asignaturas académicas
 */

/**
 * @swagger
 * /asignaturas:
 *   get:
 *     summary: Obtener todas las asignaturas
 *     tags: [Asignaturas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de asignaturas obtenida correctamente
 *       401:
 *         description: No autorizado
 */
router.get("/", AsignaturaController.getAsignaturas);

/**
 * @swagger
 * /asignaturas/{id}:
 *   get:
 *     summary: Obtener asignatura por ID
 *     tags: [Asignaturas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la asignatura
 *     responses:
 *       200:
 *         description: Asignatura encontrada
 *       404:
 *         description: Asignatura no encontrada
 */
router.get("/:id", AsignaturaController.getAsignaturaPorId);

/**
 * @swagger
 * /asignaturas:
 *   post:
 *     summary: Crear asignaturas
 *     tags: [Asignaturas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               asignaturas:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Asignatura'
 *     responses:
 *       201:
 *         description: Asignatura(s) creada(s) correctamente
 *       400:
 *         description: Error en los datos proporcionados
 */
router.post("/", AsignaturaController.postAsignaturas);

/**
 * @swagger
 * /asignaturas:
 *   put:
 *     summary: Actualizar asignatura
 *     tags: [Asignaturas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Asignatura'
 *     responses:
 *       200:
 *         description: Asignatura actualizada correctamente
 *       404:
 *         description: Asignatura no encontrada
 */
router.put("/", AsignaturaController.putAsignatura);

/**
 * @swagger
 * /asignaturas/{id}:
 *   delete:
 *     summary: Eliminar asignatura
 *     tags: [Asignaturas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la asignatura a eliminar
 *     responses:
 *       200:
 *         description: Asignatura eliminada correctamente
 *       404:
 *         description: Asignatura no encontrada
 */
router.delete("/:id", AsignaturaController.deleteAsignatura);

export default router;