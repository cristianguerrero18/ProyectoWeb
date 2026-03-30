import { PensumController } from "../../controllers/Admin/pensum.controllers.js";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Pensum
 *   description: Endpoints para la gestión del pensum académico del sistema
 */

/**
 * @swagger
 * /api/pensum:
 *   get:
 *     summary: Obtener todos los registros del pensum
 *     description: Retorna la lista completa de registros del pensum académico.
 *     tags: [Pensum]
 *     responses:
 *       200:
 *         description: Registros del pensum obtenidos correctamente
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", PensumController.getPensum);

/**
 * @swagger
 * /api/pensum/carrera/{id_carrera}/nombres:
 *   get:
 *     summary: Obtener nombres de asignaturas por carrera
 *     description: Retorna únicamente los nombres de las asignaturas asociadas a una carrera específica.
 *     tags: [Pensum]
 *     parameters:
 *       - in: path
 *         name: id_carrera
 *         required: true
 *         description: Identificador de la carrera
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Nombres de asignaturas obtenidos correctamente
 *       404:
 *         description: No se encontraron asignaturas para la carrera indicada
 *       500:
 *         description: Error interno del servidor
 */
router.get("/carrera/:id_carrera/nombres", PensumController.getNombresAsignaturasPorCarrera);

/**
 * @swagger
 * /api/pensum/carrera/{id_carrera}:
 *   get:
 *     summary: Obtener asignaturas del pensum por carrera
 *     description: Retorna las asignaturas asociadas a una carrera específica dentro del pensum.
 *     tags: [Pensum]
 *     parameters:
 *       - in: path
 *         name: id_carrera
 *         required: true
 *         description: Identificador de la carrera
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Asignaturas del pensum obtenidas correctamente
 *       404:
 *         description: No se encontraron asignaturas para la carrera indicada
 *       500:
 *         description: Error interno del servidor
 */
router.get("/carrera/:id_carrera", PensumController.getAsignaturasPorCarrera);

/**
 * @swagger
 * /api/pensum/{id}:
 *   get:
 *     summary: Obtener un registro del pensum por ID
 *     description: Retorna la información de un registro específico del pensum según su identificador.
 *     tags: [Pensum]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único del registro del pensum
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Registro encontrado correctamente
 *       404:
 *         description: Registro no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/:id", PensumController.getPensumPorId);

/**
 * @swagger
 * /api/pensum:
 *   post:
 *     summary: Crear un nuevo registro del pensum
 *     description: Permite registrar una nueva relación entre carrera, semestre y asignatura dentro del pensum.
 *     tags: [Pensum]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_carrera:
 *                 type: integer
 *                 example: 1
 *               numero_semestre:
 *                 type: integer
 *                 example: 3
 *               id_asignatura:
 *                 type: integer
 *                 example: 7
 *     responses:
 *       201:
 *         description: Registro del pensum creado correctamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", PensumController.postPensum);

/**
 * @swagger
 * /api/pensum:
 *   put:
 *     summary: Actualizar un registro del pensum
 *     description: Permite modificar un registro existente del pensum académico.
 *     tags: [Pensum]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_pensum:
 *                 type: integer
 *                 example: 1
 *               id_carrera:
 *                 type: integer
 *                 example: 1
 *               numero_semestre:
 *                 type: integer
 *                 example: 4
 *               id_asignatura:
 *                 type: integer
 *                 example: 8
 *     responses:
 *       200:
 *         description: Registro actualizado correctamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Registro no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put("/", PensumController.putPensum);

/**
 * @swagger
 * /api/pensum/{id}:
 *   delete:
 *     summary: Eliminar un registro del pensum
 *     description: Elimina un registro del pensum según su identificador.
 *     tags: [Pensum]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador del registro del pensum
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Registro eliminado correctamente
 *       404:
 *         description: Registro no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/:id", PensumController.deletePensum);

export default router;