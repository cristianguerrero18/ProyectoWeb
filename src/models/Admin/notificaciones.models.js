import getConexion from "../../db/database.js";

const NotificacionesModel = {
  // Obtener todos los roles
  getTodos: async () => {
    try {
      const conexion = await getConexion();
      const [rows] = await conexion.query("SELECT * FROM notificaciones");
      return rows;
    } catch (error) {
      console.error("Error NotificacionesModel.getTodos:", error);
      throw error;
    }
  },

  // Obtener rol por ID
 // Obtener notificaciones por ID de usuario
getPorId: async (id_usuario) => {
  try {
    const conexion = await getConexion();
    const [rows] = await conexion.query(
      "SELECT * FROM notificaciones WHERE id_usuario = ? ORDER BY fecha DESC", 
      [id_usuario]
    );
    // Devuelve TODAS las filas, no solo la primera
    return rows; // <- Cambia esto de rows[0] a rows
  } catch (error) {
    console.error("Error NotificacionesModel.getPorId:", error);
    throw error;
  }
},

  // Eliminar rol
  eliminar: async (id_notificacion) => {
    try {
      const conexion = await getConexion();
      const [result] = await conexion.query("DELETE FROM notificaciones WHERE id_notificacion = ?", [id_notificacion]);
      return result.affectedRows;
    } catch (error) {
      console.error("Error NotificacionesModel.eliminar:", error);
      throw error;
    }
  },
  marcarComoVisto: async (id_notificacion) => {
    try {
      const conexion = await getConexion();
      const [result] = await conexion.query(
        "UPDATE notificaciones SET estado = 'visto' WHERE id_notificacion = ?",
        [id_notificacion]
      );
      return result.affectedRows;
    } catch (error) {
      console.error("Error NotificacionesModel.marcarComoVisto:", error);
      throw error;
    }
  },
};

export default NotificacionesModel;
