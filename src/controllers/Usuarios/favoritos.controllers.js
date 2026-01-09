import FavoritosModel from "../../models/Usuarios/favoritos.models.js";

/* ===========================
   OBTENER FAVORITOS
=========================== */

// Obtener todos los favoritos
const getFavoritos = async (req, res) => {
  try {
    const favoritos = await FavoritosModel.getTodos();
    // Siempre 200, aunque esté vacío
    res.status(200).json(favoritos);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los favoritos",
      error: error.message,
    });
  }
};

// Obtener favoritos por usuario
const getFavoritosPorUsuario = async (req, res) => {
  const { id_usuario } = req.params;

  if (!id_usuario) {
    return res
      .status(400)
      .json({ mensaje: "El ID del usuario es obligatorio" });
  }

  try {
    const favoritos = await FavoritosModel.getPorUsuario(id_usuario);
    // 200 + [] si no tiene favoritos
    res.status(200).json(favoritos);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los favoritos del usuario",
      error: error.message,
    });
  }
};

/* ===========================
   GESTIÓN DE FAVORITOS
=========================== */

// Agregar a favoritos
const postFavoritos = async (req, res) => {
  const { id_usuario, id_recurso } = req.body;

  if (!id_usuario || !id_recurso) {
    return res.status(400).json({
      mensaje: "id_usuario e id_recurso son obligatorios",
    });
  }

  try {
    const existe = await FavoritosModel.existe(id_usuario, id_recurso);
    if (existe) {
      return res.status(409).json({
        mensaje: "El recurso ya está en favoritos",
      });
    }

    await FavoritosModel.agregar({ id_usuario, id_recurso });

    res.status(201).json({
      mensaje: "Recurso agregado a favoritos correctamente",
      id_usuario,
      id_recurso,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al agregar el recurso a favoritos",
      error: error.message,
    });
  }
};

// Eliminar de favoritos
const deleteFavoritos = async (req, res) => {
  const { id_usuario, id_recurso } = req.params;

  if (!id_usuario || !id_recurso) {
    return res.status(400).json({
      mensaje: "id_usuario e id_recurso son obligatorios",
    });
  }

  try {
    const eliminado = await FavoritosModel.eliminar(id_usuario, id_recurso);
    if (!eliminado) {
      return res.status(404).json({
        mensaje: "El favorito no existe",
      });
    }

    res.status(200).json({
      mensaje: "Recurso eliminado de favoritos correctamente",
      id_usuario,
      id_recurso,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar el recurso de favoritos",
      error: error.message,
    });
  }
};

/* ===========================
   EXPORTACIÓN
=========================== */
export const FavoritosController = {
  getFavoritos,
  getFavoritosPorUsuario,
  postFavoritos,
  deleteFavoritos,
};
