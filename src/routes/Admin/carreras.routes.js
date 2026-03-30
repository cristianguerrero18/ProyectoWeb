import { CarrerasController } from "../../controllers/Admin/carreras.controllers.js";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Carreras
 *   description: Endpoints para la gestión de carreras académicas del sistema
 */

/**
 * @swagger
 * /api/carreras:
 *   get:
 *     summary: Obtener todas las carreras
 *     description: Retorna la lista completa de carreras registradas en el sistema.
 *     tags: [Carreras]
 *     responses:
 *       200:
 *         description: Lista de carreras obtenida correctamente
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", CarrerasController.getCarreras);

/**
 * @swagger
 * /api/carreras/tipo/{id_tipo_carrera}:
 *   get:
 *     summary: Obtener carreras por tipo
 *     description: Retorna las carreras asociadas a un tipo de carrera específico.
 *     tags: [Carreras]
 *     parameters:
 *       - in: path
 *         name: id_tipo_carrera
 *         required: true
 *         description: Identificador del tipo de carrera
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Lista de carreras obtenida correctamente
 *       404:
 *         description: No se encontraron carreras para el tipo indicado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/tipo/:id_tipo_carrera", CarrerasController.getCarrerasPorTipo);

/**
 * @swagger
 * /api/carreras/{id}:
 *   get:
 *     summary: Obtener una carrera por ID
 *     description: Retorna la información de una carrera específica según su identificador.
 *     tags: [Carreras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único de la carrera
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Carrera encontrada correctamente
 *       404:
 *         description: Carrera no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get("/:id", CarrerasController.getCarreraPorId);

/**
 * @swagger
 * /api/carreras:
 *   post:
 *     summary: Crear una nueva carrera
 *     description: Permite registrar una nueva carrera dentro del sistema.
 *     tags: [Carreras]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_carrera:
 *                 type: string
 *                 example: Desarrollo de Sistemas Informáticos
 *               descripcion:
 *                 type: string
 *                 example: Programa académico orientado al desarrollo de software y sistemas.
 *               id_tipo_carrera:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Carrera registrada correctamente
 *       400:
 *         description: Datos inválidos o carrera duplicada
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", CarrerasController.postCarreras);

/**
 * @swagger
 * /api/carreras:
 *   put:
 *     summary: Actualizar una carrera
 *     description: Permite modificar la información de una carrera existente.
 *     tags: [Carreras]
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
 *               nombre_carrera:
 *                 type: string
 *                 example: Desarrollo de Sistemas Informáticos
 *               descripcion:
 *                 type: string
 *                 example: Programa actualizado de formación tecnológica.
 *               id_tipo_carrera:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Carrera actualizada correctamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Carrera no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.put("/", CarrerasController.putCarrera);

/**
 * @swagger
 * /api/carreras/{id}:
 *   delete:
 *     summary: Eliminar una carrera
 *     description: Elimina una carrera del sistema según su identificador.
 *     tags: [Carreras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único de la carrera
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Carrera eliminada correctamente
 *       404:
 *         description: Carrera no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/:id", CarrerasController.deleteCarrera);

export default router;