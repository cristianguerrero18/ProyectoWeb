import { ComentariosController } from "../../controllers/Usuarios/comentarios.controllers.js";
import { Router } from "express";
import { verificarToken } from "../../middlewares/auth.js";

const router = Router();

// Todas las rutas requieren autenticación
router.use(verificarToken);

// Obtener comentarios de un recurso (público)
router.get("/recurso/:id_recurso", ComentariosController.getComentariosPorRecurso);

// Obtener comentarios de un usuario
router.get("/usuario/:id_usuario", ComentariosController.getComentariosPorUsuario);

// Obtener comentario por ID
router.get("/:id", ComentariosController.getComentarioPorId);

// Verificar permisos sobre un comentario
router.get("/permisos/:id_comentario", ComentariosController.verificarPermisosComentario);

// Buscar comentarios
router.get("/buscar", ComentariosController.buscarComentarios);

// Obtener comentarios recientes
router.get("/", ComentariosController.getComentariosRecientes);

// Crear comentario
router.post("/", ComentariosController.postComentario);

// Actualizar comentario
router.put("/", ComentariosController.putComentario);

// Eliminar comentario
router.delete("/:id", ComentariosController.deleteComentario);

export default router;