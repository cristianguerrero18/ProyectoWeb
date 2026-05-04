// Importa la función encargada de obtener la conexión o pool de la base de datos
import getConexion from "../../db/database.js";

// Se obtiene la conexión para ejecutar consultas SQL desde este modelo
const conexion = await getConexion();

/**
 * Modelo CategoriaRecursoModel
 *
 * Este objeto agrupa las operaciones relacionadas con la entidad "categorías".
 * Su responsabilidad es interactuar directamente con la base de datos MySQL,
 * ejecutando consultas SQL para consultar, crear, actualizar y eliminar registros
 * de la tabla categorias.
 */
const CategoriaRecursoModel = {

  /**
   * Obtiene todas las categorías registradas en la base de datos.
   *
   * @returns {Array} Lista de categorías almacenadas.
   */
  getTodos: async () => {
    const [rows] = await conexion.query("SELECT * FROM categorias");
    return rows;
  },

  /**
   * Busca una categoría específica mediante su identificador.
   *
   * @param {number} id_categoria - Identificador único de la categoría.
   * @returns {Object|null} Retorna la categoría encontrada o null si no existe.
   */
  getPorId: async (id_categoria) => {
    const [rows] = await conexion.query(
      "SELECT * FROM categorias WHERE id_categoria = ?",
      [id_categoria]
    );

    // Retorna el primer resultado encontrado o null si no existe coincidencia
    return rows[0] || null;
  },

  /**
   * Crea una nueva categoría en la base de datos.
   *
   * @param {Object} datos - Datos de la categoría a registrar.
   * @param {number} datos.id_categoria - Identificador de la categoría.
   * @param {string} datos.nombre_categoria - Nombre de la categoría.
   * @returns {number} Número de filas afectadas por la operación.
   */
  crear: async ({ id_categoria, nombre_categoria }) => {
    const [result] = await conexion.query(
      "INSERT INTO categorias (id_categoria, nombre_categoria) VALUES (?, ?)",
      [id_categoria, nombre_categoria]
    );

    // Si retorna 1, la inserción fue exitosa
    return result.affectedRows;
  },

  /**
   * Actualiza el nombre de una categoría existente.
   *
   * @param {Object} datos - Datos actualizados de la categoría.
   * @param {number} datos.id_categoria - Identificador de la categoría a actualizar.
   * @param {string} datos.nombre_categoria - Nuevo nombre de la categoría.
   * @returns {number} Número de filas afectadas por la actualización.
   */
  actualizar: async ({ nombre_categoria, id_categoria }) => {
    const [result] = await conexion.query(
      "UPDATE categorias SET nombre_categoria = ? WHERE id_categoria = ?",
      [nombre_categoria, id_categoria]
    );

    // Si retorna 1, la actualización fue exitosa; si retorna 0, no hubo cambios
    return result.affectedRows;
  },

  /**
   * Elimina una categoría de la base de datos según su identificador.
   *
   * @param {number} id_categoria - Identificador de la categoría a eliminar.
   * @returns {number} Número de filas afectadas por la eliminación.
   */
  eliminar: async (id_categoria) => {
    const [result] = await conexion.query(
      "DELETE FROM categorias WHERE id_categoria = ?",
      [id_categoria]
    );

    // Si retorna 1, la eliminación fue exitosa
    return result.affectedRows;
  },
};

// Exporta el modelo para que pueda ser utilizado desde los controladores
export default CategoriaRecursoModel;
