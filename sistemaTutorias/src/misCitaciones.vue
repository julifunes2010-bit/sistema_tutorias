<template>
  <div class="pagina">

    <!-- BARRA LATERAL -->
    <aside class="sidebar">
      <div class="logo">
        <div class="logo-icon">T</div>
        <div>
          <h2>Tutorías</h2>
          <span>ProA</span>
        </div>
      </div>

      <nav class="menu">
        <router-link to="/home" class="menu-item">
          <span class="icon">⌂</span>
          <span>Inicio</span>
        </router-link>

        <router-link to="/nueva-citacion" class="menu-item">
          <span class="icon">＋</span>
          <span>Nueva citación</span>
        </router-link>

        <router-link to="/mis-citaciones" class="menu-item active">
          <span class="icon">▣</span>
          <span>Mis citaciones</span>
        </router-link>

        <router-link to="/cursos" class="menu-item">
          <span class="icon">▤</span>
          <span>Cursos</span>
        </router-link>

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

    <!-- CONTENIDO -->
    <main class="main-content">
      <header class="header">
        <div>
          <h1>Mis citaciones</h1>
          <p>Consultá las tutorías que programaste.</p>
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

      <!-- Las citaciones aparecen solamente cuando existen -->
      <section v-if="citaciones.length > 0" class="citaciones">
        <article v-for="(citacion, index) in citaciones" :key="index" class="citacion-card">
          <div class="card-icon">📅</div>

          <div class="datos">
            <div class="dato-principal">
              <h2>{{ citacion.materia }}</h2>
              <span>{{ citacion.ano }}</span>
            </div>

            <div class="detalle">
              <div>
                <small>Docente</small>
                <strong>{{ citacion.docente }}</strong>
              </div>

              <div>
                <small>Día de la tutoría</small>
                <strong>{{ formatearFecha(citacion.fecha) }}</strong>
              </div>

              <div>
                <small>Horario</small>
                <strong>{{ citacion.hora }} hs</strong>
              </div>
            </div>
          </div>
        </article>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"

const citaciones = ref([])

function cargarCitaciones() {
  const guardadas = localStorage.getItem("citaciones")

  if (guardadas) {
    citaciones.value = JSON.parse(guardadas)
  }
}

function formatearFecha(fecha) {
  if (!fecha) return ""

  const partes = fecha.split("-")
  return `${partes[2]}/${partes[1]}/${partes[0]}`
}

onMounted(() => {
  cargarCitaciones()
})
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.pagina {
  min-height: 100vh;
  display: flex;
  background: #f5f6fa;
  color: #252936;
  font-family: Arial, Helvetica, sans-serif;
}

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

.main-content {
  width: calc(100% - 250px);
  margin-left: 250px;
  padding: 30px 40px 50px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
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

.user-area {
  display: flex;
  align-items: center;
  gap: 25px;
}

.notification {
  font-size: 21px;
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

.user strong,
.user small {
  display: block;
}

.user strong {
  font-size: 14px;
}

.user small {
  margin-top: 3px;
  color: #777;
  font-size: 12px;
}

.citaciones {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 900px;
}

.citacion-card {
  display: flex;
  align-items: flex-start;
  gap: 18px;
  padding: 22px;
  background: white;
  border: 1px solid #e4e6eb;
  border-radius: 12px;
}

.card-icon {
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eef0ff;
  border-radius: 10px;
  font-size: 22px;
}

.datos {
  width: 100%;
}

.dato-principal {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 17px;
  border-bottom: 1px solid #eeeeee;
}

.dato-principal h2 {
  margin: 0;
  font-size: 18px;
}

.dato-principal span {
  padding: 5px 9px;
  background: #eef0ff;
  color: #4352c7;
  border-radius: 6px;
  font-size: 12px;
  font-weight: bold;
}

.detalle {
  display: grid;
  grid-template-columns: 1.3fr 1fr 1fr;
  gap: 20px;
  padding-top: 17px;
}

.detalle small,
.detalle strong {
  display: block;
}

.detalle small {
  margin-bottom: 5px;
  color: #888;
  font-size: 12px;
}

.detalle strong {
  font-size: 14px;
}

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

  .detalle {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}

@media (max-width: 600px) {
  .header {
    align-items: flex-start;
  }

  .user-area {
    gap: 10px;
  }

  .user > div:last-child {
    display: none;
  }

  .citacion-card {
    padding: 18px;
  }

  .dato-principal {
    align-items: flex-start;
    flex-direction: column;
    gap: 7px;
  }
}
</style>
