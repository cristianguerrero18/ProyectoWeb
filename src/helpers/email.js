// Función asíncrona encargada de enviar correos electrónicos usando la API SMTP de Brevo
export async function enviarEmail(destino, asunto, mensaje) {
  try {
    // Se realiza una petición HTTP POST al endpoint oficial de Brevo para envío de correos
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",

      // Encabezados requeridos por Brevo para autenticar y procesar la solicitud
      headers: {
        "accept": "application/json",
        "content-type": "application/json",

        // Clave privada de la API de Brevo.
        // Debe estar guardada en las variables de entorno por seguridad.
        "api-key": process.env.BREVO_API_KEY,
      },

      // Cuerpo de la solicitud con la información del correo a enviar
      body: JSON.stringify({
        // Remitente autorizado/verificado previamente en Brevo
        sender: {
          name: "uts",
          email: "proyectosoporteplataformauts@gmail.com",
        },

        // Destinatario del correo, recibido como parámetro de la función
        to: [
          {
            email: destino,
          },
        ],

        // Asunto del correo, recibido como parámetro
        subject: asunto,

        // Contenido del mensaje en texto plano
        textContent: mensaje,
      }),
    });

    // Se convierte la respuesta de Brevo a formato JSON para poder analizarla
    const data = await response.json();

    // Si Brevo responde con error, se registra y se devuelve una respuesta controlada
    if (!response.ok) {
      console.error("Error Brevo:", data);

      return {
        ok: false,
        error: data.message || "No se pudo enviar el correo",
      };
    }

    // Si el correo fue enviado correctamente, se retorna la respuesta exitosa
    return { ok: true, data };
  } catch (error) {
    // Captura errores inesperados, como problemas de conexión o fallos del servidor
    console.error("Error enviando correo:", error);

    return {
      ok: false,
      error: error.message,
    };
  }
}
