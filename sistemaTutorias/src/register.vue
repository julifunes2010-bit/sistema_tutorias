<script setup>
import { ref } from 'vue'

const paso = ref(1)

const correo = ref('')
const password = ref('')
const confirmarPassword = ref('')
const codigo = ref('')

const mostrarPassword = ref(false)
const mostrarConfirmarPassword = ref(false)

const error = ref('')
const mensaje = ref('')

const codigoDemo = '123456'

// Paso 1: Crear cuenta
const continuar = () => {
  error.value = ''
  mensaje.value = ''

  if (!correo.value || !password.value || !confirmarPassword.value) {
    error.value = 'Completá todos los campos.'
    return
  }

  // Validar correo institucional
  // Cambiá el dominio por el de tu escuela si es necesario.
  if (!correo.value.endsWith('@escuelasproa.edu.ar')) {
    error.value = 'Debés utilizar un correo electrónico institucional.'
    return
  }

  if (password.value.length < 6) {
    error.value = 'La contraseña debe tener al menos 6 caracteres.'
    return
  }

  if (password.value !== confirmarPassword.value) {
    error.value = 'Las contraseñas no coinciden.'
    return
  }

  // Pasar al segundo paso
  paso.value = 2

  // Simulación del envío
  mensaje.value = `Enviamos un código de verificación a ${correo.value}`
}

// Paso 2: verificar correo
const verificarCorreo = () => {
  error.value = ''
  mensaje.value = ''

  if (!codigo.value) {
    error.value = 'Ingresá el código de verificación.'
    return
  }

  // Código de demostración
  if (codigo.value !== codigoDemo) {
    error.value = 'El código ingresado es incorrecto.'
    return
  }

  paso.value = 3
  mensaje.value = '¡Correo verificado correctamente!'
}

// Volver al paso anterior
const volver = () => {
  paso.value = 1
  error.value = ''
  mensaje.value = ''
}

// Reenviar código
const reenviarCodigo = () => {
  error.value = ''
  mensaje.value = `Se envió un nuevo código a ${correo.value}`
}
</script>

