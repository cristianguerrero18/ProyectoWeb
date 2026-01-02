import VerificacionModel from "../../models/auth/verification.models.js";
import getConexion from "../../db/database.js";

const validar  = async (req, res) => {
  const { email, codigoIngresado } = req.body;

  try {
    const data = await VerificacionModel.getByEmail(email);

    if (!data) return res.json({ ok: false, msg: "No hay código para este email." });

    if (data.bloqueado) return res.json({ ok: false, msg: "Código bloqueado. Solicita uno nuevo." });

    if (new Date() > new Date(data.expira)) {
      await VerificacionModel.deleteByEmail(email);
      return res.json({ ok: false, msg: "El código expiró. Solicita uno nuevo." });
    }

    if (data.codigo !== String(codigoIngresado)) {
      // incrementar intentos
      const intentos = await VerificacionModel.incrementIntentos(email);
      if (intentos >= 3) {
        await VerificacionModel.bloquear(email);
        return res.json({ ok: false, msg: "Has superado los intentos. Código bloqueado." });
      }
      return res.json({ ok: false, msg: `Código incorrecto. Intentos restantes: ${3 - intentos}` });
    }

    // Si es correcto: marcar usuario como verificado y borrar registro de verificación
    const conexion = await getConexion();
    await conexion.query(`UPDATE usuarios SET email_verified = 1, verified_at = NOW() WHERE correo = ?`, [email]);
    await VerificacionModel.deleteByEmail(email);

    return res.json({ ok: true, msg: "Correo verificado correctamente." });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, msg: "Error en el servidor" });
  }
}
export const method  = {
      validar
}
