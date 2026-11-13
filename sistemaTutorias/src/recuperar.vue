<template>
  <div class="pagina">
    <div class="contenedor">
      <img class="auth-brand-logo" src="./assets/proa.jpg" alt="Logo ProA">
      <h1>RECUPERAR<br>CONTRASEÑA</h1>

      <form v-if="!mostrarCodigo" @submit.prevent="enviarCodigo">
        <p class="descripcion">Ingresá tu correo electrónico para recuperar tu contraseña.</p>
        <div class="campo">
          <label for="correo">Correo electrónico</label>
          <input id="correo" v-model.trim="correo" type="email" autocomplete="email" required placeholder="Ingresá tu correo">
        </div>
        <button class="boton" type="submit">Continuar</button>
      </form>

      <form v-else @submit.prevent="verificarCodigo">
        <p class="descripcion">Ingresá el código de verificación y elegí una nueva contraseña.</p>
        <!-- El código se muestra en pantalla porque este prototipo no tiene un servidor de correo configurado. -->
        <p v-if="codigoDemostracion" class="correcto">Código de demostración: <strong>{{ codigoDemostracion }}</strong></p>
        <div class="codigo">
          <input v-for="(numero, index) in codigo" :key="index" v-model="codigo[index]" :aria-label="`Dígito ${index + 1}`" maxlength="1" type="text" inputmode="numeric" class="numero" required @input="siguienteCasillero(index)">
        </div>
        <div class="campo">
          <label for="nueva-password">Nueva contraseña</label>
          <input id="nueva-password" v-model="nuevaPassword" type="password" minlength="6" autocomplete="new-password" required>
        </div>
        <div class="campo">
          <label for="confirmar-password">Confirmar contraseña</label>
          <input id="confirmar-password" v-model="confirmarPassword" type="password" minlength="6" autocomplete="new-password" required>
        </div>
        <button class="boton" type="submit">Cambiar contraseña</button>
        <button class="boton volver" type="button" @click="volver">Volver</button>
      </form>

      <p v-if="mensaje" :class="tipoMensaje" role="status">{{ mensaje }}</p>
      <router-link to="/" class="volver-login">Volver al inicio de sesión</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRoute, useRouter } from "vue-router"

const route = useRoute()
const router = useRouter()
const correo = ref(String(route.query.email || ""))
const mostrarCodigo = ref(false)
const codigo = ref(["", "", "", "", "", ""])
const codigoGenerado = ref("")
const codigoDemostracion = ref("")
const nuevaPassword = ref("")
const confirmarPassword = ref("")
const mensaje = ref("")
const tipoMensaje = ref("")
const USERS_STORAGE_KEY = "sistemaTutoriasUsers"

function enviarCodigo() {
  mensaje.value = ""
  const correoNormalizado = correo.value.trim().toLowerCase()
  let usuarios = []
  try {
    usuarios = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || "[]")
  } catch {
    mensaje.value = "No se pudieron leer las cuentas guardadas."
    tipoMensaje.value = "error"
    return
  }

  // Solo permite recuperar cuentas existentes y valida el dominio usado en el registro.
  const institucional = /^[a-zA-Z0-9._%+-]+@escuelasproa\.edu\.ar$/.test(correoNormalizado)
  if (!institucional || !usuarios.some(usuario => usuario.email === correoNormalizado)) {
    mensaje.value = "No encontramos una cuenta institucional registrada con ese correo."
    tipoMensaje.value = "error"
    return
  }

  codigoGenerado.value = String(Math.floor(100000 + Math.random() * 900000))
  codigoDemostracion.value = codigoGenerado.value
  mostrarCodigo.value = true
  mensaje.value = "Se generó un código para esta demostración."
  tipoMensaje.value = "correcto"
}

function siguienteCasillero(index) {
  codigo.value[index] = codigo.value[index].replace(/\D/g, "").slice(0, 1)
  if (codigo.value[index] && index < 5) document.querySelectorAll(".numero")[index + 1]?.focus()
}

function verificarCodigo() {
  const codigoCompleto = codigo.value.join("")
  if (codigoCompleto !== codigoGenerado.value) {
    mensaje.value = "El código ingresado es incorrecto."
    tipoMensaje.value = "error"
    return
  }
  if (nuevaPassword.value.length < 6 || nuevaPassword.value !== confirmarPassword.value) {
    mensaje.value = nuevaPassword.value.length < 6 ? "La contraseña debe tener al menos 6 caracteres." : "Las contraseñas no coinciden."
    tipoMensaje.value = "error"
    return
  }

  try {
    const usuarios = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || "[]")
    const usuario = usuarios.find(item => item.email === correo.value.trim().toLowerCase())
    if (!usuario) throw new Error("La cuenta ya no está disponible.")
    usuario.password = nuevaPassword.value
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(usuarios))
    // Al cambiar la contraseña se invalida cualquier sesión local previa de esa cuenta.
    if (localStorage.getItem("sistemaTutoriasSession") === usuario.email) localStorage.removeItem("sistemaTutoriasSession")
  } catch {
    mensaje.value = "No se pudo actualizar la contraseña en este navegador."
    tipoMensaje.value = "error"
    return
  }

  mensaje.value = "Contraseña actualizada. Ya podés iniciar sesión."
  tipoMensaje.value = "correcto"
  setTimeout(() => router.push("/"), 900)
}

function volver() {
  mostrarCodigo.value = false
  codigo.value = ["", "", "", "", "", ""]
  nuevaPassword.value = ""
  confirmarPassword.value = ""
  codigoGenerado.value = ""
  codigoDemostracion.value = ""
  mensaje.value = ""
  tipoMensaje.value = ""
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