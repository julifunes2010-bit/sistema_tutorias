<template>
  <div class="register-container">
    <div class="register-box">
      <h1>Crear cuenta</h1>
      <p>Registrate con tu correo institucional</p>

      <form @submit.prevent="registrarse">
        <label for="email">Correo institucional</label>
        <input id="email" type="email" v-model="email" placeholder="ejemplo@escuelasproa.edu.ar" required />
        <p v-if="email && !esCorreoInstitucional" class="error">Debes utilizar un correo institucional.</p>

        <label for="password">Contraseña</label>
        <input id="password" type="password" v-model="password" placeholder="Ingresá tu contraseña" required />

        <label for="confirmPassword">Confirmar contraseña</label>
        <input id="confirmPassword" type="password" v-model="confirmPassword" placeholder="Repetí tu contraseña" required />

        <label for="rol">Seleccioná tu rol</label>
        <select id="rol" v-model="rol" required>
          <option value="director">Director</option>
          <option value="preceptor">Preceptor</option>
          <option value="coordinador">Coordinador</option>
          <option value="secretario">Secretario</option>
          <option value="profesor">Profesor</option>
        </select>

        <p v-if="error" class="error">{{ error }}</p>
        <p v-if="correcto" class="correcto">{{ correcto }}</p>

        <button type="submit" :disabled="cargando">{{ cargando ? 'Creando cuenta...' : 'Registrarse' }}</button>
      </form>

      <div class="login-link">
        <p>¿Ya tenés una cuenta?</p>
        <router-link to="/">Iniciar sesión</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { useRouter } from "vue-router"

const API = "http://localhost:3000/api"
const router = useRouter()
const email = ref("")
const password = ref("")
const confirmPassword = ref("")
const rol = ref("profesor")
const error = ref("")
const correcto = ref("")
const cargando = ref(false)

const esCorreoInstitucional = computed(() => /^[a-zA-Z0-9._%+-]+@escuelasproa\.edu\.ar$/.test(email.value.trim()))

async function registrarse() {
  error.value = ""
  correcto.value = ""
  const correo = email.value.trim().toLowerCase()

  if (!esCorreoInstitucional.value) return (error.value = "El correo ingresado no es institucional.")
  if (password.value.length < 6) return (error.value = "La contraseña debe tener al menos 6 caracteres.")
  if (password.value !== confirmPassword.value) return (error.value = "Las contraseñas no coinciden.")

  cargando.value = true
  try {
    const respuesta = await fetch(`${API}/registro`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: correo, password: password.value, rol: rol.value })
    })
    const datos = await respuesta.json()
    if (!respuesta.ok) throw new Error(datos.mensaje)
    correcto.value = "Cuenta creada correctamente. Volviendo al inicio de sesión..."
    setTimeout(() => router.push("/"), 1200)
  } catch (e) {
    error.value = e.message || "No se pudo crear la cuenta. ¿Está iniciado el servidor?"
  } finally {
    cargando.value = false
  }
}
</script>

<style scoped>
*{box-sizing:border-box}.register-container{min-height:100vh;display:flex;justify-content:center;align-items:center;background:#f4f6f8}.register-box{width:400px;padding:35px;background:white;border-radius:12px;box-shadow:0 5px 20px rgba(0,0,0,.15)}h1{text-align:center;color:#111;margin-bottom:10px}.register-box>p{text-align:center;color:#555;margin-bottom:25px}form{display:flex;flex-direction:column}label{color:#333;margin-top:15px;margin-bottom:6px;font-weight:bold}input,select{padding:12px;border:1px solid #3ca2dd;border-radius:6px;font-size:15px;background:white}input:focus,select:focus{outline:none;border-color:#42b883}button{margin-top:20px;padding:12px;border:none;border-radius:6px;background:#42b883;color:white;font-size:16px;cursor:pointer}button:disabled{opacity:.6;cursor:not-allowed}.error{color:#d93025!important;font-size:14px;margin:8px 0 0!important}.correcto{color:#188038!important;font-size:14px;margin:12px 0 0!important}.login-link{margin-top:20px;text-align:center}.login-link p{color:#666;margin-bottom:8px}.login-link a{color:#2d7ff9;font-weight:bold;text-decoration:none}
</style>
