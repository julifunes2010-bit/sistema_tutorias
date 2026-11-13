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
         <router-link to="/recuperar">
         ¿Olvidaste tu contraseña?
         </router-link>

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

        <router-link to="/register">
  Registrate
</router-link>

      </p>

    </main>


    <!-- =========================
         FOOTER
    ========================== -->

        <footer class="footer">
      <div class="footer-content">
        <div class="footer-brand">
          <div class="footer-mark" aria-hidden="true">P</div>
          <div class="footer-brand-copy">
            <strong>Tutorías PROA</strong>
            <span>Acompañamiento académico y educativo</span>
          </div>
        </div>

        <nav class="footer-links" aria-label="Información de contacto">
          <a href="https://wa.me/5493548320643" target="_blank" rel="noopener noreferrer">
            <span aria-hidden="true">◉</span>
            WhatsApp · +54 9 3548 32-0643
          </a>
          <a href="mailto:jfqmw@esc.edu.ar">
            <span aria-hidden="true">✉</span>
            jfqmw@esc.edu.ar
          </a>
        </nav>
      </div>

      <div class="footer-bottom">
        <span>© {{ new Date().getFullYear() }} Tutorías PROA</span>
        <span>Todos los derechos reservados</span>
      </div>
    </footer>

  </div>
</template>


<script>

import { useRouter } from 'vue-router'

import iraregister from './register.vue';
import Recuperar from './recuperar.vue';

const USERS_STORAGE_KEY = "sistemaTutoriasUsers"
const REMEMBERED_EMAIL_KEY = "sistemaTutoriasRememberedEmail"

function leerUsuarios() {
  try {
    const usuarios = JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || "[]")
    return Array.isArray(usuarios) ? usuarios : []
  } catch {
    return []
  }
}

function correoNormalizado(correo) {
  return correo.trim().toLowerCase()
}

function correoRecordado() {
  try {
    return localStorage.getItem(REMEMBERED_EMAIL_KEY) || ""
  } catch {
    return ""
  }
}


export default {

  name: "Login",
  name: "register",


  setup() {

    const router = useRouter()
    const iraregister = () => {
      router.push("/register")
      router.push("/recuperar")
    }

    return {
      router,
      iraregister,
      Recuperar
    }

  },

  data() {

    return {

      // Datos del formulario

      email: correoRecordado(),

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


      const correoIngresado = correoNormalizado(this.email)
      const correoCorrecto = "admin@proa.com"
      const passwordCorrecta = "123456"
      const usuarioRegistrado = leerUsuarios().find(
        usuario => correoNormalizado(usuario.email) === correoIngresado
      )
      const correoValido = correoIngresado === correoCorrecto || Boolean(usuarioRegistrado)
      const passwordValida = (
        correoIngresado === correoCorrecto && this.password === passwordCorrecta
      ) || (
        Boolean(usuarioRegistrado) && usuarioRegistrado.password === this.password
      )

      if (!correoValido && !passwordValida) {

        this.errorTipo = "ambos"

        return

      }


      // Correo incorrecto

      if (!correoValido) {

        this.errorTipo = "email"

        return

      }


      // Contraseña incorrecta

      if (!passwordValida) {

        this.errorTipo = "password"

        return

      }


      // =========================
      // LOGIN CORRECTO
      // =========================

      try {
        if (this.recordar) {
          localStorage.setItem(REMEMBERED_EMAIL_KEY, correoIngresado)
        } else {
          localStorage.removeItem(REMEMBERED_EMAIL_KEY)
        }
      } catch {
        // El inicio de sesión no debe fallar si el navegador bloquea el almacenamiento.
      }

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


/* =========================================
   FOOTER INSTITUCIONAL
========================================= */

.footer {
  width: 100%;
  margin-top: auto;
  padding: 32px clamp(20px, 5vw, 64px) 18px;
  color: #f7f8f4;
  background: linear-gradient(135deg, #263f33 0%, #345b46 100%);
  border-top: 3px solid #b8794b;
}

.footer-content {
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 28px;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.footer-mark {
  width: 46px;
  height: 46px;
  flex: 0 0 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, .28);
  border-radius: 13px;
  background: rgba(255, 255, 255, .12);
  color: #fff;
  font-size: 21px;
  font-weight: 700;
  letter-spacing: -.5px;
}

.footer-brand-copy {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.footer-brand-copy strong {
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: .2px;
}

.footer-brand-copy span {
  color: rgba(255, 255, 255, .72);
  font-size: 12px;
  line-height: 1.5;
}

.footer-links {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 10px;
}

.footer-links a {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 10px 14px;
  border: 1px solid rgba(255, 255, 255, .2);
  border-radius: 9px;
  color: #fff;
  background: rgba(255, 255, 255, .07);
  font-size: 12px;
  text-decoration: none;
  transition: background .2s ease, border-color .2s ease, transform .2s ease;
}

.footer-links a:hover {
  color: #fff;
  background: rgba(255, 255, 255, .16);
  border-color: rgba(255, 255, 255, .42);
  transform: translateY(-1px);
}

.footer-links a span {
  color: #e4bd91;
  font-size: 15px;
}

.footer-bottom {
  width: 100%;
  max-width: 1180px;
  margin: 24px auto 0;
  padding-top: 15px;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  border-top: 1px solid rgba(255, 255, 255, .16);
  color: rgba(255, 255, 255, .62);
  font-size: 11px;
}

@media (max-width: 640px) {
  .footer {
    padding: 27px 20px 17px;
  }

  .footer-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 22px;
  }

  .footer-links {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }

  .footer-links a {
    justify-content: flex-start;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 7px;
    margin-top: 20px;
  }
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
