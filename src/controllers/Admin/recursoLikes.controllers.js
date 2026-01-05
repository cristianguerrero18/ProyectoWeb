import RecursoLikesModel from "../../models/Admin/recursoLikes.models.js";

// Obtener likes de un recurso
const getLikesPorRecurso = async (req, res) => {
  const { id_recurso } = req.params;
  try {
    const likes = await RecursoLikesModel.getPorRecurso(id_recurso);
    const total = await RecursoLikesModel.contarPorRecurso(id_recurso);
    
    res.json({
      total_likes: total,
      likes: likes
    });
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

// Obtener likes de un usuario
const getLikesPorUsuario = async (req, res) => {
  const { id_usuario } = req.params;
  try {
    const likes = await RecursoLikesModel.getPorUsuario(id_usuario);
    res.json(likes);
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

// Verificar si usuario ya dio like a un recurso
const getLikeStatus = async (req, res) => {
  const { id_recurso, id_usuario } = req.params;
  try {
    const like = await RecursoLikesModel.getPorRecursoYUsuario(id_recurso, id_usuario);
    res.json({ existe: !!like, tipo: like ? like.tipo : null });
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

// Dar like/dislike a un recurso
const postLike = async (req, res) => {
  const { id_recurso, id_usuario, tipo } = req.body;
  
  if (!id_recurso || !id_usuario || !tipo) {
    return res.status(400).json({ 
      mensaje: "id_recurso, id_usuario y tipo son obligatorios" 
    });
  }

  // Validar que el tipo sea correcto
  if (!['like', 'dislike'].includes(tipo.toLowerCase())) {
    return res.status(400).json({ 
      mensaje: "Tipo debe ser 'like' o 'dislike'" 
    });
  }

  try {
    // Verificar si ya existe un like del usuario en este recurso
    const existe = await RecursoLikesModel.getPorRecursoYUsuario(id_recurso, id_usuario);
    
    if (existe) {
      // Si ya existe y es el mismo tipo, eliminar (toggle)
      if (existe.tipo === tipo) {
        await RecursoLikesModel.eliminar(id_recurso, id_usuario);
        return res.json({ 
          mensaje: `${tipo} eliminado correctamente`, 
          accion: 'eliminado',
          tipo: null
        });
      } else {
        // Si existe pero es diferente tipo, actualizar
        await RecursoLikesModel.actualizar({ id_recurso, id_usuario, tipo });
        return res.json({ 
          mensaje: `${tipo} actualizado correctamente`, 
          accion: 'actualizado',
          tipo
        });
      }
    } else {
      // Si no existe, crear nuevo like
      const result = await RecursoLikesModel.crear({ id_recurso, id_usuario, tipo });
      return res.status(201).json({ 
        mensaje: `${tipo} agregado correctamente`, 
        accion: 'creado',
        id_like: result.id,
        tipo
      });
    }
  } catch (error) {
    // Si es error de duplicado (aunque ya validamos antes)
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ 
        mensaje: "Ya existe un like de este usuario para este recurso" 
      });
    }
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

// Eliminar like
const deleteLike = async (req, res) => {
  const { id_recurso, id_usuario } = req.params;
  
  if (!id_recurso || !id_usuario) {
    return res.status(400).json({ 
      mensaje: "id_recurso e id_usuario son obligatorios" 
    });
  }

  try {
    const eliminado = await RecursoLikesModel.eliminar(id_recurso, id_usuario);
    if (!eliminado) {
      return res.status(404).json({ 
        mensaje: "No se encontró el like para eliminar" 
      });
    }

    res.json({ 
      mensaje: "Like eliminado correctamente", 
      id_recurso, 
      id_usuario 
    });
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

// Obtener estadísticas de un recurso
const getEstadisticas = async (req, res) => {
  const { id_recurso } = req.params;
  try {
    const likes = await RecursoLikesModel.getPorRecurso(id_recurso);
    
    const totalLikes = likes.filter(l => l.tipo === 'like').length;
    const totalDislikes = likes.filter(l => l.tipo === 'dislike').length;
    const total = totalLikes + totalDislikes;
    
    res.json({
      id_recurso,
      total_reacciones: total,
      likes: totalLikes,
      dislikes: totalDislikes,
      usuarios: likes.map(like => ({
        id_usuario: like.id_usuario,
        tipo: like.tipo,
        fecha: like.fecha_like || like.created_at
      }))
    });
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

export const RecursoLikesController = {
  getLikesPorRecurso,
  getLikesPorUsuario,
  getLikeStatus,
  postLike,
  deleteLike,
  getEstadisticas
};