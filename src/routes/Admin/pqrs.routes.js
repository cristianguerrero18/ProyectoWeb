// routes/Admin/pqrs.routes.js
import { PQRSController } from "../../controllers/Admin/pqrs.controllers.js";
import { Router } from "express";

import { verificarToken } from "../../middlewares/auth.js";


const router = Router();

// ======================
// ADMIN
// ======================

// Obtener todos los PQRS
router.get("/", PQRSController.getPQRS);

// Obtener PQR por ID
router.get("/:id_pqr", PQRSController.getPQRSPorId);

// Obtener tipos de PQRS
router.get("/tipos/todos", PQRSController.getTiposPQRS);

// Responder PQR
router.put("/responder", PQRSController.responderPQRS);

// Eliminar PQR
router.delete("/:id_pqr", PQRSController.deletePQRS);

// ======================
// CLIENTE
// ======================

// Crear PQRS
router.post("/", PQRSController.createPQRS);

// Obtener PQRS por usuario
router.get("/usuario/:id_usuario", PQRSController.getPQRSPorUsuario);

export default router;