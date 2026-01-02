import Tipo_carreraModel from "../../models/Admin/tipo_carrera.models.js";

/* ===========================
   OBTENER TODOS
=========================== */
const getTipo_carrera = async (req, res) => {
  try {
    const result = await Tipo_carreraModel.getTipoCarreras();

    if (!result.length) {
      return res.status(404).json({ mensaje: "No se encontraron tipos de carrera" });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error getTipo_carrera:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

/* ===========================
   INSERTAR
=========================== */
const postTipo_carrera = async (req, res) => {
  const { nombre_tipo_carrera } = req.body;

  if (!nombre_tipo_carrera) {
    return res.status(400).json({ mensaje: "El nombre es obligatorio" });
  }

  try {
    const result = await Tipo_carreraModel.postTipoCarreras(nombre_tipo_carrera);

    if (!result) {
      return res.status(500).json({ mensaje: "No se pudo agregar el tipo de carrera" });
    }

    res.status(201).json({
      mensaje: `Tipo de carrera agregado correctamente`,
      nombre_tipo_carrera
    });

  } catch (error) {
    console.error("Error postTipo_carrera:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

/* ===========================
   ACTUALIZAR
=========================== */
const putTipo_carrera = async (req, res) => {
  const { nombre_tipo_carrera, id_tipo_carrera } = req.body;

  if (!nombre_tipo_carrera || !id_tipo_carrera) {
    return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
  }

  try {
    const result = await Tipo_carreraModel.putTipoCarreras(
      nombre_tipo_carrera,
      id_tipo_carrera
    );

    if (!result) {
      return res.status(404).json({ mensaje: "Tipo de carrera no encontrado" });
    }

    res.status(200).json({
      mensaje: "Tipo de carrera actualizado correctamente",
      id_tipo_carrera
    });

  } catch (error) {
    console.error("Error putTipo_carrera:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

/* ===========================
   ELIMINAR
=========================== */
const deleteTipo_carreras = async (req, res) => {
  const { id_tipo_carrera } = req.params;

  if (!id_tipo_carrera) {
    return res.status(400).json({ mensaje: "El ID es obligatorio" });
  }

  try {
    const result = await Tipo_carreraModel.deleteTipoCarreras(id_tipo_carrera);

    if (!result) {
      return res.status(404).json({
        mensaje: `No se encontró el tipo de carrera con ID ${id_tipo_carrera}`
      });
    }

    res.status(200).json({
      mensaje: `Tipo de carrera eliminado correctamente`,
      id_tipo_carrera
    });

  } catch (error) {
    console.error("Error deleteTipo_carrera:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

/* ===========================
   EXPORTACIONES
=========================== */
export const method = {
  getTipo_carrera,
  postTipo_carrera,
  putTipo_carrera,
  deleteTipo_carreras
};
