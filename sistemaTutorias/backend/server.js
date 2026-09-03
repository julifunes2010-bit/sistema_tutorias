import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import nodemailer from "nodemailer"
import crypto from "crypto"
import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from "url"

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const USERS_FILE = path.join(__dirname, "users-db.json")
const app = express()
const PORT = process.env.PORT || 3000
const codigos = new Map()

app.use(cors())
app.use(express.json())

const esCorreoInstitucional = (email) => /^[a-zA-Z0-9._%+-]+@escuelasproa\.edu\.ar$/.test(email.trim())

async function leerUsuarios() {
  try {
    return JSON.parse(await fs.readFile(USERS_FILE, "utf8"))
  } catch {
    return {}
  }
}

async function guardarUsuarios(usuarios) {
  await fs.writeFile(USERS_FILE, JSON.stringify(usuarios, null, 2), "utf8")
}

function crearHash(password) {
  const salt = crypto.randomBytes(16)
  const hash = crypto.scryptSync(password, salt, 64)
  return { salt: salt.toString("base64"), passwordHash: hash.toString("base64") }
}

function comprobarPassword(password, usuario) {
  const salt = Buffer.from(usuario.salt, "base64")
  const esperado = Buffer.from(usuario.passwordHash, "base64")
  const actual = crypto.scryptSync(password, salt, 64)
  return crypto.timingSafeEqual(actual, esperado)
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
})

app.get("/api/health", (req, res) => {
  res.json({ ok: true, mensaje: "Servidor funcionando" })
})

app.post("/api/registro", async (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase()
  const password = String(req.body.password || "")
  const rol = String(req.body.rol || "profesor")

  if (!esCorreoInstitucional(email)) return res.status(400).json({ mensaje: "Debes utilizar un correo institucional (@escuelasproa.edu.ar)." })
  if (password.length < 6) return res.status(400).json({ mensaje: "La contraseña debe tener al menos 6 caracteres." })

  const rolesValidos = ["director", "preceptor", "coordinador", "secretario", "profesor"]
  if (!rolesValidos.includes(rol)) return res.status(400).json({ mensaje: "El rol seleccionado no es válido." })

  const usuarios = await leerUsuarios()
  if (usuarios[email]) return res.status(409).json({ mensaje: "Ya existe una cuenta con ese correo." })

  const credenciales = crearHash(password)
  usuarios[email] = { ...credenciales, rol }
  await guardarUsuarios(usuarios)

  res.status(201).json({ mensaje: "Cuenta creada correctamente." })
})

app.post("/api/login", async (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase()
  const password = String(req.body.password || "")
  const usuarios = await leerUsuarios()
  const usuario = usuarios[email]

  if (!usuario || !comprobarPassword(password, usuario)) {
    return res.status(401).json({ mensaje: "El correo o la contraseña son incorrectos." })
  }

  res.json({ mensaje: "Inicio de sesión correcto.", usuario: { email, rol: usuario.rol } })
})

app.post("/api/enviar-codigo", async (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase()
  if (!esCorreoInstitucional(email)) return res.status(400).json({ mensaje: "Debes utilizar un correo institucional (@escuelasproa.edu.ar)." })

  const usuarios = await leerUsuarios()
  if (!usuarios[email]) return res.status(404).json({ mensaje: "No existe una cuenta registrada con ese correo." })

  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    return res.status(500).json({ mensaje: "El servidor de correo todavía no está configurado." })
  }

  const ahora = Date.now()
  const anterior = codigos.get(email)
  if (anterior && ahora - anterior.enviadoEn < 60000) return res.status(429).json({ mensaje: "Espera un minuto antes de solicitar otro código." })

  const codigo = crypto.randomInt(100000, 1000000).toString()
  codigos.set(email, { codigo, expiraEn: ahora + 10 * 60 * 1000, enviadoEn: ahora, intentos: 0, verificado: false })

  try {
    await transporter.sendMail({
      from: `Tutorías PROA <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Código para recuperar tu contraseña - Tutorías PROA",
      text: `Tu código de recuperación es: ${codigo}. Este código vence en 10 minutos.`,
      html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:25px;border:1px solid #ddd;border-radius:12px"><h2 style="color:#2d7ff9">Tutorías PROA</h2><p>Recibimos una solicitud para recuperar tu contraseña.</p><p>Tu código de recuperación es:</p><div style="font-size:32px;font-weight:bold;letter-spacing:8px;text-align:center;padding:20px;background:#f4f7f9;border-radius:10px">${codigo}</div><p>El código vence en <strong>10 minutos</strong>.</p><p>Si no solicitaste este cambio, ignora este correo.</p></div>`
    })
    res.json({ mensaje: "Código enviado correctamente." })
  } catch (error) {
    codigos.delete(email)
    console.error("Error enviando correo:", error.message)
    res.status(500).json({ mensaje: "No se pudo enviar el correo. Revisa la configuración de Gmail." })
  }
})

app.post("/api/verificar-codigo", (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase()
  const codigo = String(req.body.codigo || "").trim()
  const registro = codigos.get(email)

  if (!registro) return res.status(400).json({ mensaje: "No existe un código activo para este correo." })
  if (Date.now() > registro.expiraEn) { codigos.delete(email); return res.status(400).json({ mensaje: "El código expiró. Solicita uno nuevo." }) }
  if (registro.intentos >= 5) { codigos.delete(email); return res.status(429).json({ mensaje: "Demasiados intentos. Solicita un código nuevo." }) }
  if (codigo !== registro.codigo) { registro.intentos++; return res.status(400).json({ mensaje: "El código ingresado es incorrecto." }) }

  registro.verificado = true
  res.json({ mensaje: "Código verificado correctamente." })
})

app.post("/api/cambiar-contrasena", async (req, res) => {
  const email = String(req.body.email || "").trim().toLowerCase()
  const nuevaContrasena = String(req.body.nuevaContrasena || "")
  const registro = codigos.get(email)

  if (!registro || !registro.verificado || Date.now() > registro.expiraEn) return res.status(400).json({ mensaje: "Primero debes verificar un código válido." })
  if (nuevaContrasena.length < 6) return res.status(400).json({ mensaje: "La contraseña debe tener al menos 6 caracteres." })

  const usuarios = await leerUsuarios()
  if (!usuarios[email]) return res.status(404).json({ mensaje: "La cuenta no existe." })

  const credenciales = crearHash(nuevaContrasena)
  usuarios[email].salt = credenciales.salt
  usuarios[email].passwordHash = credenciales.passwordHash
  await guardarUsuarios(usuarios)
  codigos.delete(email)

  res.json({ mensaje: "Contraseña actualizada correctamente." })
})

app.listen(PORT, () => console.log(`Servidor de recuperación ejecutándose en http://localhost:${PORT}`))
