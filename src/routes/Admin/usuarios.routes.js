import { method as UsuariosControllers } from "../../controllers/Admin/usuarios.controllers.js";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Usuarios (Admin)
 *     description: Gestión de usuarios (administración)
 *   - name: Autenticación
 *     description: Login y recuperación de contraseña
 */

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Crear nuevo usuario
 *     tags: [Usuarios (Admin)]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - correo
 *               - clave
 *               - id_rol
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Juan Pérez"
 *               correo:
 *                 type: string
 *                 format: email
 *                 example: "juan@ejemplo.com"
 *               clave:
 *                 type: string
 *                 example: "password123"
 *                 description: Contraseña del usuario
 *               id_rol:
 *                 type: integer
 *                 example: 2
 *                 description: ID del rol del usuario
 *               id_carrera:
 *                 type: integer
 *                 example: 1
 *                 description: ID de la carrera (opcional para estudiantes)
 *               telefono:
 *                 type: string
 *                 example: "3001234567"
 *               estado:
 *                 type: boolean
 *                 example: true
 *                 description: Estado activo/inactivo
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Correo ya existe o datos inválidos
 */
router.post('/', UsuariosControllers.postUsuarios);

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios (Admin)]
 *     parameters:
 *       - in: query
 *         name: rol
 *         schema:
 *           type: integer
 *         description: Filtrar por ID de rol
 *       - in: query
 *         name: estado
 *         schema:
 *           type: boolean
 *         description: Filtrar por estado activo/inactivo
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *         description: Límite de resultados
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida
 */
router.get('/', UsuariosControllers.getUsuarios);

/**
 * @swagger
 * /usuarios:
 *   put:
 *     summary: Actualizar usuario
 *     tags: [Usuarios (Admin)]
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
 *               nombre:
 *                 type: string
 *                 example: "Juan Pérez Actualizado"
 *               correo:
 *                 type: string
 *                 format: email
 *                 example: "juan.nuevo@ejemplo.com"
 *               id_rol:
 *                 type: integer
 *                 example: 3
 *               id_carrera:
 *                 type: integer
 *                 example: 1
 *               telefono:
 *                 type: string
 *                 example: "3007654321"
 *               estado:
 *                 type: boolean
 *                 example: true
 *               clave:
 *                 type: string
 *                 description: Nueva contraseña (opcional)
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       404:
 *         description: Usuario no encontrado
 */
router.put('/', UsuariosControllers.putUsuarios);

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - correo
 *               - clave
 *             properties:
 *               correo:
 *                 type: string
 *                 format: email
 *                 example: "juan@ejemplo.com"
 *               clave:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticación
 *                 usuario:
 *                   $ref: '#/components/schemas/Usuario'
 *       401:
 *         description: Credenciales inválidas
 *       403:
 *         description: Usuario inactivo
 */
router.post('/login', UsuariosControllers.login);

/**
 * @swagger
 * /usuarios/recuperar-clave:
 *   post:
 *     summary: Solicitar recuperación de contraseña
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - correo
 *             properties:
 *               correo:
 *                 type: string
 *                 format: email
 *                 example: "juan@ejemplo.com"
 *     responses:
 *       200:
 *         description: Correo de recuperación enviado
 *       404:
 *         description: Usuario no encontrado
 */
router.post('/recuperar-clave', UsuariosControllers.recuperarClave);

/**
 * @swagger
 * /usuarios/carrera/{id_carrera}:
 *   get:
 *     summary: Obtener usuarios por carrera
 *     tags: [Usuarios (Admin)]
 *     parameters:
 *       - in: path
 *         name: id_carrera
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la carrera
 *     responses:
 *       200:
 *         description: Usuarios de la carrera obtenidos
 */
router.get('/carrera/:id_carrera', UsuariosControllers.obtenerCarreraPorId);

/**
 * @swagger
 * /usuarios/rol/{id_rol}:
 *   get:
 *     summary: Obtener usuarios por rol
 *     tags: [Usuarios (Admin)]
 *     parameters:
 *       - in: path
 *         name: id_rol
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del rol
 *     responses:
 *       200:
 *         description: Usuarios con el rol especificado obtenidos
 */
router.get('/rol/:id_rol', UsuariosControllers.obtenerRolPorId);

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Eliminar usuario
 *     tags: [Usuarios (Admin)]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       400:
 *         description: No se puede eliminar usuario con recursos asociados
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/:id', UsuariosControllers.deleteUser);

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     tags: [Usuarios (Admin)]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:id', UsuariosControllers.obtenerporId);

/**
 * @swagger
 * /usuarios/existe-correo/{correo}:
 *   get:
 *     summary: Verificar si correo existe
 *     tags: [Usuarios (Admin)]
 *     parameters:
 *       - in: path
 *         name: correo
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *         description: Correo electrónico a verificar
 *     responses:
 *       200:
 *         description: Resultado de la verificación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 existe:
 *                   type: boolean
 *                   example: true
 *                 usuario_id:
 *                   type: integer
 *                   example: 1
 *                   description: ID del usuario si existe
 */
router.get('/existe-correo/:correo', UsuariosControllers.existeCorreo);

export default router;