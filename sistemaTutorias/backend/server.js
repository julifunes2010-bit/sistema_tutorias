import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import nodemailer from "nodemailer"
import crypto from "crypto"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
const codigos = new Map()

app.use(cors())
app.use(express.json())

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
})

const esCorreoInstitucional = (email) =>
  /^[a-zA-Z0-9._%+-]+@escuelasproa\.edu\.ar$/.test(email.trim())

app.get("/api/health", (req, res) => {
  res.json({ ok: true, mensaje: "Servidor funcionando" })
})

app.post("/api/enviar-codigo", async (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase()

  if (!esCorreoInstitucional(email)) {
    return res.status(400).json({
      mensaje: "Debes utilizar un correo institucional (@escuelasproa.edu.ar)."
    })
  }

  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    return res.status(500).json({
      mensaje: "El servidor de correo todavía no está configurado."
    })
  }

  const ahora = Date.now()
  const anterior = codigos.get(email)

  if (anterior && ahora - anterior.enviadoEn < 60000) {
    return res.status(429).json({
      mensaje: "Espera un minuto antes de solicitar otro código."
    })
  }

  const codigo = crypto.randomInt(100000, 1000000).toString()

  codigos.set(email, {
    codigo,
    expiraEn: ahora + 10 * 60 * 1000,
    enviadoEn: ahora,
    intentos: 0
  })

  try {
    await transporter.sendMail({
      from: `Tutorías PROA <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Código para recuperar tu contraseña - Tutorías PROA",
      text: `Tu código de recuperación es: ${codigo}\n\nEste código vence en 10 minutos. Si no solicitaste recuperar tu contraseña, ignora este mensaje.`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:25px;border:1px solid #ddd;border-radius:12px">
          <h2 style="color:#2d7ff9">Tutorías PROA</h2>
          <p>Recibimos una solicitud para recuperar tu contraseña.</p>
          <p>Tu código de recuperación es:</p>
          <div style="font-size:32px;font-weight:bold;letter-spacing:8px;text-align:center;padding:20px;background:#f4f7f9;border-radius:10px">${codigo}</div>
          <p>El código vence en <strong>10 minutos</strong>.</p>
          <p>Si no solicitaste este cambio, puedes ignorar este correo.</p>
        </div>
      `
    })

    res.json({ mensaje: "Código enviado correctamente." })
  } catch (error) {
    codigos.delete(email)
    console.error("Error enviando correo:", error.message)
    res.status(500).json({
      mensaje: "No se pudo enviar el correo. Revisa la configuración de Gmail."
    })
  }
})

app.post("/api/verificar-codigo", (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase()
  const codigo = String(req.body.codigo || "").trim()
  const registro = codigos.get(email)

  if (!registro) {
    return res.status(400).json({ mensaje: "No existe un código activo para este correo." })
  }

  if (Date.now() > registro.expiraEn) {
    codigos.delete(email)
    return res.status(400).json({ mensaje: "El código expiró. Solicita uno nuevo." })
  }

  if (registro.intentos >= 5) {
    codigos.delete(email)
    return res.status(429).json({ mensaje: "Demasiados intentos. Solicita un código nuevo." })
  }

  if (codigo !== registro.codigo) {
    registro.intentos++
    return res.status(400).json({ mensaje: "El código ingresado es incorrecto." })
  }

  registro.verificado = true
  res.json({ mensaje: "Código verificado correctamente." })
})

app.post("/api/cambiar-contrasena", (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase()
  const nuevaContrasena = String(req.body.nuevaContrasena || "")
  const registro = codigos.get(email)

  if (!registro || !registro.verificado || Date.now() > registro.expiraEn) {
    return res.status(400).json({ mensaje: "Primero debes verificar un código válido." })
  }

  if (nuevaContrasena.length < 6) {
    return res.status(400).json({ mensaje: "La contraseña debe tener al menos 6 caracteres." })
  }

  // Esta versión deja lista la recuperación de correo. La persistencia de usuarios
  // deberá conectarse a la base de datos que utilice el sistema.
  codigos.delete(email)

  res.json({ mensaje: "Contraseña actualizada correctamente." })
})

app.listen(PORT, () => {
  console.log(`Servidor de recuperación ejecutándose en http://localhost:${PORT}`)
})
