<template>
  <div class="pagina">

    <div class="contenedor">

      <h1>RECUPERAR<br />CONTRASEÑA</h1>

      <p class="descripcion">
        Ingresá tu correo electrónico y te enviaremos un código
        para recuperar tu contraseña.
      </p>

      <!-- CORREO -->
      <div class="campo">
        <label for="correo">Correo electrónico</label>

        <input
          id="correo"
          v-model="correo"
          type="email"
          placeholder="Ingresá tu correo"
        />
      </div>

      <!-- BOTÓN ENVIAR -->
      <button class="boton" @click="enviarCodigo">
        Enviar código
      </button>

      <!-- MENSAJE -->
      <p v-if="mensaje" :class="tipoMensaje">
        {{ mensaje }}
      </p>

      <!-- CÓDIGO DE VERIFICACIÓN -->
      <div v-if="mostrarCodigo" class="verificacion">

        <p class="descripcion">
          Ingresá el código de 6 dígitos que recibiste en tu correo.
        </p>

        <div class="codigo">
          <input
            v-for="(numero, index) in codigo"
            :key="index"
            v-model="codigo[index]"
            maxlength="1"
            type="text"
            inputmode="numeric"
            class="numero"
            @input="siguienteCasillero(index)"
          />
        </div>

        <button class="boton" @click="verificarCodigo">
          Verificar código
        </button>

      </div>

    </div>

  </div>
</template>

<script>
import { ref } from "vue"
export default {
  name: "Recuperar"
}
const correo = ref("")
const mostrarCodigo = ref(false)

const codigo = ref(["", "", "", "", "", ""])

const mensaje = ref("")
const tipoMensaje = ref("")

function enviarCodigo() {

  if (correo.value === "") {
    mensaje.value = "Por favor, ingresá tu correo electrónico."
    tipoMensaje.value = "error"
    return
  }

  if (!correo.value.includes("@")) {
    mensaje.value = "Ingresá un correo electrónico válido."
    tipoMensaje.value = "error"
    return
  }

  mostrarCodigo.value = true

  mensaje.value = "Te enviamos un código de verificación."
  tipoMensaje.value = "correcto"
}


function siguienteCasillero(index) {

  // Permite solamente números
  codigo.value[index] = codigo.value[index].replace(/\D/g, "")

  if (codigo.value[index] !== "" && index < 5) {

    const casilleros = document.querySelectorAll(".numero")

    casilleros[index + 1].focus()
  }
}


function verificarCodigo() {

  const codigoCompleto = codigo.value.join("")

  if (codigoCompleto.length !== 6) {

    mensaje.value = "Ingresá los 6 números del código."
    tipoMensaje.value = "error"

    return
  }

  mensaje.value = "Código verificado correctamente."
  tipoMensaje.value = "correcto"
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

  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.12);
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

  transition: 0.2s;
}

.boton:hover {
  background-color: #357abd;
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

.verificacion {
  margin-top: 25px;

  padding-top: 20px;

  border-top: 1px solid #eee;
}

.codigo {
  display: flex;

  justify-content: center;

  gap: 8px;

  margin: 20px 0;
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

</style>