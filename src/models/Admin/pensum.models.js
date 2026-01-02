import getConexion from "../../db/database.js";

const conexion = await getConexion();

const PensumModel = {
  getTodos: async () => {
    const [rows] = await conexion.query("SELECT * FROM pensum");
    return rows;
  },

  getPorId: async (id_pensum) => {
    const [rows] = await conexion.query(
      "SELECT * FROM pensum WHERE id_pensum = ?",
      [id_pensum]
    );
    return rows[0] || null;
  },

  crear: async ({ id_carrera, numero_semestre, id_asignatura }) => {
    const [result] = await conexion.query(
      "INSERT INTO pensum (id_carrera, numero_semestre, id_asignatura) VALUES (?, ?, ?)",
      [id_carrera, numero_semestre, id_asignatura]
    );
    return result.affectedRows;
  },

  actualizar: async ({ id_pensum, id_carrera, numero_semestre, id_asignatura }) => {
    const [result] = await conexion.query(
      "UPDATE pensum SET id_carrera = ?, numero_semestre = ?, id_asignatura = ? WHERE id_pensum = ?",
      [id_carrera, numero_semestre, id_asignatura, id_pensum]
    );
    return result.affectedRows;
  },

  eliminar: async (id_pensum) => {
    const [result] = await conexion.query(
      "DELETE FROM pensum WHERE id_pensum = ?",
      [id_pensum]
    );
    return result.affectedRows;
  },
  getAsignaturasPorCarrera: async (id_carrera) => {
    const [rows] = await conexion.query(
      `SELECT 
         p.numero_semestre,
         a.id_asignatura,
         a.nombre_asignatura
       FROM pensum p
       INNER JOIN asignaturas a ON a.id_asignatura = p.id_asignatura
       WHERE p.id_carrera = ?
       ORDER BY p.numero_semestre ASC, a.nombre_asignatura ASC`,
      [id_carrera]
    );
    return rows;
  },
  getNombresAsignaturasPorCarrera: async (id_carrera) => {
    const [rows] = await conexion.query(
      `SELECT DISTINCT a.nombre_asignatura , a.id_asignatura
       FROM pensum p
       INNER JOIN asignaturas a ON a.id_asignatura = p.id_asignatura
       WHERE p.id_carrera = ?
       ORDER BY a.nombre_asignatura ASC`,
      [id_carrera]
    );
    return rows;
  }    
};

export default PensumModel;
