import LogAccesoModel from "../../models/Admin/log_acceso.models.js";

const LogAccesoController = {

  /* ===========================
     REGISTRAR LOG DE ACCESO SIMPLE
  =========================== */
  registrarLog: async (req, res) => {
    try {
      const { id_usuario, correo, nombres_usuario, apellidos_usuario } = req.body;
      const ip = req.ip;
      const user_agent = req.headers["user-agent"] || null;

      const insertId = await LogAccesoModel.insertLog(
        id_usuario,
        ip,
        user_agent,
        correo,
        nombres_usuario,
        apellidos_usuario
      );

      res.status(201).json({
        ok: true,
        message: "Log de acceso registrado",
        id_log: insertId,
      });
    } catch (error) {
      console.error("Error LogAccesoController.registrarLog:", error);
      res.status(500).json({
        ok: false,
        message: "Error al registrar log de acceso",
      });
    }
  },

  /* ===========================
     REGISTRAR LOG DE ACCESO COMPLETO
  =========================== */
  registrarLogCompleto: async (req, res) => {
    try {
      const { userData } = req.body;
      const ip = req.ip;
      const user_agent = req.headers["user-agent"] || null;

      const insertId = await LogAccesoModel.insertLogCompleto(
        userData,
        ip,
        user_agent
      );

      res.status(201).json({
        ok: true,
        message: "Log de acceso completo registrado",
        id_log: insertId,
      });
    } catch (error) {
      console.error("Error LogAccesoController.registrarLogCompleto:", error);
      res.status(500).json({
        ok: false,
        message: "Error al registrar log completo",
      });
    }
  },

  /* ===========================
     OBTENER LOGS POR USUARIO
  =========================== */
  getLogsPorUsuario: async (req, res) => {
    try {
      const { id_usuario } = req.params;

      const logs = await LogAccesoModel.getLogsByUser(id_usuario);

      res.json({
        ok: true,
        data: logs,
      });
    } catch (error) {
      console.error("Error LogAccesoController.getLogsPorUsuario:", error);
      res.status(500).json({
        ok: false,
        message: "Error al obtener logs del usuario",
      });
    }
  },

  /* ===========================
     OBTENER TODOS LOS LOGS
  =========================== */
  getTodos: async (req, res) => {
    try {
      const logs = await LogAccesoModel.getAllLogs();

      res.json({
        ok: true,
        data: logs,
      });
    } catch (error) {
      console.error("Error LogAccesoController.getTodos:", error);
      res.status(500).json({
        ok: false,
        message: "Error al obtener logs",
      });
    }
  },

  /* ===========================
     OBTENER LOGS DETALLADOS
  =========================== */
  getDetallados: async (req, res) => {
    try {
      const logs = await LogAccesoModel.getLogsDetallados();

      res.json({
        ok: true,
        data: logs,
      });
    } catch (error) {
      console.error("Error LogAccesoController.getDetallados:", error);
      res.status(500).json({
        ok: false,
        message: "Error al obtener logs detallados",
      });
    }
  },

  /* ===========================
     ELIMINAR TODOS LOS LOGS (DELETE)
  =========================== */
  eliminarTodosLosLogs: async (req, res) => {
    try {
      console.log('=== ELIMINAR TODOS LOS LOGS ===');
      
      const resultado = await LogAccesoModel.deleteAllLogs();

      res.json({
        ok: true,
        message: resultado.message,
        registros_eliminados: resultado.affectedRows
      });
    } catch (error) {
      console.error("Error LogAccesoController.eliminarTodosLosLogs:", error);
      res.status(500).json({
        ok: false,
        message: "Error al eliminar todos los logs",
        error: error.message
      });
    }
  },

  /* ===========================
     TRUNCAR TABLA DE LOGS (TRUNCATE)
  =========================== */
  truncarLogs: async (req, res) => {
    try {
      console.log('=== TRUNCAR LOGS ===');
      
      const resultado = await LogAccesoModel.truncateLogs();

      res.json({
        ok: true,
        message: resultado.message
      });
    } catch (error) {
      console.error("Error LogAccesoController.truncarLogs:", error);
      res.status(500).json({
        ok: false,
        message: "Error al truncar la tabla de logs",
        error: error.message
      });
    }
  },

  /* ===========================
     ELIMINAR LOGS POR RANGO DE FECHAS
  =========================== */
  eliminarLogsPorFecha: async (req, res) => {
    try {
      console.log('=== ELIMINAR LOGS POR FECHA ===');
      const { fecha_inicio, fecha_fin } = req.body;
      
      if (!fecha_inicio || !fecha_fin) {
        return res.status(400).json({
          ok: false,
          message: "Debe proporcionar fecha_inicio y fecha_fin"
        });
      }

      const resultado = await LogAccesoModel.deleteLogsByDateRange(fecha_inicio, fecha_fin);

      res.json({
        ok: true,
        message: resultado.message,
        registros_eliminados: resultado.affectedRows
      });
    } catch (error) {
      console.error("Error LogAccesoController.eliminarLogsPorFecha:", error);
      res.status(500).json({
        ok: false,
        message: "Error al eliminar logs por rango de fechas",
        error: error.message
      });
    }
  }
};

export default LogAccesoController;