<template>
  <div class="pagina">
    <div class="contenedor">
      <h1>RECUPERAR<br>CONTRASEÑA</h1>

      <div v-if="paso === 1">
        <p class="descripcion">Ingresá tu correo institucional para continuar.</p>
        <div class="campo">
          <label for="correo">Correo institucional</label>
          <input id="correo" v-model="correo" type="email" placeholder="ejemplo@escuelasproa.edu.ar" @keyup.enter="enviarCodigo">
        </div>
        <button class="boton" :disabled="cargando" @click="enviarCodigo">{{ cargando ? 'Enviando...' : 'Enviar código' }}</button>
      </div>

      <div v-else-if="paso === 2">
        <p class="descripcion">Ingresá el código de 6 dígitos que recibiste en tu correo.</p>
        <div class="codigo">
          <input v-for="(numero, index) in codigo" :key="index" :ref="el => casilleros[index] = el" v-model="codigo[index]" maxlength="1" type="text" inputmode="numeric" class="numero" @input="siguienteCasillero(index)" @keydown.backspace="anteriorCasillero(index)">
        </div>
        <button class="boton" :disabled="cargando" @click="verificarCodigo">{{ cargando ? 'Verificando...' : 'Verificar código' }}</button>
        <button class="boton volver" @click="paso = 1">Volver</button>
      </div>

      <div v-else>
        <p class="descripcion">Código correcto. Ahora elegí una nueva contraseña.</p>
        <div class="campo">
          <label for="nueva">Nueva contraseña</label>
          <input id="nueva" v-model="nuevaContrasena" type="password" placeholder="Mínimo 6 caracteres">
        </div>
        <div class="campo">
          <label for="confirmar">Confirmar contraseña</label>
          <input id="confirmar" v-model="confirmarContrasena" type="password" placeholder="Repetí la contraseña">
        </div>
        <button class="boton" :disabled="cargando" @click="cambiarContrasena">{{ cargando ? 'Guardando...' : 'Cambiar contraseña' }}</button>
      </div>

      <p v-if="mensaje" :class="tipoMensaje">{{ mensaje }}</p>
      <button v-if="paso === 1" class="boton volver" @click="volverLogin">Volver al inicio de sesión</button>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue"
import { useRoute, useRouter } from "vue-router"

const API = "http://localhost:3000/api"
const route = useRoute()
const router = useRouter()
const correo = ref(String(route.query.email || ""))
const paso = ref(correo.value ? 2 : 1)
const codigo = ref(["", "", "", "", "", ""])
const casilleros = ref([])
const nuevaContrasena = ref("")
const confirmarContrasena = ref("")
const mensaje = ref("")
const tipoMensaje = ref("")
const cargando = ref(false)

const mostrarError = (texto) => { mensaje.value = texto; tipoMensaje.value = "error" }
const mostrarCorrecto = (texto) => { mensaje.value = texto; tipoMensaje.value = "correcto" }

async function enviarCodigo() {
  mensaje.value = ""
  const email = correo.value.trim().toLowerCase()
  if (!/^[a-zA-Z0-9._%+-]+@escuelasproa\.edu\.ar$/.test(email)) {
    mostrarError("Debes utilizar un correo institucional (@escuelasproa.edu.ar).")
    return
  }
  cargando.value = true
  try {
    const respuesta = await fetch(`${API}/enviar-codigo`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) })
    const datos = await respuesta.json()
    if (!respuesta.ok) throw new Error(datos.mensaje)
    correo.value = email
    codigo.value = ["", "", "", "", "", ""]
    paso.value = 2
    mostrarCorrecto("Código enviado. Revisá tu correo institucional.")
    await nextTick()
    casilleros.value[0]?.focus()
  } catch (error) {
    mostrarError(error.message || "No se pudo conectar con el servidor.")
  } finally { cargando.value = false }
}

async function verificarCodigo() {
  mensaje.value = ""
  const codigoCompleto = codigo.value.join("")
  if (codigoCompleto.length !== 6) { mostrarError("Ingresá los 6 números del código."); return }
  cargando.value = true
  try {
    const respuesta = await fetch(`${API}/verificar-codigo`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: correo.value.trim().toLowerCase(), codigo: codigoCompleto }) })
    const datos = await respuesta.json()
    if (!respuesta.ok) throw new Error(datos.mensaje)
    paso.value = 3
    mostrarCorrecto("Código verificado correctamente.")
  } catch (error) { mostrarError(error.message || "No se pudo verificar el código.") }
  finally { cargando.value = false }
}

async function cambiarContrasena() {
  mensaje.value = ""
  if (nuevaContrasena.value.length < 6) { mostrarError("La contraseña debe tener al menos 6 caracteres."); return }
  if (nuevaContrasena.value !== confirmarContrasena.value) { mostrarError("Las contraseñas no coinciden."); return }
  cargando.value = true
  try {
    const respuesta = await fetch(`${API}/cambiar-contrasena`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: correo.value.trim().toLowerCase(), nuevaContrasena: nuevaContrasena.value }) })
    const datos = await respuesta.json()
    if (!respuesta.ok) throw new Error(datos.mensaje)
    mostrarCorrecto("Contraseña cambiada correctamente. Volviendo al inicio de sesión...")
    setTimeout(() => router.push("/"), 1500)
  } catch (error) { mostrarError(error.message || "No se pudo cambiar la contraseña.") }
  finally { cargando.value = false }
}

function siguienteCasillero(index) {
  codigo.value[index] = codigo.value[index].replace(/\D/g, "").slice(0, 1)
  if (codigo.value[index] && index < 5) casilleros.value[index + 1]?.focus()
}
function anteriorCasillero(index) {
  if (!codigo.value[index] && index > 0) casilleros.value[index - 1]?.focus()
}
function volverLogin() { router.push("/") }
</script>

<style scoped>
*{box-sizing:border-box}.pagina{min-height:100vh;display:flex;justify-content:center;align-items:center;background:#f4f6f8;padding:20px}.contenedor{width:420px;background:white;padding:40px;border-radius:15px;text-align:center;box-shadow:0 5px 20px rgba(0,0,0,.12)}h1{margin:0 0 25px;font-size:30px;color:#333;letter-spacing:1px}.descripcion{color:#666;font-size:15px;line-height:1.5;margin-bottom:25px}.campo{text-align:left;margin-bottom:18px}.campo label{display:block;margin-bottom:7px;font-size:14px;color:#444}.campo input{width:100%;height:45px;padding:10px 12px;border:1px solid #ccc;border-radius:8px;font-size:15px;outline:none}.campo input:focus{border-color:#4a90e2}.boton{width:100%;height:45px;border:none;border-radius:8px;background:#4a90e2;color:white;font-size:16px;cursor:pointer;margin-top:10px}.boton:hover:not(:disabled){background:#357abd}.boton:disabled{opacity:.6;cursor:not-allowed}.volver{background:#777}.codigo{display:flex;justify-content:center;gap:8px;margin:25px 0}.numero{width:45px;height:50px;border:1px solid #bbb;border-radius:7px;text-align:center;font-size:22px;outline:none}.numero:focus{border-color:#4a90e2}.error{color:#d93025;font-size:14px;margin-top:15px}.correcto{color:#188038;font-size:14px;margin-top:15px}
</style>
