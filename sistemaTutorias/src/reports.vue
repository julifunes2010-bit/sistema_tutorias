<template>

  <div class="reports-page">

    <!-- CONTENIDO PRINCIPAL -->
    <main class="reports-content">

      <!-- PERFIL -->
      <div class="profile">

        <div class="profile-image">
          <div class="profile-head"></div>
          <div class="profile-body"></div>
        </div>

        <span class="profile-name">LUIS</span>

      </div>


      <!-- TÍTULO -->
      <h1>REPORTES</h1>


      <!-- MENSAJE -->
      <div class="report-message">

        <p>
          Cualquier consulta, duda o pregunta
          comunicate con nosotros.
        </p>

      </div>


      <!-- FOOTER -->
      <footer class="footer">

        <p class="contact-title">
          Comunicate con nosotros
        </p>


        <div class="contact-info">

          <span>
            🟢 000-444-999
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

  name: "Reports"

}

</script>


<style scoped>

* {
  box-sizing: border-box;
}


.reports-page {

  min-height: 100vh;

  width: 100%;

  background: #ffffff;

  font-family:
    Arial,
    Helvetica,
    sans-serif;

  color: #333;

}


.reports-content {

  min-height: 100vh;

  max-width: 1000px;

  margin: 0 auto;

  padding: 35px 50px 0;

  display: flex;

  flex-direction: column;

}


/* =========================================
   PERFIL
========================================= */

.profile {

  display: flex;

  flex-direction: column;

  align-items: center;

  margin-bottom: 35px;

}


.profile-image {

  width: 120px;

  height: 120px;

  border: 1.5px solid #bdbdbd;

  border-radius: 50%;

  position: relative;

  overflow: hidden;

  background: #fafafa;

}


/* CABEZA */

.profile-head {

  width: 42px;

  height: 42px;

  background: #8c8c8c;

  border-radius: 50%;

  position: absolute;

  top: 20px;

  left: 39px;

}


/* CUERPO */

.profile-body {

  width: 95px;

  height: 48px;

  background: #8c8c8c;

  border-radius: 50% 50% 0 0;

  position: absolute;

  bottom: -5px;

  left: 12px;

}


.profile-name {

  margin-top: 8px;

  font-size: 14px;

  color: #777;

  letter-spacing: 1px;

}


/* =========================================
   TÍTULO
========================================= */

h1 {

  margin: 0;

  font-size: 38px;

  font-weight: 500;

  letter-spacing: 3px;

  color: #555;

}


/* =========================================
   MENSAJE
========================================= */

.report-message {

  margin-top: 35px;

  max-width: 450px;

}


.report-message p {

  margin: 0;

  font-size: 16px;

  line-height: 1.6;

  color: #777;

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
   RESPONSIVE
========================================= */

@media (max-width: 768px) {

  .reports-content {

    padding: 30px 30px 0;

  }


  h1 {

    font-size: 32px;

  }

}


@media (max-width: 500px) {

  .reports-content {

    padding: 25px 20px 0;

  }


  .profile-image {

    width: 100px;

    height: 100px;

  }


  .profile-head {

    width: 35px;

    height: 35px;

    left: 32px;

    top: 17px;

  }


  .profile-body {

    width: 80px;

    height: 40px;

    left: 9px;

  }


  h1 {

    font-size: 28px;

    letter-spacing: 2px;

  }


  .report-message {

    margin-top: 25px;

  }


  .report-message p {

    font-size: 14px;

  }


  .contact-info {

    flex-direction: column;

    gap: 10px;

  }

}

</style>