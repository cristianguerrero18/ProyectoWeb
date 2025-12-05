import UsuarioModel from "../../models/Admin/users.models.js";
import VerificacionModel from "../../models/auth/verification.models.js";
import { enviarEmail } from "../../helpers/email.js";
import getConexion from "../../db/database.js";
import jwt from "jsonwebtoken";
import config from "../../config.js";

/* ===========================
   UTILIDAD
=========================== */
const generarCodigo = () =>
  String(Math.floor(100000 + Math.random() * 900000));

/* ===========================
   OBTENER USUARIOS
=========================== */
const getUsuarios = async (req, res) => {
  try {
    const result = await UsuarioModel.getAll();

    if (!result.length) {
      return res.status(404).json({ mensaje: "No hay usuarios registrados" });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error getUsuarios:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

/* ===========================
   REGISTRO DE USUARIO
=========================== */
const postUsuarios = async (req, res) => {
  const {
    nombres_usuario,
    apellidos_usuario,
    correo,
    contrasena,
    id_carrera,
    id_rol,
  } = req.body;

  if (
    !nombres_usuario ||
    !apellidos_usuario ||
    !correo ||
    !contrasena ||
    !id_carrera ||
    !id_rol
  ) {
    return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
  }

  try {
    await UsuarioModel.postUser({
      nombres_usuario,
      apellidos_usuario,
      correo,
      contrasena,
      id_carrera,
      id_rol,
    });

    const codigo = generarCodigo();
    const expira = new Date(Date.now() + 5 * 60 * 1000);

    await VerificacionModel.upsertVerification({
      email: correo,
      codigo,
      expira,
    });

    const mensaje = `
Hola ${nombres_usuario},

Tu código de verificación es:

${codigo}

Este código expira en 5 minutos.
`;

    const enviado = await enviarEmail(
      correo,
      "Verificación de correo",
      mensaje
    );

    if (!enviado.ok) {
      return res.status(201).json({
        mensaje: "Usuario creado, pero el correo no pudo enviarse",
      });
    }

    res.status(201).json({
      mensaje: "Usuario creado y verificación enviada al correo",
    });
  } catch (error) {
    console.error("Error postUsuarios:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

/* ===========================
   LOGIN
=========================== */
const login = async (req, res) => {
  const { correo, contrasena } = req.body;

  if (!correo || !contrasena) {
    return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
  }

  try {
    const conexion = await getConexion();
    const [rows] = await conexion.query(
      "SELECT * FROM usuarios WHERE correo=? AND contrasena=?",
      [correo, contrasena]
    );

    if (!rows.length) {
      return res.status(401).json({
        success: false,
        mensaje: "Usuario o contraseña incorrectos",
      });
    }

    const user = rows[0];

    const token = jwt.sign(
      { id: user.id_usuario, rol: user.id_rol },
      config.jwtSecret,
      { expiresIn: config.jwtExpires }
    );

    res.status(200).json({
      success: true,
      mensaje: "Login exitoso",
      token,
      id_usuario: user.id_usuario,
      id_rol: user.id_rol,
    });
  } catch (error) {
    console.error("Error login:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

/* ===========================
   ACTUALIZAR USUARIO
=========================== */
const putUsuarios = async (req, res) => {
  const {
    nombres_usuario,
    apellidos_usuario,
    correo,
    contrasena,
    id_carrera,
    id_rol,
    id_usuario,
  } = req.body;

  if (!id_usuario) {
    return res.status(400).json({ mensaje: "ID obligatorio" });
  }

  try {
    const result = await UsuarioModel.putUser({
      nombres_usuario,
      apellidos_usuario,
      correo,
      contrasena,
      id_carrera,
      id_rol,
      id_usuario,
    });

    if (!result) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    res.status(200).json({ mensaje: "Usuario actualizado correctamente" });
  } catch (error) {
    console.error("Error putUsuarios:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

/* ===========================
   RECUPERAR CONTRASEÑA
=========================== */
const recuperarClave = async (req, res) => {
  const { correo } = req.body;

  if (!correo) {
    return res.status(400).json({ mensaje: "Debes enviar un correo" });
  }

  try {
    const usuario = await UsuarioModel.getUserByEmail(correo);

    if (!usuario) {
      return res.status(404).json({
        mensaje: "Este correo no está registrado",
      });
    }

    const mensaje = `
Hola ${usuario.nombres_usuario},

Tu contraseña es:

${usuario.contrasena}

Te recomendamos cambiarla.
`;

    const enviado = await enviarEmail(
      correo,
      "Recuperación de contraseña",
      mensaje
    );

    if (!enviado.ok) {
      return res.status(500).json({
        mensaje: "No se pudo enviar el correo",
      });
    }

    res.status(200).json({
      mensaje: "Contraseña enviada al correo",
    });
  } catch (error) {
    console.error("Error recuperarClave:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

/* ===========================
   ELIMINAR USUARIO
=========================== */
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await UsuarioModel.deleteUser(id);

    if (!result) {
      return res.status(404).json({
        mensaje: `No se encontró el usuario con id ${id}`,
      });
    }

    res.status(200).json({
      mensaje: "Usuario eliminado correctamente",
      id,
    });
  } catch (error) {
    console.error("Error deleteUser:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

/* ===========================
   OBTENER POR ID
=========================== */
const obtenerporId = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await UsuarioModel.getPorId(id);

    if (!result) {
      return res.status(404).json({
        mensaje: `No se encontró ningún usuario con el ID ${id}`,
      });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error obtenerporId:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

/* ===========================
   EXPORTACIONES
=========================== */
export const method = {
  postUsuarios,
  getUsuarios,
  login,
  putUsuarios,
  recuperarClave,
  deleteUser,
  obtenerporId,
};
