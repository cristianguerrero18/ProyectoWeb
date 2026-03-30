import nodemailer from "nodemailer";

export async function enviarEmail(destino, asunto, mensaje) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.BREVO_SMTP_HOST,
      port: Number(process.env.BREVO_SMTP_PORT),
      secure: false, // true solo si usas 465
      auth: {
        user: process.env.BREVO_SMTP_USER,
        pass: process.env.BREVO_SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Plataforma UTS" <${process.env.BREVO_SMTP_USER}>`,
      to: destino,
      subject: asunto,
      text: mensaje,
    });

    return { ok: true, info };
  } catch (error) {
    console.error("Error enviando correo:", error);
    return {
      ok: false,
      error: error.message,
      code: error.code || null,
      response: error.response || null,
      responseCode: error.responseCode || null,
    };
  }
}