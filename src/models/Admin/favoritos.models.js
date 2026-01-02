import getConexion from "../../db/database.js";

const FavoritosModel = {
  // Obtener todos los favoritos
  getTodos: async () => {
    try {
      const conexion = await getConexion();
      const [rows] = await conexion.query("SELECT * FROM favoritos");
      return rows;
    } catch (error) {
      console.error("Error FavoritosModel.getTodos:", error);
      throw error;
    }
  },

  // Obtener favoritos por usuario
  getPorUsuario: async (id_usuario) => {
    try {
      const conexion = await getConexion();
      const [rows] = await conexion.query(
        "SELECT * FROM favoritos WHERE id_usuario = ?",
        [id_usuario]
      );
      return rows;
    } catch (error) {
      console.error("Error FavoritosModel.getPorUsuario:", error);
      throw error;
    }
  },

  // Verificar si un recurso ya es favorito
  existe: async (id_usuario, id_recurso) => {
    try {
      const conexion = await getConexion();
      const [rows] = await conexion.query(
        "SELECT 1 FROM favoritos WHERE id_usuario = ? AND id_recurso = ?",
        [id_usuario, id_recurso]
      );
      return rows.length > 0;
    } catch (error) {
      console.error("Error FavoritosModel.existe:", error);
      throw error;
    }
  },

  // Agregar a favoritos
  agregar: async ({ id_usuario, id_recurso }) => {
    try {
      const conexion = await getConexion();
      const [result] = await conexion.query(
        "INSERT INTO favoritos (id_usuario, id_recurso) VALUES (?, ?)",
        [id_usuario, id_recurso]
      );
      return result.affectedRows;
    } catch (error) {
      console.error("Error FavoritosModel.agregar:", error);
      throw error;
    }
  },

  // Eliminar de favoritos
  eliminar: async (id_usuario, id_recurso) => {
    try {
      const conexion = await getConexion();
      const [result] = await conexion.query(
        "DELETE FROM favoritos WHERE id_usuario = ? AND id_recurso = ?",
        [id_usuario, id_recurso]
      );
      return result.affectedRows;
    } catch (error) {
      console.error("Error FavoritosModel.eliminar:", error);
      throw error;
    }
  },
};

export default FavoritosModel;
