import PQRSModel from "../../models/Admin/pqrs.models.js";

// Obtener todos los roles
const getPQRS = async (req, res) => {
  try {
    const pqrs = await PQRSModel.getTodos();
    if (!pqrs.length) return res.status(404).json({ mensaje: "No se encontraron pqrs" });
    res.json(pqrs);
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

// Obtener rol por ID
const getPQRSPorId = async (req, res) => {
  const { id_pqr } = req.params;
  try {
    const pqrs = await PQRSModel.getPorId(id_pqr);
    if (!pqrs) return res.status(404).json({ mensaje: `No se encontró el rol con ID ${id_pqr}` });
    res.json(pqrs);
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

// Eliminar rol
const deletePQRS = async (req, res) => {
  const { id_pqr } = req.params;
  if (!id_pqr) return res.status(400).json({ mensaje: "El ID del pqr es obligatorio" });

  try {
    const eliminado = await PQRSModel.eliminar(id_pqr);
    if (!eliminado) return res.status(404).json({ mensaje: `No se encontró el pqrs con ID ${id_pqr}` });

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


export const PQRSController = {
  getPQRS,
  getPQRSPorId,
  deletePQRS, 
  responderPQRS
};
