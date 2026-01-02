import getConexion from "../../db/database.js";

const conexion = await getConexion();

const CategoriaRecursoModel = {
  getTodos: async () => {
    const [rows] = await conexion.query("SELECT * FROM categorias");
    return rows;
  },

  getPorId: async (id_categoria) => {
    const [rows] = await conexion.query(
      "SELECT * FROM categorias WHERE id_categoria = ?",
      [id_categoria]
    );
    return rows[0] || null;
  },

  crear: async ({ id_categoria, nombre_categoria }) => {
    const [result] = await conexion.query(
      "INSERT INTO categorias (id_categoria,nombre_categoria) VALUES (?,?)",
      [id_categoria,nombre_categoria]
    );
    return result.affectedRows;
  },

  actualizar: async ({ nombre_categoria , id_categoria}) => {
    const [result] = await conexion.query(
      "UPDATE categorias SET nombre_categoria = ? WHERE id_categoria = ? ",
      [nombre_categoria,id_categoria]
    );
    return result.affectedRows;
  },

  eliminar: async (id_categoria) => {
    const [result] = await conexion.query(
      "DELETE FROM categorias WHERE id_categoria = ?",
      [id_categoria]
    );
    return result.affectedRows;
  },
};

export default CategoriaRecursoModel;
