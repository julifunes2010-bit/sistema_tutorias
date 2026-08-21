<template>
  <div class="settings-page">

    <!-- BARRA LATERAL -->
    <aside class="sidebar">

      <div class="sidebar-menu">

        <button @click="router.push('/home')" class="menu-item">
          Inicio
        </button>

        <button @click="router.push('/tutorias')" class="menu-item">
          Tutorías
        </button>

        <button @click="router.push('/mis-tutorias')" class="menu-item">
          Mis tutorías
        </button>

        <button @click="router.push('/ayuda')" class="menu-item">
          Ayuda
        </button>

        <!-- CONFIGURACIÓN SELECCIONADA -->
        <button @click="router.push('/configuracion')" class="menu-item active">
          Configuración
        </button>

        <button @click="router.push('/notificaciones')" class="menu-item">
          Notificaciones
        </button>

        <button @click="router.push('/contacto')" class="menu-item">
          Contacto
        </button>

      </div>

    </aside>


    <!-- CONTENIDO -->
    <main class="settings-content">

      <h1>Configuración</h1>


      <!-- CONFIGURACIÓN GENERAL -->
      <section class="settings-card">


        <!-- PRIVACIDAD -->
        <div class="setting-row privacy-row">

          <div class="setting-info">

            <h2>Privacidad</h2>

            <p>
              Elegí quién puede ver tu información.
            </p>

          </div>


          <div class="privacy-options">

            <label>

              <input
                type="radio"
                name="privacy"
                value="publico"
                v-model="privacidad"
              />

              Público

            </label>


            <label>

              <input
                type="radio"
                name="privacy"
                value="privado"
                v-model="privacidad"
              />

              Privado

            </label>

          </div>

        </div>


        <!-- BLOQUEAR CUENTA -->
        <div class="setting-row">

          <div class="setting-info">

            <h2>Bloquear cuenta</h2>

            <p>
              Bloqueá temporalmente el acceso a tu cuenta.
            </p>

          </div>


          <button
            class="action-button"
            @click="bloquearCuenta"
          >
            Bloquear
          </button>

        </div>


        <!-- NOTIFICACIONES -->
        <div class="setting-row">

          <div class="setting-info">

            <h2>Notificaciones</h2>

            <p>
              Recibí avisos sobre tus tutorías y actividades.
            </p>

          </div>


          <label class="switch">

            <input
              type="checkbox"
              v-model="notificaciones"
            />

            <span class="slider"></span>

          </label>

        </div>


        <!-- AYUDA -->
        <div class="setting-row">

          <div class="setting-info">

            <h2>Ayuda</h2>

            <p>
              Consultá información y asistencia sobre el sistema.
            </p>

          </div>


          <button
            class="action-button"
            @click="mostrarAyuda"
          >
            Ver ayuda
          </button>

        </div>


        <!-- CERRAR SESIÓN -->
        <div class="setting-row logout-row">

          <div class="setting-info">

            <h2>Cerrar sesión</h2>

            <p>
              Salí de tu cuenta y volvé a la pantalla de inicio.
            </p>

          </div>


          <button
            class="logout-button"
            @click="cerrarSesion"
          >
            Cerrar sesión
          </button>

        </div>


      </section>

    </main>

  </div>
</template>


<script>

import { useRouter } from "vue-router"


export default {

  name: "Setting",


  setup() {

    const router = useRouter()

    return {
      router
    }

  },


  data() {

    return {

      privacidad: "publico",

      notificaciones: true

    }

  },


  methods: {

    bloquearCuenta() {

      alert(
        "La función para bloquear la cuenta estará disponible próximamente."
      )

    },


    mostrarAyuda() {

      alert(
        "Acá podrás encontrar ayuda sobre el sistema de tutorías."
      )

    },


    cerrarSesion() {

      this.router.push("/")

    }

  }

}

</script>


<style scoped>

* {
  box-sizing: border-box;
}


.settings-page {

  min-height: 100vh;

  width: 100%;

  display: flex;

  background: #f4f7f9;

  font-family:
    Arial,
    Helvetica,
    sans-serif;

  color: #222;

}


/* =========================================
   BARRA LATERAL
========================================= */

.sidebar {

  width: 240px;

  min-height: 100vh;

  background: #ffffff;

  border-right: 1px solid #e5e5e5;

  padding: 30px 15px;

}


