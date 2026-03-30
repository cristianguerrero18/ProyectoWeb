import { RecursoLikesController } from "../../controllers/Usuarios/recursoLikes.controllers.js";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Reacciones
 *   description: Endpoints para la gestión de reacciones sobre recursos educativos
 */

/**
 * @swagger
 * /api/recurso-likes/recurso/{id_recurso}:
 *   get:
 *     summary: Obtener reacciones por recurso
 *     description: Retorna las reacciones asociadas a un recurso específico.
 *     tags: [Reacciones]
 */
router.get("/recurso/:id_recurso", RecursoLikesController.getLikesPorRecurso);

/**
 * @swagger
 * /api/recurso-likes/usuario/{id_usuario}:
 *   get:
 *     summary: Obtener reacciones por usuario
 *     description: Retorna las reacciones realizadas por un usuario específico.
 *     tags: [Reacciones]
 */
router.get("/usuario/:id_usuario", RecursoLikesController.getLikesPorUsuario);

/**
 * @swagger
 * /api/status/{id_recurso}/{id_usuario}:
 *   get:
 *     summary: Verificar estado de reacción
 *     description: Verifica si un usuario ya reaccionó sobre un recurso específico.
 *     tags: [Reacciones]
 */
router.get("/status/:id_recurso/:id_usuario", RecursoLikesController.getLikeStatus);

/**
 * @swagger
 * /api/estadisticas/{id_recurso}:
 *   get:
 *     summary: Obtener estadísticas de reacciones
 *     description: Retorna las estadísticas completas de reacciones de un recurso.
 *     tags: [Reacciones]
 */
router.get("/estadisticas/:id_recurso", RecursoLikesController.getEstadisticas);

/**
 * @swagger
 * /api/usuarios/reacciones:
 *   post:
 *     summary: Registrar una reacción
 *     description: Permite registrar un like o dislike sobre un recurso educativo.
 *     tags: [Reacciones]
 */
router.post("/", RecursoLikesController.postLike);

/**
 * @swagger
 * /api/{id_recurso}/{id_usuario}:
 *   delete:
 *     summary: Eliminar una reacción
 *     description: Elimina la reacción de un usuario sobre un recurso específico.
 *     tags: [Reacciones]
 */
router.delete("/:id_recurso/:id_usuario", RecursoLikesController.deleteLike);

export default router;