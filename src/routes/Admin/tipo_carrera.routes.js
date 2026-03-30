import { method as Tipo_carreraControllers } from "../../controllers/Admin/tipo_carrera.controllers.js";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: TiposCarrera
 *   description: Endpoints para la gestión de tipos de carrera del sistema
 */

/**
 * @swagger
 * /api/tipos-carrera:
 *   get:
 *     summary: Obtener todos los tipos de carrera
 *     description: Retorna la lista completa de tipos de carrera registrados en el sistema.
 *     tags: [TiposCarrera]
 *     responses:
 *       200:
 *         description: Tipos de carrera obtenidos correctamente
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", Tipo_carreraControllers.getTipo_carrera);

/**
 * @swagger
 * /api/tipos-carrera:
 *   post:
 *     summary: Crear un nuevo tipo de carrera
 *     description: Permite registrar un nuevo tipo de carrera dentro del sistema.
 *     tags: [TiposCarrera]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_tipo_carrera:
 *                 type: string
 *                 example: Tecnológica
 *     responses:
 *       201:
 *         description: Tipo de carrera creado correctamente
 *       400:
 *         description: Datos inválidos o tipo duplicado
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", Tipo_carreraControllers.postTipo_carrera);

/**
 * @swagger
 * /api/tipos-carrera:
 *   put:
 *     summary: Actualizar un tipo de carrera
 *     description: Permite modificar la información de un tipo de carrera existente.
 *     tags: [TiposCarrera]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_tipo_carrera:
 *                 type: integer
 *                 example: 1
 *               nombre_tipo_carrera:
 *                 type: string
 *                 example: Profesional
 *     responses:
 *       200:
 *         description: Tipo de carrera actualizado correctamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Tipo de carrera no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put("/", Tipo_carreraControllers.putTipo_carrera);

/**
 * @swagger
 * /api/tipos-carrera/{id_tipo_carrera}:
 *   delete:
 *     summary: Eliminar un tipo de carrera
 *     description: Elimina un tipo de carrera según su identificador.
 *     tags: [TiposCarrera]
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
 *         description: Tipo de carrera eliminado correctamente
 *       404:
 *         description: Tipo de carrera no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/:id_tipo_carrera", Tipo_carreraControllers.deleteTipo_carreras);

export default router;