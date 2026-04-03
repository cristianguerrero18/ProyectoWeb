import RecursosModel from "../../models/Admin/recursos.models.js";
import cloudinary from "../../config/cloudinary.js";

// =========================
// Helpers
// =========================
const sanitizeFilename = (text = "archivo") => {
  return String(text)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9-_ .]/g, "")
    .trim()
    .substring(0, 180) || "archivo";
};

const getExtensionFromMime = (mime = "") => {
  const map = {
    "application/pdf": "pdf",
    "application/msword": "doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
    "application/vnd.ms-excel": "xls",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
    "application/vnd.ms-powerpoint": "ppt",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",
    "text/plain": "txt",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "video/mp4": "mp4",
    "application/zip": "zip",
    "application/x-rar-compressed": "rar"
  };

  return map[mime.toLowerCase()] || "";
};

const getExtensionFromUrl = (url = "") => {
  try {
    const pathname = new URL(url).pathname.toLowerCase();
    const match = pathname.match(/\.([a-z0-9]{2,8})$/i);
    return match ? match[1] : "";
  } catch {
    return "";
  }
};

const buildDownloadName = (titulo, ext = "") => {
  const safeTitle = sanitizeFilename(titulo || "archivo").replace(/\s+/g, "_");
  return ext ? `${safeTitle}.${ext}` : safeTitle;
};

const getSafeOriginalFilename = (originalName = "", fallbackTitle = "archivo", ext = "") => {
  if (!originalName) {
    return buildDownloadName(fallbackTitle, ext);
  }

  const limpio = String(originalName)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, "")
    .trim();

  if (!limpio) {
    return buildDownloadName(fallbackTitle, ext);
  }

  if (/\.[a-z0-9]{2,8}$/i.test(limpio)) {
    return limpio;
  }

  return ext ? `${limpio}.${ext}` : limpio;
};

const getMimeCategory = (mime = "") => {
  const value = mime.toLowerCase();

  if (value.includes("pdf")) return "pdf";
  if (value.includes("word") || value.includes("document")) return "word";
  if (value.includes("excel") || value.includes("spreadsheet") || value.includes("sheet")) return "excel";
  if (value.includes("powerpoint") || value.includes("presentation")) return "powerpoint";
  if (value.startsWith("image/")) return "image";
  if (value.startsWith("video/")) return "video";
  if (value.startsWith("audio/")) return "audio";
  return "file";
};

const fetchRemoteFile = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`No se pudo obtener el archivo remoto. Status: ${response.status}`);
  }

  return response;
};

const sendRemoteFile = async ({
  remoteResponse,
  res,
  recurso,
  disposition = "inline"
}) => {
  const contentType =
    remoteResponse.headers.get("content-type") || "application/octet-stream";

  const ext =
    getExtensionFromMime(contentType) ||
    getExtensionFromUrl(recurso.URL) ||
    "bin";

  const filename = getSafeOriginalFilename(
    recurso.nombre_original,
    recurso.titulo,
    ext
  );

  res.setHeader("Content-Type", contentType);
  res.setHeader("Content-Disposition", `${disposition}; filename="${filename}"`);
  res.setHeader("X-Resource-Title", recurso.titulo || "");
  res.setHeader("X-Resource-Original-Name", recurso.nombre_original || "");
  res.setHeader("X-Resource-Extension", ext);
  res.setHeader("X-Resource-Icon", getMimeCategory(contentType));

  const arrayBuffer = await remoteResponse.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return res.end(buffer);
};

