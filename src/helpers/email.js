import nodemailer from "nodemailer";

export async function enviarEmail(destino, asunto, mensaje) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
      logger: true,
      debug: true,
    });

    await transporter.verify();

    const info = await transporter.sendMail({
      from: `"Plataforma UTS" <${process.env.EMAIL}>`,
      to: destino,
      subject: asunto,
      text: mensaje,
    });

    console.log("Correo enviado:", info);
    return { ok: true, info };
  } catch (error) {
    console.error("Error enviando correo:");
    console.error("message:", error.message);
    console.error("code:", error.code);
    console.error("response:", error.response);
    console.error("responseCode:", error.responseCode);
    console.error("full error:", error);
    return { ok: false, error: error.message };
  }
}