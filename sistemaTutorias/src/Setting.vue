<template>

  <div class="settings-page">

    <!-- =========================================
         BARRA LATERAL
    ========================================== -->

    <aside class="sidebar">

      <!-- LOGO -->
      <div class="sidebar-header">

        <div class="logo">
          T
        </div>

        <div class="brand">

          <span class="brand-title">
            Tutorías
          </span>

          <span class="brand-subtitle">
            ProA
          </span>

        </div>

      </div>


      <!-- SEPARADOR -->
      <div class="separator"></div>


      <!-- =========================================
           MENÚ PRINCIPAL
      ========================================== -->

      <nav class="menu">

        <!-- INICIO -->
        <router-link
          to="/home"
          class="menu-item"
        >

          <span class="menu-icon">
            ♧
          </span>

          <span>
            Inicio
          </span>

        </router-link>


        <!-- NUEVA CITACIÓN -->
        <router-link
          to="/nueva-citacion"
          class="menu-item"
        >

          <span class="menu-icon plus">
            +
          </span>

          <span>
            Nueva citación
          </span>

        </router-link>


        <!-- MIS CITACIONES -->
        <router-link
          to="/mis-citaciones"
          class="menu-item"
        >

          <span class="menu-icon">
            ▣
          </span>

          <span>
            Mis citaciones
          </span>

        </router-link>


        <!-- CURSOS -->
        <router-link
          to="/cursos"
          class="menu-item"
        >

          <span class="menu-icon">
            ▤
          </span>

          <span>
            Cursos
          </span>

        </router-link>


        <!-- MATERIAS -->
        <router-link
          to="/materias"
          class="menu-item"
        >

          <span class="menu-icon">
            📚
          </span>

          <span>
            Materias
          </span>

        </router-link>


        <!-- ESTUDIANTES -->
        <router-link
          to="/estudiantes"
          class="menu-item"
        >

          <span class="menu-icon">
            👤
          </span>

          <span>
            Estudiantes
          </span>

        </router-link>


        <!-- HORARIOS -->
        <router-link
          to="/horarios"
          class="menu-item"
        >

          <span class="menu-icon">
            ◷
          </span>

          <span>
            Horarios de tutoría
          </span>

        </router-link>

      </nav>


      <!-- =========================================
           MENÚ INFERIOR
      ========================================== -->

      <div class="bottom-menu">

        <!-- REPORTES -->
        <router-link
          to="/reportes"
          class="menu-item"
        >

          <span class="menu-icon">
            ⚙
          </span>

          <span @click="irAreporte">
            Reportes
          </span>

        </router-link>


        <!-- CONFIGURACIÓN ACTIVA -->
        <router-link
          to="/setting"
          class="menu-item active"
        >

          <span class="menu-icon">
            ⚙
          </span>

          <span>
            Configuración
          </span>

        </router-link>

      </div>

    </aside>


    <!-- =========================================
         CONTENIDO PRINCIPAL
    ========================================== -->

    <main class="settings-content">


      <!-- ENCABEZADO -->

      <div class="page-header">

        <div>

          <h1>
            CONFIGURACIÓN
          </h1>

          <p>
            Administrá las opciones generales de tu cuenta.
          </p>

        </div>

      </div>


      <!-- =========================================
           TARJETA DE CONFIGURACIÓN
      ========================================== -->

      <section class="settings-card">


        <!-- =====================================
             PRIVACIDAD
        ====================================== -->

        <div class="setting-row">

          <div class="setting-icon">
            🔒
          </div>


          <div class="setting-info">

            <h2>
              Privacidad
            </h2>

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

              <span>
                Público
              </span>

            </label>


            <label>

              <input
                type="radio"
                name="privacy"
                value="privado"
                v-model="privacidad"
              />

              <span>
                Privado
              </span>

            </label>

          </div>

        </div>


        <!-- =====================================
             BLOQUEAR CUENTA
        ====================================== -->

        <div class="setting-row">

          <div class="setting-icon">
            🔐
          </div>


          <div class="setting-info">

            <h2>
              Bloquear cuenta
            </h2>

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


        <!-- =====================================
             NOTIFICACIONES
        ====================================== -->

        <div class="setting-row">

          <div class="setting-icon">
            🔔
          </div>


          <div class="setting-info">

            <h2>
              Notificaciones
            </h2>

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


        <!-- =====================================
             AYUDA
        ====================================== -->

        <div class="setting-row">

          <div class="setting-icon">
            ❓
          </div>


          <div class="setting-info">

            <h2>
              Ayuda
            </h2>

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


        <!-- =====================================
             CERRAR SESIÓN
        ====================================== -->

        <div class="setting-row logout-row">

          <div class="setting-icon logout-icon">
            ↪
          </div>


          <div class="setting-info">

            <h2>
              Cerrar sesión
            </h2>

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


      <!-- =========================================
           INFORMACIÓN
      ========================================== -->

      <div class="settings-help">

        <span class="help-icon">
          💡
        </span>

        <div>

          <h3>
            Configuración general
          </h3>

          <p>
            Desde esta sección podés administrar las
            preferencias de tu cuenta y del sistema de tutorías.
          </p>

        </div>

      </div>


      <!-- =========================================
           FOOTER
      ========================================== -->

      <footer class="footer">

        <p class="contact-title">
          Comunicate con nosotros
        </p>


        <div class="contact-info">

          <span>
            🟢 +54 9 3548 32-0643
          </span>


          <span>
            ✉️ jfqmw@esc.edu.ar
          </span>

        </div>


        <p class="copyright">
          © 2026 Tutorías ProA · Sistema de tutorías
        </p>

      </footer>


    </main>

  </div>

