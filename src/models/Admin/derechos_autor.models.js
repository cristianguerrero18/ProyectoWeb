// Importa la función encargada de obtener la conexión o pool de la base de datos
import getConexion from "../../db/database.js";

/**
 * Modelo DerechosAutorModel
 *
 * Este objeto agrupa las operaciones relacionadas con la entidad "derechos_autor".
 * Su responsabilidad es interactuar directamente con la base de datos MySQL
 * para consultar, registrar, verificar y eliminar declaraciones de derechos
 * de autor asociadas a los recursos publicados por los usuarios.
 *
 * Este modelo contribuye al control de integridad académica, ya que permite
 * almacenar el compromiso del usuario sobre la autoría, procedencia o uso
 * adecuado del material educativo compartido en la plataforma.
 */
const DerechosAutorModel = {

  /**
   * Obtiene todas las declaraciones de derechos de autor registradas.
   *
   * @returns {Array} Lista de registros almacenados en la tabla derechos_autor.
   */
  getTodos: async () => {
    // Obtiene la conexión a la base de datos
    const conexion = await getConexion();

    // Consulta todos los registros de la tabla derechos_autor
    const [rows] = await conexion.query(
      `SELECT * FROM derechos_autor`
    );

    return rows;
  },

  /**
   * Busca una declaración de derechos de autor mediante su identificador.
   *
   * @param {number} id_derechos_autor - Identificador único de la declaración.
   * @returns {Object|null} Retorna la declaración encontrada o null si no existe.
   */
  getPorId: async (id_derechos_autor) => {
    // Obtiene la conexión a la base de datos
    const conexion = await getConexion();

    // Consulta el registro asociado al identificador recibido
    const [rows] = await conexion.query(
      `SELECT * FROM derechos_autor WHERE id_derechos_autor = ?`,
      [id_derechos_autor]
    );

    // Retorna el primer resultado encontrado o null si no existe coincidencia
    return rows[0] || null;
  },

  /**
   * Verifica si ya existe una declaración de derechos de autor
   * asociada a un usuario y a un recurso específico.
   *
   * Esta función es útil para evitar registros duplicados sobre el mismo
   * recurso publicado por el mismo usuario.
   *
   * @param {number} id_usuario - Identificador del usuario que publica el recurso.
   * @param {number} id_recurso - Identificador del recurso asociado.
   * @returns {boolean} Retorna true si ya existe una declaración, de lo contrario false.
   */
  existe: async (id_usuario, id_recurso) => {
    // Obtiene la conexión a la base de datos
    const conexion = await getConexion();

    // Consulta si existe una declaración para el usuario y recurso indicados
    const [rows] = await conexion.query(
      `SELECT id_derechos_autor
       FROM derechos_autor
       WHERE id_usuario = ? AND id_recurso = ?`,
      [id_usuario, id_recurso]
    );

    // Si la consulta retorna registros, significa que la declaración ya existe
    return rows.length > 0;
  },

  /**
   * Crea una nueva declaración de derechos de autor.
   *
   * Registra el compromiso del usuario respecto al uso adecuado,
   * autoría o procedencia del recurso publicado.
   *
   * @param {Object} datos - Datos de la declaración a registrar.
   * @param {number} datos.id_usuario - Identificador del usuario que realiza la declaración.
   * @param {number} datos.id_recurso - Identificador del recurso publicado.
   * @param {string} datos.compromiso - Texto o estado del compromiso aceptado.
   * @returns {number} Identificador generado para el nuevo registro.
   */
  crear: async ({ id_usuario, id_recurso, compromiso }) => {
    // Obtiene la conexión a la base de datos
    const conexion = await getConexion();

    // Inserta la declaración de derechos de autor en la base de datos
    const [result] = await conexion.query(
      `INSERT INTO derechos_autor (id_usuario, id_recurso, compromiso)
       VALUES (?, ?, ?)`,
      [id_usuario, id_recurso, compromiso]
    );

    // Retorna el ID generado por la base de datos para el nuevo registro
    return result.insertId;
  },

  /**
   * Elimina una declaración de derechos de autor según su identificador.
   *
   * @param {number} id_derechos_autor - Identificador de la declaración a eliminar.
   * @returns {number} Número de filas afectadas por la eliminación.
   */
  eliminar: async (id_derechos_autor) => {
    // Obtiene la conexión a la base de datos
    const conexion = await getConexion();

    // Elimina el registro asociado al identificador recibido
    const [result] = await conexion.query(
      `DELETE FROM derechos_autor WHERE id_derechos_autor = ?`,
      [id_derechos_autor]
    );

    // Si retorna 1, la eliminación fue exitosa
    return result.affectedRows;
  },
};

// Exporta el modelo para que pueda ser utilizado desde los controladores
export default DerechosAutorModel;
