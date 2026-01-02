import ReporteModel from "../../models/Admin/reportes.models.js";

// Obtener todos los reportes
const getReportes = async (req, res) => {
  try {
    const reportes = await ReporteModel.getTodos();
    if (!reportes.length) {
      return res.status(404).json({ mensaje: "No se encontraron reportes" });
    }
    res.json(reportes);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

// Obtener reporte por ID
const getReportePorId = async (req, res) => {
  const { id_reporte } = req.params;

  try {
    const reporte = await ReporteModel.getPorId(id_reporte);
    if (!reporte) {
      return res.status(404).json({
        mensaje: `No se encontró el reporte con ID ${id_reporte}`,
      });
    }
    res.json(reporte);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

// ✅ Obtener reporte completo (reporte + recurso + usuario)
const getReporteCompleto = async (req, res) => {
  const { id_reporte } = req.params;

  try {
    const reporte = await ReporteModel.getReporteCompleto(id_reporte);
    if (!reporte) {
      return res.status(404).json({
        mensaje: `No se encontró el reporte con ID ${id_reporte}`,
      });
    }
    res.json(reporte);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

// Obtener reportes por recurso
const getReportePorRecurso = async (req, res) => {
  const { id_recurso } = req.params;

  try {
    const reportes = await ReporteModel.getPorRecurso(id_recurso);
    if (!reportes.length) {
      return res.status(404).json({
        mensaje: `No hay reportes para el recurso ${id_recurso}`,
      });
    }
    res.json(reportes);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

// Crear reporte
const postReporte = async (req, res) => {
  const { id_recurso, motivo } = req.body;

  if (!id_recurso || !motivo) {
    return res.status(400).json({
      mensaje: "id_recurso y motivo son obligatorios",
    });
  }

  try {
    await ReporteModel.crear({ id_recurso, motivo });
    res.status(201).json({ mensaje: "Reporte creado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

// Eliminar reporte
const deleteReporte = async (req, res) => {
  const { id_reporte } = req.params;

  try {
    const eliminado = await ReporteModel.eliminar(id_reporte);
    if (!eliminado) {
      return res.status(404).json({
        mensaje: `No se encontró el reporte con ID ${id_reporte}`,
      });
    }

    res.json({
      mensaje: "Reporte eliminado correctamente",
      id_reporte,
    });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

export const ReporteController = {
  getReportes,
  getReportePorId,
  getReporteCompleto, // 👈 agregado
  getReportePorRecurso,
  postReporte,
  deleteReporte,
};
