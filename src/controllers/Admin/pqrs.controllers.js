// controllers/Admin/pqrs.controllers.js
import PQRSModel from "../../models/Admin/pqrs.models.js";

// Obtener todos los PQRS
const getPQRS = async (req, res) => {
  try {
    const pqrs = await PQRSModel.getTodos();
    if (!pqrs.length) return res.status(404).json({ mensaje: "No se encontraron PQRS" });
    res.json(pqrs);
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

// Obtener PQR por ID
const getPQRSPorId = async (req, res) => {
  const { id_pqr } = req.params;
  try {
    const pqr = await PQRSModel.getPorId(id_pqr);
    if (!pqr) return res.status(404).json({ mensaje: `No se encontró el PQR con ID ${id_pqr}` });
    res.json(pqr);
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

// Eliminar PQR
const deletePQRS = async (req, res) => {
  const { id_pqr } = req.params;
  if (!id_pqr) return res.status(400).json({ mensaje: "El ID del PQR es obligatorio" });

  try {
    const eliminado = await PQRSModel.eliminar(id_pqr);
    if (!eliminado) return res.status(404).json({ mensaje: `No se encontró el PQR con ID ${id_pqr}` });

    res.json({ mensaje: "PQR eliminado correctamente", id_pqr });
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

// Responder PQR
const responderPQRS = async (req, res) => {
  const { id_pqr, respuesta, id_admin } = req.body;

  if (!id_pqr || !respuesta || !id_admin) {
    return res.status(400).json({ mensaje: "Datos incompletos" });
  }

  try {
    const actualizado = await PQRSModel.responder({
      id_pqr,
      respuesta,
      id_admin
    });

    if (!actualizado) {
      return res.status(404).json({ mensaje: "PQR no encontrado" });
    }

    res.json({ mensaje: "PQR respondido correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

// Crear PQRS - VERSIÓN CORREGIDA
const createPQRS = async (req, res) => {
  const { id_usuario, descripcion, id_tipo_pqrs = 1 } = req.body;

  console.log("Datos recibidos para crear PQR:", { id_usuario, descripcion, id_tipo_pqrs });

  if (!id_usuario || !descripcion) {
    return res.status(400).json({ 
      mensaje: "Datos incompletos",
      requeridos: ["id_usuario", "descripcion"]
    });
  }

  // Validar descripción mínima
  if (descripcion.trim().length < 5) {
    return res.status(400).json({ 
      mensaje: "La descripción debe tener al menos 5 caracteres" 
    });
  }

  try {
    const id_pqr = await PQRSModel.crear({ 
      id_usuario: Number(id_usuario), 
      descripcion: descripcion.trim(),
      id_tipo_pqrs: Number(id_tipo_pqrs) || 1
    });
    
    // Obtener el PQR recién creado con su información completa
    const pqrCreado = await PQRSModel.getPorId(id_pqr);
    
    res.status(201).json({
      error: false,
      mensaje: "PQR creado correctamente",
      datos: pqrCreado
    });
  } catch (error) {
    console.error("Error al crear PQR:", error);
    res.status(500).json({ 
      error: true,
      mensaje: `Error al crear el PQR: ${error.message}` 
    });
  }
};

// Obtener PQRS por usuario
const getPQRSPorUsuario = async (req, res) => {
  const { id_usuario } = req.params;

  console.log("Solicitando PQRS para usuario:", id_usuario);

  if (!id_usuario) {
    return res.status(400).json({ 
      error: true,
      mensaje: "El ID del usuario es obligatorio" 
    });
  }

  try {
    const pqrs = await PQRSModel.getPorUsuario(id_usuario);

    console.log("PQRS encontrados:", pqrs);

    if (!pqrs.length) {
      return res.status(200).json([]); // Devolver array vacío en lugar de error 404
    }

    res.json(pqrs);
  } catch (error) {
    console.error("Error en getPQRSPorUsuario:", error);
    res.status(500).json({ 
      error: true,
      mensaje: `Error al obtener PQRS: ${error.message}` 
    });
  }
};

// Obtener tipos de PQRS (opcional)
const getTiposPQRS = async (req, res) => {
  try {
    const tipos = await PQRSModel.getTiposPQRS();
    res.json(tipos);
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

export const PQRSController = {
  getPQRS,
  getPQRSPorId,
  deletePQRS, 
  responderPQRS,
  createPQRS,
  getPQRSPorUsuario,
  getTiposPQRS // Agregar si necesitas esta funcionalidad
};