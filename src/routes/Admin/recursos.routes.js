import { RecursoController } from "../../controllers/Admin/recursos.controllers.js";
import { Router } from "express";
import multer from "multer";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// CRUD principal
router.get("/", RecursoController.getRecurso);
router.get("/asignatura/:id_asignatura", RecursoController.getRecursosPorAsignatura);
router.get("/usuario/:id_usuario", RecursoController.getRecursosPorUsuario);
router.get("/detalle/:id_recurso", RecursoController.getRecursoDetalle);

// NUEVOS ENDPOINTS DE ARCHIVO
router.get("/:id_recurso/meta-archivo", RecursoController.getRecursoArchivoMeta);
router.get("/:id_recurso/ver", RecursoController.verRecursoArchivo);
router.get("/:id_recurso/descargar", RecursoController.descargarRecursoArchivo);

// Rutas existentes
router.get("/:id", RecursoController.getRecursoPorId);
router.post("/", upload.single("archivo"), RecursoController.postRecurso);
router.put("/", RecursoController.putRecurso);
router.put("/estado/:id_recurso", RecursoController.cambiarEstadoRecurso);
router.delete("/:id", RecursoController.deleteRecursos);

export default router;