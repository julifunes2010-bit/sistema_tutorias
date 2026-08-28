<template>
  <div class="login-page">

    <!-- =========================
         CONTENIDO PRINCIPAL
    ========================== -->

    <main class="login-container">

      <!-- LOGO -->
      <div class="logo-container">

        <img
          src="./assets/proa.jpg"
          alt="Logo PROA"
          class="logo-image"
        />

        <span>TUTORÍAS</span>

      </div>


      <!-- TÍTULO -->
      <h1>INICIA SESIÓN</h1>

      <p class="subtitle">
        Ingresá a tu cuenta para continuar
      </p>


      <!-- =========================
           FORMULARIO
      ========================== -->

      <form @submit.prevent="iniciarSesion">


        <!-- CORREO -->
        <div class="input-group">

          <label for="email">
            Correo electrónico
          </label>

          <input
            id="email"
            type="email"
            v-model="email"
            placeholder="Ingresá tu correo"
            :class="{ 'input-error': errorTipo === 'email' || errorTipo === 'ambos' }"
            @input="limpiarError"
            required
          />

          <!-- Error correo -->
          <p
            v-if="errorTipo === 'email' || errorTipo === 'ambos'"
            class="error-message"
          >
            El correo electrónico no coincide.
          </p>

        </div>


        <!-- CONTRASEÑA -->
        <div class="input-group">

          <label for="password">
            Contraseña
          </label>

          <div class="password-container">

            <input
              id="password"
              :type="mostrarPassword ? 'text' : 'password'"
              v-model="password"
              placeholder="Ingresá tu contraseña"
              :class="{
                'input-error':
                  errorTipo === 'password' ||
                  errorTipo === 'ambos'
              }"
              @input="limpiarError"
              required
            />


            <!-- BOTÓN OJO -->
            <button
              type="button"
              class="eye-button"
              @click="mostrarPassword = !mostrarPassword"
              :aria-label="
                mostrarPassword
                  ? 'Ocultar contraseña'
                  : 'Mostrar contraseña'
              "
            >

              <!-- OJO ABIERTO -->
              <svg
                v-if="mostrarPassword"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >

                <path
                  d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
                />

                <circle
                  cx="12"
                  cy="12"
                  r="3"
                />

              </svg>


              <!-- OJO CERRADO -->
              <svg
                v-else
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >

                <path
                  d="M3 3l18 18"
                />

                <path
                  d="M10.6 10.6a2 2 0 0 0 2.8 2.8"
                />

                <path
                  d="M9.9 5.2A10.8 10.8 0 0 1 12 5c6.5 0 10 7 10 7"
                />

                <path
                  d="M6.6 6.6C3.7 8.5 2 12 2 12s3.5 7 10 7"
                />

              </svg>

            </button>

          </div>


          <!-- Error contraseña -->
          <p
            v-if="errorTipo === 'password' || errorTipo === 'ambos'"
            class="error-message"
          >
            La contraseña no coincide.
          </p>

        </div>


        <!-- OPCIONES -->
        <div class="options">

          <!-- Recordar usuario -->
          <label class="remember">

            <input
              type="checkbox"
              v-model="recordar"
            />

            <span>
              Recordar usuario
            </span>

          </label>


          <!-- Recuperar contraseña -->
          <a
            href="#"
            @click="RecuperarContraseña"
          >
            ¿Olvidaste tu contraseña?
          </a>

        </div>


        <!-- BOTÓN -->
        <button
          type="submit"
          class="login-button"
        >
          INICIAR SESIÓN
        </button>

      </form>


      <!-- REGISTRO -->
      <p class="register">
        ¿No tenés una cuenta?

        <a href="#" @click="iraregister">
          Registrate
        </a>

      </p>

    </main>


    <!-- =========================
         FOOTER
    ========================== -->

    <footer class="footer">

      <div class="footer-content">


        <!-- Información -->
        <div class="footer-brand">

          <strong>
            Tutorías PROA
          </strong>

          <span>
            Sistema de tutorías
          </span>

        </div>


        <!-- Redes -->
        <div class="footer-links">

          <a
            href="#"
            @click.prevent
          >
            📷 Instagram
          </a>


          <a
            href="#"
            @click.prevent
          >
            💬 WhatsApp
          </a>


          <a
            href="mailto:tutorias@proa.com"
          >
            ✉️ Contacto
          </a>

        </div>

      </div>


      <!-- Copyright -->
      <div class="footer-bottom">

        © {{ new Date().getFullYear() }}
        Tutorías PROA · Todos los derechos reservados

      </div>

    </footer>

  </div>
