import LogAccesoController from "../../controllers/Admin/log_acceso.controllers.js";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Logs de Acceso
 *   description: Registro y consulta de logs de acceso al sistema
 */

/**
 * @swagger
 * /logs-acceso:
 *   get:
 *     summary: Obtener todos los logs de acceso
 *     tags: [Logs de Acceso]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *         description: Límite de registros a devolver
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Desplazamiento para paginación
 *     responses:
 *       200:
 *         description: Lista de logs obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LogAcceso'
 */
router.get("/", LogAccesoController.getTodos);

/**
 * @swagger
 * /logs-acceso/detallados:
 *   get:
 *     summary: Obtener logs detallados con información de usuario
 *     tags: [Logs de Acceso]
 *     parameters:
 *       - in: query
 *         name: fecha_inicio
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha de inicio para filtrar (YYYY-MM-DD)
 *       - in: query
 *         name: fecha_fin
 *         schema:
 *           type: string
 *           format: date
 *         description: Fecha de fin para filtrar (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Logs detallados obtenidos correctamente
 *       400:
 *         description: Parámetros de fecha inválidos
 */
router.get("/detallados", LogAccesoController.getDetallados);

/**
 * @swagger
 * /logs-acceso/usuario/{id_usuario}:
 *   get:
 *     summary: Obtener logs por usuario específico
 *     tags: [Logs de Acceso]
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *       - in: query
 *         name: dias
 *         schema:
 *           type: integer
 *           default: 30
 *         description: Número de días hacia atrás para consultar
 *     responses:
 *       200:
 *         description: Logs del usuario obtenidos correctamente
 *       404:
 *         description: Usuario no encontrado
 */
router.get("/usuario/:id_usuario", LogAccesoController.getLogsPorUsuario);

/**
 * @swagger
 * /logs-acceso:
 *   post:
 *     summary: Registrar log simple de acceso
 *     tags: [Logs de Acceso]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_usuario
 *               - tipo_evento
 *             properties:
 *               id_usuario:
 *                 type: integer
 *                 example: 1
 *               tipo_evento:
 *                 type: string
 *                 enum: [login, logout, acceso_recurso]
 *                 example: "login"
 *               descripcion:
 *                 type: string
 *                 example: "Inicio de sesión exitoso"
 *               ip:
 *                 type: string
 *                 example: "192.168.1.100"
 *     responses:
 *       201:
 *         description: Log registrado exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post("/", LogAccesoController.registrarLog);

/**
 * @swagger
 * /logs-acceso/completo:
 *   post:
 *     summary: Registrar log completo con todos los detalles
 *     tags: [Logs de Acceso]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_usuario
 *               - tipo_evento
 *               - modulo
 *             properties:
 *               id_usuario:
 *                 type: integer
 *                 example: 1
 *               tipo_evento:
 *                 type: string
 *                 enum: [login, logout, create, update, delete, view]
 *                 example: "create"
 *               modulo:
 *                 type: string
 *                 example: "recursos"
 *               accion:
 *                 type: string
 *                 example: "Crear nuevo recurso"
 *               detalles:
 *                 type: object
 *                 example: { "recurso_id": 123, "nombre": "Apuntes de Matemáticas" }
 *               ip:
 *                 type: string
 *                 example: "192.168.1.100"
 *               user_agent:
 *                 type: string
 *                 example: "Mozilla/5.0..."
 *               ubicacion:
 *                 type: string
 *                 example: "Bogotá, Colombia"
 *     responses:
 *       201:
 *         description: Log completo registrado exitosamente
 */
router.post("/completo", LogAccesoController.registrarLogCompleto);

export default router;