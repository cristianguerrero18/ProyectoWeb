import { FavoritosController } from "../../controllers/Admin/favoritos.controllers.js";
import { Router } from "express";

import { verificarToken } from "../../middlewares/auth.js";

const router = Router();
router.use(verificarToken);

// Obtener todos los favoritos
router.get("/", FavoritosController.getFavoritos);

// Obtener favoritos por usuario
router.get("/usuario/:id_usuario", FavoritosController.getFavoritosPorUsuario);

// Agregar a favoritos
router.post("/", FavoritosController.postFavoritos);

// Eliminar de favoritos
router.delete("/:id_usuario/:id_recurso", FavoritosController.deleteFavoritos);

export default router;
