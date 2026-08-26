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
           OPCIONES INFERIORES
      ========================================== -->

      <div class="bottom-menu">

        <!-- REPORTES -->
        <router-link
          to="/reports"
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
   FOOTER
========================================= */

.footer {

  margin-top: auto;

  border-top: 1px solid #dcdcdc;

  padding: 25px 0 20px;

  text-align: center;

}


.contact-title {

  margin: 0 0 18px;

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