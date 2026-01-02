import getConexion from "../../db/database.js";

const ReporteModel = {

  // Obtener todos los reportes
  getTodos: async () => {
    const conexion = await getConexion();
    const [rows] = await conexion.query("SELECT * FROM reportes");
    return rows;
  },

  // Obtener reporte por ID
  getPorId: async (id_reporte) => {
    const conexion = await getConexion();
    const [rows] = await conexion.query(
      "SELECT * FROM reportes WHERE id_reporte = ?",
      [id_reporte]
    );
    return rows[0] || null;
  },

  // Obtener reportes por recurso
  getPorRecurso: async (id_recurso) => {
    const conexion = await getConexion();
    const [rows] = await conexion.query(
      "SELECT * FROM reportes WHERE id_recurso = ?",
      [id_recurso]
    );
    return rows; // 👈 pueden ser varios
  },

  // Crear reporte
  crear: async ({ id_recurso, motivo }) => {
    const conexion = await getConexion();
    const [result] = await conexion.query(
      "INSERT INTO reportes (id_recurso, motivo) VALUES (?, ?)",
      [id_recurso, motivo]
    );
    return result.affectedRows;
  },

  // Eliminar reporte
  eliminar: async (id_reporte) => {
    const conexion = await getConexion();
    const [result] = await conexion.query(
      "DELETE FROM reportes WHERE id_reporte = ?",
      [id_reporte]
    );
    return result.affectedRows;
  },
  // Obtener reporte completo (reporte + recurso + usuario)
getReporteCompleto: async (id_reporte) => {
  const conexion = await getConexion();
  const [rows] = await conexion.query(
    `SELECT 
        r.id_reporte,
        r.motivo,
        r.id_recurso,
        r.fecha_reporte,

        -- Recurso
        re.titulo,
        re.tema,
        re.URL,
        re.PUBLIC_ID,
        re.contador_reportes,
        re.id_asignatura,
        re.id_categoria,
        re.fecha_subida,

        -- Usuario
        u.id_usuario,
        u.nombres_usuario,
        u.apellidos_usuario,
        u.correo,
        u.id_carrera,
        u.id_rol
     FROM reportes r
     INNER JOIN recursos re ON r.id_recurso = re.id_recurso
     INNER JOIN usuarios u ON re.id_usuario = u.id_usuario
     WHERE r.id_reporte = ?`,
    [id_reporte]
  );

  return rows[0] || null;
},
};



export default ReporteModel;
