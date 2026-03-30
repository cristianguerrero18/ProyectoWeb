import NotificacionesModel from "../../models/Admin/notificaciones.models.js";

// Validación simple de enteros
const esIdValido = (valor) => {
  const numero = Number(valor);
  return Number.isInteger(numero) && numero > 0;
};

// Obtener todas las notificaciones
const getNotificaciones = async (req, res) => {
  console.log("🔔 GET /api/notificaciones - Solicitando notificaciones...");

  try {
    const notificaciones = await NotificacionesModel.getTodos();

    return res.status(200).json({
      ok: true,
      total: notificaciones.length,
      data: notificaciones,
      mensaje: "Notificaciones obtenidas correctamente",
    });
  } catch (error) {
    console.error("❌ Error en getNotificaciones:", error.message);
    return res.status(500).json({
      ok: false,
      mensaje: `Error en la API: ${error.message}`,
    });
  }
};

// Obtener notificaciones por usuario
const getNotificacionesPorUsuario = async (req, res) => {
  const { id_usuario } = req.params;

  if (!esIdValido(id_usuario)) {
    return res.status(400).json({
      ok: false,
      mensaje: "El id_usuario debe ser un número entero válido",
    });
  }

  try {
    const notificaciones = await NotificacionesModel.getPorUsuario(Number(id_usuario));

    return res.status(200).json({
      ok: true,
      total: notificaciones.length,
      data: notificaciones,
      mensaje:
        notificaciones.length > 0
          ? "Notificaciones del usuario obtenidas correctamente"
          : "El usuario no tiene notificaciones",
    });
  } catch (error) {
    console.error("❌ Error en getNotificacionesPorUsuario:", error.message);
    return res.status(500).json({
      ok: false,
      mensaje: `Error en la API: ${error.message}`,
    });
  }
};

// Contar no leídas
const getCantidadNoLeidas = async (req, res) => {
  const { id_usuario } = req.params;

  if (!esIdValido(id_usuario)) {
    return res.status(400).json({
      ok: false,
      mensaje: "El id_usuario debe ser un número entero válido",
    });
  }

  try {
    const total = await NotificacionesModel.contarNoLeidas(Number(id_usuario));

    return res.status(200).json({
      ok: true,
      id_usuario: Number(id_usuario),
      no_leidas: total,
      mensaje: "Cantidad de notificaciones no leídas obtenida correctamente",
    });
  } catch (error) {
    console.error("❌ Error en getCantidadNoLeidas:", error.message);
    return res.status(500).json({
      ok: false,
      mensaje: `Error en la API: ${error.message}`,
    });
  }
};

// Crear notificación
const createNotificacion = async (req, res) => {
  const { id_usuario, titulo, mensaje, tipo, estado } = req.body;

  if (!esIdValido(id_usuario)) {
    return res.status(400).json({
      ok: false,
      mensaje: "El id_usuario es obligatorio y debe ser válido",
    });
  }

  if (!titulo || !mensaje) {
    return res.status(400).json({
      ok: false,
      mensaje: "Los campos titulo y mensaje son obligatorios",
    });
  }

  try {
    const id_notificacion = await NotificacionesModel.crear({
      id_usuario: Number(id_usuario),
      titulo: titulo.trim(),
      mensaje: mensaje.trim(),
      tipo: tipo?.trim() || "general",
      estado: estado?.trim() || "no_visto",
    });

    return res.status(201).json({
      ok: true,
      id_notificacion,
      mensaje: "Notificación creada correctamente",
    });
  } catch (error) {
    console.error("❌ Error en createNotificacion:", error.message);
    return res.status(500).json({
      ok: false,
      mensaje: `Error en la API: ${error.message}`,
    });
  }
};

// Marcar una notificación como vista
const updateEstadoVisto = async (req, res) => {
  const { id_notificacion } = req.params;

  if (!esIdValido(id_notificacion)) {
    return res.status(400).json({
      ok: false,
      mensaje: "El ID de la notificación es obligatorio y debe ser válido",
    });
  }

  try {
    const actualizado = await NotificacionesModel.marcarComoVisto(Number(id_notificacion));

    if (!actualizado) {
      return res.status(404).json({
        ok: false,
        mensaje: "Notificación no encontrada",
      });
    }

    return res.status(200).json({
      ok: true,
      mensaje: "Notificación marcada como vista",
    });
  } catch (error) {
    console.error("❌ Error en updateEstadoVisto:", error.message);
    return res.status(500).json({
      ok: false,
      mensaje: `Error en la API: ${error.message}`,
    });
  }
};

// Marcar todas las notificaciones de un usuario como vistas
const updateTodasVistas = async (req, res) => {
  const { id_usuario } = req.params;

  if (!esIdValido(id_usuario)) {
    return res.status(400).json({
      ok: false,
      mensaje: "El id_usuario debe ser un número entero válido",
    });
  }

  try {
    const actualizadas = await NotificacionesModel.marcarTodasComoVistas(Number(id_usuario));

    return res.status(200).json({
      ok: true,
      actualizadas,
      mensaje:
        actualizadas > 0
          ? "Todas las notificaciones se marcaron como vistas"
          : "No había notificaciones pendientes por marcar",
    });
  } catch (error) {
    console.error("❌ Error en updateTodasVistas:", error.message);
    return res.status(500).json({
      ok: false,
      mensaje: `Error en la API: ${error.message}`,
    });
  }
};

// Eliminar notificación
const deleteNotify = async (req, res) => {
  const { id_notificacion } = req.params;

  if (!esIdValido(id_notificacion)) {
    return res.status(400).json({
      ok: false,
      mensaje: "El ID de la notificación es obligatorio y debe ser válido",
    });
  }

  try {
    const eliminado = await NotificacionesModel.eliminar(Number(id_notificacion));

    if (!eliminado) {
      return res.status(404).json({
        ok: false,
        mensaje: `No se encontró la notificación con ID ${id_notificacion}`,
      });
    }

    return res.status(200).json({
      ok: true,
      id_notificacion: Number(id_notificacion),
      mensaje: "Notificación eliminada correctamente",
    });
  } catch (error) {
    console.error("❌ Error en deleteNotify:", error.message);
    return res.status(500).json({
      ok: false,
      mensaje: `Error en la API: ${error.message}`,
    });
  }
};

export const NotifyController = {
  getNotificaciones,
  getNotificacionesPorUsuario,
  getCantidadNoLeidas,
  createNotificacion,
  updateEstadoVisto,
  updateTodasVistas,
  deleteNotify,
};