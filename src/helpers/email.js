
import nodemailer from "nodemailer";

export async function enviarEmail(destino, asunto, mensaje) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: destino,
      subject: asunto,
      text: mensaje,
    });

    return { ok: true };
  } catch (error) {
    console.log("Error enviando correo:", error);
    return { ok: false };
  }
}
