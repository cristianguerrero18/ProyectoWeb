import getConexion from "../../db/database.js";

const ComentariosModel = {
  // Obtener todos los comentarios de un recurso
  getPorRecurso: async (id_recurso) => {
    try {
      const conexion = await getConexion();
      const [rows] = await conexion.query(`
        SELECT c.*, u.nombres_usuario, u.apellidos_usuario, u.correo 
        FROM comentarios c
        JOIN usuarios u ON c.id_usuario = u.id_usuario
        WHERE c.id_recurso = ?
        ORDER BY c.fecha DESC
      `, [id_recurso]);
      return rows;
    } catch (error) {
      console.error("Error ComentariosModel.getPorRecurso:", error);
      throw error;
    }
  },

  // Obtener comentarios de un usuario
  getPorUsuario: async (id_usuario) => {
    try {
      const conexion = await getConexion();
      const [rows] = await conexion.query(`
        SELECT c.*, r.titulo as recurso_titulo
        FROM comentarios c
        JOIN recursos r ON c.id_recurso = r.id_recurso
        WHERE c.id_usuario = ?
        ORDER BY c.fecha DESC
      `, [id_usuario]);
      return rows;
    } catch (error) {
      console.error("Error ComentariosModel.getPorUsuario:", error);
      throw error;
    }
  },

  // Obtener comentario por ID
  getPorId: async (id_comentario) => {
    try {
      const conexion = await getConexion();
      const [rows] = await conexion.query(`
        SELECT c.*, u.nombres_usuario, u.apellidos_usuario, u.correo 
        FROM comentarios c
        JOIN usuarios u ON c.id_usuario = u.id_usuario
        WHERE c.id_comentario = ?
      `, [id_comentario]);
      return rows[0] || null;
    } catch (error) {
      console.error("Error ComentariosModel.getPorId:", error);
      throw error;
    }
  },

  // Contar comentarios de un recurso
  contarPorRecurso: async (id_recurso) => {
    try {
      const conexion = await getConexion();
      const [rows] = await conexion.query(
        "SELECT COUNT(*) as total_comentarios FROM comentarios WHERE id_recurso = ?",
        [id_recurso]
      );
      return rows[0].total_comentarios;
    } catch (error) {
      console.error("Error ComentariosModel.contarPorRecurso:", error);
      throw error;
    }
  },

  // Crear comentario
  crear: async ({ id_usuario, id_recurso, comentario }) => {
    try {
      const conexion = await getConexion();
      const [result] = await conexion.query(
        "INSERT INTO comentarios (id_usuario, id_recurso, comentario) VALUES (?, ?, ?)",
        [id_usuario, id_recurso, comentario]
      );
      return { id: result.insertId, affectedRows: result.affectedRows };
    } catch (error) {
      console.error("Error ComentariosModel.crear:", error);
      throw error;
    }
  },

  // Actualizar comentario
  actualizar: async ({ id_comentario, comentario, id_usuario }) => {
    try {
      const conexion = await getConexion();
      
      // Verificar que el comentario pertenezca al usuario
      const comentarioExistente = await ComentariosModel.getPorId(id_comentario);
      if (!comentarioExistente) {
        return 0;
      }
      
      // Solo el autor puede actualizar el comentario
      if (comentarioExistente.id_usuario !== id_usuario) {
        throw new Error("No tienes permiso para editar este comentario");
      }
      
      const [result] = await conexion.query(
        "UPDATE comentarios SET comentario = ?, fecha = CURRENT_TIMESTAMP WHERE id_comentario = ? AND id_usuario = ?",
        [comentario, id_comentario, id_usuario]
      );
      return result.affectedRows;
    } catch (error) {
      console.error("Error ComentariosModel.actualizar:", error);
      throw error;
    }
  },

  // Eliminar comentario
  eliminar: async (id_comentario, id_usuario = null, esAdmin = false) => {
    try {
      const conexion = await getConexion();
      
      // Si se proporciona id_usuario, verificar que sea el autor
      if (id_usuario && !esAdmin) {
        const comentarioExistente = await ComentariosModel.getPorId(id_comentario);
        if (!comentarioExistente) {
          return 0;
        }
        
        // Solo el autor o un admin puede eliminar
        if (comentarioExistente.id_usuario !== id_usuario) {
          throw new Error("No tienes permiso para eliminar este comentario");
        }
      }
      
      const [result] = await conexion.query(
        "DELETE FROM comentarios WHERE id_comentario = ?",
        [id_comentario]
      );
      return result.affectedRows;
    } catch (error) {
      console.error("Error ComentariosModel.eliminar:", error);
      throw error;
    }
  },

  // Eliminar todos los comentarios de un recurso
  eliminarPorRecurso: async (id_recurso) => {
    try {
      const conexion = await getConexion();
      const [result] = await conexion.query(
        "DELETE FROM comentarios WHERE id_recurso = ?",
        [id_recurso]
      );
      return result.affectedRows;
    } catch (error) {
      console.error("Error ComentariosModel.eliminarPorRecurso:", error);
      throw error;
    }
  },

  // Eliminar todos los comentarios de un usuario
  eliminarPorUsuario: async (id_usuario) => {
    try {
      const conexion = await getConexion();
      const [result] = await conexion.query(
        "DELETE FROM comentarios WHERE id_usuario = ?",
        [id_usuario]
      );
      return result.affectedRows;
    } catch (error) {
      console.error("Error ComentariosModel.eliminarPorUsuario:", error);
      throw error;
    }
  },

  // Buscar comentarios por texto
  buscar: async (texto) => {
    try {
      const conexion = await getConexion();
      const [rows] = await conexion.query(`
        SELECT c.*, u.nombres_usuario, u.apellidos_usuario, r.titulo as recurso_titulo
        FROM comentarios c
        JOIN usuarios u ON c.id_usuario = u.id_usuario
        JOIN recursos r ON c.id_recurso = r.id_recurso
        WHERE c.comentario LIKE ?
        ORDER BY c.fecha DESC
      `, [`%${texto}%`]);
      return rows;
    } catch (error) {
      console.error("Error ComentariosModel.buscar:", error);
      throw error;
    }
  },

  // Obtener comentarios recientes (para dashboard)
  getRecientes: async (limite = 10) => {
    try {
      const conexion = await getConexion();
      const [rows] = await conexion.query(`
        SELECT c.*, u.nombres_usuario, u.apellidos_usuario, r.titulo as recurso_titulo
        FROM comentarios c
        JOIN usuarios u ON c.id_usuario = u.id_usuario
        JOIN recursos r ON c.id_recurso = r.id_recurso
        ORDER BY c.fecha DESC
        LIMIT ?
      `, [limite]);
      return rows;
    } catch (error) {
      console.error("Error ComentariosModel.getRecientes:", error);
      throw error;
    }
  },
};

export default ComentariosModel;