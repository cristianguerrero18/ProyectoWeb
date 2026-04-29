export async function enviarEmail(destino, asunto, mensaje) {
  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: "uts",
          email: "proyectosoporteplataformauts@gmail.com",
        },
        to: [
          {
            email: destino,
          },
        ],
        subject: asunto,
        textContent: mensaje,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error Brevo:", data);
      return {
        ok: false,
        error: data.message || "No se pudo enviar el correo",
      };
    }

    return { ok: true, data };
  } catch (error) {
    console.error("Error enviando correo:", error);
    return {
      ok: false,
      error: error.message,
    };
  }
}
