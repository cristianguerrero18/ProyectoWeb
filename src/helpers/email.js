import nodemailer from "nodemailer";

export async function enviarEmail(destino, asunto, mensaje) {
  try {
    // Configuración optimizada para Gmail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS, // Contraseña de aplicación
      },
      pool: true, // Usar pool de conexiones
      maxConnections: 1, // Máximo 1 conexión a la vez
      maxMessages: 5, // Máximo 5 mensajes por conexión
      rateLimit: 2, // 2 mensajes por segundo
    });

    // Para dominios institucionales, agregar headers especiales
    const mailOptions = {
      from: `"UTS Plataforma" <${process.env.EMAIL}>`,
      to: destino,
      subject: asunto,
      text: mensaje,
      headers: {
        'X-Priority': '3', // Prioridad normal
        'X-Mailer': 'UTS Platform', // Identificador personalizado
        'List-Unsubscribe': `<mailto:${process.env.EMAIL}?subject=unsubscribe>`,
      },
    };

    // Si es dominio institucional, intentar con un delay y reintentos
    if (destino.includes('@uts.edu.co')) {
      console.log(`📧 Enviando a dominio institucional: ${destino}`);
      // Esperar 2 segundos antes de enviar
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email enviado a ${destino} - Message ID: ${info.messageId}`);
    return { ok: true };
  } catch (error) {
    console.error(`❌ Error enviando a ${destino}:`, error);
    
    // Log más detallado para diagnóstico
    if (error.response) {
      console.error('Respuesta del servidor:', error.response);
    }
    
    return { ok: false, error: error.message };
  }
}