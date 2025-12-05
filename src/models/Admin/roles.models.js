import getConexion from "../../db/database.js";

const Rolesmodel = {

  // ✅ OBTENER TODOS LOS ROLES
  getAll: async () => {
    try {
      const conexion = await getConexion();
      const [rows] = await conexion.query("SELECT * FROM roles");
      return rows;
    } catch (error) {
      console.error("Error Rolesmodel.getAll:", error);
      throw error;
    }
  },

  // ✅ CREAR ROL
  postRoles: async ({ nombre_rol, descripcion }) => {
    try {
      const conexion = await getConexion();
      const [rows] = await conexion.query(
        "INSERT INTO roles (nombre_rol, descripcion) VALUES (?, ?)",
        [nombre_rol, descripcion]
      );
      return rows.affectedRows;
    } catch (error) {
      console.error("Error Rolesmodel.postRoles:", error);
      throw error;
    }
  },

  // ✅ ACTUALIZAR ROL
  putRoles: async ({ nombre_rol, descripcion, id_rol }) => {
    try {
      const conexion = await getConexion();
      const [rows] = await conexion.query(
        "UPDATE roles SET nombre_rol = ?, descripcion = ? WHERE id_rol = ?",
        [nombre_rol, descripcion, id_rol]
      );
      return rows.affectedRows;
    } catch (error) {
      console.error("Error Rolesmodel.putRoles:", error);
      throw error;
    }
  },

  // ✅ ELIMINAR ROL
  deleteRoles: async (id_rol) => {
    try {
      const conexion = await getConexion();
      const [rows] = await conexion.query(
        "DELETE FROM roles WHERE id_rol = ?",
        [id_rol]
      );
      return rows.affectedRows;
    } catch (error) {
      console.error("Error Rolesmodel.deleteRoles:", error);
      throw error;
    }
  },
};

export default Rolesmodel;
