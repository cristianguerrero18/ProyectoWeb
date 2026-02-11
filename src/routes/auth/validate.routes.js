import { method as ValidarController } from "../../controllers/auth/validate.controllers.js";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Validación de tokens JWT
 */

/**
 * @swagger
 * /validar-token:
 *   post:
 *     summary: Validar token JWT
 *     tags: [Autenticación]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token válido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 valido:
 *                   type: boolean
 *                   example: true
 *                 usuario:
 *                   $ref: '#/components/schemas/Usuario'
 *                 expira_en:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: Token inválido o expirado
 */
router.post('/', ValidarController.validar);

export default router;