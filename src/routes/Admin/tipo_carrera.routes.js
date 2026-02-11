import { method as Tipo_carreraControllers } from "../../controllers/Admin/tipo_carrera.controllers.js";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tipos de Carrera
 *   description: Gestión de tipos de carrera académica
 */

/**
 * @swagger
 * /tipo-carrera:
 *   get:
 *     summary: Obtener todos los tipos de carrera
 *     tags: [Tipos de Carrera]
 *     responses:
 *       200:
 *         description: Lista de tipos de carrera obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TipoCarrera'
 */
router.get('/', Tipo_carreraControllers.getTipo_carrera);

/**
 * @swagger
 * /tipo-carrera:
 *   post:
 *     summary: Crear nuevo tipo de carrera
 *     tags: [Tipos de Carrera]
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
 *                 example: "Pregrado"
 *                 description: Nombre del tipo de carrera
 *               descripcion:
 *                 type: string
 *                 example: "Programas de educación superior de nivel universitario"
 *               duracion_anios:
 *                 type: integer
 *                 example: 5
 *                 description: Duración típica en años
 *               nivel_academico:
 *                 type: string
 *                 example: "Universitario"
 *     responses:
 *       201:
 *         description: Tipo de carrera creado exitosamente
 *       400:
 *         description: El tipo de carrera ya existe o datos inválidos
 */
router.post('/', Tipo_carreraControllers.postTipo_carrera);

/**
 * @swagger
 * /tipo-carrera:
 *   put:
 *     summary: Actualizar tipo de carrera
 *     tags: [Tipos de Carrera]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_tipo_carrera
 *             properties:
 *               id_tipo_carrera:
 *                 type: integer
 *                 example: 1
 *               nombre:
 *                 type: string
 *                 example: "Pregrado Actualizado"
 *               descripcion:
 *                 type: string
 *                 example: "Programas universitarios actualizados"
 *               duracion_anios:
 *                 type: integer
 *                 example: 4
 *               nivel_academico:
 *                 type: string
 *                 example: "Universitario"
 *               estado:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Tipo de carrera actualizado exitosamente
 *       404:
 *         description: Tipo de carrera no encontrado
 */
router.put('/', Tipo_carreraControllers.putTipo_carrera);

/**
 * @swagger
 * /tipo-carrera/{id_tipo_carrera}:
 *   delete:
 *     summary: Eliminar tipo de carrera
 *     tags: [Tipos de Carrera]
 *     parameters:
 *       - in: path
 *         name: id_tipo_carrera
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de carrera a eliminar
 *     responses:
 *       200:
 *         description: Tipo de carrera eliminado exitosamente
 *       400:
 *         description: No se puede eliminar porque hay carreras asignadas a este tipo
 *       404:
 *         description: Tipo de carrera no encontrado
 */
router.delete('/:id_tipo_carrera', Tipo_carreraControllers.deleteTipo_carreras);

export default router;