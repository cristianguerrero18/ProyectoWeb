import {CategoriaController } from "../../controllers/Admin/categorias.controllers.js";
import { Router } from "express";
import { verificarToken } from "../../middlewares/auth.js";

const router = Router();
router.use(verificarToken);

// Obtener todos los registros del pensum
router.get("/", CategoriaController.getCategoria);

// Obtener registro por ID
router.get("/:id",CategoriaController.getCategoriaPorId);

// Crear registros del pensum
router.post("/", CategoriaController.postCategoria);

// Actualizar registro
router.put("/", CategoriaController.putCateogoria);

// Eliminar registro
router.delete("/:id", CategoriaController.deleteCategorias);

export default router;
