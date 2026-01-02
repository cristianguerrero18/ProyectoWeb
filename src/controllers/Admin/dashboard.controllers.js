import DashboardModel from "../../models/Admin/dashboard.models.js";

const DashboardController = {

  /* ===========================
     OBTENER TOTALES DEL DASHBOARD
  =========================== */
  getTotales: async (req, res) => {
    try {
      const totales = await DashboardModel.getTotales();

      res.json({
        ok: true,
        data: totales,
      });
    } catch (error) {
      console.error("Error DashboardController.getTotales:", error);
      res.status(500).json({
        ok: false,
        message: "Error al obtener totales del dashboard",
      });
    }
  },

};

export default DashboardController;
