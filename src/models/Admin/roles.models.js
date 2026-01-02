import getConexion from "../../db/database.js";

const RolesModel = {
  // Obtener todos los roles
  getTodos: async () => {
    try {
      const conexion = await getConexion();
      const [rows] = await conexion.query("SELECT * FROM roles");
      return rows;
    } catch (error) {
      console.error("Error RolesModel.getTodos:", error);
      throw error;
    }
  },

  // Obtener rol por ID
  getPorId: async (id_rol) => {
    try {
      const conexion = await getConexion();
      const [rows] = await conexion.query("SELECT * FROM roles WHERE id_rol = ?", [id_rol]);
      return rows[0] || null;
    } catch (error) {
      console.error("Error RolesModel.getPorId:", error);
      throw error;
    }
  },

  // Buscar rol por nombre
  getPorNombre: async (nombre_rol) => {
    try {
      const conexion = await getConexion();
      const [rows] = await conexion.query("SELECT * FROM roles WHERE nombre_rol = ?", [nombre_rol]);
      return rows[0] || null;
    } catch (error) {
      console.error("Error RolesModel.getPorNombre:", error);
      throw error;
    }
  },

  // Crear rol
  crear: async ({ nombre_rol, descripcion }) => {
    try {
      const conexion = await getConexion();
      const [result] = await conexion.query(
        "INSERT INTO roles (nombre_rol, descripcion) VALUES (?, ?)",
        [nombre_rol, descripcion]
      );
      return result.affectedRows;
    } catch (error) {
      console.error("Error RolesModel.crear:", error);
      throw error;
    }
  },

  // Actualizar rol
  actualizar: async ({ id_rol, nombre_rol, descripcion }) => {
    try {
      const conexion = await getConexion();
      const [result] = await conexion.query(
        "UPDATE roles SET nombre_rol = ?, descripcion = ? WHERE id_rol = ?",
        [nombre_rol, descripcion, id_rol]
      );
      return result.affectedRows;
    } catch (error) {
      console.error("Error RolesModel.actualizar:", error);
      throw error;
    }
  },

  // Eliminar rol
  eliminar: async (id_rol) => {
    try {
      const conexion = await getConexion();
      const [result] = await conexion.query("DELETE FROM roles WHERE id_rol = ?", [id_rol]);
      return result.affectedRows;
    } catch (error) {
      console.error("Error RolesModel.eliminar:", error);
      throw error;
    }
  },
};

export default RolesModel;
