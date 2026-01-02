import NotificacionesModel from "../../models/Admin/notificaciones.models.js";

// 
const getNotificaciones = async (req, res) => {
  console.log("🔔 GET /api/notificaciones - Solicitando notificaciones...");
  try {
    const notity = await NotificacionesModel.getTodos();
    console.log(`📊 Notificaciones obtenidas: ${notity ? notity.length : 0}`);
    
    if (!notity || !notity.length) {
      console.log("⚠️ No se encontraron notificaciones en la BD");
      return res.status(404).json({ 
        mensaje: "No se encontraron notificaciones",
        error: false 
      });
    }
    
    console.log("✅ Enviando notificaciones al frontend");
    res.json(notity);
  } catch (error) {
    console.error("❌ Error en getNotificaciones:", error.message);
    res.status(500).json({ 
      mensaje: `Error en la API: ${error.message}`,
      error: true 
    });
  }
};
// 
const getNotifyPorId = async (req, res) => {
  const { id_usuario } = req.params;
  try {
    const notity = await NotificacionesModel.getPorId(id_usuario);
    if (!notity) return res.status(404).json({ mensaje: `No se encontraron notificaciones del usuario con ID ${id_usuario}` });
    res.json(notity);
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

const deleteNotify = async (req, res) => {
  const { id_notificacion } = req.params;
  if (!id_notificacion) return res.status(400).json({ mensaje: "El ID del rol es obligatorio" });

  try {
    const eliminado = await NotificacionesModel.eliminar(id_notificacion);
    if (!eliminado) return res.status(404).json({ mensaje: `No se encontró la notificacion con ID ${id_notificacion}` });

    res.json({ mensaje: "Notificacion eliminada correctamente", id });
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

// controllers/Admin/notificaciones.controller.js

const updateEstadoVisto = async (req, res) => {
  const { id_notificacion } = req.params;

  if (!id_notificacion) {
    return res.status(400).json({ mensaje: "El ID de la notificación es obligatorio" });
  }

  try {
    const actualizado = await NotificacionesModel.marcarComoVisto(id_notificacion);

    if (!actualizado) {
      return res.status(404).json({ mensaje: "Notificación no encontrada" });
    }

    res.json({ mensaje: "Notificación marcada como vista" });
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};


export const NotifyController = {
  getNotificaciones,
  getNotifyPorId,
  deleteNotify,
  updateEstadoVisto
};
