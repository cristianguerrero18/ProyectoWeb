import { RolesController } from "../../controllers/Admin/roles.controllers.js";
import { Router } from "express";
import { verificarToken } from "../../middlewares/auth.js";

const router = Router();
router.use(verificarToken);

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Gestión de roles de usuario
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Obtener todos los roles
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de roles obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rol'
 */
router.get("/", RolesController.getRoles);

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     summary: Obtener rol por ID
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del rol
 *     responses:
 *       200:
 *         description: Rol encontrado
 *       404:
 *         description: Rol no encontrado
 */
router.get("/:id", RolesController.getRolPorId);

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Crear nuevo rol
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Editor"
 *                 description: Nombre del rol
 *               descripcion:
 *                 type: string
 *                 example: "Puede crear y editar contenido"
 *                 description: Descripción del rol
 *               permisos:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["crear_recurso", "editar_recurso", "comentar"]
 *                 description: Lista de permisos del rol
 *     responses:
 *       201:
 *         description: Rol creado exitosamente
 *       400:
 *         description: El rol ya existe o datos inválidos
 */
router.post("/", RolesController.postRoles);

/**
 * @swagger
 * /roles:
 *   put:
 *     summary: Actualizar rol existente
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *                 description: ID del rol a actualizar
 *               nombre:
 *                 type: string
 *                 example: "Editor Avanzado"
 *               descripcion:
 *                 type: string
 *                 example: "Puede crear, editar y aprobar contenido"
 *               permisos:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["crear_recurso", "editar_recurso", "aprobar_recurso", "comentar"]
 *               estado:
 *                 type: boolean
 *                 example: true
 *                 description: Estado activo/inactivo del rol
 *     responses:
 *       200:
 *         description: Rol actualizado exitosamente
 *       404:
 *         description: Rol no encontrado
 */
router.put("/", RolesController.putRoles);

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     summary: Eliminar rol
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del rol a eliminar
 *     responses:
 *       200:
 *         description: Rol eliminado exitosamente
 *       400:
 *         description: No se puede eliminar el rol porque tiene usuarios asignados
 *       404:
 *         description: Rol no encontrado
 */
router.delete("/:id", RolesController.deleteRoles);

export default router;