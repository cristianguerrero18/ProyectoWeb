    import { RecursoController } from "../../controllers/Admin/recursos.controllers.js";
    import { Router } from "express";
    import multer from "multer";
    import { verificarToken } from "../../middlewares/auth.js";

    const router = Router();
 
    const upload = multer({ storage: multer.memoryStorage() }); // recibe archivo en memoria

    router.get("/", RecursoController.getRecurso);
    router.get("/:id", RecursoController.getRecursoPorId);

    router.get("/asignatura/:id_asignatura", RecursoController.getRecursosPorAsignatura);
    router.get("/usuario/:id_usuario", RecursoController.getRecursosPorUsuario);


    // Post con archivo
    router.post("/", upload.single("archivo"), RecursoController.postRecurso);

    router.put("/", RecursoController.putRecurso);
    router.delete("/:id", RecursoController.deleteRecursos);

    router.put("/estado/:id_recurso", RecursoController.cambiarEstadoRecurso);

// Detalle completo: likes, dislikes y comentarios
router.get("/detalle/:id_recurso", RecursoController.getRecursoDetalle);

    export default router;
