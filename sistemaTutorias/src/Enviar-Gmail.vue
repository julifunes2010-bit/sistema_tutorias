<template>
  <div class="forgot-container">
    <div class="forgot-box">
      <h1>RECUPERAR CONTRASEÑA</h1>
      <p class="subtitle">Ingresá tu correo institucional y te enviaremos un código de recuperación.</p>

      <form @submit.prevent="enviarCodigo">
        <label for="email">Correo institucional</label>
        <input id="email" v-model="email" type="email" placeholder="ejemplo@escuelasproa.edu.ar" required />

        <p v-if="error" class="error">⚠ {{ error }}</p>
        <p v-if="mensaje" class="success">✓ {{ mensaje }}</p>

        <button type="submit" :disabled="cargando">
          {{ cargando ? 'ENVIANDO...' : 'ENVIAR CÓDIGO' }}
        </button>
      </form>

      <button class="back-button" type="button" @click="volverLogin">← Volver a iniciar sesión</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const email = ref("")
const error = ref("")
const mensaje = ref("")
const cargando = ref(false)

const esCorreoInstitucional = () =>
  /^[a-zA-Z0-9._%+-]+@escuelasproa\.edu\.ar$/.test(email.value.trim())

const enviarCodigo = async () => {
  error.value = ""
  mensaje.value = ""

  if (!esCorreoInstitucional()) {
    error.value = "Debes utilizar un correo institucional (@escuelasproa.edu.ar)."
    return
  }

  cargando.value = true

  try {
    const respuesta = await fetch("http://localhost:3000/api/enviar-codigo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.value.trim() })
    })

    const datos = await respuesta.json()

    if (!respuesta.ok) throw new Error(datos.mensaje || "No se pudo enviar el código.")

    mensaje.value = "Código enviado correctamente a tu correo."

    setTimeout(() => {
      router.push({ path: "/recuperar", query: { email: email.value.trim() } })
    }, 800)
  } catch (err) {
    error.value = err.message || "No se pudo conectar con el servidor."
  } finally {
    cargando.value = false
  }
}

const volverLogin = () => router.push("/")
</script>

<style scoped>
* { box-sizing: border-box; }
.forgot-container { min-height:100vh; display:flex; justify-content:center; align-items:center; padding:30px; background:radial-gradient(circle at 50% 0%,#18243d 0%,#090d18 45%,#020308 100%); font-family:Arial,Helvetica,sans-serif; }
.forgot-box { width:420px; padding:40px; background:rgba(7,11,21,.96); border:1px solid #00f7ff; border-radius:18px; box-shadow:0 0 8px #00f7ff,0 0 25px rgba(0,247,255,.5),0 0 60px rgba(0,247,255,.2),inset 0 0 25px rgba(0,247,255,.05); }
h1 { margin:0 0 12px; text-align:center; color:#00f7ff; font-size:27px; letter-spacing:2px; text-shadow:0 0 5px #00f7ff,0 0 15px #00f7ff; }
.subtitle { margin-bottom:28px; text-align:center; color:#8f9bb3; line-height:1.5; }
form { display:flex; flex-direction:column; }
label { margin-bottom:8px; color:#e8fbff; font-size:14px; font-weight:bold; }
input { width:100%; padding:13px; background:#080d18; color:white; border:1px solid #263750; border-radius:8px; font-size:15px; }
input:focus { outline:none; border-color:#00f7ff; box-shadow:0 0 5px #00f7ff,0 0 15px rgba(0,247,255,.5); }
button { margin-top:22px; padding:13px; border:1px solid #00f7ff; border-radius:8px; background:transparent; color:#00f7ff; font-weight:bold; cursor:pointer; transition:.25s; }
button:hover:not(:disabled) { background:#00f7ff; color:#020308; box-shadow:0 0 10px #00f7ff,0 0 25px #00f7ff; }
button:disabled { opacity:.5; cursor:not-allowed; }
.error { color:#ff3978; font-size:13px; margin-top:10px; }
.success { color:#00ff9d; font-size:13px; margin-top:10px; }
.back-button { width:100%; border-color:#a855f7; color:#c084fc; }
.back-button:hover:not(:disabled) { background:#a855f7; color:white; box-shadow:0 0 10px #a855f7,0 0 25px #a855f7; }
@media(max-width:500px){.forgot-box{width:100%;padding:30px 25px;}h1{font-size:23px;}}
</style>
