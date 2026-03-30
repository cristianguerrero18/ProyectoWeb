import { DerechosAutorController } from "../../controllers/Admin/derechos_autor.controllers.js";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: DerechosAutor
 *   description: Endpoints para la gestión de declaraciones de autoría o procedencia de recursos
 */

/**
 * @swagger
 * /api/derechos-autor:
 *   get:
 *     summary: Obtener todos los registros de derechos de autor
 *     description: Retorna la lista completa de declaraciones de autoría o procedencia registradas en el sistema.
 *     tags: [DerechosAutor]
 *     responses:
 *       200:
 *         description: Registros obtenidos correctamente
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", DerechosAutorController.getTodos);

/**
 * @swagger
 * /api/derechos-autor/{id}:
 *   get:
 *     summary: Obtener un registro de derechos de autor por ID
 *     description: Retorna la información de una declaración específica según su identificador.
 *     tags: [DerechosAutor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único del registro
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
router.get("/:id", DerechosAutorController.getPorId);

/**
 * @swagger
 * /api/derechos-autor:
 *   post:
 *     summary: Registrar una declaración de derechos de autor
 *     description: Permite registrar la declaración digital asociada a un recurso, indicando si el usuario es autor original o si debe registrar la fuente de procedencia.
 *     tags: [DerechosAutor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_recurso:
 *                 type: integer
 *                 example: 1
 *               es_autor_original:
 *                 type: boolean
 *                 example: false
 *               autor_original:
 *                 type: string
 *                 example: Juan Pérez
 *               fuente_original:
 *                 type: string
 *                 example: https://sitio-ejemplo.com/recurso.pdf
 *               licencia:
 *                 type: string
 *                 example: Uso académico
 *     responses:
 *       201:
 *         description: Declaración registrada correctamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", DerechosAutorController.post);

/**
 * @swagger
 * /api/derechos-autor/{id}:
 *   delete:
 *     summary: Eliminar un registro de derechos de autor
 *     description: Elimina una declaración de autoría o procedencia según su identificador.
 *     tags: [DerechosAutor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único del registro
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
router.delete("/:id", DerechosAutorController.eliminar);

export default router;