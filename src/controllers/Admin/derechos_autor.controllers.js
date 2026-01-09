import DerechosAutorModel from "../../models/Admin/derechos_autor.models.js";

// ======================
// Obtener todos (admin)
// ======================
const getTodos = async (req, res) => {
  try {
    const datos = await DerechosAutorModel.getTodos();
    res.json(datos);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

// ======================
// Obtener por ID
// ======================
const getPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const dato = await DerechosAutorModel.getPorId(id);

    if (!dato)
      return res.status(404).json({ mensaje: "Registro no encontrado" });

    res.json(dato);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

// ======================
// Crear declaración
// ======================
const post = async (req, res) => {
  try {
    let { id_recurso, compromiso } = req.body;
    const id_usuario = req.usuario.id_usuario; // desde token

    id_recurso = Number(id_recurso);
    compromiso = Boolean(compromiso);

    if (!id_recurso)
      return res.status(400).json({ mensaje: "id_recurso es obligatorio" });

    const existe = await DerechosAutorModel.existe(id_usuario, id_recurso);
    if (existe)
      return res.status(409).json({ mensaje: "Ya existe una declaración para este recurso" });

    await DerechosAutorModel.crear({
      id_usuario,
      id_recurso,
      compromiso,
    });

    res.status(201).json({ mensaje: "Declaración registrada correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

// ======================
// Eliminar (admin)
// ======================
const eliminar = async (req, res) => {
  try {
    const { id } = req.params;
    const eliminado = await DerechosAutorModel.eliminar(id);

    if (!eliminado)
      return res.status(404).json({ mensaje: "Registro no encontrado" });

    res.json({ mensaje: "Declaración eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

export const DerechosAutorController = {
  getTodos,
  getPorId,
  post,
  eliminar,
};