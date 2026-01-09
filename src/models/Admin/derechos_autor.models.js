import getConexion from "../../db/database.js";

const DerechosAutorModel = {
  // ======================
  // Obtener todos
  // ======================
  getTodos: async () => {
    const conexion = await getConexion();
    const [rows] = await conexion.query(
      `SELECT * FROM derechos_autor`
    );
    return rows;
  },

  // ======================
  // Obtener por ID
  // ======================
  getPorId: async (id_derechos_autor) => {
    const conexion = await getConexion();
    const [rows] = await conexion.query(
      `SELECT * FROM derechos_autor WHERE id_derechos_autor = ?`,
      [id_derechos_autor]
    );
    return rows[0] || null;
  },

  // ======================
  // Verificar si existe
  // ======================
  existe: async (id_usuario, id_recurso) => {
    const conexion = await getConexion();
    const [rows] = await conexion.query(
      `SELECT id_derechos_autor
       FROM derechos_autor
       WHERE id_usuario = ? AND id_recurso = ?`,
      [id_usuario, id_recurso]
    );
    return rows.length > 0;
  },

  // ======================
  // Crear declaración
  // ======================
  crear: async ({ id_usuario, id_recurso, compromiso }) => {
    const conexion = await getConexion();
    const [result] = await conexion.query(
      `INSERT INTO derechos_autor (id_usuario, id_recurso, compromiso)
       VALUES (?, ?, ?)`,
      [id_usuario, id_recurso, compromiso]
    );
    return result.insertId;
  },

  // ======================
  // Eliminar
  // ======================
  eliminar: async (id_derechos_autor) => {
    const conexion = await getConexion();
    const [result] = await conexion.query(
      `DELETE FROM derechos_autor WHERE id_derechos_autor = ?`,
      [id_derechos_autor]
    );
    return result.affectedRows;
  },
};

export default DerechosAutorModel;