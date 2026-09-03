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

        <router-link to="/nueva-citacion" class="menu-item active">
          <span class="icon">＋</span>
          <span>Nueva citación</span>
        </router-link>

        <router-link to="/mis-citaciones" class="menu-item">
          <span class="icon">▣</span>
          <span>Mis citaciones</span>
        </router-link>

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

    <!-- CONTENIDO -->
    <main class="main-content">
      <header class="header">
        <div>
          <h1>Nueva citación</h1>
          <p>Programá una nueva tutoría para un estudiante</p>
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

      <section class="form-card">
        <div class="form-title">
          <div class="form-icon">📅</div>
          <div>
            <h2>Datos de la tutoría</h2>
            <p>Completá los datos para crear la citación.</p>
          </div>
        </div>

        <form @submit.prevent="crearCitacion">
          <div class="form-grid">
            <div class="campo">
              <label for="ano">Año</label>
              <select id="ano" v-model="ano" required>
                <option value="" disabled>Seleccioná el año</option>
                <option>1° Año</option>
                <option>2° Año</option>
                <option>3° Año</option>
                <option>4° Año</option>
                <option>5° Año</option>
                <option>6° Año</option>
              </select>
            </div>

            <div class="campo">
              <label for="materia">Materia</label>
              <select id="materia" v-model="materia" required>
                <option value="" disabled>Seleccioná la materia</option>
                <option>Programación</option>
                <option>Matemática</option>
                <option>Lengua</option>
                <option>Inglés</option>
                <option>Física</option>
              </select>
            </div>

            <div class="campo campo-completo">
              <label for="docente">Docente</label>
              <input id="docente" type="text" value="Luis S. Scoccia" disabled>
            </div>

            <div class="campo">
              <label for="fecha">Día de la tutoría</label>
              <input id="fecha" v-model="fecha" type="date" required>
            </div>

            <div class="campo">
              <label for="hora">Horario</label>
              <input id="hora" v-model="hora" type="time" required>
            </div>
          </div>

          <p v-if="mensaje" class="mensaje">{{ mensaje }}</p>

          <div class="acciones">
            <button type="button" class="btn-cancelar" @click="cancelar">
              Cancelar
            </button>
            <button type="submit" class="btn-crear">
              Crear citación
            </button>
          </div>
        </form>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

const ano = ref("")
const materia = ref("")
const fecha = ref("")
const hora = ref("")
const mensaje = ref("")

function crearCitacion() {
  const nuevaCitacion = {
    ano: ano.value,
    materia: materia.value,
    docente: "Luis S. Scoccia",
    fecha: fecha.value,
    hora: hora.value
  }

  const guardadas = localStorage.getItem("citaciones")
  const citaciones = guardadas ? JSON.parse(guardadas) : []

  citaciones.push(nuevaCitacion)
  localStorage.setItem("citaciones", JSON.stringify(citaciones))

  router.push("/mis-citaciones")
}

function cancelar() {
  router.push("/home")
}
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

.form-card {
  max-width: 820px;
  background: white;
  border: 1px solid #e4e6eb;
  border-radius: 12px;
  padding: 30px;
}

.form-title {
  display: flex;
  align-items: center;
  gap: 15px;
  padding-bottom: 25px;
  margin-bottom: 25px;
  border-bottom: 1px solid #eeeeee;
}

.form-icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eef0ff;
  border-radius: 10px;
  font-size: 23px;
}

.form-title h2 {
  margin: 0;
  font-size: 20px;
}

.form-title p {
  margin: 5px 0 0;
  color: #777;
  font-size: 13px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.campo-completo {
  grid-column: 1 / -1;
}

label {
  font-size: 14px;
  font-weight: bold;
}

select,
input {
  width: 100%;
  height: 45px;
  padding: 0 13px;
  border: 1px solid #dfe1e7;
  border-radius: 8px;
  background: white;
  color: #333;
  font-size: 14px;
  outline: none;
}

select:focus,
input:focus {
  border-color: #4f5bd5;
}

input:disabled {
  background: #f4f5f7;
  color: #666;
  cursor: not-allowed;
}

.mensaje {
  margin: 22px 0 0;
  color: #4352c7;
  font-size: 14px;
  font-weight: bold;
}

.acciones {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 30px;
  padding-top: 22px;
  border-top: 1px solid #eeeeee;
}

.acciones button {
  min-width: 145px;
  height: 43px;
  padding: 0 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}

.btn-cancelar {
  background: white;
  color: #d14b5a;
  border: 1px solid #e6a5ad;
}

.btn-cancelar:hover {
  background: #fff5f6;
}

.btn-crear {
  background: #4f5bd5;
  color: white;
  border: 1px solid #4f5bd5;
}

.btn-crear:hover {
  background: #4352c7;
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

  .form-grid {
    grid-template-columns: 1fr;
  }

  .campo-completo {
    grid-column: auto;
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

  .form-card {
    padding: 20px;
  }

  .acciones {
    flex-direction: column-reverse;
  }

  .acciones button {
    width: 100%;
  }
}
</style>
