// Importa la función encargada de obtener la conexión o pool de la base de datos
import getConexion from "../../db/database.js";

/**
 * Modelo DashboardModel
 *
 * Este objeto agrupa las consultas necesarias para obtener información
 * estadística del sistema, especialmente los contadores generales que se
 * muestran en el panel administrativo o dashboard.
 *
 * Su responsabilidad es interactuar directamente con la base de datos MySQL
 * y retornar datos resumidos sobre las principales entidades del sistema.
 */
const DashboardModel = {

  /**
   * Obtiene los totales generales de las principales tablas del sistema.
   *
   * Esta función ejecuta varias consultas SQL de conteo para conocer cuántos
   * registros existen en tablas como asignaturas, carreras, categorías,
   * pensum, recursos, tipos de carrera y usuarios.
   *
   * Promise.all permite ejecutar las consultas de forma paralela, mejorando
   * el tiempo de respuesta en comparación con ejecutarlas una por una.
   *
   * @returns {Object} Objeto con los totales generales del sistema.
   * @throws {Error} Lanza el error si ocurre un problema durante la consulta.
   */
  getTotales: async () => {
    try {
      // Obtiene la conexión a la base de datos
      const conexion = await getConexion();

      // Ejecuta en paralelo las consultas de conteo para cada tabla principal
      const [
        [asignaturas],
        [carreras],
        [categorias],
        [pensum],
        [recursos],
        [tipo_carrera],
        [usuarios],
      ] = await Promise.all([
        conexion.query("SELECT COUNT(*) total FROM asignaturas"),
        conexion.query("SELECT COUNT(*) total FROM carreras"),
        conexion.query("SELECT COUNT(*) total FROM categorias"),
        conexion.query("SELECT COUNT(*) total FROM pensum"),
        conexion.query("SELECT COUNT(*) total FROM recursos"),
        conexion.query("SELECT COUNT(*) total FROM tipo_carrera"),
        conexion.query("SELECT COUNT(*) total FROM usuarios"),
      ]);

      // Retorna los resultados en un objeto organizado para ser usado por el controlador
      return {
        asignaturas: asignaturas[0].total,
        carreras: carreras[0].total,
        categorias: categorias[0].total,
        pensum: pensum[0].total,
        recursos: recursos[0].total,
        tipo_carrera: tipo_carrera[0].total,
        usuarios: usuarios[0].total,
      };

    } catch (error) {
      // Registra el error en consola para facilitar su depuración
      console.error("Error DashboardModel.getTotales:", error);

      // Lanza nuevamente el error para que sea manejado por el controlador
      throw error;
    }
  },
};

// Exporta el modelo para que pueda ser utilizado desde los controladores
export default DashboardModel;
