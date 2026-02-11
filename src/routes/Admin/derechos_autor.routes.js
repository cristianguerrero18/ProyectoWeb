import { DerechosAutorController } from "../../controllers/Admin/derechos_autor.controllers.js";
import { Router } from "express";
import { verificarToken } from "../../middlewares/auth.js";

const router = Router();
router.use(verificarToken);

/**
 * @swagger
 * tags:
 *   name: DerechosAutor
 *   description: Gestión de derechos de autor
 */

/**
 * @swagger
 * /derechos-autor:
 *   get:
 *     summary: Obtener todos los derechos de autor
 *     tags: [DerechosAutor]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de derechos de autor obtenida
 */
router.get("/", DerechosAutorController.getTodos);

/**
 * @swagger
 * /derechos-autor/{id}:
 *   get:
 *     summary: Obtener derecho de autor por ID
 *     tags: [DerechosAutor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Derecho de autor encontrado
 */
router.get("/:id", DerechosAutorController.getPorId);

/**
 * @swagger
 * /derechos-autor:
 *   post:
 *     summary: Crear nuevo derecho de autor
 *     tags: [DerechosAutor]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               autor:
 *                 type: string
 *               descripcion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Derecho de autor creado
 */
router.post("/", DerechosAutorController.post);

/**
 * @swagger
 * /derechos-autor/{id}:
 *   delete:
 *     summary: Eliminar derecho de autor
 *     tags: [DerechosAutor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Derecho de autor eliminado
 */
router.delete("/:id", DerechosAutorController.eliminar);

export default router;