<template>
  <div class="pagina">

    <div class="contenedor">

      <!-- PANEL IZQUIERDO -->
      <div class="panel">

        <div class="logo">
          <div class="logo-icon">T</div>
          <span>Tutorías</span>
        </div>

        <div class="panel-contenido">

          <h1>
            Sistema de<br />
            Tutorías
          </h1>

          <p>
            Creá tu cuenta institucional y accedé
            a todas las herramientas del sistema.
          </p>

          <div class="pasos">

            <div
              class="paso"
              :class="{ activo: paso >= 1 }"
            >
              <div class="numero">1</div>
              <div>
                <strong>Crear cuenta</strong>
                <span>Ingresá tus datos</span>
              </div>
            </div>

            <div class="linea"></div>

            <div
              class="paso"
              :class="{ activo: paso >= 2 }"
            >
              <div class="numero">2</div>
              <div>
                <strong>Verificar correo</strong>
                <span>Confirmá tu identidad</span>
              </div>
            </div>

            <div class="linea"></div>

            <div
              class="paso"
              :class="{ activo: paso >= 3 }"
            >
              <div class="numero">3</div>
              <div>
                <strong>Cuenta creada</strong>
                <span>Ya podés comenzar</span>
              </div>
            </div>

          </div>

        </div>

      </div>


      <!-- PANEL DERECHO -->
      <div class="formulario-contenedor">

        <!-- PASO 1 -->
        <div
          v-if="paso === 1"
          class="formulario"
        >

          <div class="encabezado">
            <h2>Crear cuenta</h2>

            <p>
              Utilizá tu correo electrónico institucional
              para registrarte.
            </p>
          </div>

          <!-- ERROR -->
          <div
            v-if="error"
            class="mensaje error"
          >
            {{ error }}
          </div>

          <!-- CORREO -->
          <div class="campo">

            <label for="correo">
              Correo electrónico institucional
            </label>

            <input
              id="correo"
              v-model="correo"
              type="email"
              placeholder="nombre@escuelasproa.edu.ar"
              autocomplete="email"
            />

            <small>
              Usá el correo proporcionado por la institución.
            </small>

          </div>


          <!-- CONTRASEÑA -->
          <div class="campo">

            <label for="password">
              Contraseña
            </label>

            <div class="password">

              <input
                id="password"
                v-model="password"
                :type="
                  mostrarPassword
                    ? 'text'
                    : 'password'
                "
                placeholder="Ingresá una contraseña"
                autocomplete="new-password"
              />

              <button
                type="button"
                @click="
                  mostrarPassword = !mostrarPassword
                "
              >
                {{
                  mostrarPassword
                    ? 'Ocultar'
                    : 'Mostrar'
                }}
              </button>

            </div>

            <small>
              La contraseña debe tener al menos 6 caracteres.
            </small>

          </div>


          <!-- CONFIRMAR CONTRASEÑA -->
          <div class="campo">

            <label for="confirmar">
              Confirmar contraseña
            </label>

            <div class="password">

              <input
                id="confirmar"
                v-model="confirmarPassword"
                :type="
                  mostrarConfirmarPassword
                    ? 'text'
                    : 'password'
                "
                placeholder="Repetí tu contraseña"
                autocomplete="new-password"
              />

              <button
                type="button"
                @click="
                  mostrarConfirmarPassword =
                    !mostrarConfirmarPassword
                "
              >
                {{
                  mostrarConfirmarPassword
                    ? 'Ocultar'
                    : 'Mostrar'
                }}
              </button>

            </div>

          </div>


          <button
            class="boton"
            @click="continuar"
          >
            Continuar
          </button>

          <p class="login">
            ¿Ya tenés una cuenta?
            <a href="#">Iniciar sesión</a>
          </p>

        </div>


        <!-- PASO 2 -->
        <div
          v-if="paso === 2"
          class="formulario verificacion"
        >

          <div class="icono-correo">
            ✉
          </div>

          <div class="encabezado">

            <h2>Verificá tu correo</h2>

            <p>
              Enviamos un código de verificación a:
            </p>

            <strong class="correo-mostrado">
              {{ correo }}
            </strong>

          </div>


          <!-- ERROR -->
          <div
            v-if="error"
            class="mensaje error"
          >
            {{ error }}
          </div>


          <!-- MENSAJE -->
          <div
            v-if="mensaje"
            class="mensaje informacion"
          >
            {{ mensaje }}
          </div>


          <div class="campo">

            <label for="codigo">
              Código de verificación
            </label>

            <input
              id="codigo"
              v-model="codigo"
              type="text"
              maxlength="6"
              placeholder="Ingresá el código de 6 dígitos"
              class="codigo"
            />

          </div>


          <button
            class="boton"
            @click="verificarCorreo"
          >
            Verificar correo
          </button>


          <button
            class="boton-secundario"
            @click="reenviarCodigo"
          >
            Reenviar código
          </button>


          <button
            class="volver"
            @click="volver"
          >
            ← Cambiar correo
          </button>

          <p class="ayuda">
            ¿No recibiste el correo?
            Revisá la carpeta de spam o correo no deseado.
          </p>

        </div>


        <!-- PASO 3 -->
        <div
          v-if="paso === 3"
          class="formulario exito-final"
        >

          <div class="icono-exito">
            ✓
          </div>

          <h2>¡Cuenta creada!</h2>

          <p>
            Tu correo electrónico fue verificado
            correctamente.
          </p>

          <p class="correo-final">
            {{ correo }}
          </p>

          <button class="boton">
            Ingresar al sistema
          </button>

        </div>

      </div>

    </div>

  </div>
</template>


<style scoped>

* {
  box-sizing: border-box;
}

.pagina {
  min-height: 100vh;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
  font-family: Arial, Helvetica, sans-serif;
}

.contenedor {
  width: 100%;
  max-width: 1050px;
  min-height: 650px;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 42% 58%;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
}


/* PANEL */

.panel {
  background: #2563eb;
  color: white;
  padding: 45px;
  display: flex;
  flex-direction: column;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 20px;
  font-weight: bold;
}

.logo-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: white;
  color: #2563eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 20px;
}

.panel-contenido {
  margin-top: 100px;
}

.panel h1 {
  font-size: 38px;
  line-height: 1.15;
  margin-bottom: 20px;
}

