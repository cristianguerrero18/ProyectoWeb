import DashboardController from "../../controllers/Admin/dashboard.controllers.js";
import { Router } from "express";

const router = Router();

// Obtener totales del dashboard
router.get("/", DashboardController.getTotales);

export default router;