// =========================
// Obtener todos los recursos
// =========================
const getRecurso = async (req, res) => {
  try {
    const recurso = await RecursosModel.getTodos();

    if (!recurso.length) {
      return res.status(404).json({
        mensaje: "No se encontraron registros de los recursos."
      });
    }

    res.json(recurso);
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

// =========================
// Obtener un recurso por ID
// =========================
const getRecursoPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const registro = await RecursosModel.getPorId(id);

    if (!registro) {
      return res.status(404).json({
        mensaje: `No se encontró el registro con ID ${id}`
      });
    }

    res.json(registro);
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

// =========================
// Crear recurso
// =========================
const postRecurso = async (req, res) => {
  try {
    const {
      titulo,
      tema,
      URL: urlFromBody,
      contador_reportes = 0,
      id_asignatura,
      id_categoria = 1,
      id_usuario = 22
    } = req.body;

    let URL = urlFromBody || null;
    let PUBLIC_ID = null;
    let nombre_original = null;

    if (req.file) {
      const isPdf = req.file.mimetype === "application/pdf";
      nombre_original = req.file.originalname || null;

      const uploadOptions = {
        folder: "recursos",
        resource_type: isPdf ? "raw" : "auto",
        use_filename: true,
        unique_filename: true
      };

      const uploadStream = cloudinary.uploader.upload_stream(
        uploadOptions,
        async (error, result) => {
          if (error) {
            console.error("Error subiendo a Cloudinary:", error);
            return res.status(500).json({ mensaje: error.message });
          }

          try {
            URL = result.secure_url;
            PUBLIC_ID = result.public_id;

            await RecursosModel.crear({
              titulo,
              tema,
              URL,
              PUBLIC_ID,
              nombre_original,
              contador_reportes,
              id_asignatura,
              id_usuario,
              id_categoria
            });

            return res.status(201).json({
              mensaje: "Recurso creado correctamente",
              recurso: {
                titulo,
                tema,
                URL,
                PUBLIC_ID,
                nombre_original,
                contador_reportes,
                id_asignatura,
                id_usuario,
                id_categoria
              }
            });
          } catch (dbError) {
            console.error("Error guardando recurso:", dbError);
            return res.status(500).json({
              mensaje: `Error guardando recurso: ${dbError.message}`
            });
          }
        }
      );

      uploadStream.end(req.file.buffer);
    } else if (Number(id_categoria) === 4 && urlFromBody) {
      PUBLIC_ID = `link_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
      nombre_original = null;

      await RecursosModel.crear({
        titulo,
        tema,
        URL: urlFromBody,
        PUBLIC_ID,
        nombre_original,
        contador_reportes,
        id_asignatura,
        id_usuario,
        id_categoria
      });

      return res.status(201).json({
        mensaje: "Enlace creado correctamente",
        recurso: {
          titulo,
          tema,
          URL: urlFromBody,
          PUBLIC_ID,
          nombre_original,
          contador_reportes,
          id_asignatura,
          id_usuario,
          id_categoria
        }
      });
    } else {
      return res.status(400).json({
        mensaje: "Debe proporcionar un archivo o, si es un enlace, una URL válida"
      });
    }
  } catch (error) {
    console.error("Error en postRecurso:", error);
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

// =========================
// Actualizar recurso
// =========================
const putRecurso = async (req, res) => {
  const {
    titulo,
    tema,
    URL,
    PUBLIC_ID,
    nombre_original,
    contador_reportes,
    id_asignatura,
    id_usuario,
    id_categoria,
    id_recurso
  } = req.body;

  try {
    const actualizado = await RecursosModel.actualizar({
      titulo,
      tema,
      URL,
      PUBLIC_ID,
      nombre_original: nombre_original || null,
      contador_reportes,
      id_asignatura,
      id_usuario,
      id_categoria,
      id_recurso
    });

    if (!actualizado) {
      return res.status(404).json({
        mensaje: `No se pudo actualizar el registro con ID ${id_recurso}`
      });
    }

    res.json({ mensaje: "Registro actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

// =========================
// Eliminar recurso
// =========================
const deleteRecursos = async (req, res) => {
  const { id } = req.params;

  try {
    const eliminado = await RecursosModel.eliminar(id);

    if (!eliminado) {
      return res.status(404).json({
        mensaje: `No se encontró el registro con ID ${id}`
      });
    }

    res.json({ mensaje: "Registro eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: `Error en la API: ${error.message}` });
  }
};

// =========================
// Activar / desactivar recurso
// =========================
const cambiarEstadoRecurso = async (req, res) => {
  const { id_recurso } = req.params;
  const { activo } = req.body;

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

// =========================
// Recursos por asignatura
// =========================
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

// =========================
// Recursos por usuario
// =========================
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

// =========================
// Detalle completo
// =========================
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

// =========================
// Ver archivo desde backend
// =========================
const verRecursoArchivo = async (req, res) => {
  const { id_recurso } = req.params;

  console.log("========== VER RECURSO ==========");
  console.log("ID recurso:", req.params.id_recurso);
  console.log("Authorization:", req.headers.authorization);
  console.log("Método:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("================================");

  try {
    const recurso = await RecursosModel.getPorId(id_recurso);

    if (!recurso) {
      return res.status(404).json({ mensaje: "Recurso no encontrado" });
    }

    if (!recurso.URL) {
      return res.status(400).json({ mensaje: "El recurso no tiene URL asociada" });
    }

    const remoteResponse = await fetchRemoteFile(recurso.URL);

    console.log("Recurso encontrado:", {
      id_recurso: recurso.id_recurso,
      titulo: recurso.titulo,
      nombre_original: recurso.nombre_original,
      URL: recurso.URL
    });
    console.log("Content-Type remoto:", remoteResponse.headers.get("content-type"));

    return await sendRemoteFile({
      remoteResponse,
      res,
      recurso,
      disposition: "inline"
    });
  } catch (error) {
    console.error("Error en verRecursoArchivo:", error);
    return res.status(500).json({
      mensaje: `Error al visualizar el recurso: ${error.message}`
    });
  }
};

// =========================
// Descargar archivo desde backend
// =========================
const descargarRecursoArchivo = async (req, res) => {
  const { id_recurso } = req.params;

  console.log("======= DESCARGAR RECURSO =======");
  console.log("ID recurso:", req.params.id_recurso);
  console.log("Authorization:", req.headers.authorization);
  console.log("Método:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("================================");

  try {
    const recurso = await RecursosModel.getPorId(id_recurso);

    if (!recurso) {
      return res.status(404).json({ mensaje: "Recurso no encontrado" });
    }

    if (!recurso.URL) {
      return res.status(400).json({ mensaje: "El recurso no tiene URL asociada" });
    }

    const remoteResponse = await fetchRemoteFile(recurso.URL);

    console.log("Recurso encontrado:", {
      id_recurso: recurso.id_recurso,
      titulo: recurso.titulo,
      nombre_original: recurso.nombre_original,
      URL: recurso.URL
    });
    console.log("Content-Type remoto:", remoteResponse.headers.get("content-type"));

    return await sendRemoteFile({
      remoteResponse,
      res,
      recurso,
      disposition: "attachment"
    });
  } catch (error) {
    console.error("Error en descargarRecursoArchivo:", error);
    return res.status(500).json({
      mensaje: `Error al descargar el recurso: ${error.message}`
    });
  }
};

// =========================
// Metadatos para icono / extensión
// =========================
const getRecursoArchivoMeta = async (req, res) => {
  const { id_recurso } = req.params;

  try {
    const recurso = await RecursosModel.getPorId(id_recurso);

    if (!recurso) {
      return res.status(404).json({ mensaje: "Recurso no encontrado" });
    }

    if (!recurso.URL) {
      return res.status(400).json({ mensaje: "El recurso no tiene URL asociada" });
    }

    const remoteResponse = await fetchRemoteFile(recurso.URL);
    const contentType =
      remoteResponse.headers.get("content-type") || "application/octet-stream";

    const ext =
      getExtensionFromMime(contentType) ||
      getExtensionFromUrl(recurso.URL) ||
      "bin";

    return res.json({
      id_recurso: recurso.id_recurso,
      titulo: recurso.titulo,
      nombre_original: recurso.nombre_original,
      url: recurso.URL,
      mime_type: contentType,
      extension: ext,
      icono: getMimeCategory(contentType),
      ver_url: `/api/recursos/${recurso.id_recurso}/ver`,
      descargar_url: `/api/recursos/${recurso.id_recurso}/descargar`,
      nombre_descarga: getSafeOriginalFilename(
        recurso.nombre_original,
        recurso.titulo,
        ext
      )
    });
  } catch (error) {
    console.error("Error en getRecursoArchivoMeta:", error);
    return res.status(500).json({
      mensaje: `Error obteniendo metadata del recurso: ${error.message}`
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
  getRecursoDetalle,
  verRecursoArchivo,
  descargarRecursoArchivo,
  getRecursoArchivoMeta
};