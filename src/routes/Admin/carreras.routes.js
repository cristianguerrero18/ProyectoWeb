import { CarrerasController } from "../../controllers/Admin/carreras.controllers.js";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Carreras
 *   description: Gestión de carreras académicas
 */

/**
 * @swagger
 * /carreras:
 *   get:
 *     summary: Obtener todas las carreras
 *     tags: [Carreras]
 *     responses:
 *       200:
 *         description: Lista de carreras obtenida correctamente
 */
router.get("/", CarrerasController.getCarreras);

/**
 * @swagger
 * /carreras/{id}:
 *   get:
 *     summary: Obtener carrera por ID
 *     tags: [Carreras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la carrera
 *     responses:
 *       200:
 *         description: Carrera encontrada
 *       404:
 *         description: Carrera no encontrada
 */
router.get("/:id", CarrerasController.getCarreraPorId);

/**
 * @swagger
 * /carreras/tipo/{id_tipo_carrera}:
 *   get:
 *     summary: Obtener carreras por tipo
 *     tags: [Carreras]
 *     parameters:
 *       - in: path
 *         name: id_tipo_carrera
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de carrera
 *     responses:
 *       200:
 *         description: Lista de carreras del tipo especificado
 *       404:
 *         description: Tipo de carrera no encontrado
 */
router.get("/tipo/:id_tipo_carrera", CarrerasController.getCarrerasPorTipo);

/**
 * @swagger
 * /carreras:
 *   post:
 *     summary: Crear carreras
 *     tags: [Carreras]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               carreras:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Carrera'
 *     responses:
 *       201:
 *         description: Carrera(s) creada(s) correctamente
 */
router.post("/", CarrerasController.postCarreras);

/**
 * @swagger
 * /carreras:
 *   put:
 *     summary: Actualizar carrera
 *     tags: [Carreras]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Carrera'
 *     responses:
 *       200:
 *         description: Carrera actualizada correctamente
 */
router.put("/", CarrerasController.putCarrera);

/**
 * @swagger
 * /carreras/{id}:
 *   delete:
 *     summary: Eliminar carrera
 *     tags: [Carreras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la carrera a eliminar
 *     responses:
 *       200:
 *         description: Carrera eliminada correctamente
 */
router.delete("/:id", CarrerasController.deleteCarrera);

export default router;