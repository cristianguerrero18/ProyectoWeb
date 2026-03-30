import { FavoritosController } from "../../controllers/Usuarios/favoritos.controllers.js";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Favoritos
 *   description: Endpoints para la gestión de recursos favoritos de los usuarios
 */

/**
 * @swagger
 * /api/favoritos:
 *   get:
 *     summary: Obtener todos los favoritos
 *     description: Retorna la lista general de registros de favoritos del sistema.
 *     tags: [Favoritos]
 */
router.get("/", FavoritosController.getFavoritos);

/**
 * @swagger
 * /api/favoritos/usuario/{id_usuario}:
 *   get:
 *     summary: Obtener favoritos por usuario
 *     description: Retorna los recursos marcados como favoritos por un usuario específico.
 *     tags: [Favoritos]
 */
router.get("/usuario/:id_usuario", FavoritosController.getFavoritosPorUsuario);

/**
 * @swagger
 * /api/favoritos:
 *   post:
 *     summary: Agregar recurso a favoritos
 *     description: Permite registrar un recurso dentro de la lista de favoritos de un usuario.
 *     tags: [Favoritos]
 */
router.post("/", FavoritosController.postFavoritos);

/**
 * @swagger
 * /api/favoritos/{id_usuario}/{id_recurso}:
 *   delete:
 *     summary: Eliminar recurso de favoritos
 *     description: Elimina un recurso de la lista de favoritos de un usuario.
 *     tags: [Favoritos]
 */
router.delete("/:id_usuario/:id_recurso", FavoritosController.deleteFavoritos);

export default router;