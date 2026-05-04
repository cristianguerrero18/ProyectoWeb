// Importa la función encargada de obtener la conexión o pool de la base de datos
import getConexion from "../../db/database.js";

// Se obtiene la conexión para ejecutar consultas SQL desde este modelo
const conexion = await getConexion();

/**
 * Modelo AsignaturaModel
 *
 * Este objeto agrupa las operaciones relacionadas con la entidad "asignaturas".
 * Su responsabilidad es interactuar directamente con la base de datos MySQL,
 * ejecutando consultas SQL para consultar, crear, actualizar y eliminar registros
 * de la tabla asignaturas.
 */
const AsignaturaModel = {

  /**
   * Obtiene todas las asignaturas registradas en la base de datos.
   *
   * @returns {Array} Lista de asignaturas almacenadas.
   */
  getTodas: async () => {
    const [rows] = await conexion.query("SELECT * FROM asignaturas");
    return rows;
  },

  /**
   * Busca una asignatura específica mediante su identificador.
   *
   * @param {number} id_asignatura - Identificador único de la asignatura.
   * @returns {Object|null} Retorna la asignatura encontrada o null si no existe.
   */
  getPorId: async (id_asignatura) => {
    const [rows] = await conexion.query(
      "SELECT * FROM asignaturas WHERE id_asignatura = ?",
      [id_asignatura]
    );

    // Retorna el primer resultado encontrado o null si no existe coincidencia
    return rows[0] || null;
  },

  /**
   * Busca una asignatura por su nombre.
   *
   * Esta función puede utilizarse para validar si una asignatura ya existe
   * antes de crear un nuevo registro.
   *
   * @param {string} nombre_asignatura - Nombre de la asignatura a consultar.
   * @returns {Object|null} Retorna la asignatura encontrada o null si no existe.
   */
  getPorNombre: async (nombre_asignatura) => {
    const [rows] = await conexion.query(
      "SELECT * FROM asignaturas WHERE nombre_asignatura = ?",
      [nombre_asignatura]
    );

    // Retorna el primer registro encontrado o null
    return rows[0] || null;
  },

  /**
   * Crea una nueva asignatura en la base de datos.
   *
   * @param {string} nombre_asignatura - Nombre de la asignatura a registrar.
   * @returns {number} Número de filas afectadas por la operación.
   */
  crear: async (nombre_asignatura) => {
    const [result] = await conexion.query(
      "INSERT INTO asignaturas (nombre_asignatura) VALUES (?)",
      [nombre_asignatura]
    );

    // Si retorna 1, la inserción fue exitosa
    return result.affectedRows;
  },

  /**
   * Actualiza el nombre de una asignatura existente.
   *
   * @param {Object} datos - Datos de la asignatura a actualizar.
   * @param {number} datos.id_asignatura - Identificador de la asignatura.
   * @param {string} datos.nombre_asignatura - Nuevo nombre de la asignatura.
   * @returns {number} Número de filas afectadas por la actualización.
   */
  actualizar: async ({ id_asignatura, nombre_asignatura }) => {
    const [result] = await conexion.query(
      "UPDATE asignaturas SET nombre_asignatura = ? WHERE id_asignatura = ?",
      [nombre_asignatura, id_asignatura]
    );

    // Si retorna 1, la actualización fue exitosa; si retorna 0, no hubo cambios
    return result.affectedRows;
  },

  /**
   * Elimina una asignatura de la base de datos según su identificador.
   *
   * @param {number} id_asignatura - Identificador de la asignatura a eliminar.
   * @returns {number} Número de filas afectadas por la eliminación.
   */
  eliminar: async (id_asignatura) => {
    const [result] = await conexion.query(
      "DELETE FROM asignaturas WHERE id_asignatura = ?",
      [id_asignatura]
    );

    // Si retorna 1, la eliminación fue exitosa
    return result.affectedRows;
  },
};

// Exporta el modelo para que pueda ser utilizado desde los controladores
export default AsignaturaModel;
