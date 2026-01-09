import getConexion from "../../db/database.js";

// ✅ Una sola conexión reutilizable (mejor rendimiento)
const conexion = await getConexion();

const UsuarioModel = {

  /* ===========================
     OBTENER TODOS LOS USUARIOS
  =========================== */
  getAll: async () => {
    const [rows] = await conexion.query(
      `SELECT id_usuario, nombres_usuario, apellidos_usuario, correo, contrasena, id_carrera, id_rol 
       FROM usuarios`
    );
    return rows;
  },

  /* ===========================
     OBTENER USUARIO POR ID
  =========================== */
  getPorId: async (id) => {
    const [rows] = await conexion.query(
      `SELECT u.id_usuario, u.nombres_usuario, u.apellidos_usuario, u.correo, u.id_carrera , c.nombre_carrera, t.id_tipo_carrera , u.id_rol , u.contrasena
       FROM usuarios u 
       inner join carreras c on u.id_carrera = c.id_carrera 
       inner join tipo_carrera t on t.id_tipo_carrera = c.id_tipo_carrera
       WHERE id_usuario = ?`,
      [id]
    );
    return rows[0];
  },

  /* ===========================
     REGISTRO DE USUARIO
  =========================== */
  postUser: async ({
    nombres_usuario,
    apellidos_usuario,
    correo,
    contrasena,
    id_carrera,
    id_rol,
  }) => {
    const [result] = await conexion.query(
      `INSERT INTO usuarios 
      (nombres_usuario, apellidos_usuario, correo, contrasena, id_carrera, id_rol)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        nombres_usuario,
        apellidos_usuario,
        correo,
        contrasena,
        id_carrera,
        id_rol,
      ]
    );

    return result.insertId; // ✅ retorno limpio
  },

  /* ===========================
     ELIMINAR USUARIO
  =========================== */
  deleteUser: async (id) => {
    const [rows] = await conexion.query(
      "DELETE FROM usuarios WHERE id_usuario = ?",
      [id]
    );
    return rows.affectedRows;
  },

  /* ===========================
     ACTUALIZAR USUARIO
  =========================== */
  putUser: async ({
    nombres_usuario,
    apellidos_usuario,
    correo,
    contrasena,
    id_carrera,
    id_rol,
    id_usuario,
  }) => {
    const [rows] = await conexion.query(
      `UPDATE usuarios 
       SET nombres_usuario = ?, 
           apellidos_usuario = ?, 
           correo = ?, 
           contrasena = ?, 
           id_carrera = ?, 
           id_rol = ? 
       WHERE id_usuario = ?`,
      [
        nombres_usuario,
        apellidos_usuario,
        correo,
        contrasena,
        id_carrera,
        id_rol,
        id_usuario,
      ]
    );

    return rows.affectedRows;
  },

  /* ===========================
     OBTENER USUARIO POR EMAIL
  =========================== */
  getUserByEmail: async (correo) => {
    const [rows] = await conexion.query(
      "SELECT * FROM usuarios WHERE correo = ?",
      [correo]
    );
    return rows[0];
  },

  /* ===========================
     SOLO NOMBRES PARA SELECT
  =========================== */
  getUserName: async () => {
    const [rows] = await conexion.query(
      "SELECT nombres_usuario, id_usuario FROM usuarios"
    );
    return rows;
  },/* ===========================
  VALIDAR SI EXISTE CORREO
=========================== */
existeCorreo: async (correo) => {
 const [rows] = await conexion.query(
   "SELECT 1 FROM usuarios WHERE correo = ? LIMIT 1",
   [correo]
 );
 return rows.length > 0; // true = existe, false = no existe
},



};

export default UsuarioModel;
