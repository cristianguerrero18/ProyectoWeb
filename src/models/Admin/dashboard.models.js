import getConexion from "../../db/database.js";

const DashboardModel = {

  /* ===========================
     CONTADORES GENERALES
  =========================== */
  getTotales: async () => {
    try {
      const conexion = await getConexion();

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
      console.error("Error DashboardModel.getTotales:", error);
      throw error;
    }
  },
};

export default DashboardModel;
