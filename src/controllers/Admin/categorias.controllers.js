import CategoriaModel from "../../models/Admin/categorias.models.js";

// Obtener todos los registros de las categorias
const getCategoria = async (req, res) => {
  try {
    const categoria = await CategoriaModel.getTodos();
    if (!categoria.length) {
      return res.status(404).json({ mensaje: "No se encontraron registros de las categorias." });
    }
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

// Obtener un registro por ID
const getCategoriaPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const registro = await CategoriaModel.getPorId(id);
    if (!registro) {
      return res.status(404).json({ mensaje: `No se encontró el registro con ID ${id}` });
    }
    res.json(registro);
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

// Crear registros de las categorias
const postCategoria = async (req, res) => {
    try {
      const categorias = Array.isArray(req.body) ? req.body : [req.body];
      const resultados = [];
  
      for (const item of categorias) {
        await CategoriaModel.crear(item);
        resultados.push({ ...item, status: "creado" });
      }
  
      res.status(201).json({
        mensaje: "Registros de las categorías agregados correctamente",
        resultados,
      });
    } catch (error) {
      res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
    }
  };
  

// Actualizar un registro de la categoria
const putCateogoria = async (req, res) => {
  const { id_categoria, nombre_categoria } = req.body;
  try {
    const actualizado = await CategoriaModel.actualizar({ id_categoria,nombre_categoria });
    if (!actualizado) {
      return res.status(404).json({ mensaje: `No se pudo actualizar el registro con ID ${id_categoria}` });
    }
    res.json({ mensaje: "Registro actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

// Eliminar un registro del pensum
const deleteCategorias = async (req, res) => {
  const { id } = req.params;
  try {
    const eliminado = await CategoriaModel.eliminar(id);
    if (!eliminado) {
      return res.status(404).json({ mensaje: `No se encontró el registro con ID ${id}` });
    }
    res.json({ mensaje: "Registro eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

export const CategoriaController = {
  getCategoria,
  getCategoriaPorId,
  postCategoria,
  putCateogoria,
  deleteCategorias
};