</template>



<script>

export default {

  name: "Setting",

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

      this.$router.push("/")

    }

  }

}

</script>



<style scoped>

/* =========================================
   GENERAL
========================================= */

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

  color: #333;

}


/* =========================================
   BARRA LATERAL
========================================= */

.sidebar {

  width: 250px;

  min-width: 250px;

  height: 100vh;

  background: #ffffff;

  border-right: 1px solid #e1e4e8;

  padding: 30px 15px;

  display: flex;

  flex-direction: column;

}


/* =========================================
   ENCABEZADO
========================================= */

.sidebar-header {

  display: flex;

  align-items: center;

  padding: 0 10px;

  margin-bottom: 25px;

}


.logo {

  width: 40px;

  height: 40px;

  border-radius: 8px;

  background: #5159d8;

  color: white;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 20px;

  font-weight: bold;

}


.brand {

  display: flex;

  flex-direction: column;

  margin-left: 10px;

}


.brand-title {

  font-size: 16px;

  color: #333;

  font-weight: 500;

}


.brand-subtitle {

  margin-top: 3px;

  font-size: 13px;

  color: #888;

}


/* =========================================
   SEPARADOR
========================================= */

.separator {

  height: 1px;

  background: #e5e5e5;

  margin: 0 0 18px;

}


/* =========================================
   MENÚ
========================================= */

.menu {

  display: flex;

  flex-direction: column;

  gap: 5px;

}


.menu-item {

  min-height: 44px;

  padding: 0 14px;

  border-radius: 8px;

  display: flex;

  align-items: center;

  gap: 15px;

  color: #5f6470;

  text-decoration: none;

  font-size: 14px;

  transition: all 0.2s ease;

}


.menu-item:hover {

  background: #f1f3ff;

  color: #5159d8;

}


/* =========================================
   ICONOS
========================================= */

.menu-icon {

  width: 20px;

  min-width: 20px;

  display: flex;

  align-items: center;

  justify-content: center;

  color: #69717d;

  font-size: 17px;

}


.menu-item:hover .menu-icon {

  color: #5159d8;

}


.menu-icon.plus {

  font-size: 24px;

  font-weight: 300;

}


/* =========================================
   ELEMENTO ACTIVO
========================================= */

.menu-item.active {

  background: #e9eaff;

  color: #5159d8;

}


.menu-item.active .menu-icon {

  color: #5159d8;

}


/* =========================================
   MENÚ INFERIOR
========================================= */

.bottom-menu {

  margin-top: auto;

  display: flex;

  flex-direction: column;

  gap: 5px;

}


/* =========================================
   CONTENIDO
========================================= */

.settings-content {

  flex: 1;

  min-height: 100vh;

  padding: 45px 50px 0;

  display: flex;

  flex-direction: column;

  max-width: 1100px;

}


/* =========================================
   ENCABEZADO
========================================= */

.page-header {

  margin-bottom: 30px;

}


.page-header h1 {

  margin: 0 0 8px;

  font-size: 32px;

  font-weight: 500;

  letter-spacing: 2px;

  color: #333;

}


