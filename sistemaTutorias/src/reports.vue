<template>

  <div class="reports-page">

    <!-- =========================================
         BARRA LATERAL
    ========================================== -->

    <aside class="sidebar">

      <!-- LOGO / NOMBRE -->
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


      <!-- MENÚ PRINCIPAL -->
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
           OPCIONES INFERIORES
      ========================================== -->

      <div class="bottom-menu">

        <!-- REPORTES -->
        <router-link
          class="menu-item bottom-item active"
        >

          <span class="menu-icon">
            ⚙
          </span>

          <span>
            Reportes
          </span>

        </router-link>


        <!-- CONFIGURACIÓN -->
        <router-link
          to="/Setting"
          class="menu-item bottom-item"
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

    <main class="reports-content">


      <!-- ENCABEZADO -->

      <div class="page-header">

        <h1>
          REPORTES
        </h1>

        <p>
          Consultá información o comunicate con nosotros.
        </p>

      </div>


      <!-- =========================================
           PERFIL
      ========================================== -->

      <div class="profile">

        <div class="profile-image">

          <div class="profile-head"></div>

          <div class="profile-body"></div>

        </div>

        <span class="profile-name">
          LUIS
        </span>

      </div>


      <!-- =========================================
           TARJETA PRINCIPAL
      ========================================== -->

      <section class="report-card">

        <div class="report-icon">
          ?
        </div>


        <div class="report-info">

          <h2>
            ¿Tenés alguna consulta?
          </h2>

          <p>
            Cualquier consulta, duda o pregunta
            comunicate con nosotros.
          </p>

        </div>


        <button
          class="contact-button"
          @click="contactar"
        >
          Contactanos
        </button>

      </section>


      <!-- =========================================
           INFORMACIÓN
      ========================================== -->

      <section class="information-card">

        <h2>
          Información
        </h2>

        <p>
          Si encontraste un problema en el sistema,
          necesitás realizar una consulta o querés
          informar alguna situación, podés comunicarte
          con nosotros a través de los medios de contacto.
        </p>

      </section>


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

  name: "Reports",

  methods: {

    contactar() {

      alert(
        "Podés comunicarte con nosotros mediante WhatsApp o correo electrónico."
      )

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


.reports-page {

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
   ENCABEZADO DE LA BARRA
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


.bottom-item {

  margin-top: 2px;

}


/* =========================================
   CONTENIDO PRINCIPAL
========================================= */

.reports-content {

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

  margin-bottom: 25px;

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

  font-size: 14px;

  color: #888;

}


/* =========================================
   PERFIL
========================================= */

.profile {

  display: flex;

  align-items: center;

  gap: 15px;

  margin-bottom: 30px;

}


.profile-image {

  width: 75px;

  height: 75px;

  border: 1px solid #cfcfcf;

  border-radius: 50%;

  position: relative;

  overflow: hidden;

  background: #fafafa;

}


/* CABEZA */

.profile-head {

  width: 27px;

  height: 27px;

  background: #8c8c8c;

  border-radius: 50%;

  position: absolute;

  top: 13px;

  left: 23px;

}


/* CUERPO */

.profile-body {

  width: 60px;

  height: 31px;

  background: #8c8c8c;

  border-radius: 50% 50% 0 0;

  position: absolute;

  bottom: -4px;

  left: 7px;

}


.profile-name {

  font-size: 15px;

  color: #777;

  letter-spacing: 1px;

}


/* =========================================
   TARJETA DE REPORTE
========================================= */

.report-card {

  width: 100%;

  background: #ffffff;

  border: 1px solid #e1e1e1;

  border-radius: 12px;

  padding: 30px;

  display: flex;

  align-items: center;

  gap: 25px;

  box-shadow:
    0 4px 15px
    rgba(0, 0, 0, 0.04);

}


.report-icon {

  width: 55px;

  height: 55px;

  min-width: 55px;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 50%;

  background: #e8eef7;

  color: #5159d8;

  font-size: 25px;

  font-weight: bold;

}


.report-info {

  flex: 1;

}


.report-info h2 {

  margin: 0 0 8px;

  font-size: 18px;

  font-weight: 500;

  color: #333;

}


.report-info p {

  margin: 0;

  font-size: 14px;

  line-height: 1.5;

  color: #888;

}


/* =========================================
   BOTÓN
========================================= */

.contact-button {

  padding: 10px 18px;

  border: 1px solid #5159d8;

  border-radius: 7px;

  background: white;

  color: #5159d8;

  font-size: 13px;

  cursor: pointer;

  transition: 0.2s;

}


.contact-button:hover {

  background: #5159d8;

  color: white;

}


/* =========================================
   INFORMACIÓN
========================================= */

.information-card {

  margin-top: 20px;

  padding: 25px 30px;

  background: #ffffff;

  border: 1px solid #e1e1e1;

  border-radius: 12px;

}


.information-card h2 {

  margin: 0 0 10px;

  font-size: 17px;

  font-weight: 500;

  color: #333;

}


.information-card p {

  margin: 0;

  max-width: 700px;

  font-size: 14px;

  line-height: 1.6;

  color: #888;

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


  .reports-content {

    padding: 35px 25px 0;

  }


  .report-card {

    padding: 25px;

  }

}


/* =========================================
   CELULARES
========================================= */

@media (max-width: 600px) {

  .reports-page {

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


  .reports-content {

    padding: 25px 15px 0;

  }


  .page-header h1 {

    font-size: 27px;

  }


  .profile {

    margin-bottom: 25px;

  }


  .report-card {

    flex-direction: column;

    align-items: flex-start;

    padding: 25px;

  }


  .contact-button {

    width: 100%;

  }


  .information-card {

    padding: 22px;

  }


  .contact-info {

    flex-direction: column;

    gap: 10px;

  }

}

</style>