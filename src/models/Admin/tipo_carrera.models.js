import getConexion from "../../db/database.js";

const Tipo_carreraModel = {

  // ✅ OBTENER TODOS LOS TIPOS DE CARRERA
  getTipoCarreras: async () => {
    try {
      const conexion = await getConexion();
      const [rows] = await conexion.query("SELECT * FROM tipo_carrera");
      return rows;
    } catch (error) {
      console.error("Error Tipo_carreraModel.getTipoCarreras:", error);
      throw error;
    }
  },

  // ✅ CREAR TIPO DE CARRERA
  postTipoCarreras: async (nombre_tipo_carrera) => {
    try {
      const conexion = await getConexion();
      const [rows] = await conexion.query(
        "INSERT INTO tipo_carrera (nombre_tipo_carrera) VALUES (?)",
        [nombre_tipo_carrera]
      );
      return rows.affectedRows;
    } catch (error) {
      console.error("Error Tipo_carreraModel.postTipoCarreras:", error);
      throw error;
    }
  },

  // ✅ ACTUALIZAR TIPO DE CARRERA
  putTipoCarreras: async (nombre_tipo_carrera, id_tipo_carrera) => {
    try {
      const conexion = await getConexion();
      const [rows] = await conexion.query(
        "UPDATE tipo_carrera SET nombre_tipo_carrera = ? WHERE id_tipo_carrera = ?",
        [nombre_tipo_carrera, id_tipo_carrera]
      );
      return rows.affectedRows;
    } catch (error) {
      console.error("Error Tipo_carreraModel.putTipoCarreras:", error);
      throw error;
    }
  },

  // ✅ ELIMINAR TIPO DE CARRERA
  deleteTipoCarreras: async (id_tipo_carrera) => {
    try {
      const conexion = await getConexion();
      const [rows] = await conexion.query(
        "DELETE FROM tipo_carrera WHERE id_tipo_carrera = ?",
        [id_tipo_carrera]
      );
      return rows.affectedRows;
    } catch (error) {
      console.error("Error Tipo_carreraModel.deleteTipoCarreras:", error);
      throw error;
    }
  },
};

export default Tipo_carreraModel;
