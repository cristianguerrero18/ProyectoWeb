import RolesModel from "../../models/Admin/roles.models.js";

// Obtener todos los roles
const getRoles = async (req, res) => {
  try {
    const roles = await RolesModel.getTodos();
    if (!roles.length) return res.status(404).json({ mensaje: "No se encontraron roles" });
    res.json(roles);
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

// Obtener rol por ID
const getRolPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const rol = await RolesModel.getPorId(id);
    if (!rol) return res.status(404).json({ mensaje: `No se encontró el rol con ID ${id}` });
    res.json(rol);
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

// Crear rol (validando duplicados)
const postRoles = async (req, res) => {
  const { nombre_rol, descripcion } = req.body;
  if (!nombre_rol) return res.status(400).json({ mensaje: "El nombre del rol es obligatorio" });

  try {
    const existe = await RolesModel.getPorNombre(nombre_rol);
    if (existe) return res.status(409).json({ mensaje: "El rol ya existe" });

    await RolesModel.crear({ nombre_rol, descripcion });
    res.status(201).json({ mensaje: "Rol agregado correctamente", nombre_rol });
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

// Actualizar rol
const putRoles = async (req, res) => {
  const { id_rol, nombre_rol, descripcion } = req.body;
  if (!id_rol || !nombre_rol) return res.status(400).json({ mensaje: "ID y nombre del rol son obligatorios" });

  try {
    const actualizado = await RolesModel.actualizar({ id_rol, nombre_rol, descripcion });
    if (!actualizado) return res.status(404).json({ mensaje: `No se encontró el rol con ID ${id_rol}` });

    res.json({ mensaje: "Rol actualizado correctamente", id_rol });
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

// Eliminar rol
const deleteRoles = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ mensaje: "El ID del rol es obligatorio" });

  try {
    const eliminado = await RolesModel.eliminar(id);
    if (!eliminado) return res.status(404).json({ mensaje: `No se encontró el rol con ID ${id}` });

    res.json({ mensaje: "Rol eliminado correctamente", id });
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

export const RolesController = {
  getRoles,
  getRolPorId,
  postRoles,
  putRoles,
  deleteRoles,
};
