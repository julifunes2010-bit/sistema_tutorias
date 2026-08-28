<template>
  <div class="home">

    <!-- BARRA LATERAL -->
    <aside class="sidebar">

      <!-- Logo -->
      <div class="logo">
        <div class="logo-icon">T</div>
        <div>
          <h2>Tutorías</h2>
          <span>ProA</span>
        </div>
      </div>

      <!-- Menú -->
      <nav class="menu">

        <!-- Home -->
        <a href="#" class="menu-item active">
          <span class="icon">⌂</span>
          <span>Inicio</span>
        </a>

        <!-- Estas páginas las pueden desarrollar tus compañeros -->
        <a href="#" class="menu-item">
          <span class="icon">＋</span>
          <span>Nueva citación</span>
        </a>

        <a href="#" class="menu-item">
          <span class="icon">▣</span>
          <span>Mis citaciones</span>
        </a>


        <router-link to="/cursos" class="menu-item">
          <span class="icon">▤</span>
          <span>Cursos</span>
        </router-link>


        <a href="#" class="menu-item">
          <span class="icon">◷</span>
          <span>Horarios de tutoría</span>
        </a>

        <router-link to="/reportes" class="menu-item">
          <span class="icon">📊</span>
            <span>Reportes</span>
        </router-link>

        
        <router-link to="/setting" class="menu-item">
          <span class="icon">⚙</span>
          <span>Configuración</span>
        </router-link>

      </nav>

    </aside>


    <!-- CONTENIDO DEL HOME -->
    <main class="main-content">

      <!-- ENCABEZADO -->
      <header class="header">

        <div>
          <h1>Inicio</h1>
          <p>Panel principal del sistema de tutorías</p>
        </div>

        <div class="user-area">
          <span class="notification">🔔</span>

          <div class="user">
            <div class="avatar">👤</div>

            <div>
              <strong>Profe Luis</strong>
              <small>Docente</small>
            </div>
          </div>
        </div>

      </header>


      <!-- BIENVENIDA -->
      <section class="welcome">

        <div>
          <h2>¡Hola, Profe Luis! 👋</h2>

          <p>
            Bienvenido al sistema de tutorías.
            Desde aquí podés administrar tus tutorías y estudiantes.
          </p>
        </div>

      </section>


      <!-- TARJETAS -->
      <section class="cards">

        <div class="card">

          <div class="card-icon">
            📅
          </div>

          <div>
            <span>Próximas tutorías</span>
            <h3>2</h3>
          </div>

        </div>


        <div class="card">

          <div class="card-icon">
            👥
          </div>

          <div>
            <span>Estudiantes citados</span>
            <h3>8</h3>
          </div>

        </div>


        <div class="card">

          <div class="card-icon">
            📚
          </div>

          <div>
            <span>Tutorías realizadas</span>
            <h3>15</h3>
          </div>

        </div>

      </section>


      <!-- PRÓXIMAS TUTORÍAS -->
      <section class="section">

        <div class="section-header">
          <h2>Próximas tutorías</h2>

          <button>
            Ver todas
          </button>
        </div>


        <div class="tutorias">

          <!-- Tutoría 1 -->
          <div class="tutoria">

            <div class="fecha">
              <strong>Miércoles</strong>
              <span>19 de julio</span>
            </div>

            <div class="hora">
              <strong>15:00 hs</strong>
            </div>

            <div class="alumno">

              <div class="student-avatar">
                👤
              </div>

              <div>
                <strong>Juan Pérez</strong>
                <span>5° Año</span>
              </div>

            </div>

          </div>


          <!-- Tutoría 2 -->
          <div class="tutoria">

            <div class="fecha">
              <strong>Viernes</strong>
              <span>21 de julio</span>
            </div>

            <div class="hora">
              <strong>16:00 hs</strong>
            </div>

            <div class="alumno">

              <div class="student-avatar">
                👤
              </div>

              <div>
                <strong>Martina López</strong>
                <span>4° Año</span>
              </div>

            </div>

          </div>

        </div>

      </section>


      <!-- NOTIFICACIONES -->
      <section class="section">

        <div class="section-header">
          <h2>Notificaciones</h2>

          <button>
            Ver todas
          </button>
        </div>


        <div class="notifications">

          <div class="notification-item">

            <div class="notification-icon">
              🔔
            </div>

            <div class="notification-text">
              <strong>Nueva citación</strong>

              <p>
                Se agregó una nueva tutoría.
              </p>
            </div>

            <span class="time">
              Hace 10 min
            </span>

          </div>


          <div class="notification-item">

            <div class="notification-icon">
              📅
            </div>

            <div class="notification-text">
              <strong>Próxima tutoría</strong>

              <p>
                Tenés una tutoría programada para hoy.
              </p>
            </div>

            <span class="time">
              Hace 1 h
            </span>

          </div>

        </div>

      </section>

    </main>

  </div>

</template>

<script>

import { useRouter } from "vue-router"

export default {

  name: "Home",

  setup() {

    const router = useRouter()

    const irAConfiguracion = () => {
      router.push("/setting")
    }
    const irAreporte = () => {
      router.push("/reportes")
    } 

    return {
      irAConfiguracion,
      irAreporte,
    }

  }

}

</script>

<style scoped>

* {
  box-sizing: border-box;
}


/* =========================
   GENERAL
========================= */

.home {
  min-height: 100vh;
  display: flex;

  background: #f5f6fa;

  color: #252936;

  font-family:
    Arial,
    Helvetica,
    sans-serif;
}


/* =========================
   SIDEBAR
========================= */

.sidebar {
  width: 250px;
  min-height: 100vh;

  position: fixed;
  left: 0;
  top: 0;

  background: white;

  border-right: 1px solid #e5e7eb;

  padding: 20px 15px;
}


