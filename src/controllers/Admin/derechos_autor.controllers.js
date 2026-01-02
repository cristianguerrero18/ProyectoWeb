import DerechosAutorModel from "../../models/Admin/derechos_autor.models.js";

// Obtener todos
const getTodos = async (req, res) => {
  try {
    const datos = await DerechosAutorModel.getTodos();
    if (!datos.length)
      return res.status(404).json({ mensaje: "No hay registros de derechos de autor" });
    res.json(datos);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

// Obtener por ID
const getPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const dato = await DerechosAutorModel.getPorId(id);
    if (!dato)
      return res.status(404).json({ mensaje: "Registro no encontrado" });
    res.json(dato);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

// Crear
const post = async (req, res) => {
  const {
    id_recurso,
    es_autor_original,
    autor_original,
    fuente_original,
    licencia,
  } = req.body;

  if (!id_recurso)
    return res.status(400).json({ mensaje: "El id_recurso es obligatorio" });

  try {
    await DerechosAutorModel.crear({
      id_recurso,
      es_autor_original,
      autor_original,
      fuente_original,
      licencia,
    });

    res.status(201).json({ mensaje: "Derechos de autor registrados correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

// Actualizar
const put = async (req, res) => {
  const {
    id_derechos_autor,
    es_autor_original,
    autor_original,
    fuente_original,
    licencia,
  } = req.body;

  if (!id_derechos_autor)
    return res.status(400).json({ mensaje: "El ID es obligatorio" });

  try {
    const actualizado = await DerechosAutorModel.actualizar({
      id_derechos_autor,
      es_autor_original,
      autor_original,
      fuente_original,
      licencia,
    });

    if (!actualizado)
      return res.status(404).json({ mensaje: "Registro no encontrado" });

    res.json({ mensaje: "Derechos de autor actualizados correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

// Eliminar
const deleteAutor = async (req, res) => {
  const { id } = req.params;

  try {
    const eliminado = await DerechosAutorModel.eliminar(id);
    if (!eliminado)
      return res.status(404).json({ mensaje: "Registro no encontrado" });

    res.json({ mensaje: "Registro eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

export const DerechosAutorController = {
  getTodos,
  getPorId,
  post,
  put,
  delete: deleteAutor,
};
