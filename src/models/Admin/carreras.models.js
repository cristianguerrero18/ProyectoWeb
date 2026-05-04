// Importa la función encargada de establecer la conexión con la base de datos
import getConexion from "../../db/database.js";

// Se obtiene una instancia de conexión a la base de datos
const conexion = await getConexion();

/**
 * Modelo CarrerasModel
 * 
 * Este objeto agrupa todas las operaciones relacionadas con la entidad "carreras".
 * Su responsabilidad principal es interactuar directamente con la base de datos
 * mediante consultas SQL, permitiendo consultar, crear, actualizar y eliminar
 * registros de la tabla carreras.
 */
const CarrerasModel = {

  /**
   * Obtiene todas las carreras registradas en la base de datos.
   * 
   * @returns {Array} Lista de carreras almacenadas.
   */
  getTodas: async () => {
    const [rows] = await conexion.query("SELECT * FROM carreras");
    return rows;
  },

  /**
   * Busca una carrera específica mediante su identificador.
   * 
   * @param {number} id_carrera - Identificador único de la carrera.
   * @returns {Object|null} Retorna la carrera encontrada o null si no existe.
   */
  getPorId: async (id_carrera) => {
    const [rows] = await conexion.query(
      "SELECT * FROM carreras WHERE id_carrera = ?",
      [id_carrera]
    );

    // Si existe un resultado, se retorna el primer registro; de lo contrario, null
    return rows[0] || null;
  },

  /**
   * Obtiene las carreras asociadas a un tipo de carrera específico.
   * 
   * @param {number} id_tipo_carrera - Identificador del tipo de carrera.
   * @returns {Array} Lista de carreras que pertenecen al tipo indicado.
   */
  getPorTipo: async (id_tipo_carrera) => {
    const [rows] = await conexion.query(
      "SELECT nombre_carrera, id_carrera FROM carreras WHERE id_tipo_carrera = ?",
      [id_tipo_carrera]
    );

    return rows;
  },

  /**
   * Busca una carrera por su nombre.
   * 
   * Esta función puede utilizarse para validar si una carrera ya existe
   * antes de crear un nuevo registro.
   * 
   * @param {string} nombre_carrera - Nombre de la carrera a consultar.
   * @returns {Object|null} Retorna la carrera encontrada o null si no existe.
   */
  getPorNombre: async (nombre_carrera) => {
    const [rows] = await conexion.query(
      "SELECT * FROM carreras WHERE nombre_carrera = ?",
      [nombre_carrera]
    );

    return rows[0] || null;
  },

  /**
   * Crea una nueva carrera en la base de datos.
   * 
   * @param {Object} datos - Datos de la carrera a registrar.
   * @param {string} datos.nombre_carrera - Nombre de la carrera.
   * @param {number} datos.id_tipo_carrera - Tipo de carrera asociado.
   * @param {string} datos.Descripcion - Descripción de la carrera.
   * @returns {number} Número de filas afectadas por la operación.
   */
  crear: async ({ nombre_carrera, id_tipo_carrera, Descripcion }) => {
    const [result] = await conexion.query(
      "INSERT INTO carreras (nombre_carrera, id_tipo_carrera, Descripcion) VALUES (?, ?, ?)",
      [nombre_carrera, id_tipo_carrera, Descripcion]
    );

    return result.affectedRows;
  },

  /**
   * Actualiza la información de una carrera existente.
   * 
   * @param {Object} datos - Datos actualizados de la carrera.
   * @param {number} datos.id_carrera - Identificador de la carrera a actualizar.
   * @param {string} datos.nombre_carrera - Nuevo nombre de la carrera.
   * @param {number} datos.id_tipo_carrera - Nuevo tipo de carrera asociado.
   * @param {string} datos.Descripcion - Nueva descripción de la carrera.
   * @returns {number} Número de filas afectadas por la actualización.
   */
  actualizar: async ({ id_carrera, nombre_carrera, id_tipo_carrera, Descripcion }) => {
    const [result] = await conexion.query(
      "UPDATE carreras SET nombre_carrera = ?, id_tipo_carrera = ?, Descripcion = ? WHERE id_carrera = ?",
      [nombre_carrera, id_tipo_carrera, Descripcion, id_carrera]
    );

    return result.affectedRows;
  },

  /**
   * Elimina una carrera de la base de datos según su identificador.
   * 
   * @param {number} id_carrera - Identificador de la carrera a eliminar.
   * @returns {number} Número de filas afectadas por la eliminación.
   */
  eliminar: async (id_carrera) => {
    const [result] = await conexion.query(
      "DELETE FROM carreras WHERE id_carrera = ?",
      [id_carrera]
    );

    return result.affectedRows;
  }, 
};

// Exporta el modelo para que pueda ser utilizado por los controladores
export default CarrerasModel;
