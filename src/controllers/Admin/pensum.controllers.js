import PensumModel from "../../models/Admin/pensum.models.js";

/* ===========================
   OBTENER TODOS LOS REGISTROS
=========================== */
const getPensum = async (req, res) => {
  try {
    const pensum = await PensumModel.getTodos();

    if (!pensum.length) {
      return res.status(404).json({
        mensaje: "No se encontraron registros del pensum.",
      });
    }

    res.status(200).json(pensum);
  } catch (error) {
    res.status(500).json({
      mensaje: `Error en la API: ${error.message}`,
    });
  }
};

/* ===========================
   OBTENER REGISTRO POR ID
=========================== */
const getPensumPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const registro = await PensumModel.getPorId(id);

    if (!registro) {
      return res.status(404).json({
        mensaje: `No se encontró el registro con ID ${id}`,
      });
    }

    res.status(200).json(registro);
  } catch (error) {
    res.status(500).json({
      mensaje: `Error en la API: ${error.message}`,
    });
  }
};

/* ===========================
   OBTENER ASIGNATURAS POR CARRERA
=========================== */
const getAsignaturasPorCarrera = async (req, res) => {
  const { id_carrera } = req.params;

  if (!id_carrera) {
    return res.status(400).json({
      mensaje: "El id_carrera es obligatorio",
    });
  }

  try {
    const asignaturas = await PensumModel.getAsignaturasPorCarrera(id_carrera);

    if (!asignaturas.length) {
      return res.status(404).json({
        mensaje: "No hay asignaturas para esta carrera",
      });
    }

    res.status(200).json(asignaturas);
  } catch (error) {
    console.error("Error getAsignaturasPorCarrera:", error);
    res.status(500).json({
      mensaje: "Error interno del servidor",
    });
  }
};

/* ===========================
   CREAR REGISTROS DEL PENSUM
=========================== */
const postPensum = async (req, res) => {
  try {
    const resultados = [];

    for (const item of req.body) {
      await PensumModel.crear(item);
      resultados.push({ ...item, status: "creado" });
    }

    res.status(201).json({
      mensaje: "Registros del pensum agregados correctamente",
      resultados,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: `Error en la API: ${error.message}`,
    });
  }
};

/* ===========================
   ACTUALIZAR REGISTRO
=========================== */
const putPensum = async (req, res) => {
  const { id_pensum, id_carrera, numero_semestre, id_asignatura } = req.body;

  try {
    const actualizado = await PensumModel.actualizar({
      id_pensum,
      id_carrera,
      numero_semestre,
      id_asignatura,
    });

    if (!actualizado) {
      return res.status(404).json({
        mensaje: `No se pudo actualizar el registro con ID ${id_pensum}`,
      });
    }

    res.status(200).json({
      mensaje: "Registro actualizado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      mensaje: `Error en la API: ${error.message}`,
    });
  }
};

/* ===========================
   ELIMINAR REGISTRO
=========================== */
const deletePensum = async (req, res) => {
  const { id } = req.params;

  try {
    const eliminado = await PensumModel.eliminar(id);

    if (!eliminado) {
      return res.status(404).json({
        mensaje: `No se encontró el registro con ID ${id}`,
      });
    }

    res.status(200).json({
      mensaje: "Registro eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      mensaje: `Error en la API: ${error.message}`,
    });
  }
};

export const getNombresAsignaturasPorCarrera = async (req, res) => {
  try {
    const { id_carrera } = req.params;

    if (!id_carrera) {
      return res.status(400).json({ message: "ID de carrera requerido" });
    }

    const asignaturas = await PensumModel.getNombresAsignaturasPorCarrera(id_carrera);

    res.status(200).json(asignaturas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

/* ===========================
   EXPORTACIÓN
=========================== */
export const PensumController = {
  getPensum,
  getPensumPorId,
  getAsignaturasPorCarrera, // 👈 NUEVO
  postPensum,
  putPensum,
  deletePensum,
  getNombresAsignaturasPorCarrera
};
