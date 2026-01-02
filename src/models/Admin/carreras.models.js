import getConexion from "../../db/database.js";

const conexion = await getConexion();

const CarrerasModel = {
  getTodas: async () => {
    const [rows] = await conexion.query("SELECT * FROM carreras");
    return rows;
  },

  getPorId: async (id_carrera) => {
    const [rows] = await conexion.query(
      "SELECT * FROM carreras WHERE id_carrera = ?",
      [id_carrera]
    );
    return rows[0] || null;
  },

  getPorTipo: async (id_tipo_carrera) => {
    const [rows] = await conexion.query(
      "SELECT nombre_carrera, id_carrera FROM carreras WHERE id_tipo_carrera = ?",
      [id_tipo_carrera]
    );
    return rows;
  },

  getPorNombre: async (nombre_carrera) => {
    const [rows] = await conexion.query(
      "SELECT * FROM carreras WHERE nombre_carrera = ?",
      [nombre_carrera]
    );
    return rows[0] || null;
  },

  crear: async ({ nombre_carrera, id_tipo_carrera, Descripcion }) => {
    const [result] = await conexion.query(
      "INSERT INTO carreras (nombre_carrera, id_tipo_carrera, Descripcion) VALUES (?, ?, ?)",
      [nombre_carrera, id_tipo_carrera, Descripcion]
    );
    return result.affectedRows;
  },

  actualizar: async ({ id_carrera, nombre_carrera, id_tipo_carrera, Descripcion }) => {
    const [result] = await conexion.query(
      "UPDATE carreras SET nombre_carrera = ?, id_tipo_carrera = ?, Descripcion = ? WHERE id_carrera = ?",
      [nombre_carrera, id_tipo_carrera, Descripcion, id_carrera]
    );
    return result.affectedRows;
  },

  eliminar: async (id_carrera) => {
    const [result] = await conexion.query(
      "DELETE FROM carreras WHERE id_carrera = ?",
      [id_carrera]
    );
    return result.affectedRows;
  }, 
};

export default CarrerasModel;
