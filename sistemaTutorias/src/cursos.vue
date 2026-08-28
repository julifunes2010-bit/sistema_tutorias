<template>

  <div class="courses-page">

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


      <div class="separator"></div>


      <!-- MENÚ -->
      <nav class="menu">

        <!-- INICIO -->
        <router-link
          to="/home"
          class="menu-item"
        >
          <span class="menu-icon">⌂</span>
          <span>Inicio</span>
        </router-link>


        <!-- NUEVA CITACIÓN -->
        <router-link
          to="/nueva-citacion"
          class="menu-item"
        >
          <span class="menu-icon plus">+</span>
          <span>Nueva citación</span>
        </router-link>


        <!-- MIS CITACIONES -->
        <router-link
          to="/mis-citaciones"
          class="menu-item"
        >
          <span class="menu-icon">▣</span>
          <span>Mis citaciones</span>
        </router-link>


        <!-- CURSOS ACTIVO -->
        <router-link
          to="/cursos"
          class="menu-item active"
        >
          <span class="menu-icon">▤</span>
          <span>Cursos</span>
        </router-link>


        <!-- MATERIAS -->
        <router-link
          to="/materias"
          class="menu-item"
        >
          <span class="menu-icon">📚</span>
          <span>Materias</span>
        </router-link>


        <!-- ESTUDIANTES -->
        


        <!-- HORARIOS -->
        <router-link
          to="/horarios"
          class="menu-item"
        >
          <span class="menu-icon">◷</span>
          <span>Horarios de tutoría</span>
        </router-link>

      </nav>


      <!-- MENÚ INFERIOR -->
      <div class="bottom-menu">

        <!-- REPORTES -->
        <router-link
          to="/reports"
          class="menu-item"
        >
          <span class="menu-icon">⚙</span>
          <span>Reportes</span>
        </router-link>


        <!-- CONFIGURACIÓN -->
        <router-link
          to="/setting"
          class="menu-item"
        >
          <span class="menu-icon">⚙</span>
          <span>Configuración</span>
        </router-link>

      </div>

    </aside>


    <!-- =========================================
         CONTENIDO PRINCIPAL
    ========================================== -->

    <main class="courses-content">


      <!-- ENCABEZADO -->

      <div class="page-header">

        <div>

          <h1>
            CURSOS
          </h1>

          <p>
            Consultá los cursos disponibles en el sistema.
          </p>

        </div>

      </div>


      <!-- =========================================
           FILTROS
      ========================================== -->

      <section class="filters-card">

        <div class="filter">

          <label>
            Curso
          </label>

          <select v-model="cursoSeleccionado">

            <option value="Todos">
              Todos
            </option>

            <option value="5to">
              5to año
            </option>

            <option value="4to">
              4to año
            </option>

            <option value="3ro">
              3er año
            </option>

            <option value="2do">
              2do año
            </option>

            <option value="1ro">
              1er año
            </option>

          </select>

        </div>


        <div class="filter">

          <label>
            Año
          </label>

          <select v-model="anoSeleccionado">

            <option value="Todos">
              Todos
            </option>

            <option value="2026">
              2026
            </option>

            <option value="2025">
              2025
            </option>

          </select>

        </div>

      </section>


      <!-- =========================================
           TABLA
      ========================================== -->

      <section class="courses-card">

        <div class="table-container">

          <table>

            <thead>

              <tr>

                <th>
                  Curso
                </th>

                <th>
                  Año
                </th>

                <th>
                  Turno
                </th>

                <th>
                  Docente
                </th>

                <th>
                  Contacto
                </th>

              </tr>

            </thead>


            <tbody>

              <tr
                v-for="curso in cursosFiltrados"
                :key="curso.id"
              >

                <td class="course-name">

                  <div class="course-icon">
                    📚
                  </div>

                  <span>
                    {{ curso.nombre }}
                  </span>

                </td>


                <td>
                  {{ curso.ano }}
                </td>


                <td>

                  <span class="turno">
                    {{ curso.turno }}
                  </span>

                </td>


                <td>
                  {{ curso.docente }}
                </td>


                <td class="contact">
                  {{ curso.contacto }}
                </td>

              </tr>


              <!-- SI NO HAY RESULTADOS -->

              <tr v-if="cursosFiltrados.length === 0">

                <td
                  colspan="5"
                  class="empty"
                >

                  No se encontraron cursos.

                </td>

              </tr>

            </tbody>

          </table>

        </div>

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


        <p class="copyright">
          © 2026 Tutorías ProA · Sistema de tutorías
        </p>

      </footer>

    </main>

  </div>

</template>


<script>

