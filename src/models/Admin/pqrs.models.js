import getConexion from "../../db/database.js";

const PQRSModel = {
  // Obtener todos los roles
  getTodos: async () => {
    try {
      const conexion = await getConexion();
      const [rows] = await conexion.query("SELECT * FROM pqrs");
      return rows;
    } catch (error) {
      console.error("Error PQRSModel.getTodos:", error);
      throw error;
    }
  },

  // Obtener rol por ID
  getPorId: async (id_pqr) => {
    try {
      const conexion = await getConexion();
      const [rows] = await conexion.query("SELECT * FROM pqrs WHERE id_pqr = ?", [id_pqr]);
      return rows[0] || null;
    } catch (error) {
      console.error("Error PQRSModel.getPorId:", error);
      throw error;
    }
  },

  // Eliminar rol
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

};

export default PQRSModel;
