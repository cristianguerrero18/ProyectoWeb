import ComentariosModel from "../../models/Usuarios/comentarios.models.js";

// Obtener comentarios de un recurso
const getComentariosPorRecurso = async (req, res) => {
  const { id_recurso } = req.params;
  
  if (!id_recurso) {
    return res.status(400).json({ 
      mensaje: "El ID del recurso es obligatorio" 
    });
  }

  try {
    const comentarios = await ComentariosModel.getPorRecurso(id_recurso);
    const total = await ComentariosModel.contarPorRecurso(id_recurso);
    
    res.json({
      total_comentarios: total,
      comentarios: comentarios
    });
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

// Obtener comentarios de un usuario
const getComentariosPorUsuario = async (req, res) => {
  const { id_usuario } = req.params;
  
  if (!id_usuario) {
    return res.status(400).json({ 
      mensaje: "El ID del usuario es obligatorio" 
    });
  }

  try {
    const comentarios = await ComentariosModel.getPorUsuario(id_usuario);
    res.json(comentarios);
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

// Obtener comentario por ID
const getComentarioPorId = async (req, res) => {
  const { id } = req.params;
  
  if (!id) {
    return res.status(400).json({ 
      mensaje: "El ID del comentario es obligatorio" 
    });
  }

  try {
    const comentario = await ComentariosModel.getPorId(id);
    if (!comentario) {
      return res.status(404).json({ 
        mensaje: `No se encontró el comentario con ID ${id}` 
      });
    }
    res.json(comentario);
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

// Crear comentario
const postComentario = async (req, res) => {
  const { id_usuario, id_recurso, comentario } = req.body;
  
  // Validaciones
  if (!id_usuario || !id_recurso || !comentario) {
    return res.status(400).json({ 
      mensaje: "id_usuario, id_recurso y comentario son obligatorios" 
    });
  }

  if (comentario.trim().length === 0) {
    return res.status(400).json({ 
      mensaje: "El comentario no puede estar vacío" 
    });
  }

  if (comentario.length > 1000) {
    return res.status(400).json({ 
      mensaje: "El comentario no puede exceder los 1000 caracteres" 
    });
  }

  try {
    const result = await ComentariosModel.crear({ 
      id_usuario, 
      id_recurso, 
      comentario: comentario.trim() 
    });
    
    // Obtener el comentario creado con información del usuario
    const comentarioCreado = await ComentariosModel.getPorId(result.id);
    
    res.status(201).json({ 
      mensaje: "Comentario agregado correctamente", 
      comentario: comentarioCreado
    });
  } catch (error) {
    if (error.message.includes('foreign key constraint')) {
      return res.status(404).json({ 
        mensaje: "El recurso o usuario no existe" 
      });
    }
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

// Actualizar comentario
const putComentario = async (req, res) => {
  const { id_comentario, comentario } = req.body;
  const id_usuario = req.usuario?.id_usuario; // Obtener del token
  
  if (!id_comentario || !comentario) {
    return res.status(400).json({ 
      mensaje: "id_comentario y comentario son obligatorios" 
    });
  }

  if (comentario.trim().length === 0) {
    return res.status(400).json({ 
      mensaje: "El comentario no puede estar vacío" 
    });
  }

  if (comentario.length > 1000) {
    return res.status(400).json({ 
      mensaje: "El comentario no puede exceder los 1000 caracteres" 
    });
  }

  if (!id_usuario) {
    return res.status(401).json({ 
      mensaje: "Usuario no autenticado" 
    });
  }

  try {
    const actualizado = await ComentariosModel.actualizar({ 
      id_comentario, 
      comentario: comentario.trim(),
      id_usuario 
    });
    
    if (!actualizado) {
      return res.status(404).json({ 
        mensaje: "No se encontró el comentario o no tienes permiso para editarlo" 
      });
    }
    
    // Obtener el comentario actualizado
    const comentarioActualizado = await ComentariosModel.getPorId(id_comentario);
    
    res.json({ 
      mensaje: "Comentario actualizado correctamente", 
      comentario: comentarioActualizado 
    });
  } catch (error) {
    if (error.message.includes("No tienes permiso")) {
      return res.status(403).json({ 
        mensaje: error.message 
      });
    }
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

// Eliminar comentario
const deleteComentario = async (req, res) => {
  const { id } = req.params;
  const id_usuario = req.usuario?.id_usuario;
  const esAdmin = req.usuario?.id_rol === 1; // Asumiendo que rol 1 es admin
  
  if (!id) {
    return res.status(400).json({ 
      mensaje: "El ID del comentario es obligatorio" 
    });
  }

  if (!id_usuario) {
    return res.status(401).json({ 
      mensaje: "Usuario no autenticado" 
    });
  }

  try {
    const eliminado = await ComentariosModel.eliminar(id, id_usuario, esAdmin);
    
    if (!eliminado) {
      return res.status(404).json({ 
        mensaje: "No se encontró el comentario o no tienes permiso para eliminarlo" 
      });
    }

    res.json({ 
      mensaje: "Comentario eliminado correctamente", 
      id_comentario: id 
    });
  } catch (error) {
    if (error.message.includes("No tienes permiso")) {
      return res.status(403).json({ 
        mensaje: error.message 
      });
    }
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

// Buscar comentarios
const buscarComentarios = async (req, res) => {
  const { q } = req.query;
  
  if (!q || q.trim().length === 0) {
    return res.status(400).json({ 
      mensaje: "El término de búsqueda es obligatorio" 
    });
  }

  try {
    const comentarios = await ComentariosModel.buscar(q.trim());
    res.json({
      total: comentarios.length,
      resultados: comentarios
    });
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

// Obtener comentarios recientes
const getComentariosRecientes = async (req, res) => {
  const { limite = 10 } = req.query;
  
  try {
    const comentarios = await ComentariosModel.getRecientes(parseInt(limite));
    res.json(comentarios);
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

// Verificar si usuario puede editar/eliminar comentario
const verificarPermisosComentario = async (req, res) => {
  const { id_comentario } = req.params;
  const id_usuario = req.usuario?.id_usuario;
  const esAdmin = req.usuario?.id_rol === 1;
  
  if (!id_comentario) {
    return res.status(400).json({ 
      mensaje: "El ID del comentario es obligatorio" 
    });
  }

  if (!id_usuario) {
    return res.status(401).json({ 
      mensaje: "Usuario no autenticado" 
    });
  }

  try {
    const comentario = await ComentariosModel.getPorId(id_comentario);
    
    if (!comentario) {
      return res.status(404).json({ 
        mensaje: "Comentario no encontrado" 
      });
    }
    
    const puedeEditar = comentario.id_usuario === id_usuario;
    const puedeEliminar = puedeEditar || esAdmin;
    
    res.json({
      comentario_id: id_comentario,
      es_autor: puedeEditar,
      es_admin: esAdmin,
      puede_editar: puedeEditar,
      puede_eliminar: puedeEliminar,
      datos_comentario: {
        autor: comentario.nombres_usuario + ' ' + comentario.apellidos_usuario,
        fecha: comentario.fecha
      }
    });
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

export const ComentariosController = {
  getComentariosPorRecurso,
  getComentariosPorUsuario,
  getComentarioPorId,
  postComentario,
  putComentario,
  deleteComentario,
  buscarComentarios,
  getComentariosRecientes,
  verificarPermisosComentario
};