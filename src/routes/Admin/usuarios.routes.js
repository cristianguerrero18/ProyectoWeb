import { method as UsuariosControllers } from "../../controllers/Admin/usuarios.controllers.js";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Endpoints para la gestión de usuarios del sistema
 */

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Permite crear una nueva cuenta de usuario dentro del sistema.
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombres_usuario:
 *                 type: string
 *                 example: Juan
 *               apellidos_usuario:
 *                 type: string
 *                 example: Pérez
 *               correo:
 *                 type: string
 *                 example: juan@uts.edu.co
 *               contrasena:
 *                 type: string
 *                 example: MiClave123*
 *               id_carrera:
 *                 type: integer
 *                 example: 1
 *               id_rol:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 *       400:
 *         description: Datos inválidos o usuario duplicado
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", UsuariosControllers.postUsuarios);

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     description: Retorna la lista completa de usuarios registrados en el sistema.
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Usuarios obtenidos correctamente
 *       500:
 *         description: Error interno del servidor
 */
router.get("/", UsuariosControllers.getUsuarios);

/**
 * @swagger
 * /api/usuarios:
 *   put:
 *     summary: Actualizar un usuario
 *     description: Permite modificar la información de un usuario existente.
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario:
 *                 type: integer
 *                 example: 1
 *               nombres_usuario:
 *                 type: string
 *                 example: Juan Carlos
 *               apellidos_usuario:
 *                 type: string
 *                 example: Pérez Gómez
 *               correo:
 *                 type: string
 *                 example: juan@uts.edu.co
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put("/", UsuariosControllers.putUsuarios);

/**
 * @swagger
 * /api/usuarios/login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Autentica a un usuario y valida sus credenciales de acceso.
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *                 example: juan@uts.edu.co
 *               contrasena:
 *                 type: string
 *                 example: MiClave123*
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       401:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error interno del servidor
 */
router.post("/login", UsuariosControllers.login);

/**
 * @swagger
 * /api/usuarios/recuperar-clave:
 *   post:
 *     summary: Recuperar contraseña
 *     description: Inicia el proceso de recuperación de contraseña para un usuario registrado.
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *                 example: juan@uts.edu.co
 *     responses:
 *       200:
 *         description: Proceso de recuperación iniciado correctamente
 *       404:
 *         description: Correo no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.post("/recuperar-clave", UsuariosControllers.recuperarClave);

/**
 * @swagger
 * /api/usuarios/carrera/{id_carrera}:
 *   get:
 *     summary: Obtener información de carrera por ID
 *     description: Retorna la información de una carrera asociada a un usuario.
 *     tags: [Usuarios]
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
 *         description: Carrera obtenida correctamente
 *       404:
 *         description: Carrera no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get("/carrera/:id_carrera", UsuariosControllers.obtenerCarreraPorId);

/**
 * @swagger
 * /api/usuarios/rol/{id_rol}:
 *   get:
 *     summary: Obtener información de rol por ID
 *     description: Retorna la información del rol asociado a un usuario.
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id_rol
 *         required: true
 *         description: Identificador del rol
 *         schema:
 *           type: integer
 *           example: 2
 *     responses:
 *       200:
 *         description: Rol obtenido correctamente
 *       404:
 *         description: Rol no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/rol/:id_rol", UsuariosControllers.obtenerRolPorId);

/**
 * @swagger
 * /api/usuarios/existe-correo/{correo}:
 *   get:
 *     summary: Verificar si un correo ya existe
 *     description: Retorna si un correo electrónico ya se encuentra registrado en el sistema.
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: correo
 *         required: true
 *         description: Correo a verificar
 *         schema:
 *           type: string
 *           example: juan@uts.edu.co
 *     responses:
 *       200:
 *         description: Validación de correo realizada correctamente
 *       500:
 *         description: Error interno del servidor
 */
router.get("/existe-correo/:correo", UsuariosControllers.existeCorreo);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     description: Retorna la información de un usuario específico según su identificador.
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador único del usuario
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Usuario encontrado correctamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get("/:id", UsuariosControllers.obtenerporId);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     description: Elimina un usuario del sistema según su identificador.
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador del usuario
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/:id", UsuariosControllers.deleteUser);

export default router;