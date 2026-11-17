const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
}

function respond(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  })
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders })
  if (request.method !== "POST") return respond({ error: "Método no permitido." }, 405)

  const supabaseUrl = Deno.env.get("SUPABASE_URL")
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")
  const resendApiKey = Deno.env.get("RESEND_API_KEY")
  const fromEmail = Deno.env.get("HELP_CHAT_FROM_EMAIL")
  if (!supabaseUrl || !supabaseAnonKey || !resendApiKey || !fromEmail) {
    console.error("Falta configurar uno o más secretos de help-chat.")
    return respond({ error: "El servicio de ayuda todavía no está configurado." }, 503)
  }

  const authorization = request.headers.get("Authorization")
  if (!authorization?.startsWith("Bearer ")) {
    return respond({ error: "Iniciá sesión para enviar una consulta." }, 401)
  }

  let user: { email?: string }
  try {
    const authResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: { apikey: supabaseAnonKey, Authorization: authorization },
    })
    if (!authResponse.ok) return respond({ error: "La sesión venció. Volvé a iniciar sesión." }, 401)
    user = await authResponse.json()
  } catch {
    return respond({ error: "No se pudo validar la sesión." }, 503)
  }

  let body: { message?: unknown }
  try {
    body = await request.json()
  } catch {
    return respond({ error: "El mensaje no tiene un formato válido." }, 400)
  }

  const message = typeof body.message === "string" ? body.message.trim() : ""
  if (!message || message.length > 2000) {
    return respond({ error: "Escribí un mensaje de hasta 2000 caracteres." }, 400)
  }

  const emailText = user.email ? `Correo para responder: ${user.email}\n\n` : ""
  const emailResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: ["est.sandoval.maximo@gmail.com"],
      subject: "Consulta desde Ayuda Beta · Sistema de Tutorías",
      text: `${emailText}Mensaje:\n${message}`,
      ...(user.email ? { reply_to: user.email } : {}),
    }),
  })

  if (!emailResponse.ok) {
    console.error("El proveedor de correo rechazó el mensaje.", emailResponse.status)
    return respond({ error: "No se pudo enviar el mensaje. Probá de nuevo más tarde." }, 502)
  }

  return respond({ ok: true })
})
