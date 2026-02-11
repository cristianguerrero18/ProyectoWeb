import { PensumController } from "../../controllers/Admin/pensum.controllers.js";
import { Router } from "express";
import { verificarToken } from "../../middlewares/auth.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Pensum
 *   description: Gestión de pensum académico
 */

/**
 * @swagger
 * /pensum:
 *   get:
 *     summary: Obtener todos los registros del pensum
 *     tags: [Pensum]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de registros del pensum
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pensum'
 */
router.get("/", PensumController.getPensum);

/**
 * @swagger
 * /pensum/{id}:
 *   get:
 *     summary: Obtener registro del pensum por ID
 *     tags: [Pensum]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del registro del pensum
 *     responses:
 *       200:
 *         description: Registro del pensum encontrado
 *       404:
 *         description: Registro no encontrado
 */
router.get("/:id", PensumController.getPensumPorId);

/**
 * @swagger
 * /pensum:
 *   post:
 *     summary: Crear registros en el pensum
 *     tags: [Pensum]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               registros:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/PensumInput'
 *     responses:
 *       201:
 *         description: Registros creados exitosamente
 *       400:
 *         description: Error en los datos
 */
router.post("/", PensumController.postPensum);

/**
 * @swagger
 * /pensum:
 *   put:
 *     summary: Actualizar registro del pensum
 *     tags: [Pensum]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PensumUpdate'
 *     responses:
 *       200:
 *         description: Registro actualizado exitosamente
 *       404:
 *         description: Registro no encontrado
 */
router.put("/", PensumController.putPensum);

/**
 * @swagger
 * /pensum/{id}:
 *   delete:
 *     summary: Eliminar registro del pensum
 *     tags: [Pensum]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del registro a eliminar
 *     responses:
 *       200:
 *         description: Registro eliminado exitosamente
 *       404:
 *         description: Registro no encontrado
 */
router.delete("/:id", PensumController.deletePensum);

/**
 * @swagger
 * /pensum/carrera/{id_carrera}:
 *   get:
 *     summary: Obtener asignaturas por carrera
 *     tags: [Pensum]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_carrera
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la carrera
 *       - in: query
 *         name: semestre
 *         schema:
 *           type: integer
 *         description: Filtrar por semestre específico
 *     responses:
 *       200:
 *         description: Asignaturas de la carrera obtenidas
 *       404:
 *         description: Carrera no encontrada
 */
router.get("/carrera/:id_carrera", PensumController.getAsignaturasPorCarrera);

/**
 * @swagger
 * /pensum/carrera/{id_carrera}/nombres:
 *   get:
 *     summary: Obtener solo nombres de asignaturas por carrera
 *     tags: [Pensum]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_carrera
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la carrera
 *     responses:
 *       200:
 *         description: Nombres de asignaturas obtenidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_asignatura:
 *                     type: integer
 *                   nombre_asignatura:
 *                     type: string
 */
router.get("/carrera/:id_carrera/nombres", PensumController.getNombresAsignaturasPorCarrera);

export default router;