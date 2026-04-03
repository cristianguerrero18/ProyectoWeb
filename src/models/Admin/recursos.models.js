import getConexion from "../../db/database.js";

const conexion = await getConexion();

const RecursosModel = {
  getTodos: async () => {
    const [rows] = await conexion.query("SELECT * FROM recursos");
    return rows;
  },

  getPorId: async (id_recurso) => {
    const [rows] = await conexion.query(
      "SELECT * FROM recursos WHERE id_recurso = ?",
      [id_recurso]
    );
    return rows[0] || null;
  },

  crear: async ({
    titulo,
    tema,
    URL,
    PUBLIC_ID,
    nombre_original,
    contador_reportes,
    id_asignatura,
    id_categoria,
    id_usuario
  }) => {
    const [result] = await conexion.query(
      `INSERT INTO recursos 
       (titulo, tema, URL, PUBLIC_ID, nombre_original, contador_reportes, id_asignatura, id_categoria, id_usuario)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        titulo,
        tema,
        URL,
        PUBLIC_ID,
        nombre_original,
        contador_reportes,
        id_asignatura,
        id_categoria,
        id_usuario
      ]
    );

    return result.affectedRows;
  },

  actualizar: async ({
    titulo,
    tema,
    URL,
    PUBLIC_ID,
    nombre_original,
    contador_reportes,
    id_asignatura,
    id_usuario,
    id_categoria,
    id_recurso
  }) => {
    const [result] = await conexion.query(
      `UPDATE recursos
       SET titulo = ?,
           tema = ?,
           URL = ?,
           PUBLIC_ID = ?,
           nombre_original = ?,
           contador_reportes = ?,
           id_asignatura = ?,
           id_usuario = ?,
           id_categoria = ?
       WHERE id_recurso = ?`,
      [
        titulo,
        tema,
        URL,
        PUBLIC_ID,
        nombre_original,
        contador_reportes,
        id_asignatura,
        id_usuario,
        id_categoria,
        id_recurso
      ]
    );

    return result.affectedRows;
  },

  eliminar: async (id_recurso) => {
    try {
      await conexion.beginTransaction();

      await conexion.query(
        "DELETE FROM favoritos WHERE id_recurso = ?",
        [id_recurso]
      );

      await conexion.query(
        "DELETE FROM recurso_likes WHERE id_recurso = ?",
        [id_recurso]
      );

      await conexion.query(
        "DELETE FROM comentarios WHERE id_recurso = ?",
        [id_recurso]
      );

      await conexion.query(
        "DELETE FROM reportes WHERE id_recurso = ?",
        [id_recurso]
      );

      const [result] = await conexion.query(
        "DELETE FROM recursos WHERE id_recurso = ?",
        [id_recurso]
      );

      await conexion.commit();
      return result.affectedRows;
    } catch (error) {
      await conexion.rollback();
      console.error("❌ Error eliminando recurso:", error);
      throw error;
    }
  },

  cambiarEstado: async (id_recurso, activo) => {
    const [result] = await conexion.query(
      "UPDATE recursos SET activo = ? WHERE id_recurso = ?",
      [activo, id_recurso]
    );
    return result.affectedRows;
  },

  getPorAsignatura: async (id_asignatura) => {
    const [rows] = await conexion.query(
      `
      SELECT 
        r.id_recurso,
        r.titulo,
        r.tema,
        r.URL,
        r.PUBLIC_ID,
        r.nombre_original,
        r.contador_reportes,
        r.activo,

        a.id_asignatura,
        a.nombre_asignatura AS asignatura,

        c.id_categoria,
        c.nombre_categoria AS categoria,

        u.id_usuario,
        u.nombres_usuario AS usuario
      FROM recursos r
      INNER JOIN asignaturas a ON r.id_asignatura = a.id_asignatura
      INNER JOIN categorias c ON r.id_categoria = c.id_categoria
      INNER JOIN usuarios u ON r.id_usuario = u.id_usuario
      WHERE r.id_asignatura = ?
      `,
      [id_asignatura]
    );

    return rows;
  },

  getPorUsuario: async (id_usuario) => {
    const [rows] = await conexion.query(
      `
      SELECT 
        r.id_recurso,
        r.titulo,
        r.tema,
        r.URL,
        r.PUBLIC_ID,
        r.nombre_original,
        r.contador_reportes,
        r.activo,

        a.id_asignatura,
        a.nombre_asignatura AS asignatura,

        c.id_categoria,
        c.nombre_categoria AS categoria

      FROM recursos r
      INNER JOIN asignaturas a ON r.id_asignatura = a.id_asignatura
      INNER JOIN categorias c ON r.id_categoria = c.id_categoria
      INNER JOIN usuarios u ON r.id_usuario = u.id_usuario
      WHERE r.id_usuario = ?
      `,
      [id_usuario]
    );

    return rows;
  },

  getDetalleCompleto: async (id_recurso) => {
    const [rows] = await conexion.query(
      `
      SELECT 
        r.id_recurso,
        r.titulo,
        r.tema,
        r.URL,
        r.PUBLIC_ID,
        r.nombre_original,
        r.contador_reportes,
        r.activo,

        a.id_asignatura,
        a.nombre_asignatura AS asignatura,

        c.id_categoria,
        c.nombre_categoria AS categoria,

        u.id_usuario,
        u.nombres_usuario AS usuario,

        SUM(CASE WHEN rl.tipo = 'like' THEN 1 ELSE 0 END) AS total_likes,
        SUM(CASE WHEN rl.tipo = 'dislike' THEN 1 ELSE 0 END) AS total_dislikes,

        COUNT(DISTINCT co.id_comentario) AS total_comentarios

      FROM recursos r
      INNER JOIN asignaturas a ON r.id_asignatura = a.id_asignatura
      INNER JOIN categorias c ON r.id_categoria = c.id_categoria
      INNER JOIN usuarios u ON r.id_usuario = u.id_usuario

      LEFT JOIN recurso_likes rl ON rl.id_recurso = r.id_recurso
      LEFT JOIN comentarios co ON co.id_recurso = r.id_recurso

      WHERE r.id_recurso = ?
      GROUP BY r.id_recurso
      `,
      [id_recurso]
    );

    if (!rows[0]) return null;

    const [reportes] = await conexion.query(
      `
      SELECT
        rp.id_reporte,
        rp.motivo,
        rp.fecha_reporte
      FROM reportes rp
      WHERE rp.id_recurso = ?
      ORDER BY rp.fecha_reporte DESC
      `,
      [id_recurso]
    );

    const [comentarios] = await conexion.query(
      `
      SELECT 
        co.id_comentario,
        co.comentario,
        co.fecha,
        u.id_usuario,
        u.nombres_usuario AS usuario
      FROM comentarios co
      INNER JOIN usuarios u ON co.id_usuario = u.id_usuario
      WHERE co.id_recurso = ?
      ORDER BY co.fecha DESC
      `,
      [id_recurso]
    );

    return {
      ...rows[0],
      total_reportes: reportes.length,
      reportes,
      comentarios
    };
  },
};

export default RecursosModel;