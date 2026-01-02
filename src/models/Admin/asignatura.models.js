import getConexion from "../../db/database.js";

const conexion = await getConexion();

const AsignaturaModel = {
  getTodas: async () => {
    const [rows] = await conexion.query("SELECT * FROM asignaturas");
    return rows;
  },

  getPorId: async (id_asignatura) => {
    const [rows] = await conexion.query(
      "SELECT * FROM asignaturas WHERE id_asignatura = ?",
      [id_asignatura]
    );
    return rows[0] || null;
  },

  getPorNombre: async (nombre_asignatura) => {
    const [rows] = await conexion.query(
      "SELECT * FROM asignaturas WHERE nombre_asignatura = ?",
      [nombre_asignatura]
    );
    return rows[0] || null;
  },

  crear: async (nombre_asignatura) => {
    const [result] = await conexion.query(
      "INSERT INTO asignaturas (nombre_asignatura) VALUES (?)",
      [nombre_asignatura]
    );
    return result.affectedRows;
  },

  actualizar: async ({ id_asignatura, nombre_asignatura }) => {
    const [result] = await conexion.query(
      "UPDATE asignaturas SET nombre_asignatura = ? WHERE id_asignatura = ?",
      [nombre_asignatura, id_asignatura]
    );
    return result.affectedRows;
  },

  eliminar: async (id_asignatura) => {
    const [result] = await conexion.query(
      "DELETE FROM asignaturas WHERE id_asignatura = ?",
      [id_asignatura]
    );
    return result.affectedRows;
  },
};

export default AsignaturaModel;
