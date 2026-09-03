<template>
  <div class="pagina">

    <div class="contenedor">

      <h1>CAMBIAR<br>CONTRASEÑA</h1>

      <p class="descripcion">
        Ingresá tu nueva contraseña.
      </p>


      <!-- NUEVA CONTRASEÑA -->

      <div class="campo">

        <label for="nuevaContrasena">
          Nueva contraseña
        </label>

        <input
          id="nuevaContrasena"
          v-model="nuevaContrasena"
          :type="mostrarNueva ? 'text' : 'password'"
          placeholder="Ingresá tu nueva contraseña"
        >

        <button
          type="button"
          class="mostrar"
          @click="mostrarNueva = !mostrarNueva"
        >
          {{ mostrarNueva ? "Ocultar" : "Mostrar" }}
        </button>

      </div>


      <!-- REPETIR CONTRASEÑA -->

      <div class="campo">

        <label for="repetirContrasena">
          Repetir contraseña
        </label>

        <input
          id="repetirContrasena"
          v-model="repetirContrasena"
          :type="mostrarRepetir ? 'text' : 'password'"
          placeholder="Repetí tu nueva contraseña"
        >

        <button
          type="button"
          class="mostrar"
          @click="mostrarRepetir = !mostrarRepetir"
        >
          {{ mostrarRepetir ? "Ocultar" : "Mostrar" }}
        </button>

      </div>


      <!-- REQUISITOS -->

      <div class="requisitos">

        <p>La contraseña debe tener:</p>

        <p :class="{ cumplido: tieneLongitud }">
          {{ tieneLongitud ? "✓" : "○" }}
          Al menos 8 caracteres
        </p>

        <p :class="{ cumplido: tieneNumero }">
          {{ tieneNumero ? "✓" : "○" }}
          Al menos un número
        </p>

      </div>


      <!-- BOTÓN -->

      <button
        class="boton"
        @click="cambiarContrasena"
      >
        Cambiar contraseña
      </button>


      <!-- MENSAJE -->

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

import { ref, computed } from "vue"


const nuevaContrasena = ref("")

const repetirContrasena = ref("")

const mostrarNueva = ref(false)

const mostrarRepetir = ref(false)

const mensaje = ref("")

const tipoMensaje = ref("")



/*
|--------------------------------------------------------------------------
| COMPROBAR REQUISITOS
|--------------------------------------------------------------------------
*/

const tieneLongitud = computed(() => {

  return nuevaContrasena.value.length >= 8

})


const tieneNumero = computed(() => {

  return /\d/.test(nuevaContrasena.value)

})



/*
|--------------------------------------------------------------------------
| CAMBIAR CONTRASEÑA
|--------------------------------------------------------------------------
*/

function cambiarContrasena() {


  // Comprobar que no estén vacías

  if (
    nuevaContrasena.value === "" ||
    repetirContrasena.value === ""
  ) {

    mensaje.value =
      "Completá los dos campos."

    tipoMensaje.value = "error"

    return

  }


  // Comprobar longitud

  if (!tieneLongitud.value) {

    mensaje.value =
      "La contraseña debe tener al menos 8 caracteres."

    tipoMensaje.value = "error"

    return

  }


  // Comprobar número

  if (!tieneNumero.value) {

    mensaje.value =
      "La contraseña debe contener al menos un número."

    tipoMensaje.value = "error"

    return

  }


  // Comprobar que coincidan

  if (
    nuevaContrasena.value !==
    repetirContrasena.value
  ) {

    mensaje.value =
      "Las contraseñas no coinciden."

    tipoMensaje.value = "error"

    return

  }


  // Contraseña correcta

  mensaje.value =
    "Contraseña cambiada correctamente."

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

  position: relative;

  text-align: left;

  margin-bottom: 20px;

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

  padding: 10px 75px 10px 12px;

  border: 1px solid #ccc;

  border-radius: 8px;

  font-size: 15px;

  outline: none;

}


.campo input:focus {

  border-color: #4a90e2;

}


.mostrar {

  position: absolute;

  right: 8px;

  bottom: 7px;

  width: auto;

  height: 31px;

  padding: 0 8px;

  border: none;

  background: transparent;

  color: #4a90e2;

  font-size: 12px;

  cursor: pointer;

}


.requisitos {

  text-align: left;

  background-color: #f7f7f7;

  padding: 15px;

  border-radius: 8px;

  margin-bottom: 20px;

  font-size: 13px;

  color: #666;

}


.requisitos p {

  margin: 5px 0;

}


.cumplido {

  color: #188038;

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

</style>