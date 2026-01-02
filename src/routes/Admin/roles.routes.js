import { RolesController } from "../../controllers/Admin/roles.controllers.js";
import { Router } from "express";

import { verificarToken } from "../../middlewares/auth.js";

const router = Router();
router.use(verificarToken);

// Obtener todos los roles
router.get("/", RolesController.getRoles);

// Obtener rol por ID
router.get("/:id", RolesController.getRolPorId);

// Crear rol
router.post("/", RolesController.postRoles);

// Actualizar rol
router.put("/", RolesController.putRoles);

// Eliminar rol
router.delete("/:id", RolesController.deleteRoles);

export default router;
