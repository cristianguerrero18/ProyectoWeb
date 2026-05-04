// Importa la función encargada de obtener la conexión o pool de la base de datos
import getConexion from "../../db/database.js";

// Se obtiene la conexión para ejecutar consultas SQL desde este modelo
const conexion = await getConexion();

/**
 * Modelo LogAccesoModel
 *
 * Este objeto agrupa las operaciones relacionadas con la entidad "logs_acceso".
 * Su responsabilidad es registrar, consultar y eliminar los registros de acceso
 * de los usuarios al sistema.
 *
 * Este modelo permite llevar trazabilidad sobre los inicios de sesión o accesos,
 * almacenando información como usuario, fecha, dirección IP, navegador/dispositivo
 * utilizado y datos básicos del usuario.
 */
const LogAccesoModel = {

  /**
   * Registra un nuevo log de acceso con los datos básicos del usuario.
   *
   * @param {number} id_usuario - Identificador del usuario que accede al sistema.
   * @param {string} ip - Dirección IP desde la cual se realiza el acceso.
   * @param {string|null} user_agent - Información del navegador o dispositivo utilizado.
   * @param {string|null} correo - Correo electrónico del usuario.
   * @param {string|null} nombres_usuario - Nombres del usuario.
   * @param {string|null} apellidos_usuario - Apellidos del usuario.
   * @returns {number} Identificador generado para el nuevo log registrado.
   */
  insertLog: async (
    id_usuario,
    ip,
    user_agent = null,
    correo = null,
    nombres_usuario = null,
    apellidos_usuario = null
  ) => {
    const [result] = await conexion.query(
      `INSERT INTO logs_acceso 
        (id_usuario, fecha, ip, user_agent, correo, nombres_usuario, apellidos_usuario) 
       VALUES (?, NOW(), ?, ?, ?, ?, ?)`,
      [id_usuario, ip, user_agent, correo, nombres_usuario, apellidos_usuario]
    );

    // Retorna el ID generado para el nuevo registro
    return result.insertId;
  },

  /**
   * Registra un log de acceso utilizando un objeto completo con la información del usuario.
   *
   * Esta función facilita el registro cuando los datos del usuario ya vienen agrupados
   * en un objeto, por ejemplo, después de validar correctamente el inicio de sesión.
   *
   * @param {Object} userData - Datos completos del usuario autenticado.
   * @param {number} userData.id_usuario - Identificador del usuario.
   * @param {string|null} userData.correo - Correo electrónico del usuario.
   * @param {string|null} userData.nombres_usuario - Nombres del usuario.
   * @param {string|null} userData.apellidos_usuario - Apellidos del usuario.
   * @param {string} ip - Dirección IP desde la cual se realiza el acceso.
   * @param {string} user_agent - Información del navegador o dispositivo utilizado.
   * @returns {number} Identificador generado para el nuevo log registrado.
   */
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

    // Retorna el ID generado para el nuevo log
    return result.insertId;
  },

  /**
   * Obtiene todos los logs de acceso asociados a un usuario específico.
   *
   * Los registros se ordenan de forma descendente, mostrando primero
   * los accesos más recientes.
   *
   * @param {number} id_usuario - Identificador del usuario.
   * @returns {Array} Lista de logs asociados al usuario indicado.
   */
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

  /**
   * Obtiene todos los logs de acceso registrados en el sistema.
   *
   * Utiliza LEFT JOIN con la tabla usuarios para complementar la información
   * del log con los nombres y apellidos actuales del usuario, si existen.
   *
   * @returns {Array} Lista completa de logs de acceso.
   */
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

  /**
   * Obtiene los logs de acceso con información detallada del usuario.
   *
   * Además de los datos propios del log, consulta información relacionada
   * como el nombre completo del usuario, rol y carrera asociada.
   *
   * @returns {Array} Lista de logs con información ampliada del usuario.
   */
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

  /**
   * Elimina todos los logs de acceso mediante DELETE.
   *
   * A diferencia de TRUNCATE, esta operación elimina los registros pero mantiene
   * el contador AUTO_INCREMENT de la tabla.
   *
   * @returns {Object} Resultado de la operación con estado, mensaje y filas afectadas.
   * @throws {Error} Lanza el error si ocurre un problema durante la eliminación.
   */
  deleteAllLogs: async () => {
    try {
      console.log("Ejecutando deleteAllLogs en el modelo");

      // Deshabilita temporalmente las verificaciones de llaves foráneas
      await conexion.query("SET FOREIGN_KEY_CHECKS = 0");

      // Elimina todos los registros de la tabla logs_acceso
      const [result] = await conexion.query("DELETE FROM logs_acceso");

      console.log(`Eliminados ${result.affectedRows} registros`);

      // Vuelve a habilitar las verificaciones de llaves foráneas
      await conexion.query("SET FOREIGN_KEY_CHECKS = 1");

      return {
        success: true,
        message: "Todos los logs han sido eliminados",
        affectedRows: result.affectedRows
      };
    } catch (error) {
      console.error("Error en deleteAllLogs:", error);

      // Garantiza que las verificaciones se reactiven aunque ocurra un error
      await conexion.query("SET FOREIGN_KEY_CHECKS = 1");

      throw error;
    }
  },

  /**
   * Vacía completamente la tabla de logs mediante TRUNCATE.
   *
   * Esta operación elimina todos los registros y reinicia el contador
   * AUTO_INCREMENT de la tabla.
   *
   * @returns {Object} Resultado de la operación con estado y mensaje.
   * @throws {Error} Lanza el error si ocurre un problema durante el truncado.
   */
  truncateLogs: async () => {
    try {
      console.log("Ejecutando truncateLogs en el modelo");

      // Deshabilita temporalmente las verificaciones de llaves foráneas
      await conexion.query("SET FOREIGN_KEY_CHECKS = 0");

      // Vacía completamente la tabla y reinicia el contador AUTO_INCREMENT
      await conexion.query("TRUNCATE TABLE logs_acceso");

      console.log("Tabla truncada exitosamente");

      // Vuelve a habilitar las verificaciones de llaves foráneas
      await conexion.query("SET FOREIGN_KEY_CHECKS = 1");

      return {
        success: true,
        message: "Tabla de logs truncada exitosamente"
      };
    } catch (error) {
      console.error("Error en truncateLogs:", error);

      // Garantiza que las verificaciones se reactiven aunque ocurra un error
      await conexion.query("SET FOREIGN_KEY_CHECKS = 1");

      throw error;
    }
  },

  /**
   * Elimina logs de acceso dentro de un rango de fechas.
   *
   * La comparación se realiza sobre la fecha del registro, permitiendo
   * borrar únicamente los logs generados entre la fecha inicial y la fecha final.
   *
   * @param {string} fecha_inicio - Fecha inicial del rango en formato YYYY-MM-DD.
   * @param {string} fecha_fin - Fecha final del rango en formato YYYY-MM-DD.
   * @returns {Object} Resultado de la operación con estado, mensaje y filas afectadas.
   * @throws {Error} Lanza el error si ocurre un problema durante la eliminación.
   */
  deleteLogsByDateRange: async (fecha_inicio, fecha_fin) => {
    try {
      console.log("Ejecutando deleteLogsByDateRange:", { fecha_inicio, fecha_fin });

      // Deshabilita temporalmente las verificaciones de llaves foráneas
      await conexion.query("SET FOREIGN_KEY_CHECKS = 0");

      // Elimina únicamente los logs cuya fecha esté dentro del rango indicado
      const [result] = await conexion.query(
        `DELETE FROM logs_acceso 
         WHERE DATE(fecha) BETWEEN ? AND ?`,
        [fecha_inicio, fecha_fin]
      );

      console.log(`Eliminados ${result.affectedRows} registros`);

      // Vuelve a habilitar las verificaciones de llaves foráneas
      await conexion.query("SET FOREIGN_KEY_CHECKS = 1");

      return {
        success: true,
        message: `Logs eliminados desde ${fecha_inicio} hasta ${fecha_fin}`,
        affectedRows: result.affectedRows
      };
    } catch (error) {
      console.error("Error en deleteLogsByDateRange:", error);

      // Garantiza que las verificaciones se reactiven aunque ocurra un error
      await conexion.query("SET FOREIGN_KEY_CHECKS = 1");

      throw error;
    }
  }
};

// Exporta el modelo para que pueda ser utilizado desde los controladores
export default LogAccesoModel;
