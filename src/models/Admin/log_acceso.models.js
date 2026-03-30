import getConexion from "../../db/database.js";

const conexion = await getConexion();

const LogAccesoModel = {
  /* ===========================
     REGISTRAR LOG DE ACCESO
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
     REGISTRAR LOG DE ACCESO COMPLETO
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

  /* ===========================
     ELIMINAR TODOS LOS LOGS (DELETE)
     Mantiene el contador AUTO_INCREMENT
  =========================== */
  deleteAllLogs: async () => {
    try {
      console.log('📝 Ejecutando deleteAllLogs en el modelo');
      
      // Deshabilitar verificaciones de llaves foráneas
      await conexion.query('SET FOREIGN_KEY_CHECKS = 0');
      
      // Ejecutar DELETE
      const [result] = await conexion.query('DELETE FROM logs_acceso');
      
      console.log(`✅ Eliminados ${result.affectedRows} registros`);
      
      // Volver a habilitar verificaciones
      await conexion.query('SET FOREIGN_KEY_CHECKS = 1');
      
      return { 
        success: true, 
        message: 'Todos los logs han sido eliminados',
        affectedRows: result.affectedRows 
      };
    } catch (error) {
      console.error('❌ Error en deleteAllLogs:', error);
      await conexion.query('SET FOREIGN_KEY_CHECKS = 1');
      throw error;
    }
  },

  /* ===========================
     TRUNCAR TABLA DE LOGS (TRUNCATE)
     Reinicia el contador AUTO_INCREMENT
  =========================== */
  truncateLogs: async () => {
    try {
      console.log('📝 Ejecutando truncateLogs en el modelo');
      
      // Deshabilitar verificaciones de llaves foráneas
      await conexion.query('SET FOREIGN_KEY_CHECKS = 0');
      
      // Ejecutar TRUNCATE
      await conexion.query('TRUNCATE TABLE logs_acceso');
      
      console.log('✅ Tabla truncada exitosamente');
      
      // Volver a habilitar verificaciones
      await conexion.query('SET FOREIGN_KEY_CHECKS = 1');
      
      return { 
        success: true, 
        message: 'Tabla de logs truncada exitosamente'
      };
    } catch (error) {
      console.error('❌ Error en truncateLogs:', error);
      await conexion.query('SET FOREIGN_KEY_CHECKS = 1');
      throw error;
    }
  },

  /* ===========================
     ELIMINAR LOGS POR RANGO DE FECHAS
  =========================== */
  deleteLogsByDateRange: async (fecha_inicio, fecha_fin) => {
    try {
      console.log('📝 Ejecutando deleteLogsByDateRange:', { fecha_inicio, fecha_fin });
      
      // Deshabilitar verificaciones de llaves foráneas
      await conexion.query('SET FOREIGN_KEY_CHECKS = 0');
      
      // Ejecutar DELETE con rango de fechas
      const [result] = await conexion.query(
        `DELETE FROM logs_acceso 
         WHERE DATE(fecha) BETWEEN ? AND ?`,
        [fecha_inicio, fecha_fin]
      );
      
      console.log(`✅ Eliminados ${result.affectedRows} registros`);
      
      // Volver a habilitar verificaciones
      await conexion.query('SET FOREIGN_KEY_CHECKS = 1');
      
      return { 
        success: true, 
        message: `Logs eliminados desde ${fecha_inicio} hasta ${fecha_fin}`,
        affectedRows: result.affectedRows 
      };
    } catch (error) {
      console.error('❌ Error en deleteLogsByDateRange:', error);
      await conexion.query('SET FOREIGN_KEY_CHECKS = 1');
      throw error;
    }
  }
};

export default LogAccesoModel;