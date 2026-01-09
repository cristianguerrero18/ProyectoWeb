import getConexion from "../../db/database.js";

const RecursoLikesModel = {
  // Obtener todos los likes de un recurso
  getPorRecurso: async (id_recurso) => {
    try {
      const conexion = await getConexion();
      const [rows] = await conexion.query(
        "SELECT * FROM recurso_likes WHERE id_recurso = ?",
        [id_recurso]
      );
      return rows;
    } catch (error) {
      console.error("Error RecursoLikesModel.getPorRecurso:", error);
      throw error;
    }
  },

  // Obtener likes de un usuario
  getPorUsuario: async (id_usuario) => {
    try {
      const conexion = await getConexion();
      const [rows] = await conexion.query(
        "SELECT * FROM recurso_likes WHERE id_usuario = ?",
        [id_usuario]
      );
      return rows;
    } catch (error) {
      console.error("Error RecursoLikesModel.getPorUsuario:", error);
      throw error;
    }
  },

  // Obtener like específico (para verificar si ya existe)
  getPorRecursoYUsuario: async (id_recurso, id_usuario) => {
    try {
      const conexion = await getConexion();
      const [rows] = await conexion.query(
        "SELECT * FROM recurso_likes WHERE id_recurso = ? AND id_usuario = ?",
        [id_recurso, id_usuario]
      );
      return rows[0] || null;
    } catch (error) {
      console.error("Error RecursoLikesModel.getPorRecursoYUsuario:", error);
      throw error;
    }
  },

  // Contar likes de un recurso
  contarPorRecurso: async (id_recurso) => {
    try {
      const conexion = await getConexion();
      const [rows] = await conexion.query(
        "SELECT COUNT(*) as total_likes FROM recurso_likes WHERE id_recurso = ?",
        [id_recurso]
      );
      return rows[0].total_likes;
    } catch (error) {
      console.error("Error RecursoLikesModel.contarPorRecurso:", error);
      throw error;
    }
  },

  // Crear like
  crear: async ({ id_recurso, id_usuario, tipo }) => {
    try {
      const conexion = await getConexion();
      const [result] = await conexion.query(
        "INSERT INTO recurso_likes (id_recurso, id_usuario, tipo) VALUES (?, ?, ?)",
        [id_recurso, id_usuario, tipo]
      );
      return { id: result.insertId, affectedRows: result.affectedRows };
    } catch (error) {
      console.error("Error RecursoLikesModel.crear:", error);
      throw error;
    }
  },

  // Actualizar tipo de like (si ya existe)
  actualizar: async ({ id_recurso, id_usuario, tipo }) => {
    try {
      const conexion = await getConexion();
      const [result] = await conexion.query(
        "UPDATE recurso_likes SET tipo = ? WHERE id_recurso = ? AND id_usuario = ?",
        [tipo, id_recurso, id_usuario]
      );
      return result.affectedRows;
    } catch (error) {
      console.error("Error RecursoLikesModel.actualizar:", error);
      throw error;
    }
  },

  // Eliminar like
  eliminar: async (id_recurso, id_usuario) => {
    try {
      const conexion = await getConexion();
      const [result] = await conexion.query(
        "DELETE FROM recurso_likes WHERE id_recurso = ? AND id_usuario = ?",
        [id_recurso, id_usuario]
      );
      return result.affectedRows;
    } catch (error) {
      console.error("Error RecursoLikesModel.eliminar:", error);
      throw error;
    }
  },

  // Eliminar todos los likes de un recurso
  eliminarPorRecurso: async (id_recurso) => {
    try {
      const conexion = await getConexion();
      const [result] = await conexion.query(
        "DELETE FROM recurso_likes WHERE id_recurso = ?",
        [id_recurso]
      );
      return result.affectedRows;
    } catch (error) {
      console.error("Error RecursoLikesModel.eliminarPorRecurso:", error);
      throw error;
    }
  },
};

export default RecursoLikesModel;