import { ComentariosController } from "../../controllers/Usuarios/comentarios.controllers.js";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Comentarios
 *   description: Endpoints para la gestión de comentarios sobre recursos educativos
 */

/**
 * @swagger
 * /api/comentarios/recurso/{id_recurso}:
 *   get:
 *     summary: Obtener comentarios por recurso
 *     description: Retorna los comentarios asociados a un recurso específico.
 *     tags: [Comentarios]
 */
router.get("/recurso/:id_recurso", ComentariosController.getComentariosPorRecurso);

/**
 * @swagger
 * /api/comentarios/usuario/{id_usuario}:
 *   get:
 *     summary: Obtener comentarios por usuario
 *     description: Retorna los comentarios realizados por un usuario específico.
 *     tags: [Comentarios]
 */
router.get("/usuario/:id_usuario", ComentariosController.getComentariosPorUsuario);

/**
 * @swagger
 * /api/comentarios/permisos/{id_comentario}:
 *   get:
 *     summary: Verificar permisos sobre un comentario
 *     description: Verifica si el usuario tiene permisos para operar sobre un comentario específico.
 *     tags: [Comentarios]
 */
router.get("/permisos/:id_comentario", ComentariosController.verificarPermisosComentario);

/**
 * @swagger
 * /api/comentarios/buscar:
 *   get:
 *     summary: Buscar comentarios
 *     description: Permite realizar búsquedas de comentarios según criterios definidos.
 *     tags: [Comentarios]
 */
router.get("/buscar", ComentariosController.buscarComentarios);

/**
 * @swagger
 * /api/comentarios:
 *   get:
 *     summary: Obtener comentarios recientes
 *     description: Retorna la lista de comentarios recientes del sistema.
 *     tags: [Comentarios]
 */
router.get("/", ComentariosController.getComentariosRecientes);

/**
 * @swagger
 * /api/comentarios/{id}:
 *   get:
 *     summary: Obtener comentario por ID
 *     description: Retorna un comentario específico según su identificador.
 *     tags: [Comentarios]
 */
router.get("/:id", ComentariosController.getComentarioPorId);

/**
 * @swagger
 * /api/comentarios:
 *   post:
 *     summary: Crear un comentario
 *     description: Permite registrar un nuevo comentario sobre un recurso educativo.
 *     tags: [Comentarios]
 */
router.post("/", ComentariosController.postComentario);

/**
 * @swagger
 * /api/comentarios:
 *   put:
 *     summary: Actualizar un comentario
 *     description: Permite modificar un comentario existente.
 *     tags: [Comentarios]
 */
router.put("/", ComentariosController.putComentario);

/**
 * @swagger
 * /api/comentarios/{id}:
 *   delete:
 *     summary: Eliminar un comentario
 *     description: Elimina un comentario según su identificador.
 *     tags: [Comentarios]
 */
router.delete("/:id", ComentariosController.deleteComentario);

export default router;