.page-header p {

  margin: 0;

  color: #888;

  font-size: 14px;

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

  gap: 20px;

  border-bottom: 1px solid #e8e8e8;

  transition: background 0.2s ease;

}


.setting-row:last-child {

  border-bottom: none;

}


.setting-row:hover {

  background: #fafbff;

}


/* =========================================
   ICONOS DE CONFIGURACIÓN
========================================= */

.setting-icon {

  width: 42px;

  height: 42px;

  min-width: 42px;

  border-radius: 9px;

  background: #eef0ff;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 19px;

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

  line-height: 1.5;

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

  color: #555;

  cursor: pointer;

}


.privacy-options input {

  accent-color: #5159d8;

}


/* =========================================
   BOTÓN GENERAL
========================================= */

.action-button {

  padding: 9px 17px;

  border: 1px solid #5159d8;

  border-radius: 7px;

  background: #ffffff;

  color: #5159d8;

  font-size: 13px;

  cursor: pointer;

  transition: all 0.2s ease;

}


.action-button:hover {

  background: #5159d8;

  color: #ffffff;

}


/* =========================================
   BOTÓN CERRAR SESIÓN
========================================= */

.logout-button {

  padding: 9px 17px;

  border: none;

  border-radius: 7px;

  background: #dc3545;

  color: white;

  font-size: 13px;

  cursor: pointer;

  transition: 0.2s;

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

  min-width: 46px;

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

  background: #5159d8;

}


.switch input:checked + .slider::before {

  transform: translateX(22px);

}


/* =========================================
   AYUDA
========================================= */

.settings-help {

  margin-top: 20px;

  padding: 22px 25px;

  display: flex;

  align-items: center;

  gap: 15px;

  background: #ffffff;

  border: 1px solid #e1e1e1;

  border-radius: 12px;

}


.help-icon {

  font-size: 24px;

}


.settings-help h3 {

  margin: 0 0 5px;

  font-size: 15px;

  font-weight: 500;

  color: #444;

}


.settings-help p {

  margin: 0;

  color: #888;

  font-size: 13px;

  line-height: 1.5;

}


/* =========================================
   FOOTER
========================================= */

.footer {

  margin-top: auto;

  border-top: 1px solid #dcdcdc;

  padding: 25px 0 20px;

  text-align: center;

}


.contact-title {

  margin: 0 0 15px;

  color: #777;

  font-size: 15px;

}


.contact-info {

  display: flex;

  justify-content: center;

  align-items: center;

  gap: 40px;

  color: #888;

  font-size: 13px;

}


.copyright {

  margin: 15px 0 0;

  color: #aaa;

  font-size: 12px;

}


/* =========================================
   TABLET
========================================= */

@media (max-width: 800px) {

  .sidebar {

    width: 210px;

    min-width: 210px;

  }


  .settings-content {

    padding: 35px 25px 0;

  }


  .setting-row {

    padding: 22px;

  }

}


/* =========================================
   CELULAR
========================================= */

@media (max-width: 600px) {

  .settings-page {

    flex-direction: column;

  }


  .sidebar {

    width: 100%;

    min-width: 100%;

    height: auto;

    min-height: auto;

    padding: 15px;

    border-right: none;

    border-bottom: 1px solid #e1e4e8;

  }


  .sidebar-header {

    margin-bottom: 15px;

  }


  .menu {

    flex-direction: row;

    overflow-x: auto;

    gap: 5px;

  }


  .menu-item {

    min-width: max-content;

    padding: 10px 13px;

  }


  .bottom-menu {

    margin-top: 10px;

    flex-direction: row;

    overflow-x: auto;

  }


  .settings-content {

    padding: 25px 15px 0;

  }


  .page-header h1 {

    font-size: 27px;

  }


  .setting-row {

    flex-wrap: wrap;

    padding: 22px;

  }


  .setting-icon {

    width: 38px;

    height: 38px;

    min-width: 38px;

  }


  .setting-info {

    min-width: calc(100% - 58px);

  }


  .action-button,
  .logout-button {

    width: 100%;

    margin-top: 5px;

  }


  .privacy-options {

    width: 100%;

    flex-direction: row;

    padding-left: 58px;

  }


  .settings-help {

    align-items: flex-start;

    padding: 20px;

  }


  .contact-info {

    flex-direction: column;

    gap: 10px;

  }

}

</style>