.sidebar-menu {

  display: flex;

  flex-direction: column;

  gap: 6px;

}


.menu-item {

  width: 100%;

  padding: 14px 18px;

  border: none;

  border-radius: 8px;

  background: transparent;

  color: #555;

  text-align: left;

  font-size: 14px;

  cursor: pointer;

  transition: 0.2s;

}


.menu-item:hover {

  background: #f0f4f8;

  color: #2d7ff9;

}


/* CONFIGURACIÓN ACTIVA */

.menu-item.active {

  background: #e8eef7;

  color: #2d7ff9;

  font-weight: bold;

}


/* =========================================
   CONTENIDO
========================================= */

.settings-content {

  flex: 1;

  padding: 50px;

  max-width: 1000px;

}


.settings-content h1 {

  margin:

    0 0 30px;

  font-size: 32px;

  font-weight: 500;

  text-transform: uppercase;

  color: #333;

}


/* =========================================
   TARJETA
========================================= */

.settings-card {

  width: 100%;

  background: #ffffff;

  border: 1px solid #e1e1e1;

  border-radius: 12px;

  overflow: hidden;

  box-shadow:

    0 4px 15px
    rgba(0, 0, 0, 0.04);

}


/* =========================================
   FILAS
========================================= */

.setting-row {

  min-height: 105px;

  padding: 24px 30px;

  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: 30px;

  border-bottom: 1px solid #e5e5e5;

}


.setting-row:last-child {

  border-bottom: none;

}


.setting-info {

  flex: 1;

}


.setting-info h2 {

  margin: 0 0 7px;

  font-size: 17px;

  font-weight: 500;

  color: #333;

}


.setting-info p {

  margin: 0;

  color: #888;

  font-size: 13px;

}


/* =========================================
   PRIVACIDAD
========================================= */

.privacy-options {

  display: flex;

  flex-direction: column;

  gap: 10px;

  min-width: 100px;

}


.privacy-options label {

  display: flex;

  align-items: center;

  gap: 7px;

  font-size: 13px;

  cursor: pointer;

}


.privacy-options input {

  accent-color: #2d7ff9;

}


/* =========================================
   BOTONES
========================================= */

.action-button {

  padding: 9px 17px;

  border: 1px solid #2d7ff9;

  border-radius: 7px;

  background: white;

  color: #2d7ff9;

  font-size: 13px;

  cursor: pointer;

  transition: 0.2s;

}


.action-button:hover {

  background: #2d7ff9;

  color: white;

}


.logout-button {

  padding: 9px 17px;

  border: none;

  border-radius: 7px;

  background: #dc3545;

  color: white;

  font-size: 13px;

  cursor: pointer;

}


.logout-button:hover {

  background: #bb2d3b;

}


/* =========================================
   SWITCH
========================================= */

.switch {

  position: relative;

  width: 46px;

  height: 24px;

}


.switch input {

  opacity: 0;

  width: 0;

  height: 0;

}


.slider {

  position: absolute;

  inset: 0;

  background: #ccc;

  border-radius: 20px;

  cursor: pointer;

  transition: 0.2s;

}


.slider::before {

  content: "";

  position: absolute;

  width: 18px;

  height: 18px;

  left: 3px;

  top: 3px;

  background: white;

  border-radius: 50%;

  transition: 0.2s;

}


.switch input:checked + .slider {

  background: #2d7ff9;

}


.switch input:checked + .slider::before {

  transform: translateX(22px);

}


/* =========================================
   RESPONSIVE
========================================= */

@media (max-width: 768px) {

  .sidebar {

    width: 190px;

  }


  .settings-content {

    padding: 35px 25px;

  }


  .setting-row {

    padding: 22px;

  }

}


@media (max-width: 600px) {

  .settings-page {

    flex-direction: column;

  }


  .sidebar {

    width: 100%;

    min-height: auto;

    padding: 10px;

    border-right: none;

    border-bottom: 1px solid #e5e5e5;

  }


  .sidebar-menu {

    flex-direction: row;

    overflow-x: auto;

  }


  .menu-item {

    min-width: max-content;

    text-align: center;

  }


  .settings-content {

    padding: 25px 15px;

  }


  .settings-content h1 {

    font-size: 26px;

  }


  .setting-row {

    flex-direction: column;

    align-items: flex-start;

    gap: 18px;

  }


  .privacy-options {

    flex-direction: row;

  }

}

</style>