.panel-contenido > p {
  font-size: 16px;
  line-height: 1.6;
  opacity: 0.9;
  margin-bottom: 45px;
}


/* PASOS */

.pasos {
  display: flex;
  flex-direction: column;
}

.paso {
  display: flex;
  align-items: center;
  gap: 15px;
  opacity: 0.5;
}

.paso.activo {
  opacity: 1;
}

.numero {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.paso.activo .numero {
  background: white;
  color: #2563eb;
}

.paso strong {
  display: block;
  font-size: 14px;
}

.paso span {
  display: block;
  font-size: 12px;
  margin-top: 3px;
}

.linea {
  width: 2px;
  height: 25px;
  background: rgba(255,255,255,0.3);
  margin-left: 17px;
}


/* FORMULARIO */

.formulario-contenedor {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
}

.formulario {
  width: 100%;
  max-width: 460px;
}

.encabezado h2 {
  margin: 0;
  color: #1e293b;
  font-size: 30px;
}

.encabezado p {
  color: #64748b;
  margin-top: 8px;
  line-height: 1.5;
}


/* CAMPOS */

.campo {
  margin-bottom: 22px;
}

.campo label {
  display: block;
  color: #334155;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
}

.campo input {
  width: 100%;
  height: 48px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 0 14px;
  font-size: 15px;
  outline: none;
}

.campo input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.campo small {
  display: block;
  color: #94a3b8;
  margin-top: 6px;
  font-size: 12px;
}


/* PASSWORD */

.password {
  position: relative;
}

.password input {
  padding-right: 80px;
}

.password button {
  position: absolute;
  right: 8px;
  top: 8px;
  height: 32px;
  border: none;
  background: transparent;
  color: #2563eb;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
}


/* BOTONES */

.boton {
  width: 100%;
  height: 48px;
  border: none;
  border-radius: 8px;
  background: #2563eb;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
}

.boton:hover {
  background: #1d4ed8;
}

.boton-secundario {
  width: 100%;
  height: 45px;
  margin-top: 12px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  background: white;
  color: #2563eb;
  font-weight: bold;
  cursor: pointer;
}

.volver {
  display: block;
  margin: 20px auto 0;
  border: none;
  background: transparent;
  color: #64748b;
  cursor: pointer;
}


/* MENSAJES */

.mensaje {
  padding: 12px;
  border-radius: 8px;
  margin: 18px 0;
  font-size: 14px;
}

.error {
  background: #fee2e2;
  color: #b91c1c;
}

.informacion {
  background: #dbeafe;
  color: #1d4ed8;
}


/* VERIFICACIÓN */

.verificacion {
  text-align: center;
}

.verificacion .campo {
  text-align: left;
}

.icono-correo {
  width: 70px;
  height: 70px;
  background: #dbeafe;
  color: #2563eb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  margin: 0 auto 25px;
}

.correo-mostrado {
  display: block;
  color: #2563eb;
  margin-top: 8px;
  word-break: break-all;
}

.codigo {
  text-align: center;
  letter-spacing: 8px;
  font-size: 22px !important;
  font-weight: bold;
}


/* FINAL */

.exito-final {
  text-align: center;
}

.icono-exito {
  width: 80px;
  height: 80px;
  background: #dcfce7;
  color: #16a34a;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: bold;
  margin: 0 auto 25px;
}

.exito-final h2 {
  color: #1e293b;
  font-size: 30px;
}

.exito-final p {
  color: #64748b;
  line-height: 1.5;
}

.correo-final {
  color: #2563eb !important;
  font-weight: bold;
}


/* LOGIN */

.login {
  text-align: center;
  color: #64748b;
  font-size: 14px;
  margin-top: 20px;
}

.login a {
  color: #2563eb;
  text-decoration: none;
  font-weight: bold;
}

.ayuda {
  color: #94a3b8;
  font-size: 12px;
  line-height: 1.5;
  margin-top: 20px;
}


/* RESPONSIVE */

@media (max-width: 800px) {

  .contenedor {
    grid-template-columns: 1fr;
  }

  .panel {
    display: none;
  }

  .formulario-contenedor {
    padding: 35px 25px;
  }
}

</style>