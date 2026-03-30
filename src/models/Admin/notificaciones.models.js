import getConexion from "../../db/database.js";

const NotificacionesModel = {
  // Obtener todas las notificaciones
  getTodos: async () => {
    try {
      const conexion = await getConexion();
      const [rows] = await conexion.query(`
        SELECT 
          id_notificacion,
          id_usuario,
          titulo,
          mensaje,
          tipo,
          estado,
          fecha
        FROM notificaciones
        ORDER BY fecha DESC
      `);
      return rows;
    } catch (error) {
      console.error("Error NotificacionesModel.getTodos:", error);
      throw error;
    }
  },

  // Obtener notificaciones por usuario
  getPorUsuario: async (id_usuario) => {
    try {
      const conexion = await getConexion();
      const [rows] = await conexion.query(
        `
        SELECT 
          id_notificacion,
          id_usuario,
          titulo,
          mensaje,
          tipo,
          estado,
          fecha
        FROM notificaciones
        WHERE id_usuario = ?
        ORDER BY fecha DESC
        `,
        [id_usuario]
      );
      return rows;
    } catch (error) {
      console.error("Error NotificacionesModel.getPorUsuario:", error);
      throw error;
    }
  },

  // Contar notificaciones no leídas por usuario
  contarNoLeidas: async (id_usuario) => {
    try {
      const conexion = await getConexion();
      const [rows] = await conexion.query(
        `
        SELECT COUNT(*) AS total
        FROM notificaciones
        WHERE id_usuario = ? AND estado = 'no_visto'
        `,
        [id_usuario]
      );

      return rows[0]?.total || 0;
    } catch (error) {
      console.error("Error NotificacionesModel.contarNoLeidas:", error);
      throw error;
    }
  },

  // Crear una notificación
  crear: async ({ id_usuario, titulo, mensaje, tipo = "general", estado = "no_visto" }) => {
    try {
      const conexion = await getConexion();
      const [result] = await conexion.query(
        `
        INSERT INTO notificaciones (id_usuario, titulo, mensaje, tipo, estado, fecha)
        VALUES (?, ?, ?, ?, ?, NOW())
        `,
        [id_usuario, titulo, mensaje, tipo, estado]
      );

      return result.insertId;
    } catch (error) {
      console.error("Error NotificacionesModel.crear:", error);
      throw error;
    }
  },

  // Marcar una notificación como vista
  marcarComoVisto: async (id_notificacion) => {
    try {
      const conexion = await getConexion();
      const [result] = await conexion.query(
        `
        UPDATE notificaciones
        SET estado = 'visto'
        WHERE id_notificacion = ?
        `,
        [id_notificacion]
      );

      return result.affectedRows;
    } catch (error) {
      console.error("Error NotificacionesModel.marcarComoVisto:", error);
      throw error;
    }
  },

  // Marcar todas las notificaciones de un usuario como vistas
  marcarTodasComoVistas: async (id_usuario) => {
    try {
      const conexion = await getConexion();
      const [result] = await conexion.query(
        `
        UPDATE notificaciones
        SET estado = 'visto'
        WHERE id_usuario = ? AND estado = 'no_visto'
        `,
        [id_usuario]
      );

      return result.affectedRows;
    } catch (error) {
      console.error("Error NotificacionesModel.marcarTodasComoVistas:", error);
      throw error;
    }
  },

  // Eliminar una notificación
  eliminar: async (id_notificacion) => {
    try {
      const conexion = await getConexion();
      const [result] = await conexion.query(
        "DELETE FROM notificaciones WHERE id_notificacion = ?",
        [id_notificacion]
      );
      return result.affectedRows;
    } catch (error) {
      console.error("Error NotificacionesModel.eliminar:", error);
      throw error;
    }
  },
};

export default NotificacionesModel;