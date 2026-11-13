<template>
  <div class="home">

    <!-- BARRA LATERAL -->
    <aside class="sidebar">

      <!-- Logo -->
      <router-link to="/home" class="logo sidebar-brand-link">
        <img class="brand-logo" src="./assets/proa.jpg" alt="Logo ProA">
        <div>
          <h2>Tutorías</h2>
          <span>ProA</span>
        </div>
      </router-link>

      <!-- Menú -->
      <nav class="menu">

        <!-- Home -->
        <router-link to="/home" class="menu-item active">
          <span class="icon">⌂</span>
          <span>Inicio</span>
        </router-link>

        <!-- Nueva citación -->
        <router-link to="/nueva-citacion" class="menu-item">
          <span class="icon">＋</span>
          <span>Nueva citación</span>
        </router-link>

        <!-- Mis citaciones -->
        <router-link to="/mis-citaciones" class="menu-item">
          <span class="icon">▣</span>
          <span>Mis citaciones</span>
        </router-link>

        <router-link to="/cursos" class="menu-item">
          <span class="icon">▤</span>
          <span>Cursos</span>
        </router-link>

        <router-link to="/reportes" class="menu-item">
          <span class="icon">▥</span>
          <span>Reportes</span>
        </router-link>

        <router-link to="/setting" class="menu-item">
          <span class="icon">≡</span>
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

        <ProfileEditor @saved="actualizarPerfil" />

      </header>

      <!-- BIENVENIDA -->
      <section class="welcome">

        <div>
          <h2>Hola, Profe {{ perfilNombre }}</h2>

          <p>
            Bienvenido al sistema de tutorías.
            Desde aquí podés administrar tus tutorías y estudiantes.
          </p>
        </div>

      </section>

      <!-- TARJETAS -->
      <section class="cards">

        <div class="card">
          <div class="card-icon">◷</div>
          <div>
            <span>Próximas tutorías</span>
            <h3>{{ proximasTutorias }}</h3>
          </div>
        </div>

        <div class="card">
          <div class="card-icon">＋</div>
          <div>
            <span>Estudiantes citados</span>
            <h3>{{ estudiantesCitados }}</h3>
          </div>
        </div>

        <div class="card">
          <div class="card-icon">▤</div>
          <div>
            <span>Tutorías realizadas</span>
            <h3>{{ tutoriasRealizadas }}</h3>
          </div>
        </div>

      </section>

      <!-- PRÓXIMAS TUTORÍAS -->
      <section class="section">

        <div class="section-header">
          <h2>Próximas tutorías</h2>
          <router-link to="/mis-citaciones" class="ver-todas">Ver todas</router-link>
        </div>

        <!-- La lista se obtiene de las citaciones reales guardadas en el navegador. -->
        <div v-if="proximasLista.length" class="tutorias">
          <div v-for="(citacion, index) in proximasLista" :key="`${citacion.fecha}-${citacion.hora}-${index}`" class="tutoria">
            <div class="fecha">
              <strong>{{ new Intl.DateTimeFormat("es-AR", { weekday: "long" }).format(new Date(`${citacion.fecha}T00:00:00`)) }}</strong>
              <span>{{ new Intl.DateTimeFormat("es-AR", { day: "numeric", month: "long" }).format(new Date(`${citacion.fecha}T00:00:00`)) }}</span>
            </div>
            <div class="hora"><strong>{{ citacion.hora }} hs</strong></div>
            <div class="alumno">
              <div class="student-avatar">&middot;</div>
              <div><strong>{{ citacion.materia }}</strong><span>{{ citacion.ano }}</span></div>
            </div>
          </div>
        </div>
        <p v-else class="sin-tutorias">No tenés tutorías próximas. <router-link to="/nueva-citacion">Agendá una</router-link>.</p>

      </section>



    </main>

  </div>
</template>

<script>
import { useRouter } from "vue-router"
import ProfileEditor from "./components/ProfileEditor.vue"

export default {
  name: "Home",
  // En Inicio se registra el acceso al editor; no se monta en las demás pantallas.
  components: { ProfileEditor },

  data() {
    let perfil = { nombre: "Luis", apellido: "" }
    try {
      perfil = { ...perfil, ...JSON.parse(localStorage.getItem("sistemaTutoriasProfile") || "{}") }
    } catch {
      // Si hay datos locales inválidos, se conserva el nombre de ejemplo.
    }
    return { perfilNombre: [perfil.nombre, perfil.apellido].filter(Boolean).join(" ") }
  },

  methods: {
    actualizarPerfil(perfil) {
      // El componente ya guardó el perfil; aquí sincronizamos el saludo de esta pantalla.
      this.perfilNombre = [perfil.nombre, perfil.apellido].filter(Boolean).join(" ")
    }
  },

  // Las tarjetas se calculan a partir de las citaciones guardadas y dejan de mostrar cifras de ejemplo.
  computed: {
    citacionesGuardadas() {
      try {
        const datos = JSON.parse(localStorage.getItem("citaciones") || "[]")
        return Array.isArray(datos) ? datos : []
      } catch {
        return []
      }
    },
    proximasLista() {
      const ahora = new Date()
      const hoy = `${ahora.getFullYear()}-${String(ahora.getMonth() + 1).padStart(2, "0")}-${String(ahora.getDate()).padStart(2, "0")}`
      return this.citacionesGuardadas.filter(item => item.fecha >= hoy && item.estado !== "realizada")
        .sort((a, b) => `${a.fecha} ${a.hora}`.localeCompare(`${b.fecha} ${b.hora}`))
    },
    proximasTutorias() {
      return this.proximasLista.length
    },
    estudiantesCitados() {
      return new Set(this.citacionesGuardadas.map(item => item.estudiante || `${item.ano}-${item.materia}`)).size
    },
    tutoriasRealizadas() {
      return this.citacionesGuardadas.filter(item => item.estado === "realizada").length
    }
  },

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
      irAreporte
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.home {
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

.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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

.tutorias {
  background: white;
  border: 1px solid #e4e6eb;
  border-radius: 12px;
  overflow: hidden;
}

.tutoria {
  min-height: 90px;
  display: grid;
  grid-template-columns: 180px 120px 1fr;
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
