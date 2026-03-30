import { CategoriaController } from "../../controllers/Admin/categorias.controllers.js";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Categorías
 *   description: Endpoints para la gestión de categorías de recursos del sistema
 */

/**
 * @swagger
 * /api/categorias:
 *   get:
 *     summary: Obtener todas las categorías
 *     description: Retorna la lista completa de categorías registradas en el sistema.
 *     tags: [Categorías]
 *     responses:
 *       200:
 *         description: Lista de categorías obtenida correctamente
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", CategoriaController.getCategoria);

/**
 * @swagger
 * /api/categorias/{id}:
 *   get:
 *     summary: Obtener una categoría por ID
 *     description: Retorna la información de una categoría específica según su identificador.
 *     tags: [Categorías]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único de la categoría
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Categoría encontrada correctamente
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get("/:id", CategoriaController.getCategoriaPorId);

/**
 * @swagger
 * /api/categorias:
 *   post:
 *     summary: Crear una nueva categoría
 *     description: Permite registrar una nueva categoría para la clasificación de recursos educativos.
 *     tags: [Categorías]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_categoria:
 *                 type: string
 *                 example: Talleres
 *     responses:
 *       201:
 *         description: Categoría registrada correctamente
 *       400:
 *         description: Datos inválidos o categoría duplicada
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", CategoriaController.postCategoria);

/**
 * @swagger
 * /api/categorias:
 *   put:
 *     summary: Actualizar una categoría
 *     description: Permite modificar la información de una categoría existente.
 *     tags: [Categorías]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_categoria:
 *                 type: integer
 *                 example: 1
 *               nombre_categoria:
 *                 type: string
 *                 example: Guías de estudio
 *     responses:
 *       200:
 *         description: Categoría actualizada correctamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.put("/", CategoriaController.putCateogoria);

/**
 * @swagger
 * /api/categorias/{id}:
 *   delete:
 *     summary: Eliminar una categoría
 *     description: Elimina una categoría del sistema según su identificador.
 *     tags: [Categorías]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único de la categoría
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Categoría eliminada correctamente
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/:id", CategoriaController.deleteCategorias);

export default router;