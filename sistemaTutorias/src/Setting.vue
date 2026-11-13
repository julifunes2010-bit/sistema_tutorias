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

          <span>
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
            Configuración
          </h1>

          <p>
            Elegí cómo querés usar el sistema.
          </p>

        </div>

      </div>


      <!-- =========================================
           TARJETA DE CONFIGURACIÓN
      ========================================== -->

      <section class="settings-card">


        <!-- =====================================
             MODO OSCURO
        ====================================== -->

        <div class="setting-row">

          <div class="setting-icon">
            <span aria-hidden="true">☾</span>
          </div>


          <div class="setting-info">

            <h2>
              Modo oscuro
            </h2>

            <p>
              Usá una apariencia más cómoda para ambientes con poca luz.
            </p>

          </div>


          <div class="theme-control">
            <span class="theme-state" aria-live="polite">
              {{ modoOscuro ? "Activado" : "Desactivado" }}
            </span>
            <label class="switch" :aria-label="`Modo oscuro ${modoOscuro ? 'activado' : 'desactivado'}`">
              <input
                type="checkbox"
                v-model="modoOscuro"
                @change="cambiarTema"
                aria-label="Activar modo oscuro"
              />
              <span class="slider"></span>
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


          <router-link
            to="/reportes"
            class="action-button"
          >
            Ver ayuda
          </router-link>

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


    </main>

  </div>

</template>



<script>

export default {

  name: "Setting",

  data() {

    return {

      modoOscuro: document.documentElement.dataset.theme === "dark",

      notificaciones: true

    }

  },


  methods: {

    cambiarTema() {
      const theme = this.modoOscuro ? "dark" : "light"
      document.documentElement.dataset.theme = theme
      localStorage.setItem("tutorias-theme", theme)
    },

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

  background: #e8eee9;

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


.theme-control {
  display: flex;
  align-items: center;
  gap: 14px;
}

.theme-state {
  min-width: 75px;
  color: #69717d;
  font-size: 13px;
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

  background: #456b57;

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

  background: #456b57;

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


  .theme-control {
    width: 100%;
    justify-content: flex-end;
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
