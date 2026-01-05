import { RecursoLikesController } from "../../controllers/Admin/recursoLikes.controllers.js";
import { Router } from "express";
import { verificarToken } from "../../middlewares/auth.js";

const router = Router();

// Todas las rutas requieren autenticación
router.use(verificarToken);

// Obtener likes de un recurso
router.get("/recurso/:id_recurso", RecursoLikesController.getLikesPorRecurso);

// Obtener likes de un usuario
router.get("/usuario/:id_usuario", RecursoLikesController.getLikesPorUsuario);

// Verificar si usuario ya dio like a un recurso
router.get("/status/:id_recurso/:id_usuario", RecursoLikesController.getLikeStatus);

// Obtener estadísticas completas de un recurso
router.get("/estadisticas/:id_recurso", RecursoLikesController.getEstadisticas);

// Dar like/dislike a un recurso
router.post("/", RecursoLikesController.postLike);

// Eliminar like
router.delete("/:id_recurso/:id_usuario", RecursoLikesController.deleteLike);

export default router;