/* LOGO */

.logo {
  display: flex;
  align-items: center;

  gap: 10px;

  padding: 5px 10px 22px;

  border-bottom: 1px solid #eeeeee;
}

.logo-icon {
  width: 40px;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  background: #4f5bd5;

  color: white;

  border-radius: 9px;

  font-size: 20px;
  font-weight: bold;
}

.logo h2 {
  margin: 0;

  font-size: 17px;
}

.logo span {
  color: #777;

  font-size: 12px;
}


/* MENU */

.menu {
  margin-top: 20px;
}

.menu-item {
  height: 44px;

  display: flex;
  align-items: center;

  gap: 13px;

  padding: 0 13px;

  margin-bottom: 5px;

  border-radius: 8px;

  text-decoration: none;

  color: #555b67;

  font-size: 14px;

  transition: 0.2s;
}

.menu-item:hover {
  background: #f1f2f7;
}

.menu-item.active {
  background: #e9ebff;

  color: #4352c7;

  font-weight: bold;
}

.icon {
  width: 22px;

  text-align: center;

  font-size: 18px;
}


/* =========================
   MAIN
========================= */

.main-content {
  width: calc(100% - 250px);

  margin-left: 250px;

  padding: 30px 40px 50px;
}


/* =========================
   HEADER
========================= */

.header {
  display: flex;

  justify-content: space-between;
  align-items: center;

  margin-bottom: 25px;
}

.header h1 {
  margin: 0;

  font-size: 28px;
}

.header p {
  margin: 5px 0 0;

  color: #777;

  font-size: 14px;
}


/* USUARIO */

.user-area {
  display: flex;

  align-items: center;

  gap: 25px;
}

.notification {
  font-size: 21px;

  cursor: pointer;
}

.user {
  display: flex;

  align-items: center;

  gap: 10px;
}

.avatar {
  width: 40px;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  background: #e8e9ef;

  border-radius: 50%;
}

.user strong {
  display: block;

  font-size: 14px;
}

.user small {
  display: block;

  margin-top: 3px;

  color: #777;

  font-size: 12px;
}


/* =========================
   WELCOME
========================= */

.welcome {
  background: white;

  border: 1px solid #e4e6eb;

  border-radius: 12px;

  padding: 25px;

  margin-bottom: 25px;
}

.welcome h2 {
  margin: 0 0 8px;

  font-size: 21px;
}

.welcome p {
  margin: 0;

  color: #777;

  font-size: 14px;
}


/* =========================
   CARDS
========================= */

.cards {
  display: grid;

  grid-template-columns:
    repeat(3, 1fr);

  gap: 20px;

  margin-bottom: 35px;
}

.card {
  background: white;

  border: 1px solid #e4e6eb;

  border-radius: 12px;

  padding: 20px;

  display: flex;

  align-items: center;

  gap: 15px;
}

.card-icon {
  width: 50px;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #eef0ff;

  border-radius: 10px;

  font-size: 22px;
}

.card span {
  display: block;

  color: #777;

  font-size: 13px;
}

.card h3 {
  margin: 5px 0 0;

  font-size: 26px;
}


/* =========================
   SECTIONS
========================= */

.section {
  margin-bottom: 35px;
}

.section-header {
  display: flex;

  justify-content: space-between;
  align-items: center;

  margin-bottom: 15px;
}

.section-header h2 {
  margin: 0;

  font-size: 19px;
}

.section-header button {
  border: none;

  background: transparent;

  color: #4352c7;

  font-weight: bold;

  cursor: pointer;
}


/* =========================
   TUTORÍAS
========================= */

.tutorias {
  background: white;

  border: 1px solid #e4e6eb;

  border-radius: 12px;

  overflow: hidden;
}

.tutoria {
  min-height: 90px;

  display: grid;

  grid-template-columns:
    180px 120px 1fr;

  align-items: center;

  padding: 15px 25px;

  border-bottom: 1px solid #eeeeee;
}

.tutoria:last-child {
  border-bottom: none;
}

.fecha {
  display: flex;

  flex-direction: column;

  gap: 5px;
}

.fecha span {
  color: #777;

  font-size: 13px;
}

.hora {
  color: #4352c7;
}

.alumno {
  display: flex;

  align-items: center;

  gap: 12px;
}

.student-avatar {
  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #eef0f4;

  border-radius: 50%;
}

.alumno strong {
  display: block;

  font-size: 14px;
}

.alumno span {
  display: block;

  margin-top: 3px;

  color: #777;

  font-size: 12px;
}


/* =========================
   NOTIFICACIONES
========================= */

.notifications {
  background: white;

  border: 1px solid #e4e6eb;

  border-radius: 12px;

  overflow: hidden;
}

.notification-item {
  display: flex;

  align-items: center;

  gap: 15px;

  padding: 17px 20px;

  border-bottom: 1px solid #eeeeee;
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-icon {
  width: 40px;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  background: #eef0ff;

  border-radius: 50%;
}

.notification-text {
  flex: 1;
}

.notification-text strong {
  font-size: 14px;
}

.notification-text p {
  margin: 4px 0 0;

  color: #777;

  font-size: 13px;
}

.time {
  color: #999;

  font-size: 11px;
}


/* =========================
   RESPONSIVE
========================= */

@media (max-width: 900px) {

  .sidebar {
    width: 70px;
  }

  .logo h2,
  .logo span,
  .menu-item span:not(.icon) {
    display: none;
  }

  .menu-item {
    justify-content: center;
  }

  .main-content {
    width: calc(100% - 70px);

    margin-left: 70px;

    padding: 25px;
  }

  .cards {
    grid-template-columns: 1fr;
  }

  .tutoria {
    grid-template-columns: 1fr;

    gap: 10px;
  }

}

</style>