export default {

  name: "Cursos",


  data() {

    return {

      cursoSeleccionado: "Todos",

      anoSeleccionado: "Todos",


      // Datos de ejemplo
      // Después los podemos conectar con una base de datos

      cursos: [

        {
          id: 1,
          nombre: "5to Programación",
          ano: "2026",
          turno: "Mañana",
          docente: "Docente 1",
          contacto: "3548 32-0643"
        },

        {
          id: 2,
          nombre: "5to Programación",
          ano: "2026",
          turno: "Tarde",
          docente: "Docente 2",
          contacto: "3548 32-0643"
        },

        {
          id: 3,
          nombre: "4to Programación",
          ano: "2026",
          turno: "Mañana",
          docente: "Docente 3",
          contacto: "3548 32-0643"
        },

        {
          id: 4,
          nombre: "3ro Programación",
          ano: "2026",
          turno: "Tarde",
          docente: "Docente 4",
          contacto: "3548 32-0643"
        }

      ]

    }

  },


  computed: {

    cursosFiltrados() {

      return this.cursos.filter(curso => {

        const coincideCurso =
          this.cursoSeleccionado === "Todos" ||
          curso.nombre.toLowerCase().includes(
            this.cursoSeleccionado.toLowerCase()
          )


        const coincideAno =
          this.anoSeleccionado === "Todos" ||
          curso.ano === this.anoSeleccionado


        return coincideCurso && coincideAno

      })

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


.courses-page {

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


.menu-icon {

  width: 20px;

  min-width: 20px;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 17px;

}


.menu-icon.plus {

  font-size: 24px;

}


/* =========================================
   ACTIVO
========================================= */

.menu-item.active {

  background: #e9eaff;

  color: #5159d8;

  font-weight: 500;

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

.courses-content {

  flex: 1;

  min-height: 100vh;

  padding: 45px 50px 0;

  display: flex;

  flex-direction: column;

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

  font-size: 14px;

  color: #888;

}


/* =========================================
   FILTROS
========================================= */

.filters-card {

  background: #ffffff;

  border: 1px solid #e1e1e1;

  border-radius: 12px;

  padding: 22px 25px;

  margin-bottom: 20px;

  display: flex;

  gap: 30px;

  box-shadow:
    0 4px 15px
    rgba(0, 0, 0, 0.03);

}


.filter {

  display: flex;

  flex-direction: column;

  gap: 7px;

  min-width: 180px;

}


.filter label {

  font-size: 13px;

  color: #555;

  font-weight: 500;

}


.filter select {

  height: 38px;

  padding: 0 12px;

  border: 1px solid #d6d9df;

  border-radius: 7px;

  background: white;

  color: #555;

  outline: none;

  cursor: pointer;

}


.filter select:focus {

  border-color: #5159d8;

}


/* =========================================
   TABLA
========================================= */

.courses-card {

  width: 100%;

  background: white;

  border: 1px solid #e1e1e1;

  border-radius: 12px;

  overflow: hidden;

  box-shadow:
    0 4px 15px
    rgba(0, 0, 0, 0.03);

}


.table-container {

  width: 100%;

  overflow-x: auto;

}


table {

  width: 100%;

  border-collapse: collapse;

  min-width: 700px;

}


thead {

  background: #f7f8fb;

}


th {

  padding: 16px 20px;

  text-align: left;

  font-size: 12px;

  font-weight: 600;

  color: #707783;

  text-transform: uppercase;

  border-bottom: 1px solid #e5e7eb;

}


td {

  padding: 17px 20px;

  font-size: 13px;

  color: #666;

  border-bottom: 1px solid #eeeeee;

}


tbody tr:last-child td {

  border-bottom: none;

}


tbody tr:hover {

  background: #fafbff;

}


/* =========================================
   NOMBRE DEL CURSO
========================================= */

.course-name {

  display: flex;

  align-items: center;

  gap: 12px;

  color: #444;

  font-weight: 500;

}


.course-icon {

  width: 34px;

  height: 34px;

  border-radius: 7px;

  background: #eef0ff;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 16px;

}


/* =========================================
   TURNO
========================================= */

.turno {

  display: inline-block;

  padding: 5px 10px;

  border-radius: 20px;

  background: #f0f2ff;

  color: #5159d8;

  font-size: 12px;

}


/* =========================================
   CONTACTO
========================================= */

.contact {

  color: #777;

}


/* =========================================
   SIN RESULTADOS
========================================= */

.empty {

  text-align: center;

  padding: 40px;

  color: #999;

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


  .courses-content {

    padding: 35px 25px 0;

  }


  .filters-card {

    gap: 15px;

  }

}


/* =========================================
   CELULAR
========================================= */

@media (max-width: 600px) {

  .courses-page {

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


  .courses-content {

    padding: 25px 15px 0;

  }


  .page-header h1 {

    font-size: 27px;

  }


  .filters-card {

    flex-direction: column;

    gap: 15px;

  }


  .filter {

    width: 100%;

  }


  .contact-info {

    flex-direction: column;

    gap: 10px;

  }

}

</style>