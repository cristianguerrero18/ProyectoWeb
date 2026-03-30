import { RolesController } from "../../controllers/Admin/roles.controllers.js";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Endpoints para la gestión de roles del sistema
 */

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Obtener todos los roles
 *     description: Retorna la lista completa de roles registrados en el sistema.
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Roles obtenidos correctamente
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", RolesController.getRoles);

/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     summary: Obtener un rol por ID
 *     description: Retorna la información de un rol específico según su identificador.
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único del rol
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Rol encontrado correctamente
 *       404:
 *         description: Rol no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/:id", RolesController.getRolPorId);

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Crear un nuevo rol
 *     description: Permite registrar un nuevo rol dentro del sistema.
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_rol:
 *                 type: string
 *                 example: Moderador
 *     responses:
 *       201:
 *         description: Rol creado correctamente
 *       400:
 *         description: Datos inválidos o rol duplicado
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", RolesController.postRoles);

/**
 * @swagger
 * /api/roles:
 *   put:
 *     summary: Actualizar un rol
 *     description: Permite modificar la información de un rol existente.
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_rol:
 *                 type: integer
 *                 example: 1
 *               nombre_rol:
 *                 type: string
 *                 example: Administrador académico
 *     responses:
 *       200:
 *         description: Rol actualizado correctamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Rol no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put("/", RolesController.putRoles);

/**
 * @swagger
 * /api/roles/{id}:
 *   delete:
 *     summary: Eliminar un rol
 *     description: Elimina un rol del sistema según su identificador.
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único del rol
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Rol eliminado correctamente
 *       404:
 *         description: Rol no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/:id", RolesController.deleteRoles);

export default router;