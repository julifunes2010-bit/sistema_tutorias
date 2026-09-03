<template>
  <div class="login-page">
    <main class="login-container">
      <div class="logo-container"><img src="./assets/proa.jpg" alt="Logo PROA" class="logo-image" /><span>TUTORÍAS</span></div>
      <h1>INICIA SESIÓN</h1>
      <p class="subtitle">Ingresá a tu cuenta para continuar</p>
      <form @submit.prevent="iniciarSesion">
        <div class="input-group"><label for="email">Correo electrónico</label><input id="email" v-model="email" type="email" placeholder="Ingresá tu correo" required @input="error = ''" /></div>
        <div class="input-group"><label for="password">Contraseña</label><div class="password-container"><input id="password" v-model="password" :type="mostrarPassword ? 'text' : 'password'" placeholder="Ingresá tu contraseña" required @input="error = ''" /><button type="button" class="eye-button" @click="mostrarPassword = !mostrarPassword">{{ mostrarPassword ? '🙈' : '👁️' }}</button></div></div>
        <div class="options"><label class="remember"><input type="checkbox" v-model="recordar" /> Recordar usuario</label><router-link to="/recuperar">¿Olvidaste tu contraseña?</router-link></div>
        <p v-if="error" class="error-message">{{ error }}</p>
        <button type="submit" class="login-button" :disabled="cargando">{{ cargando ? 'INGRESANDO...' : 'INICIAR SESIÓN' }}</button>
      </form>
      <p class="register">¿No tenés una cuenta? <router-link to="/register">Registrate</router-link></p>
    </main>
    <footer class="footer"><div class="footer-content"><div class="footer-brand"><strong>Tutorías PROA</strong><span>Sistema de tutorías</span></div><div class="footer-links"><span>📷 Instagram</span><span>💬 WhatsApp</span><a href="mailto:tutorias@proa.com">✉️ Contacto</a></div></div><div class="footer-bottom">© {{ new Date().getFullYear() }} Tutorías PROA · Todos los derechos reservados</div></footer>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"

const API = "http://localhost:3000/api"
const router = useRouter()
const email = ref(localStorage.getItem("recordarEmail") || "")
const password = ref("")
const recordar = ref(Boolean(email.value))
const mostrarPassword = ref(false)
const error = ref("")
const cargando = ref(false)

async function iniciarSesion() {
  error.value = ""
  const correo = email.value.trim().toLowerCase()
  if (!correo || !password.value) { error.value = "Completá el correo y la contraseña."; return }
  cargando.value = true
  try {
    const respuesta = await fetch(`${API}/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: correo, password: password.value }) })
    const datos = await respuesta.json()
    if (!respuesta.ok) throw new Error(datos.mensaje)
    if (recordar.value) localStorage.setItem("recordarEmail", correo)
    else localStorage.removeItem("recordarEmail")
    localStorage.setItem("usuario", JSON.stringify(datos.usuario))
    router.push("/home")
  } catch (e) { error.value = e.message || "No se pudo conectar con el servidor." }
  finally { cargando.value = false }
}
</script>

<style scoped>
*{box-sizing:border-box}.login-page{width:100%;min-height:100vh;display:flex;flex-direction:column;background:#f4f7f9;font-family:Arial,Helvetica,sans-serif;color:#222}.login-container{width:430px;max-width:calc(100% - 40px);margin:auto;padding:42px 45px;background:white;border-radius:18px;box-shadow:0 10px 35px rgba(0,0,0,.1)}.logo-container{display:flex;align-items:center;gap:12px;margin-bottom:30px}.logo-image{width:65px;height:65px;object-fit:contain}.logo-container span{font-size:20px;font-weight:bold;color:#333}h1{margin:0;text-align:center;font-size:30px;font-weight:400;color:#222}.subtitle{margin:10px 0 30px;text-align:center;color:#777;font-size:14px}.input-group{margin-bottom:20px}.input-group label{display:block;margin-bottom:8px;font-size:14px;font-weight:bold;color:#333}.input-group input{width:100%;height:46px;padding:0 14px;border:1px solid #d5d5d5;border-radius:8px;outline:none;font-size:14px}.password-container{position:relative}.password-container input{padding-right:50px}.eye-button{position:absolute;right:5px;top:4px;width:38px;height:38px;border:0;background:transparent;cursor:pointer}.options{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:20px;font-size:12px}.remember{display:flex;align-items:center;gap:6px;white-space:nowrap}.options a{color:#2d7ff9;text-decoration:none}.error-message{margin:8px 0;color:#dc3545;font-size:13px}.login-button{width:100%;height:48px;border:0;border-radius:8px;background:#2d7ff9;color:white;font-size:14px;font-weight:bold;cursor:pointer}.login-button:disabled{opacity:.6;cursor:not-allowed}.register{margin:25px 0 0;text-align:center;color:#777;font-size:13px}.register a{color:#2d7ff9;font-weight:bold;text-decoration:none}.footer{width:100%;margin-top:auto;padding:25px 30px 15px;background:#fff;border-top:1px solid #e5e5e5}.footer-content{max-width:900px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;gap:30px}.footer-brand{display:flex;flex-direction:column;gap:5px}.footer-brand strong{color:#333;font-size:15px}.footer-brand span{color:#888;font-size:12px}.footer-links{display:flex;align-items:center;gap:20px}.footer-links span,.footer-links a{color:#666;font-size:13px;text-decoration:none}.footer-bottom{text-align:center;margin-top:20px;color:#999;font-size:11px}@media(max-width:600px){.login-container{padding:30px 25px}.footer-content{flex-direction:column}.footer-links{flex-wrap:wrap;justify-content:center}}
</style>
