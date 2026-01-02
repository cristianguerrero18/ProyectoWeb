import getConexion from "../../db/database.js";

const DerechosAutorModel = {
  // Obtener todos
  getTodos: async () => {
    const conexion = await getConexion();
    const [rows] = await conexion.query("SELECT * FROM derechos_autor");
    return rows;
  },

  // Obtener por ID
  getPorId: async (id_derechos_autor) => {
    const conexion = await getConexion();
    const [rows] = await conexion.query(
      "SELECT * FROM derechos_autor WHERE id_derechos_autor = ?",
      [id_derechos_autor]
    );
    return rows[0] || null;
  },

  // Obtener por recurso
  getPorRecurso: async (id_recurso) => {
    const conexion = await getConexion();
    const [rows] = await conexion.query(
      "SELECT * FROM derechos_autor WHERE id_recurso = ?",
      [id_recurso]
    );
    return rows[0] || null;
  },

  // Crear
  crear: async ({
    id_recurso,
    es_autor_original,
    autor_original,
    fuente_original,
    licencia,
  }) => {
    const conexion = await getConexion();
    const [result] = await conexion.query(
      `INSERT INTO derechos_autor 
      (id_recurso, es_autor_original, autor_original, fuente_original, licencia)
      VALUES (?, ?, ?, ?, ?)`,
      [id_recurso, es_autor_original, autor_original, fuente_original, licencia]
    );
    return result.affectedRows;
  },

  // Actualizar
  actualizar: async ({
    id_derechos_autor,
    es_autor_original,
    autor_original,
    fuente_original,
    licencia,
  }) => {
    const conexion = await getConexion();
    const [result] = await conexion.query(
      `UPDATE derechos_autor 
       SET es_autor_original = ?, autor_original = ?, fuente_original = ?, licencia = ?
       WHERE id_derechos_autor = ?`,
      [
        es_autor_original,
        autor_original,
        fuente_original,
        licencia,
        id_derechos_autor,
      ]
    );
    return result.affectedRows;
  },

  // Eliminar
  eliminar: async (id_derechos_autor) => {
    const conexion = await getConexion();
    const [result] = await conexion.query(
      "DELETE FROM derechos_autor WHERE id_derechos_autor = ?",
      [id_derechos_autor]
    );
    return result.affectedRows;
  },
};

export default DerechosAutorModel;
