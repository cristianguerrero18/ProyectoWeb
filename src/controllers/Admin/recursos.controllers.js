import RecursosModel from "../../models/Admin/recursos.models.js";
import cloudinary from "../../config/cloudinary.js"; 

// Obtener todos los registros de las categorias
const getRecurso = async (req, res) => {
  try {
    const recurso = await RecursosModel.getTodos();
    if (!recurso.length) {
      return res.status(404).json({ mensaje: "No se encontraron registros de los recursos." });
    }
    res.json(recurso);
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

// Obtener un registro por ID
const getRecursoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const registro = await RecursosModel.getPorId(id);
    if (!registro) {
      return res.status(404).json({ mensaje: `No se encontró el registro con ID ${id}` });
    }
    res.json(registro);
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

const postRecurso = async (req, res) => {
  try {
    // Extraer datos del FormData
    const {
      titulo,
      tema,
      URL: urlFromBody, // Extraer URL del body
      contador_reportes = 0,
      id_asignatura,
      id_categoria = 1,
      id_usuario = 22
    } = req.body;

    console.log("Datos recibidos en backend:", {
      titulo,
      tema,
      urlFromBody,
      contador_reportes,
      id_asignatura,
      id_categoria,
      id_usuario,
      tieneArchivo: !!req.file
    });

    let URL = urlFromBody || null;
    let PUBLIC_ID = null;

    // CASO 1: Si hay archivo (imágenes, videos, archivos)
    if (req.file) {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "recursos" },
        async (error, result) => {
          if (error) {
            console.error("Error subiendo a Cloudinary:", error);
            return res.status(500).json({ mensaje: error.message });
          }

          URL = result.secure_url;
          PUBLIC_ID = result.public_id;

          console.log("Archivo subido a Cloudinary:", { URL, PUBLIC_ID });

          await RecursosModel.crear({
            titulo,
            tema,
            URL,
            PUBLIC_ID,
            contador_reportes,
            id_asignatura,
            id_usuario,
            id_categoria
          });

          res.status(201).json({
            mensaje: "Recurso creado correctamente",
            recurso: {
              titulo,
              tema,
              URL,
              PUBLIC_ID,
              contador_reportes,
              id_asignatura,
              id_usuario,
              id_categoria 
            }
          });
        }
      );

      uploadStream.end(req.file.buffer);
    }
    // CASO 2: Si es un LINK (categoría 4) y tiene URL
    else if (id_categoria == 4 && urlFromBody) {
      console.log("Creando link con URL:", urlFromBody);
      
      // Generar un PUBLIC_ID único para links
      PUBLIC_ID = `link_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      await RecursosModel.crear({
        titulo,
        tema,
        URL: urlFromBody,
        PUBLIC_ID,
        contador_reportes,
        id_asignatura,
        id_usuario,
        id_categoria
      });

      res.status(201).json({
        mensaje: "Enlace creado correctamente",
        recurso: {
          titulo,
          tema,
          URL: urlFromBody,
          PUBLIC_ID,
          contador_reportes,
          id_asignatura,
          id_usuario,
          id_categoria
        }
      });
    }
    // CASO 3: Error - ni archivo ni URL para link
    else {
      console.error("Error: No se proporcionó archivo ni URL para link");
      return res.status(400).json({ 
        mensaje: "Debe proporcionar un archivo o, si es un enlace, una URL válida" 
      });
    }
  } catch (error) {
    console.error("Error en postRecurso:", error);
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

// Actualizar un registro de la categoria
const putRecurso = async (req, res) => {
  const { titulo , tema , URL , PUBLIC_ID , contador_reportes,id_asignatura, id_usuario, id_categoria ,id_recurso } = req.body;
  try {
    const actualizado = await RecursosModel.actualizar({  titulo , tema , URL , PUBLIC_ID , contador_reportes,id_asignatura, id_usuario, id_categoria ,id_recurso});
    if (!actualizado) {
      return res.status(404).json({ mensaje: `No se pudo actualizar el registro con ID ${id_recurso}` });
    }
    res.json({ mensaje: "Registro actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

// Eliminar un registro del pensum
const deleteRecursos = async (req, res) => {
  const { id } = req.params;
  try {
    const eliminado = await RecursosModel.eliminar(id);
    if (!eliminado) {
      return res.status(404).json({ mensaje: `No se encontró el registro con ID ${id}` });
    }
    res.json({ mensaje: "Registro eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};
// Activar / Desactivar recurso
const cambiarEstadoRecurso = async (req, res) => {
  const { id_recurso } = req.params;
  const { activo } = req.body; // 0 o 1

  try {
    const resultado = await RecursosModel.cambiarEstado(id_recurso, activo);

    if (!resultado) {
      return res.status(404).json({
        mensaje: `No se encontró el recurso con ID ${id_recurso}`
      });
    }

    res.json({
      mensaje: `Recurso ${activo ? "activado" : "desactivado"} correctamente`
    });
  } catch (error) {
    res.status(500).json({
      mensaje: `Error en la API: ${error.message}`
    });
  }
};

// Obtener recursos por asignatura (info completa)
const getRecursosPorAsignatura = async (req, res) => {
  const { id_asignatura } = req.params;

  try {
    const recursos = await RecursosModel.getPorAsignatura(id_asignatura);

    if (!recursos.length) {
      return res.status(404).json({
        mensaje: "No hay recursos para esta asignatura"
      });
    }

    res.json(recursos);
  } catch (error) {
    res.status(500).json({
      mensaje: `Error en la API: ${error.message}`
    });
  }
};

// Obtener recursos por usuario (info completa)
const getRecursosPorUsuario = async (req, res) => {
  const { id_usuario } = req.params;

  try {
    const recursos = await RecursosModel.getPorUsuario(id_usuario);

    if (!recursos.length) {
      return res.status(404).json({
        mensaje: "Este usuario no tiene recursos registrados"
      });
    }

    res.json(recursos);
  } catch (error) {
    res.status(500).json({
      mensaje: `Error en la API: ${error.message}`
    });
  }

};

// Obtener recurso con likes, dislikes y comentarios
const getRecursoDetalle = async (req, res) => {
  const { id_recurso } = req.params;

  try {
    const recurso = await RecursosModel.getDetalleCompleto(id_recurso);

    if (!recurso) {
      return res.status(404).json({
        mensaje: `No se encontró el recurso con ID ${id_recurso}`
      });
    }

    res.json(recurso);
  } catch (error) {
    res.status(500).json({
      mensaje: `Error en la API: ${error.message}`
    });
  }
};




export const RecursoController = {
 getRecurso,
 postRecurso,
 putRecurso,
 getRecursoPorId,
 deleteRecursos,
 cambiarEstadoRecurso,
 getRecursosPorAsignatura,
 getRecursosPorUsuario,
 getRecursoDetalle
};