</template>


<script>

import { useRouter } from 'vue-router'
import RecuperarContraseña from './RecuperarContraseña.vue';


export default {

  name: "Login",
  name: "register",


  setup() {

    const router = useRouter()
    const iraregister = () => {
      router.push("/register")
    }

    return {
      router,
      iraregister
    }

  },

  data() {

    return {

      // Datos del formulario

      email: "",

      password: "",


      // Checkbox

      recordar: false,


      // Mostrar contraseña

      mostrarPassword: false,


      // Tipo de error

      errorTipo: ""

    }

  },


  methods: {


    /* =========================
       INICIAR SESIÓN
    ========================== */

    iniciarSesion() {

      // Eliminamos errores anteriores

      this.errorTipo = ""


      // Credenciales de prueba

      const correoCorrecto = "admin@proa.com"

      const passwordCorrecta = "123456"


      // Ambos están mal

      if (
        this.email !== correoCorrecto &&
        this.password !== passwordCorrecta
      ) {

        this.errorTipo = "ambos"

        return

      }


      // Correo incorrecto

      if (
        this.email !== correoCorrecto
      ) {

        this.errorTipo = "email"

        return

      }


      // Contraseña incorrecta

      if (
        this.password !== passwordCorrecta
      ) {

        this.errorTipo = "password"

        return

      }


      // =========================
      // LOGIN CORRECTO
      // =========================

      this.router.push("/home")

    },


    /* =========================
       LIMPIAR ERROR
    ========================== */

    limpiarError() {

      this.errorTipo = ""

    },


    /* =========================
       RECUPERAR CONTRASEÑA
    ========================== */


  }

}

</script>


<style scoped>

/* ==================================================
   GENERAL
================================================== */

* {
  box-sizing: border-box;
}


.login-page {

  width: 100%;

  min-height: 100vh;

  display: flex;

  flex-direction: column;

  background: #f4f7f9;

  font-family:
    Arial,
    Helvetica,
    sans-serif;

  color: #222;

}


/* ==================================================
   LOGIN
================================================== */

.login-container {

  width: 430px;

  max-width: calc(100% - 40px);

  margin: auto;

  padding: 42px 45px;

  background: white;

  border-radius: 18px;

  box-shadow:
    0 10px 35px rgba(0, 0, 0, 0.10);

}


/* ==================================================
   LOGO
================================================== */

.logo-container {

  display: flex;

  align-items: center;

  gap: 12px;

  margin-bottom: 30px;

}


.logo-image {

  width: 65px;

  height: 65px;

  object-fit: contain;

}


.logo-container span {

  font-size: 20px;

  font-weight: bold;

  color: #333;

}


/* ==================================================
   TÍTULO
================================================== */

h1 {

  margin: 0;

  text-align: center;

  font-size: 30px;

  font-weight: 400;

  color: #222;

}


.subtitle {

  margin:

    10px 0 30px;

  text-align: center;

  color: #777;

  font-size: 14px;

}


/* ==================================================
   INPUTS
================================================== */

.input-group {

  margin-bottom: 20px;

}


.input-group label {

  display: block;

  margin-bottom: 8px;

  font-size: 14px;

  font-weight: bold;

  color: #333;

}


.input-group input {

  width: 100%;

  height: 46px;

  padding: 0 14px;

  border:

    1px solid #d5d5d5;

  border-radius: 8px;

  outline: none;

  font-size: 14px;

  transition: 0.2s;

}


.input-group input:focus {

  border-color: #2d7ff9;

  box-shadow:
    0 0 0 3px
    rgba(45, 127, 249, 0.10);

}


/* ==================================================
   ERROR
================================================== */

.input-group input.input-error {

  border-color: #dc3545;

  box-shadow:
    0 0 0 2px
    rgba(220, 53, 69, 0.08);

}


.error-message {

  margin:

    6px 0 0;

  color: #dc3545;

  font-size: 12px;

  font-weight: 500;

}


/* ==================================================
   CONTRASEÑA
================================================== */

.password-container {

  position: relative;

  width: 100%;

}


.password-container input {

  padding-right: 50px;

}


