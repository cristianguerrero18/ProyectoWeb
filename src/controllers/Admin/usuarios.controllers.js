import UsuarioModel from "../../models/Admin/usuarios.models.js";
import VerificacionModel from "../../models/auth/verification.models.js";
import LogAccesoModel from "../../models/Admin/log_acceso.models.js";
import { enviarEmail } from "../../helpers/email.js";
import getConexion from "../../db/database.js";
import jwt from "jsonwebtoken";
import config from "../../config.js";
import requestIp from 'request-ip'; // Importar la librería

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
   LOGIN CON REGISTRO DE LOG
=========================== */
/* ===========================
   LOGIN CON REGISTRO DE LOG
=========================== */
const login = async (req, res) => {
  const { correo, contrasena } = req.body;

  if (!correo || !contrasena) {
    return res.status(400).json({
      success: false,
      mensaje: "Todos los campos son obligatorios",
    });
  }

  try {
    const conexion = await getConexion();

    const [rows] = await conexion.query(
      `SELECT 
        u.id_usuario,
        u.nombres_usuario,
        u.apellidos_usuario,
        u.correo,
        u.id_rol,
        r.nombre_rol,
        r.descripcion AS descripcion_rol,
        u.id_carrera,
        c.nombre_carrera,
        c.id_tipo_carrera,
        c.descripcion AS descripcion_carrera
       FROM usuarios u
       INNER JOIN carreras c ON c.id_carrera = u.id_carrera
       INNER JOIN roles r ON r.id_rol = u.id_rol
       WHERE u.correo = ? AND u.contrasena = ?`,
      [correo, contrasena]
    );

    if (!rows.length) {
      return res.status(401).json({
        success: false,
        mensaje: "Usuario o contraseña incorrectos",
      });
    }

    const user = rows[0];

    const tipo_carrera =
      user.id_tipo_carrera === 1 ? "Tecnología" : "Profesional";

    const token = jwt.sign(
      {
        id_usuario: user.id_usuario,
        id_rol: user.id_rol,
        id_carrera: user.id_carrera,
      },
      config.jwtSecret,
      { expiresIn: config.jwtExpires }
    );

    // Obtener la IP del cliente usando request-ip
    const clientIp = requestIp.getClientIp(req);
    const ip = clientIp || 'IP no disponible';
    
    // Obtener información adicional del navegador
    const userAgent = req.headers['user-agent'] || 'No disponible';
    const fechaAcceso = new Date().toISOString();
    
    // Preparar datos para el log
    const logData = {
      id_usuario: user.id_usuario,
      nombres_usuario: user.nombres_usuario,
      apellidos_usuario: user.apellidos_usuario,
      correo: user.correo
    };
    
    // Registrar el log de acceso con todos los datos
    try {
      await LogAccesoModel.insertLogCompleto(logData, ip, userAgent);
      
      console.log(`
🎯 LOG DE ACCESO REGISTRADO EN BD:
├── Usuario: ${user.id_usuario} (${user.nombres_usuario} ${user.apellidos_usuario})
├── Correo: ${correo}
├── IP: ${ip}
├── User-Agent: ${userAgent.substring(0, 60)}...
└── Fecha: ${fechaAcceso}
      `);
      
    } catch (logError) {
      console.error("❌ Error registrando log de acceso:", logError);
      // No fallamos el login si hay error en el log
    }

    res.status(200).json({
      success: true,
      mensaje: "Login exitoso",
      token,
      usuario: {
        id_usuario: user.id_usuario,
        nombres_usuario: user.nombres_usuario,
        apellidos_usuario: user.apellidos_usuario,
        correo: user.correo,
        rol: {
          id_rol: user.id_rol,
          nombre_rol: user.nombre_rol,
          descripcion: user.descripcion_rol,
        },
        carrera: {
          id_carrera: user.id_carrera,
          nombre_carrera: user.nombre_carrera,
          id_tipo_carrera: user.id_tipo_carrera,
          tipo_carrera,
          descripcion: user.descripcion_carrera,
        },
      },
      metadata: {
        fecha_acceso: fechaAcceso,
        ip_acceso: ip
      }
    });
  } catch (error) {
    console.error("Error login:", error);
    res.status(500).json({
      success: false,
      mensaje: "Error interno del servidor",
    });
  }
};
/* ===========================
   ACTUALIZAR USUARIO
=========================== */
const putUsuarios = async (req, res) => {
  const { id_usuario } = req.body;

  if (!id_usuario) {
    return res.status(400).json({ mensaje: "ID obligatorio" });
  }

  try {
    const result = await UsuarioModel.putUser(req.body);

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
    });
  } catch (error) {
    console.error("Error deleteUser:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

/* ===========================
   OBTENER USUARIO POR ID
=========================== */
const obtenerporId = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await UsuarioModel.getPorId(id);

    if (!result) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado",
      });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error obtenerporId:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

/* ===========================
   OBTENER CARRERA POR ID
=========================== */
const obtenerCarreraPorId = async (req, res) => {
  const { id_carrera } = req.params;

  try {
    const conexion = await getConexion();
    const [rows] = await conexion.query(
      `SELECT * FROM carreras WHERE id_carrera = ?`,
      [id_carrera]
    );

    if (!rows.length) {
      return res.status(404).json({ mensaje: "Carrera no encontrada" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error obtenerCarreraPorId:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

/* ===========================
   OBTENER ROL POR ID
=========================== */
const obtenerRolPorId = async (req, res) => {
  const { id_rol } = req.params;

  try {
    const conexion = await getConexion();
    const [rows] = await conexion.query(
      `SELECT id_rol, nombre_rol, descripcion FROM roles WHERE id_rol = ?`,
      [id_rol]
    );

    if (!rows.length) {
      return res.status(404).json({ mensaje: "Rol no encontrado" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error obtenerRolPorId:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

/* ===========================
   OBTENER LOGS DE ACCESO (NUEVO)
=========================== */
const getLogsAcceso = async (req, res) => {
  try {
    const logs = await LogAccesoModel.getAllLogs();
    
    if (!logs.length) {
      return res.status(404).json({ mensaje: "No hay registros de acceso" });
    }

    res.status(200).json(logs);
  } catch (error) {
    console.error("Error getLogsAcceso:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

/* ===========================
   OBTENER LOGS POR USUARIO (NUEVO)
=========================== */
const getLogsPorUsuario = async (req, res) => {
  const { id_usuario } = req.params;

  try {
    const logs = await LogAccesoModel.getLogsByUser(id_usuario);
    
    if (!logs.length) {
      return res.status(404).json({ 
        mensaje: `No hay registros de acceso para el usuario ${id_usuario}` 
      });
    }

    res.status(200).json(logs);
  } catch (error) {
    console.error("Error getLogsPorUsuario:", error);
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
  obtenerCarreraPorId,
  obtenerRolPorId,
  getLogsAcceso,
  getLogsPorUsuario,
};