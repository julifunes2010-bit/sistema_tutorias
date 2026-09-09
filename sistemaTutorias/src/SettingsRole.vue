<template>
  <div class="settings-page">
    <RoleSidebar />

    <main class="settings-content">
      <div class="page-header">
        <h1>CONFIGURACIÓN</h1>
        <p>Administrá las opciones generales de tu cuenta.</p>
      </div>

      <section class="settings-card">
        <div class="setting-row">
          <div class="setting-icon">🔒</div>
          <div class="setting-info"><h2>Privacidad</h2><p>Elegí quién puede ver tu información.</p></div>
          <div class="privacy-options">
            <label><input type="radio" name="privacy" value="publico" v-model="privacidad" /> Público</label>
            <label><input type="radio" name="privacy" value="privado" v-model="privacidad" /> Privado</label>
          </div>
        </div>

        <div class="setting-row">
          <div class="setting-icon">🔐</div>
          <div class="setting-info"><h2>Bloquear cuenta</h2><p>Bloqueá temporalmente el acceso a tu cuenta.</p></div>
          <button class="action-button" @click="bloquearCuenta">Bloquear</button>
        </div>

        <div class="setting-row">
          <div class="setting-icon">🔔</div>
          <div class="setting-info"><h2>Notificaciones</h2><p>Recibí avisos sobre tus tutorías y actividades.</p></div>
          <label class="switch"><input type="checkbox" v-model="notificaciones" /><span class="slider"></span></label>
        </div>

        <div class="setting-row">
          <div class="setting-icon">❓</div>
          <div class="setting-info"><h2>Ayuda</h2><p>Consultá información y asistencia sobre el sistema.</p></div>
          <router-link to="/reportes" class="action-button">Ver ayuda</router-link>
        </div>

        <div class="setting-row">
          <div class="setting-icon">↪</div>
          <div class="setting-info"><h2>Cerrar sesión</h2><p>Salí de tu cuenta y volvé a la pantalla de inicio.</p></div>
          <button class="logout-button" @click="cerrarSesion">Cerrar sesión</button>
        </div>
      </section>

      <div class="settings-help">
        <span class="help-icon">💡</span>
        <div><h3>Configuración general</h3><p>Desde esta sección podés administrar las preferencias de tu cuenta y del sistema de tutorías.</p></div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { cerrarSesion as cerrarSesionAuth } from "./auth.js"
import RoleSidebar from "./components/RoleSidebar.vue"

const router = useRouter()
const privacidad = ref("publico")
const notificaciones = ref(true)

function bloquearCuenta() {
  alert("La función para bloquear la cuenta estará disponible próximamente.")
}

function cerrarSesion() {
  cerrarSesionAuth()
  router.push("/")
}
</script>

<style scoped>
*{box-sizing:border-box}.settings-page{min-height:100vh;width:100%;display:flex;background:#f4f7f9;font-family:Arial,Helvetica,sans-serif;color:#333}.settings-content{flex:1;min-height:100vh;margin-left:250px;padding:45px 50px 40px;max-width:1150px}.page-header{margin-bottom:30px}.page-header h1{margin:0 0 8px;font-size:32px;font-weight:500;letter-spacing:2px}.page-header p{margin:0;color:#888;font-size:14px}.settings-card{background:#fff;border:1px solid #e1e1e1;border-radius:12px;overflow:hidden;box-shadow:0 4px 15px rgba(0,0,0,.04)}.setting-row{min-height:105px;padding:24px 30px;display:flex;justify-content:space-between;align-items:center;gap:20px;border-bottom:1px solid #e8e8e8}.setting-row:last-child{border-bottom:none}.setting-icon{width:42px;height:42px;min-width:42px;border-radius:9px;background:#eef0ff;display:flex;align-items:center;justify-content:center;font-size:19px}.setting-info{flex:1}.setting-info h2{margin:0 0 6px;font-size:16px;font-weight:500}.setting-info p{margin:0;color:#888;font-size:13px}.privacy-options{display:flex;gap:18px;font-size:13px;color:#555}.privacy-options label{display:flex;align-items:center;gap:6px}.action-button,.logout-button{padding:10px 17px;border:1px solid #5159d8;border-radius:7px;background:#fff;color:#5159d8;font-size:13px;cursor:pointer;text-decoration:none;white-space:nowrap}.action-button:hover{background:#5159d8;color:#fff}.logout-button{border-color:#dc3545;color:#dc3545}.logout-button:hover{background:#dc3545;color:#fff}.switch{position:relative;width:46px;height:24px}.switch input{opacity:0;width:0;height:0}.slider{position:absolute;inset:0;background:#ccc;border-radius:20px;cursor:pointer;transition:.2s}.slider:before{content:"";position:absolute;width:18px;height:18px;left:3px;top:3px;background:#fff;border-radius:50%;transition:.2s}.switch input:checked+.slider{background:#5159d8}.switch input:checked+.slider:before{transform:translateX(22px)}.settings-help{margin-top:20px;padding:22px 25px;background:#fff;border:1px solid #e1e1e1;border-radius:12px;display:flex;gap:15px;align-items:flex-start}.help-icon{font-size:22px}.settings-help h3{margin:0 0 6px;font-size:16px}.settings-help p{margin:0;color:#888;font-size:13px;line-height:1.5}@media(max-width:900px){.settings-content{margin-left:70px;padding:30px 25px}.setting-row{flex-wrap:wrap}.setting-info{min-width:200px}}@media(max-width:600px){.settings-content{margin-left:0;padding:25px 15px}.setting-row{align-items:flex-start;flex-wrap:wrap}.privacy-options{width:100%}.action-button,.logout-button{margin-left:62px}}
</style>
