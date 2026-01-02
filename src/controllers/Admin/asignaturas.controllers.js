import AsignaturaModel from "../../models/Admin/asignatura.models.js";

// Obtener todas las asignaturas
const getAsignaturas = async (req, res) => {
  try {
    const asignaturas = await AsignaturaModel.getTodas();
    if (!asignaturas.length) {
      return res.status(404).json({ mensaje: "No se encontraron asignaturas." });
    }
    res.json(asignaturas);
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

// Obtener asignatura por ID
const getAsignaturaPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const asignatura = await AsignaturaModel.getPorId(id);
    if (!asignatura) {
      return res.status(404).json({ mensaje: `No se encontró la asignatura con ID ${id}` });
    }
    res.json(asignatura);
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

// Crear asignaturas (validando duplicados)
const postAsignaturas = async (req, res) => {
  try {
    const resultados = [];

    for (const { nombre_asignatura } of req.body) {
      const existe = await AsignaturaModel.getPorNombre(nombre_asignatura);
      if (existe) {
        resultados.push({ nombre_asignatura, status: "existente" });
        continue;
      }

      await AsignaturaModel.crear(nombre_asignatura);
      resultados.push({ nombre_asignatura, status: "creada" });
    }

    res.status(201).json({
      mensaje: "Proceso de creación completado",
      resultados,
    });
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

// Actualizar asignatura
const putAsignatura = async (req, res) => {
  const { id_asignatura, nombre_asignatura } = req.body;
  try {
    const actualizado = await AsignaturaModel.actualizar({ id_asignatura, nombre_asignatura });
    if (!actualizado) {
      return res.status(404).json({ mensaje: `No se pudo actualizar la asignatura con ID ${id_asignatura}` });
    }
    res.json({ mensaje: `Asignatura actualizada correctamente: ${nombre_asignatura}` });
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

// Eliminar asignatura
const deleteAsignatura = async (req, res) => {
  const { id } = req.params;
  try {
    const eliminado = await AsignaturaModel.eliminar(id);
    if (!eliminado) {
      return res.status(404).json({ mensaje: `No se encontró la asignatura con ID ${id}` });
    }
    res.json({ mensaje: `Asignatura eliminada correctamente: ${id}` });
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

export const AsignaturaController = {
  getAsignaturas,
  getAsignaturaPorId,
  postAsignaturas,
  putAsignatura,
  deleteAsignatura,
};
