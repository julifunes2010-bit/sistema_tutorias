<template>
  <div class="pagina">
    <div class="contenedor">
      <img class="auth-brand-logo" src="./assets/proa.jpg" alt="Logo ProA">
      <h1>RECUPERAR<br>CONTRASEÑA</h1>

      <form v-if="!actualizandoPassword" @submit.prevent="enviarCodigo">
        <p class="descripcion">Ingresá tu correo institucional y te enviaremos un enlace para restablecer la contraseña.</p>
        <div class="campo">
          <label for="correo">Correo electrónico</label>
          <input id="correo" v-model.trim="correo" type="email" autocomplete="email" required placeholder="Ingresá tu correo">
        </div>
        <button class="boton" type="submit" :disabled="cargando">
          {{ cargando ? "Enviando…" : "Enviar enlace" }}
        </button>
      </form>

      <form v-else @submit.prevent="cambiarPassword">
        <p class="descripcion">Elegí una contraseña nueva para tu cuenta.</p>
        <div class="campo">
          <label for="nueva-password">Nueva contraseña</label>
          <input id="nueva-password" v-model="nuevaPassword" type="password" minlength="8" autocomplete="new-password" required>
        </div>
        <div class="campo">
          <label for="confirmar-password">Confirmar contraseña</label>
          <input id="confirmar-password" v-model="confirmarPassword" type="password" minlength="8" autocomplete="new-password" required>
        </div>
        <button class="boton" type="submit" :disabled="cargando">
          {{ cargando ? "Guardando…" : "Cambiar contraseña" }}
        </button>
      </form>

      <p v-if="mensaje" :class="tipoMensaje" role="status">{{ mensaje }}</p>
      <router-link to="/" class="volver-login">Volver al inicio de sesión</router-link>
    </div>
  </div>
</template>

<script setup>
import { onUnmounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import { supabase } from "./lib/supabase.js"

const route = useRoute()
const router = useRouter()
const correo = ref(String(route.query.email || ""))
const actualizandoPassword = ref(false)
const nuevaPassword = ref("")
const confirmarPassword = ref("")
const mensaje = ref("")
const tipoMensaje = ref("")
const cargando = ref(false)

const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
  if (event === "PASSWORD_RECOVERY" || (event === "INITIAL_SESSION" && window.location.hash.includes("type=recovery"))) {
    actualizandoPassword.value = true
    mensaje.value = ""
  }
})
onUnmounted(() => authListener.subscription.unsubscribe())

async function enviarCodigo() {
  mensaje.value = ""
  tipoMensaje.value = ""
  cargando.value = true

  try {
    const institucional = /^[a-zA-Z0-9._%+-]+@escuelasproa\.edu\.ar$/.test(correo.value.trim())
    if (!institucional) throw new Error("Ingresá un correo institucional válido.")

    const { error } = await supabase.auth.resetPasswordForEmail(
      correo.value.trim().toLowerCase(),
      { redirectTo: `${window.location.origin}/recuperar` }
    )
    if (error) throw error

    mensaje.value = "Si la cuenta existe, recibirás un enlace para cambiar la contraseña. Revisá también el correo no deseado."
    tipoMensaje.value = "correcto"
  } catch (error) {
    mensaje.value = error?.message || "No se pudo enviar el enlace. Intentá de nuevo."
    tipoMensaje.value = "error"
  } finally {
    cargando.value = false
  }
}

async function cambiarPassword() {
  mensaje.value = ""
  tipoMensaje.value = ""

  if (nuevaPassword.value.length < 8) {
    mensaje.value = "La contraseña debe tener al menos 8 caracteres."
    tipoMensaje.value = "error"
    return
  }
  if (nuevaPassword.value !== confirmarPassword.value) {
    mensaje.value = "Las contraseñas no coinciden."
    tipoMensaje.value = "error"
    return
  }

  cargando.value = true
  try {
    const { error } = await supabase.auth.updateUser({ password: nuevaPassword.value })
    if (error) throw error
    await supabase.auth.signOut()
    mensaje.value = "Contraseña actualizada. Ya podés iniciar sesión."
    tipoMensaje.value = "correcto"
    setTimeout(() => router.push("/"), 900)
  } catch (error) {
    mensaje.value = error?.message || "No se pudo actualizar la contraseña. Volvé a pedir el enlace."
    tipoMensaje.value = "error"
  } finally {
    cargando.value = false
  }
}
</script>

<style scoped>

* {
  box-sizing: border-box;
}

.pagina {

  min-height: 100vh;

  display: flex;

  justify-content: center;

  align-items: center;

  background-color: #f4f6f8;

  padding: 20px;

}

.contenedor {

  width: 420px;

  background-color: white;

  padding: 40px;

  border-radius: 15px;

  text-align: center;

  box-shadow:
    0 5px 20px rgba(0, 0, 0, 0.12);

}

h1 {

  margin: 0 0 25px;

  font-size: 30px;

  color: #333;

  letter-spacing: 1px;

}

.descripcion {

  color: #666;

  font-size: 15px;

  line-height: 1.5;

  margin-bottom: 25px;

}

.campo {

  text-align: left;

  margin-bottom: 18px;

}

.campo label {

  display: block;

  margin-bottom: 7px;

  font-size: 14px;

  color: #444;

}

.campo input {

  width: 100%;

  height: 45px;

  padding: 10px 12px;

  border: 1px solid #ccc;

  border-radius: 8px;

  font-size: 15px;

  outline: none;

}

.campo input:focus {

  border-color: #4a90e2;

}

.boton {

  width: 100%;

  height: 45px;

  border: none;

  border-radius: 8px;

  background-color: #4a90e2;

  color: white;

  font-size: 16px;

  cursor: pointer;

  margin-top: 10px;

}

.boton:hover {

  background-color: #357abd;

}

.volver {

  background-color: #777;

}

.codigo {

  display: flex;

  justify-content: center;

  gap: 8px;

  margin: 25px 0;

}

.numero {

  width: 45px;

  height: 50px;

  border: 1px solid #bbb;

  border-radius: 7px;

  text-align: center;

  font-size: 22px;

  outline: none;

}

.numero:focus {

  border-color: #4a90e2;

}

.error {

  color: #d93025;

  font-size: 14px;

  margin-top: 15px;

}

.correcto {

  color: #188038;

  font-size: 14px;

  margin-top: 15px;

}

</style>
