import { method as ValidarController } from "../../controllers/auth/validate.controllers.js";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Validacion
 *   description: Endpoints para validación de autenticidad y verificación de acceso
 */

/**
 * @swagger
 * /api/auth/validar:
 *   post:
 *     summary: Validar autenticidad del usuario
 *     description: Verifica la autenticidad del usuario mediante credenciales o token de acceso, según la lógica implementada en el sistema.
 *     tags: [Validacion]
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               token: "valor-del-token-o-datos-de-validacion"
 *     responses:
 *       200:
 *         description: Validación realizada correctamente
 *       401:
 *         description: Usuario o token no válido
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", ValidarController.validar);

export default router;