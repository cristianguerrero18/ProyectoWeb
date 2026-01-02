import CarrerasModel from "../../models/Admin/carreras.models.js";

// Obtener todas las carreras
const getCarreras = async (req, res) => {
  try {
    const carreras = await CarrerasModel.getTodas();
    if (!carreras.length) {
      return res.status(404).json({ mensaje: "No se encontraron carreras." });
    }
    res.json(carreras);
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

// Obtener carrera por ID
const getCarreraPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const carrera = await CarrerasModel.getPorId(id);
    if (!carrera) {
      return res.status(404).json({ mensaje: `No se encontró la carrera con ID ${id}` });
    }
    res.json(carrera);
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

// Obtener carreras por tipo
const getCarrerasPorTipo = async (req, res) => {
  const { id_tipo_carrera } = req.params;
  try {
    const carreras = await CarrerasModel.getPorTipo(id_tipo_carrera);
    if (!carreras.length) {
      return res.status(404).json({ mensaje: "No se encontraron carreras para este tipo." });
    }
    res.json(carreras);
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

// Crear carreras (validando duplicados)
const postCarreras = async (req, res) => {
  try {
    const resultados = [];

    for (const carrera of req.body) {
      const existe = await CarrerasModel.getPorNombre(carrera.nombre_carrera);
      if (existe) {
        resultados.push({ nombre_carrera: carrera.nombre_carrera, status: "existente" });
        continue;
      }

      await CarrerasModel.crear(carrera);
      resultados.push({ nombre_carrera: carrera.nombre_carrera, status: "creada" });
    }

    res.status(201).json({
      mensaje: "Proceso de creación completado",
      resultados,
    });
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

// Actualizar carrera
const putCarrera = async (req, res) => {
  const { id_carrera, nombre_carrera, id_tipo_carrera, Descripcion } = req.body;
  try {
    const actualizado = await CarrerasModel.actualizar({ id_carrera, nombre_carrera, id_tipo_carrera, Descripcion });
    if (!actualizado) {
      return res.status(404).json({ mensaje: `No se pudo actualizar la carrera con ID ${id_carrera}` });
    }
    res.json({ mensaje: `Carrera actualizada correctamente: ${nombre_carrera}` });
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

// Eliminar carrera
const deleteCarrera = async (req, res) => {
  const { id } = req.params;
  try {
    const eliminado = await CarrerasModel.eliminar(id);
    if (!eliminado) {
      return res.status(404).json({ mensaje: `No se encontró la carrera con ID ${id}` });
    }
    res.json({ mensaje: `Carrera eliminada correctamente: ${id}` });
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

export const CarrerasController = {
  getCarreras,
  getCarreraPorId,
  getCarrerasPorTipo,
  postCarreras,
  putCarrera,
  deleteCarrera,
};
