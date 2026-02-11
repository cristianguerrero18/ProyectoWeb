import { DerechosAutorController } from "../../controllers/Admin/derechos_autor.controllers.js";
import { Router } from "express";
import { verificarToken } from "../../middlewares/auth.js";

const router = Router();
router.use(verificarToken);

// Obtener todos
router.get("/", DerechosAutorController.getTodos);

// Obtener por ID
router.get("/:id", DerechosAutorController.getPorId);

// Crear
router.post("/", DerechosAutorController.post);

// Eliminar
router.delete("/:id", DerechosAutorController.eliminar);

export default router;