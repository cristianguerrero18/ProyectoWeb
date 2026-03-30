import nodemailer from "nodemailer";

export async function enviarEmail(destino, asunto, mensaje) {
  try {
    console.log("EMAIL cargado:", process.env.EMAIL);
    console.log("PASS existe:", !!process.env.PASS);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: destino,
      subject: asunto,
      text: mensaje,
    });

    console.log("Correo enviado:", info);
    console.log("accepted:", info.accepted);
    console.log("rejected:", info.rejected);
    console.log("response:", info.response);

    return { ok: true, info };
  } catch (error) {
    console.error("Error enviando correo:");
    console.error("message:", error.message);
    console.error("code:", error.code);
    console.error("response:", error.response);
    console.error("responseCode:", error.responseCode);
    console.error("command:", error.command);

    return {
      ok: false,
      error: error.message,
      code: error.code || null,
      response: error.response || null,
      responseCode: error.responseCode || null,
      command: error.command || null,
    };
  }
}