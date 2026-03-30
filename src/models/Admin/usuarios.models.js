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

    return result.insertId;
  },

  /* ===========================
     ELIMINAR USUARIO Y TODO LO RELACIONADO
     Basado en las tablas de tu BD
  =========================== */
  deleteUser: async (id) => {
    try {
      // Iniciar transacción
      await conexion.query('START TRANSACTION');

      // 1. Eliminar registros de recurso_likes (likes a recursos)
      await conexion.query(
        "DELETE FROM recurso_likes WHERE id_usuario = ?",
        [id]
      );

      // 2. Eliminar comentarios del usuario
      await conexion.query(
        "DELETE FROM comentarios WHERE id_usuario = ?",
        [id]
      );

      // 3. Eliminar favoritos del usuario
      await conexion.query(
        "DELETE FROM favoritos WHERE id_usuario = ?",
        [id]
      );

      // 4. Eliminar PQRS del usuario
      await conexion.query(
        "DELETE FROM pqrs WHERE id_usuario = ?",
        [id]
      );

     

      // 6. Eliminar recursos subidos por el usuario
      // (Nota: Si recursos tiene relaciones, deberías manejarlas primero)
      await conexion.query(
        "DELETE FROM recursos WHERE id_usuario = ?",
        [id]
      );

      

      // 8. Eliminar logs de acceso del usuario
      await conexion.query(
        "DELETE FROM logs_acceso WHERE id_usuario = ?",
        [id]
      );

      // 9. Eliminar notificaciones del usuario
      await conexion.query(
        "DELETE FROM notificaciones WHERE id_usuario = ?",
        [id]
      );

      // 10. Eliminar derechos de autor relacionados con recursos del usuario
      // Primero obtener los recursos del usuario para eliminar sus derechos_autor
      const [recursos] = await conexion.query(
        "SELECT id_recurso FROM recursos WHERE id_usuario = ?",
        [id]
      );
      
      for (const recurso of recursos) {
        await conexion.query(
          "DELETE FROM derechos_autor WHERE id_recurso = ?",
          [recurso.id_recurso]
        );
      }

      // 11. Finalmente eliminar el usuario
      const [result] = await conexion.query(
        "DELETE FROM usuarios WHERE id_usuario = ?",
        [id]
      );

      // Si todo salió bien, confirmar transacción
      await conexion.query('COMMIT');
      
      return {
        success: true,
        affectedRows: result.affectedRows,
        message: "Usuario y todos sus datos relacionados eliminados correctamente"
      };
      
    } catch (error) {
      // Si algo sale mal, deshacer todos los cambios
      await conexion.query('ROLLBACK');
      console.error('Error al eliminar usuario y datos relacionados:', error);
      throw {
        success: false,
        error: error.message,
        message: "Error al eliminar el usuario"
      };
    }
  },

  /* ===========================
     ELIMINAR USUARIO (VERSIÓN SIMPLIFICADA)
     Solo elimina el usuario, asumiendo que las tablas tienen ON DELETE CASCADE
  =========================== */
  deleteUserSimple: async (id) => {
    try {
      const [result] = await conexion.query(
        "DELETE FROM usuarios WHERE id_usuario = ?",
        [id]
      );
      return {
        success: true,
        affectedRows: result.affectedRows
      };
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      throw error;
    }
  },

  /* ===========================
     VERIFICAR SI EL USUARIO TIENE DATOS RELACIONADOS
     Útil para mostrar advertencia antes de eliminar
  =========================== */
  verificarDatosRelacionados: async (id) => {
    try {
      const [recursos] = await conexion.query(
        "SELECT COUNT(*) as total FROM recursos WHERE id_usuario = ?",
        [id]
      );
      
      const [favoritos] = await conexion.query(
        "SELECT COUNT(*) as total FROM favoritos WHERE id_usuario = ?",
        [id]
      );
      
      const [comentarios] = await conexion.query(
        "SELECT COUNT(*) as total FROM comentarios WHERE id_usuario = ?",
        [id]
      );
      
      const [pqrs] = await conexion.query(
        "SELECT COUNT(*) as total FROM pqrs WHERE id_usuario = ?",
        [id]
      );
      
      const [reportes] = await conexion.query(
        "SELECT COUNT(*) as total FROM reportes WHERE id_usuario = ?",
        [id]
      );
      
      const [likes] = await conexion.query(
        "SELECT COUNT(*) as total FROM recurso_likes WHERE id_usuario = ?",
        [id]
      );
      
      const [notificaciones] = await conexion.query(
        "SELECT COUNT(*) as total FROM notificaciones WHERE id_usuario = ?",
        [id]
      );
      
      return {
        tieneDatos: 
          recursos[0].total > 0 ||
          favoritos[0].total > 0 ||
          comentarios[0].total > 0 ||
          pqrs[0].total > 0 ||
          reportes[0].total > 0 ||
          likes[0].total > 0 ||
          notificaciones[0].total > 0,
        conteos: {
          recursos: recursos[0].total,
          favoritos: favoritos[0].total,
          comentarios: comentarios[0].total,
          pqrs: pqrs[0].total,
          reportes: reportes[0].total,
          likes: likes[0].total,
          notificaciones: notificaciones[0].total
        }
      };
    } catch (error) {
      console.error('Error al verificar datos relacionados:', error);
      throw error;
    }
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
    let query = `UPDATE usuarios SET 
      nombres_usuario = ?, 
      apellidos_usuario = ?, 
      correo = ?, 
      id_carrera = ?, 
      id_rol = ?`;
    
    const params = [
      nombres_usuario,
      apellidos_usuario,
      correo,
      id_carrera,
      id_rol
    ];

    // Solo actualizar contraseña si se proporciona una nueva
    if (contrasena && contrasena.trim() !== "") {
      query += `, contrasena = ?`;
      params.push(contrasena);
    }

    query += ` WHERE id_usuario = ?`;
    params.push(id_usuario);

    const [rows] = await conexion.query(query, params);
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
  },

  /* ===========================
     VALIDAR SI EXISTE CORREO
  =========================== */
  existeCorreo: async (correo) => {
    const [rows] = await conexion.query(
      "SELECT 1 FROM usuarios WHERE correo = ? LIMIT 1",
      [correo]
    );
    return rows.length > 0;
  },

  /* ===========================
     OBTENER ESTADÍSTICAS DEL USUARIO
  =========================== */
  getEstadisticas: async (id) => {
    try {
      const [recursos] = await conexion.query(
        "SELECT COUNT(*) as total FROM recursos WHERE id_usuario = ?",
        [id]
      );
      
      const [favoritos] = await conexion.query(
        "SELECT COUNT(*) as total FROM favoritos WHERE id_usuario = ?",
        [id]
      );
      
      const [comentarios] = await conexion.query(
        "SELECT COUNT(*) as total FROM comentarios WHERE id_usuario = ?",
        [id]
      );
      
      return {
        totalRecursos: recursos[0].total,
        totalFavoritos: favoritos[0].total,
        totalComentarios: comentarios[0].total
      };
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      throw error;
    }
  }
};

export default UsuarioModel;