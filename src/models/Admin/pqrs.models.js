// models/Admin/pqrs.models.js
import getConexion from "../../db/database.js";

const PQRSModel = {
  // Obtener todos los PQRS con información del tipo
  getTodos: async () => {
    try {
      const conexion = await getConexion();
      const [rows] = await conexion.query(`
        SELECT p.*, t.nombre_tipo_pqrs as tipo_nombre 
        FROM pqrs p
        LEFT JOIN tipos_pqrs t ON p.id_tipo_pqrs = t.id_tipo_pqrs
        ORDER BY p.fecha_pqrs DESC
      `);
      return rows;
    } catch (error) {
      console.error("Error PQRSModel.getTodos:", error);
      throw error;
    }
  },

  // Obtener PQR por ID
  getPorId: async (id_pqr) => {
    try {
      const conexion = await getConexion();
      const [rows] = await conexion.query(`
        SELECT p.*, t.nombre_tipo_pqrs as tipo_nombre 
        FROM pqrs p
        LEFT JOIN tipos_pqrs t ON p.id_tipo_pqrs = t.id_tipo_pqrs
        WHERE p.id_pqr = ?
      `, [id_pqr]);
      return rows[0] || null;
    } catch (error) {
      console.error("Error PQRSModel.getPorId:", error);
      throw error;
    }
  },

  // Eliminar PQR
  eliminar: async (id_pqr) => {
    try {
      const conexion = await getConexion();
      const [result] = await conexion.query("DELETE FROM pqrs WHERE id_pqr = ?", [id_pqr]);
      return result.affectedRows;
    } catch (error) {
      console.error("Error PQRSModel.eliminar:", error);
      throw error;
    }
  },

  // Responder PQR
  responder: async ({ id_pqr, respuesta, id_admin }) => {
    try {
      const conexion = await getConexion();
      const [result] = await conexion.query(
        `UPDATE pqrs
         SET respuesta = ?,
             estado = 'Respondido',
             id_admin = ?,
             fecha_respuesta = CURRENT_TIMESTAMP
         WHERE id_pqr = ?`,
        [respuesta, id_admin, id_pqr]
      );
      return result.affectedRows;
    } catch (error) {
      console.error("Error PQRSModel.responder:", error);
      throw error;
    }
  },

  // Crear PQRS - VERSIÓN CORREGIDA
  crear: async ({ id_usuario, descripcion, id_tipo_pqrs = 1 }) => {
    try {
      const conexion = await getConexion();
      const [result] = await conexion.query(
        `INSERT INTO pqrs (id_usuario, descripcion, id_tipo_pqrs, estado, fecha_pqrs)
         VALUES (?, ?, ?, 'Pendiente', CURRENT_TIMESTAMP)`,
        [id_usuario, descripcion, id_tipo_pqrs]
      );
      return result.insertId;
    } catch (error) {
      console.error("Error PQRSModel.crear:", error);
      throw error;
    }
  },

  // Obtener PQRS por usuario con información del tipo
  getPorUsuario: async (id_usuario) => {
    try {
      const conexion = await getConexion();
      const [rows] = await conexion.query(`
        SELECT p.*, t.nombre_tipo_pqrs as tipo_nombre 
        FROM pqrs p
        LEFT JOIN tipos_pqrs t ON p.id_tipo_pqrs = t.id_tipo_pqrs
        WHERE p.id_usuario = ? 
        ORDER BY p.fecha_pqrs DESC
      `, [id_usuario]);
      return rows;
    } catch (error) {
      console.error("Error PQRSModel.getPorUsuario:", error);
      throw error;
    }
  },

  // Si necesitas obtener los tipos de PQRS disponibles
  getTiposPQRS: async () => {
    try {
      const conexion = await getConexion();
      const [rows] = await conexion.query("SELECT * FROM tipos_pqrs ORDER BY id_tipo_pqrs");
      return rows;
    } catch (error) {
      console.error("Error PQRSModel.getTiposPQRS:", error);
      throw error;
    }
  }
};

export default PQRSModel;