<template>
  <div class="login-page">
    <main class="login-container">
      <div class="logo-container">
        <img src="./assets/proa.jpg" alt="Logo PROA" class="logo-image" />
        <span>TUTORÍAS</span>
      </div>
      <h1>INICIA SESIÓN</h1>
      <p class="subtitle">Ingresá a tu cuenta para continuar</p>
      <form @submit.prevent="iniciarSesion">
        <div class="input-group">
          <label for="email">Correo electrónico</label>
          <input id="email" type="email" v-model="email" placeholder="Ingresá tu correo" :class="{ 'input-error': errorTipo === 'email' || errorTipo === 'ambos' }" @input="limpiarError" required />
          <p v-if="errorTipo === 'email' || errorTipo === 'ambos'" class="error-message">El correo electrónico no coincide.</p>
        </div>
        <div class="input-group">
          <label for="password">Contraseña</label>
          <div class="password-container">
            <input id="password" :type="mostrarPassword ? 'text' : 'password'" v-model="password" placeholder="Ingresá tu contraseña" :class="{ 'input-error': errorTipo === 'password' || errorTipo === 'ambos' }" @input="limpiarError" required />
            <button type="button" class="eye-button" @click="mostrarPassword = !mostrarPassword" :aria-label="mostrarPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'">{{ mostrarPassword ? '◉' : '○' }}</button>
          </div>
          <p v-if="errorTipo === 'password' || errorTipo === 'ambos'" class="error-message">La contraseña no coincide.</p>
        </div>
        <div class="options">
          <label class="remember"><input type="checkbox" v-model="recordar" /><span>Recordar usuario</span></label>
          <router-link to="/recuperar">¿Olvidaste tu contraseña?</router-link>
        </div>
        <button type="submit" class="login-button">INICIAR SESIÓN</button>
      </form>
      <p class="register">¿No tenés una cuenta? <router-link to="/register">Registrate</router-link></p>
    </main>
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-brand"><strong>Tutorías PROA</strong><span>Sistema de tutorías</span></div>
        <div class="footer-links"><a href="#" @click.prevent>💬 WhatsApp</a><a href="mailto:tutorias@proa.com">✉️ Contacto</a></div>
      </div>
      <div class="footer-bottom">© {{ new Date().getFullYear() }} Tutorías PROA · Todos los derechos reservados</div>
    </footer>
  </div>
</template>

<script>
import { useRouter } from "vue-router"
import { iniciarSesion as autenticar } from "./auth.js"

export default {
  name: "Login",
  setup() { const router = useRouter(); return { router } },
  data() { return { email: "", password: "", recordar: false, mostrarPassword: false, errorTipo: "" } },
  methods: {
    iniciarSesion() {
      this.errorTipo = ""
      const resultado = autenticar(this.email.trim(), this.password)
      if (!resultado.ok) {
        const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]")
        const existeCorreo = usuarios.some(usuario => usuario.email.toLowerCase() === this.email.trim().toLowerCase())
        this.errorTipo = existeCorreo ? "password" : "email"
        return
      }
      if (this.recordar) localStorage.setItem("emailRecordado", this.email.trim())
      else localStorage.removeItem("emailRecordado")
      this.router.push("/home")
    },
    limpiarError() { this.errorTipo = "" }
  },
  mounted() { this.email = localStorage.getItem("emailRecordado") || "" }
}
</script>

<style scoped>
*{box-sizing:border-box}.login-page{width:100%;min-height:100vh;display:flex;flex-direction:column;background:#f4f7f9;font-family:Arial,Helvetica,sans-serif;color:#222}.login-container{width:430px;max-width:calc(100% - 40px);margin:auto;padding:42px 45px;background:white;border-radius:18px;box-shadow:0 10px 35px rgba(0,0,0,.10)}.logo-container{display:flex;align-items:center;gap:12px;margin-bottom:30px}.logo-image{width:65px;height:65px;object-fit:contain}.logo-container span{font-size:20px;font-weight:bold;color:#333}h1{margin:0;text-align:center;font-size:30px;font-weight:400;color:#222}.subtitle{margin:10px 0 30px;text-align:center;color:#777;font-size:14px}.input-group{margin-bottom:20px}.input-group label{display:block;margin-bottom:8px;font-size:14px;font-weight:bold;color:#333}.input-group input{width:100%;height:46px;padding:0 14px;border:1px solid #d5d5d5;border-radius:8px;outline:none;font-size:14px;transition:.2s}.input-group input:focus{border-color:#2d7ff9;box-shadow:0 0 0 3px rgba(45,127,249,.10)}.input-group input.input-error{border-color:#dc3545}.error-message{margin:6px 0 0;color:#dc3545;font-size:12px;font-weight:500}.password-container{position:relative;width:100%}.password-container input{padding-right:50px}.eye-button{position:absolute;right:6px;top:50%;transform:translateY(-50%);width:38px;height:38px;border:none;background:transparent;color:#777;cursor:pointer;font-size:18px}.options{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:25px;font-size:12px}.remember{display:flex;align-items:center;gap:6px;white-space:nowrap}.options a,.register a{color:#2d7ff9;text-decoration:none}.login-button{width:100%;height:48px;border:none;border-radius:8px;background:#2d7ff9;color:white;font-size:14px;font-weight:bold;cursor:pointer}.login-button:hover{background:#1769dc}.register{margin:25px 0 0;text-align:center;color:#777;font-size:13px}.register a{font-weight:bold}.footer{width:100%;margin-top:auto;padding:25px 30px 15px;background:white;border-top:1px solid #e5e5e5}.footer-content{max-width:900px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;gap:30px}.footer-brand{display:flex;flex-direction:column;gap:5px}.footer-brand strong{color:#333;font-size:15px}.footer-brand span{color:#888;font-size:12px}.footer-links{display:flex;gap:20px}.footer-links a{color:#666;font-size:13px;text-decoration:none}.footer-bottom{max-width:900px;margin:20px auto 0;padding-top:12px;border-top:1px solid #eee;text-align:center;color:#999;font-size:11px}@media(max-width:600px){.login-container{padding:30px 25px}.footer-content{flex-direction:column;text-align:center}}
</style>
