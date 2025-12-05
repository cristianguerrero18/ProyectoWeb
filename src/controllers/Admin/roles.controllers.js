import Rolesmodel from "../../models/Admin/roles.models.js";

// ✅ OBTENER TODOS LOS ROLES
const getRoles = async (req, res) => {
  try {
    const result = await Rolesmodel.getAll();

    if (!result || result.length === 0) {
      return res.status(404).json({ mensaje: "No se encontraron roles" });
    }

    res.status(200).json(result);

  } catch (error) {
    console.error("Error getRoles:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

// ✅ CREAR ROL
const postRoles = async (req, res) => {
  const { nombre_rol, descripcion } = req.body;

  if (!nombre_rol) {
    return res.status(400).json({ mensaje: "El nombre del rol es obligatorio" });
  }

  try {
    const result = await Rolesmodel.postRoles({ nombre_rol, descripcion });

    if (result === 0) {
      return res.status(500).json({ mensaje: "No se pudo agregar el rol" });
    }

    res.status(201).json({
      mensaje: "Rol agregado correctamente",
      nombre_rol,
    });

  } catch (error) {
    console.error("Error postRoles:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

// ✅ ACTUALIZAR ROL
const putRoles = async (req, res) => {
  const { nombre_rol, descripcion, id_rol } = req.body;

  if (!id_rol || !nombre_rol) {
    return res.status(400).json({
      mensaje: "El id_rol y el nombre del rol son obligatorios",
    });
  }

  try {
    const result = await Rolesmodel.putRoles({
      nombre_rol,
      descripcion,
      id_rol,
    });

    if (result === 0) {
      return res.status(404).json({
        mensaje: `No se encontró el rol con id ${id_rol}`,
      });
    }

    res.status(200).json({
      mensaje: "Rol actualizado correctamente",
      id_rol,
    });

  } catch (error) {
    console.error("Error putRoles:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

// ✅ ELIMINAR ROL
const deleteRoles = async (req, res) => {
  const { id_rol } = req.params;

  if (!id_rol) {
    return res.status(400).json({ mensaje: "El id_rol es obligatorio" });
  }

  try {
    const result = await Rolesmodel.deleteRoles(id_rol);

    if (result === 0) {
      return res.status(404).json({
        mensaje: `No se encontró el rol con id ${id_rol}`,
      });
    }

    res.status(200).json({
      mensaje: "Rol eliminado correctamente",
      id_rol,
    });

  } catch (error) {
    console.error("Error deleteRoles:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

// ✅ EXPORTACIÓN LIMPIA
export const method = {
  getRoles,
  postRoles,
  putRoles,
  deleteRoles,
};