/* ==================================================
   BOTÓN OJO
================================================== */

.eye-button {

  position: absolute;

  right: 6px;

  top: 50%;

  transform:
    translateY(-50%);

  width: 38px;

  height: 38px;

  padding: 8px;

  border: none;

  background: transparent;

  color: #777;

  cursor: pointer;

  display: flex;

  align-items: center;

  justify-content: center;

}


.eye-button:hover {

  color: #2d7ff9;

}


.eye-button svg {

  width: 20px;

  height: 20px;

}


/* ==================================================
   OPCIONES
================================================== */

.options {

  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: 10px;

  margin-bottom: 25px;

  font-size: 12px;

}


.remember {

  display: flex;

  align-items: center;

  gap: 6px;

  white-space: nowrap;

}


.remember input {

  accent-color: #2d7ff9;

}


.options a {

  color: #2d7ff9;

  text-decoration: none;

}


.options a:hover {

  text-decoration: underline;

}


/* ==================================================
   BOTÓN LOGIN
================================================== */

.login-button {

  width: 100%;

  height: 48px;

  border: none;

  border-radius: 8px;

  background: #2d7ff9;

  color: white;

  font-size: 14px;

  font-weight: bold;

  cursor: pointer;

  transition:
    background 0.2s,
    transform 0.2s;

}


.login-button:hover {

  background: #1769dc;

  transform:
    translateY(-1px);

}


.login-button:active {

  transform:
    translateY(0);

}


/* ==================================================
   REGISTRO
================================================== */

.register {

  margin:

    25px 0 0;

  text-align: center;

  color: #777;

  font-size: 13px;

}


.register a {

  color: #2d7ff9;

  font-weight: bold;

  text-decoration: none;

}


/* ==================================================
   FOOTER
================================================== */

.footer {

  width: 100%;

  margin-top: auto;

  padding:

    25px 30px 15px;

  background: #ffffff;

  border-top:

    1px solid #e5e5e5;

}


.footer-content {

  max-width: 900px;

  margin: 0 auto;

  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: 30px;

}


.footer-brand {

  display: flex;

  flex-direction: column;

  gap: 5px;

}


.footer-brand strong {

  color: #333;

  font-size: 15px;

}


.footer-brand span {

  color: #888;

  font-size: 12px;

}


.footer-links {

  display: flex;

  align-items: center;

  gap: 20px;

}


.footer-links a {

  color: #666;

  font-size: 13px;

  text-decoration: none;

  transition: 0.2s;

}


.footer-links a:hover {

  color: #2d7ff9;

  background: transparent;

}


.footer-bottom {

  margin-top: 20px;

  padding-top: 12px;

  border-top:

    1px solid #eeeeee;

  text-align: center;

  color: #999;

  font-size: 11px;

}


/* ==================================================
   RESPONSIVE - TABLET
================================================== */

@media (max-width: 768px) {

  .login-container {

    width: 90%;

    max-width: 430px;

    padding:

      35px 30px;

  }

}


/* ==================================================
   RESPONSIVE - CELULAR
================================================== */

@media (max-width: 480px) {

  .login-container {

    width:

      calc(100% - 30px);

    padding:

      30px 22px;

    border-radius: 14px;

  }


  .logo-image {

    width: 55px;

    height: 55px;

  }


  .logo-container span {

    font-size: 18px;

  }


  h1 {

    font-size: 25px;

  }


  .options {

    flex-direction: column;

    align-items: flex-start;

    gap: 10px;

  }


  .options a {

    text-align: left;

  }


  .footer {

    padding:

      22px 20px 14px;

  }


  .footer-content {

    flex-direction: column;

    text-align: center;

    gap: 18px;

  }


  .footer-links {

    flex-wrap: wrap;

    justify-content: center;

    gap: 15px;

  }

}


/* ==================================================
   RESPONSIVE - CELULAR PEQUEÑO
================================================== */

@media (max-width: 360px) {

  .login-container {

    width:

      calc(100% - 20px);

    padding:

      25px 18px;

  }


  h1 {

    font-size: 22px;

  }


  .logo-container span {

    font-size: 16px;

  }


  .input-group input {

    height: 44px;

  }

}


/* ==================================================
   PANTALLAS GRANDES
================================================== */

@media (min-width: 1200px) {

  .login-container {

    width: 430px;

  }

}

</style>