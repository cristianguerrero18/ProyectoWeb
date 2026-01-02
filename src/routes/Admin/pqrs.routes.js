import { PQRSController } from "../../controllers/Admin/pqrs.controllers.js";
import { Router } from "express";

const router = Router();

// Obtener todos los PQRS
router.get("/", PQRSController.getPQRS);

// Obtener PQR por ID
router.get("/:id_pqr", PQRSController.getPQRSPorId);

// Responder PQR
router.put("/responder", PQRSController.responderPQRS);

// Eliminar PQR
router.delete("/:id_pqr", PQRSController.deletePQRS);

export default router;
