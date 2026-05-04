// Importa la función encargada de obtener la conexión o pool de la base de datos
import getConexion from "../../db/database.js";

// Se obtiene la conexión para ejecutar consultas SQL desde este modelo
const conexion = await getConexion();

/**
 * Modelo PensumModel
 *
 * Este objeto agrupa las operaciones relacionadas con la entidad "pensum".
 * Su responsabilidad es interactuar directamente con la base de datos MySQL
 * para consultar, crear, actualizar y eliminar registros asociados al plan
 * académico de las carreras.
 *
 * Este modelo permite relacionar carreras, semestres y asignaturas, facilitando
 * la organización de los recursos educativos según el programa académico y el
 * nivel o semestre correspondiente.
 */
const PensumModel = {

  /**
   * Obtiene todos los registros del pensum almacenados en la base de datos.
   *
   * @returns {Array} Lista completa de registros del pensum.
   */
  getTodos: async () => {
    const [rows] = await conexion.query("SELECT * FROM pensum");
    return rows;
  },

  /**
   * Busca un registro específico del pensum mediante su identificador.
   *
   * @param {number} id_pensum - Identificador único del registro del pensum.
   * @returns {Object|null} Retorna el registro encontrado o null si no existe.
   */
  getPorId: async (id_pensum) => {
    const [rows] = await conexion.query(
      "SELECT * FROM pensum WHERE id_pensum = ?",
      [id_pensum]
    );

    // Retorna el primer resultado encontrado o null si no existe coincidencia
    return rows[0] || null;
  },

  /**
   * Crea un nuevo registro dentro del pensum académico.
   *
   * Este registro relaciona una carrera, un semestre y una asignatura.
   *
   * @param {Object} datos - Datos del registro a crear.
   * @param {number} datos.id_carrera - Identificador de la carrera.
   * @param {number} datos.numero_semestre - Número del semestre asociado.
   * @param {number} datos.id_asignatura - Identificador de la asignatura.
   * @returns {number} Número de filas afectadas por la operación.
   */
  crear: async ({ id_carrera, numero_semestre, id_asignatura }) => {
    const [result] = await conexion.query(
      "INSERT INTO pensum (id_carrera, numero_semestre, id_asignatura) VALUES (?, ?, ?)",
      [id_carrera, numero_semestre, id_asignatura]
    );

    // Si retorna 1, la inserción fue exitosa
    return result.affectedRows;
  },

  /**
   * Actualiza un registro existente del pensum académico.
   *
   * Permite modificar la carrera, el semestre o la asignatura asociada
   * a un registro específico del pensum.
   *
   * @param {Object} datos - Datos actualizados del registro del pensum.
   * @param {number} datos.id_pensum - Identificador del registro a actualizar.
   * @param {number} datos.id_carrera - Nuevo identificador de la carrera.
   * @param {number} datos.numero_semestre - Nuevo número de semestre.
   * @param {number} datos.id_asignatura - Nuevo identificador de la asignatura.
   * @returns {number} Número de filas afectadas por la actualización.
   */
  actualizar: async ({ id_pensum, id_carrera, numero_semestre, id_asignatura }) => {
    const [result] = await conexion.query(
      "UPDATE pensum SET id_carrera = ?, numero_semestre = ?, id_asignatura = ? WHERE id_pensum = ?",
      [id_carrera, numero_semestre, id_asignatura, id_pensum]
    );

    // Si retorna 1, la actualización fue exitosa; si retorna 0, no hubo cambios
    return result.affectedRows;
  },

  /**
   * Elimina un registro del pensum según su identificador.
   *
   * @param {number} id_pensum - Identificador del registro del pensum a eliminar.
   * @returns {number} Número de filas afectadas por la eliminación.
   */
  eliminar: async (id_pensum) => {
    const [result] = await conexion.query(
      "DELETE FROM pensum WHERE id_pensum = ?",
      [id_pensum]
    );

    // Si retorna 1, la eliminación fue exitosa
    return result.affectedRows;
  },

  /**
   * Obtiene las asignaturas asociadas a una carrera específica,
   * incluyendo el semestre al que pertenecen.
   *
   * Esta consulta utiliza INNER JOIN para relacionar la tabla pensum
   * con la tabla asignaturas, permitiendo mostrar información más clara
   * en el front-end.
   *
   * @param {number} id_carrera - Identificador de la carrera.
   * @returns {Array} Lista de asignaturas organizadas por semestre.
   */
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

  /**
   * Obtiene los nombres de las asignaturas asociadas a una carrera específica.
   *
   * Utiliza DISTINCT para evitar asignaturas repetidas en caso de que existan
   * múltiples relaciones dentro del pensum.
   *
   * @param {number} id_carrera - Identificador de la carrera.
   * @returns {Array} Lista única de asignaturas asociadas a la carrera.
   */
  getNombresAsignaturasPorCarrera: async (id_carrera) => {
    const [rows] = await conexion.query(
      `SELECT DISTINCT a.nombre_asignatura, a.id_asignatura
       FROM pensum p
       INNER JOIN asignaturas a ON a.id_asignatura = p.id_asignatura
       WHERE p.id_carrera = ?
       ORDER BY a.nombre_asignatura ASC`,
      [id_carrera]
    );

    return rows;
  }    
};

// Exporta el modelo para que pueda ser utilizado desde los controladores
export default PensumModel;
