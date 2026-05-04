// Importa la función encargada de obtener la conexión o pool de la base de datos
import getConexion from "../../db/database.js";

/**
 * Modelo NotificacionesModel
 *
 * Este objeto agrupa las operaciones relacionadas con la entidad "notificaciones".
 * Su responsabilidad es interactuar directamente con la base de datos MySQL
 * para consultar, crear, actualizar el estado y eliminar notificaciones del sistema.
 *
 * Este modelo permite gestionar avisos dirigidos a los usuarios, como mensajes
 * informativos, alertas, respuestas de PQRS, cambios de estado u otras acciones
 * relevantes dentro de la plataforma.
 */
const NotificacionesModel = {

  /**
   * Obtiene todas las notificaciones registradas en el sistema.
   *
   * Los registros se ordenan por fecha de forma descendente, mostrando primero
   * las notificaciones más recientes.
   *
   * @returns {Array} Lista completa de notificaciones.
   * @throws {Error} Lanza el error si ocurre un problema durante la consulta.
   */
  getTodos: async () => {
    try {
      // Obtiene la conexión a la base de datos
      const conexion = await getConexion();

      // Consulta todas las notificaciones registradas
      const [rows] = await conexion.query(`
        SELECT 
          id_notificacion,
          id_usuario,
          titulo,
          mensaje,
          tipo,
          estado,
          fecha
        FROM notificaciones
        ORDER BY fecha DESC
      `);

      return rows;
    } catch (error) {
      // Registra el error para facilitar la depuración
      console.error("Error NotificacionesModel.getTodos:", error);

      // Lanza nuevamente el error para que sea manejado por el controlador
      throw error;
    }
  },

  /**
   * Obtiene las notificaciones asociadas a un usuario específico.
   *
   * Esta función permite mostrar a cada usuario únicamente las notificaciones
   * que le corresponden dentro de la plataforma.
   *
   * @param {number} id_usuario - Identificador del usuario.
   * @returns {Array} Lista de notificaciones del usuario indicado.
   * @throws {Error} Lanza el error si ocurre un problema durante la consulta.
   */
  getPorUsuario: async (id_usuario) => {
    try {
      // Obtiene la conexión a la base de datos
      const conexion = await getConexion();

      // Consulta las notificaciones correspondientes al usuario recibido
      const [rows] = await conexion.query(
        `
        SELECT 
          id_notificacion,
          id_usuario,
          titulo,
          mensaje,
          tipo,
          estado,
          fecha
        FROM notificaciones
        WHERE id_usuario = ?
        ORDER BY fecha DESC
        `,
        [id_usuario]
      );

      return rows;
    } catch (error) {
      console.error("Error NotificacionesModel.getPorUsuario:", error);
      throw error;
    }
  },

  /**
   * Cuenta las notificaciones no leídas de un usuario.
   *
   * Esta función se puede utilizar para mostrar indicadores visuales en la interfaz,
   * como un contador o una alerta de notificaciones pendientes.
   *
   * @param {number} id_usuario - Identificador del usuario.
   * @returns {number} Cantidad de notificaciones con estado "no_visto".
   * @throws {Error} Lanza el error si ocurre un problema durante la consulta.
   */
  contarNoLeidas: async (id_usuario) => {
    try {
      // Obtiene la conexión a la base de datos
      const conexion = await getConexion();

      // Cuenta las notificaciones pendientes por leer para el usuario indicado
      const [rows] = await conexion.query(
        `
        SELECT COUNT(*) AS total
        FROM notificaciones
        WHERE id_usuario = ? AND estado = 'no_visto'
        `,
        [id_usuario]
      );

      // Retorna el total encontrado o 0 si no existen registros
      return rows[0]?.total || 0;
    } catch (error) {
      console.error("Error NotificacionesModel.contarNoLeidas:", error);
      throw error;
    }
  },

  /**
   * Crea una nueva notificación para un usuario.
   *
   * Si no se especifica un tipo o estado, se asignan valores por defecto:
   * tipo "general" y estado "no_visto".
   *
   * @param {Object} datos - Datos de la notificación a registrar.
   * @param {number} datos.id_usuario - Usuario destinatario de la notificación.
   * @param {string} datos.titulo - Título de la notificación.
   * @param {string} datos.mensaje - Contenido o descripción de la notificación.
   * @param {string} [datos.tipo="general"] - Tipo de notificación.
   * @param {string} [datos.estado="no_visto"] - Estado inicial de la notificación.
   * @returns {number} Identificador generado para la nueva notificación.
   * @throws {Error} Lanza el error si ocurre un problema durante la inserción.
   */
  crear: async ({ id_usuario, titulo, mensaje, tipo = "general", estado = "no_visto" }) => {
    try {
      // Obtiene la conexión a la base de datos
      const conexion = await getConexion();

      // Inserta la nueva notificación con la fecha actual del servidor
      const [result] = await conexion.query(
        `
        INSERT INTO notificaciones (id_usuario, titulo, mensaje, tipo, estado, fecha)
        VALUES (?, ?, ?, ?, ?, NOW())
        `,
        [id_usuario, titulo, mensaje, tipo, estado]
      );

      // Retorna el ID generado para el nuevo registro
      return result.insertId;
    } catch (error) {
      console.error("Error NotificacionesModel.crear:", error);
      throw error;
    }
  },

  /**
   * Marca una notificación específica como vista.
   *
   * Esta función actualiza el estado de una notificación de "no_visto" a "visto",
   * indicando que el usuario ya revisó el mensaje.
   *
   * @param {number} id_notificacion - Identificador de la notificación.
   * @returns {number} Número de filas afectadas por la actualización.
   * @throws {Error} Lanza el error si ocurre un problema durante la actualización.
   */
  marcarComoVisto: async (id_notificacion) => {
    try {
      // Obtiene la conexión a la base de datos
      const conexion = await getConexion();

      // Actualiza el estado de la notificación indicada
      const [result] = await conexion.query(
        `
        UPDATE notificaciones
        SET estado = 'visto'
        WHERE id_notificacion = ?
        `,
        [id_notificacion]
      );

      // Si retorna 1, la actualización fue exitosa
      return result.affectedRows;
    } catch (error) {
      console.error("Error NotificacionesModel.marcarComoVisto:", error);
      throw error;
    }
  },

  /**
   * Marca como vistas todas las notificaciones pendientes de un usuario.
   *
   * Esta operación es útil cuando el usuario selecciona una opción como
   * "marcar todas como leídas" dentro de la interfaz.
   *
   * @param {number} id_usuario - Identificador del usuario.
   * @returns {number} Número de filas afectadas por la actualización.
   * @throws {Error} Lanza el error si ocurre un problema durante la actualización.
   */
  marcarTodasComoVistas: async (id_usuario) => {
    try {
      // Obtiene la conexión a la base de datos
      const conexion = await getConexion();

      // Actualiza todas las notificaciones no vistas del usuario
      const [result] = await conexion.query(
        `
        UPDATE notificaciones
        SET estado = 'visto'
        WHERE id_usuario = ? AND estado = 'no_visto'
        `,
        [id_usuario]
      );

      // Retorna cuántas notificaciones fueron actualizadas
      return result.affectedRows;
    } catch (error) {
      console.error("Error NotificacionesModel.marcarTodasComoVistas:", error);
      throw error;
    }
  },

  /**
   * Elimina una notificación según su identificador.
   *
   * @param {number} id_notificacion - Identificador de la notificación a eliminar.
   * @returns {number} Número de filas afectadas por la eliminación.
   * @throws {Error} Lanza el error si ocurre un problema durante la eliminación.
   */
  eliminar: async (id_notificacion) => {
    try {
      // Obtiene la conexión a la base de datos
      const conexion = await getConexion();

      // Elimina la notificación asociada al identificador recibido
      const [result] = await conexion.query(
        "DELETE FROM notificaciones WHERE id_notificacion = ?",
        [id_notificacion]
      );

      // Si retorna 1, la eliminación fue exitosa
      return result.affectedRows;
    } catch (error) {
      console.error("Error NotificacionesModel.eliminar:", error);
      throw error;
    }
  },
};

// Exporta el modelo para que pueda ser utilizado desde los controladores
export default NotificacionesModel;
