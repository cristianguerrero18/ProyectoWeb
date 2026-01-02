import getConexion from "../../db/database.js";

const conexion = await getConexion();

const LogAccesoModel = {
  /* ===========================
     REGISTRAR LOG DE ACCESO COMPLETO
  =========================== */
  insertLog: async (id_usuario, ip, user_agent = null, correo = null, nombres_usuario = null, apellidos_usuario = null) => {
    const [result] = await conexion.query(
      `INSERT INTO logs_acceso 
        (id_usuario, fecha, ip, user_agent, correo, nombres_usuario, apellidos_usuario) 
       VALUES (?, NOW(), ?, ?, ?, ?, ?)`,
      [id_usuario, ip, user_agent, correo, nombres_usuario, apellidos_usuario]
    );
    return result.insertId;
  },

  /* ===========================
     REGISTRAR LOG DE ACCESO (VERSIÓN MEJORADA)
  =========================== */
  insertLogCompleto: async (userData, ip, user_agent) => {
    const [result] = await conexion.query(
      `INSERT INTO logs_acceso 
        (id_usuario, fecha, ip, user_agent, correo, nombres_usuario, apellidos_usuario) 
       VALUES (?, NOW(), ?, ?, ?, ?, ?)`,
      [
        userData.id_usuario, 
        ip, 
        user_agent,
        userData.correo || null,
        userData.nombres_usuario || null,
        userData.apellidos_usuario || null
      ]
    );
    return result.insertId;
  },

  /* ===========================
     OBTENER LOGS POR USUARIO
  =========================== */
  getLogsByUser: async (id_usuario) => {
    const [rows] = await conexion.query(
      `SELECT 
         id_log, 
         id_usuario, 
         fecha, 
         ip, 
         user_agent,
         correo,
         nombres_usuario,
         apellidos_usuario
       FROM logs_acceso 
       WHERE id_usuario = ? 
       ORDER BY fecha DESC`,
      [id_usuario]
    );
    return rows;
  },

  /* ===========================
     OBTENER TODOS LOS LOGS
  =========================== */
  getAllLogs: async () => {
    const [rows] = await conexion.query(
      `SELECT 
         l.id_log, 
         l.id_usuario, 
         l.fecha, 
         l.ip,
         l.user_agent,
         l.correo,
         l.nombres_usuario,
         l.apellidos_usuario,
         u.nombres_usuario as usuario_nombre,
         u.apellidos_usuario as usuario_apellido
       FROM logs_acceso l
       LEFT JOIN usuarios u ON l.id_usuario = u.id_usuario
       ORDER BY l.fecha DESC`
    );
    return rows;
  },

  /* ===========================
     OBTENER LOGS CON INFORMACIÓN DETALLADA
  =========================== */
  getLogsDetallados: async () => {
    const [rows] = await conexion.query(
      `SELECT 
         l.*,
         CONCAT(u.nombres_usuario, ' ', u.apellidos_usuario) as usuario_completo,
         r.nombre_rol,
         c.nombre_carrera
       FROM logs_acceso l
       LEFT JOIN usuarios u ON l.id_usuario = u.id_usuario
       LEFT JOIN roles r ON u.id_rol = r.id_rol
       LEFT JOIN carreras c ON u.id_carrera = c.id_carrera
       ORDER BY l.fecha DESC`
    );
    return rows;
  },
};

export default LogAccesoModel;