<template>
  <div class="pagina">

    <div class="contenedor">

      <h1>RECUPERAR<br>CONTRASEÑA</h1>

      <!-- INGRESAR CORREO -->
      <div v-if="!mostrarCodigo">

        <p class="descripcion">
          Ingresá tu correo electrónico para recuperar tu contraseña.
        </p>

        <div class="campo">
          <label for="correo">Correo electrónico</label>

          <input
            id="correo"
            v-model="correo"
            type="email"
            placeholder="Ingresá tu correo"
          >
        </div>

        <button class="boton" @click="enviarCodigo">
          Continuar
        </button>

      </div>


      <!-- INGRESAR CÓDIGO -->
      <div v-else>

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
          >

        </div>

        <button class="boton" @click="verificarCodigo">
          Verificar código
        </button>

        <button class="boton volver" @click="volver">
          Volver
        </button>

      </div>


      <!-- MENSAJES -->
      <p
        v-if="mensaje"
        :class="tipoMensaje"
      >
        {{ mensaje }}
      </p>

    </div>

  </div>
</template>


<script setup>

import { ref } from "vue"

const correo = ref("")

const mostrarCodigo = ref(false)

const codigo = ref([
  "",
  "",
  "",
  "",
  "",
  ""
])

const mensaje = ref("")

const tipoMensaje = ref("")


function enviarCodigo() {

  if (correo.value === "") {

    mensaje.value =
      "Por favor, ingresá tu correo electrónico."

    tipoMensaje.value = "error"

    return
  }

  if (!correo.value.includes("@")) {

    mensaje.value =
      "Ingresá un correo electrónico válido."

    tipoMensaje.value = "error"

    return
  }

  // Por ahora solamente pasa a la pantalla del código
  mostrarCodigo.value = true

  mensaje.value = ""

}


function siguienteCasillero(index) {

  // Solo permite números
  codigo.value[index] =
    codigo.value[index].replace(/\D/g, "")


  // Pasa automáticamente al siguiente casillero
  if (
    codigo.value[index] !== "" &&
    index < 5
  ) {

    const casilleros =
      document.querySelectorAll(".numero")

    casilleros[index + 1].focus()

  }

}


function verificarCodigo() {

  const codigoCompleto =
    codigo.value.join("")


  if (codigoCompleto.length !== 6) {

    mensaje.value =
      "Ingresá los 6 números del código."

    tipoMensaje.value = "error"

    return

  }


  // Por ahora no se comprueba el código
  mensaje.value =
    "Código ingresado correctamente."

  tipoMensaje.value = "correcto"

}


function volver() {

  mostrarCodigo.value = false

  codigo.value = [
    "",
    "",
    "",
    "",
    "",
    ""
  ]

  mensaje.value = ""

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