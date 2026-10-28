<template>

  <div class="courses-page">

    <!-- BARRA LATERAL -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="logo">T</div>
        <div class="brand">
          <span class="brand-title">Tutorías</span>
          <span class="brand-subtitle">ProA</span>
        </div>
      </div>

      <div class="separator"></div>

      <nav class="menu">
        <router-link to="/home" class="menu-item">
          <span class="menu-icon">⌂</span>
          <span>Inicio</span>
        </router-link>

        <router-link to="/nueva-citacion" class="menu-item">
          <span class="menu-icon plus">+</span>
          <span>Nueva citación</span>
        </router-link>

        <router-link to="/mis-citaciones" class="menu-item">
          <span class="menu-icon">▣</span>
          <span>Mis citaciones</span>
        </router-link>

        <router-link to="/cursos" class="menu-item active">
          <span class="menu-icon">▤</span>
          <span>Cursos</span>
        </router-link>

        <router-link to="/reportes" class="menu-item">
          <span class="menu-icon">📊</span>
          <span>Reportes</span>
        </router-link>

        <router-link to="/setting" class="menu-item">
          <span class="menu-icon">⚙</span>
          <span>Configuración</span>
        </router-link>
      </nav>
    </aside>

    <!-- CONTENIDO PRINCIPAL -->
    <main class="courses-content">

      <div class="page-header">
        <div>
          <h1>CURSOS</h1>
          <p>Consultá los cursos disponibles en el sistema.</p>
        </div>
      </div>

      <!-- FILTROS -->
      <section class="filters-card">
        <div class="filter search-filter">
          <label for="buscar-curso">Buscar</label>
          <div class="search-control">
            <span aria-hidden="true">⌕</span>
            <input
              id="buscar-curso"
              v-model.trim="busqueda"
              type="search"
              placeholder="Curso, docente o turno"
              autocomplete="off"
            >
          </div>
        </div>

        <div class="filter">
          <label for="filtro-curso">Curso</label>
          <select id="filtro-curso" v-model="cursoSeleccionado">
            <option value="Todos">Todos</option>
            <option v-for="curso in cursosDisponibles" :key="curso.valor" :value="curso.valor">
              {{ curso.etiqueta }}
            </option>
          </select>
        </div>

        <div class="filter">
          <label for="filtro-ano">Año</label>
          <select id="filtro-ano" v-model="anoSeleccionado">
            <option value="Todos">Todos</option>
            <option v-for="ano in anosDisponibles" :key="ano" :value="ano">{{ ano }}</option>
          </select>
        </div>

        <button class="clear-filters" type="button" :disabled="!hayFiltrosActivos" @click="limpiarFiltros">
          Limpiar filtros
        </button>
      </section>

      <div class="results-summary" aria-live="polite">
        <span><strong>{{ cursosFiltrados.length }}</strong> {{ cursosFiltrados.length === 1 ? 'curso encontrado' : 'cursos encontrados' }}</span>
        <label class="sort-control" for="orden-cursos">
          Ordenar por
          <select id="orden-cursos" v-model="ordenSeleccionado">
            <option value="curso">Curso</option>
            <option value="ano">Año</option>
            <option value="docente">Docente</option>
          </select>
        </label>
      </div>

      <!-- TABLA -->
      <section class="courses-card">
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Curso</th>
                <th>Año</th>
                <th>Turno</th>
                <th>Docente</th>
                <th>Contacto</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="curso in cursosFiltrados" :key="curso.id">
                <td class="course-name">
                  <div class="course-icon">📚</div>
                  <span>{{ curso.nombre }}</span>
                </td>
                <td>{{ curso.ano }}</td>
                <td><span class="turno">{{ curso.turno }}</span></td>
                <td>{{ curso.docente }}</td>
                <td class="contact">
                  <a :href="`tel:${curso.contacto.replace(/\\s/g, '')}`">{{ curso.contacto }}</a>
                </td>
              </tr>

              <tr v-if="cursosFiltrados.length === 0">
                <td colspan="5" class="empty">No se encontraron cursos.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <footer class="footer">
        <p class="contact-title">Comunicate con nosotros</p>
        <div class="contact-info">
          <span>🟢 +54 9 3548 32-0643</span>
          <span>✉️ jfqmw@esc.edu.ar</span>
        </div>
        <p class="copyright">© 2026 Tutorías ProA · Sistema de tutorías</p>
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
      busqueda: "",
      ordenSeleccionado: "curso",
      cursos: [
        { id: 1, nombre: "5to Programación", ano: "2026", turno: "Mañana", docente: "Docente 1", contacto: "3548 32-0643" },
        { id: 2, nombre: "5to Programación", ano: "2026", turno: "Tarde", docente: "Docente 2", contacto: "3548 32-0643" },
        { id: 3, nombre: "4to Programación", ano: "2026", turno: "Mañana", docente: "Docente 3", contacto: "3548 32-0643" },
        { id: 4, nombre: "3ro Programación", ano: "2026", turno: "Tarde", docente: "Docente 4", contacto: "3548 32-0643" }
      ]
    }
  },

  computed: {
    cursosDisponibles() {
      const cursos = new Map()
      this.cursos.forEach(curso => {
        const valor = curso.nombre.split(" ")[0]
        if (!cursos.has(valor)) {
          cursos.set(valor, { valor, etiqueta: `${valor} año` })
        }
      })
      return Array.from(cursos.values())
    },

    anosDisponibles() {
      return [...new Set(this.cursos.map(curso => curso.ano))].sort((a, b) => b.localeCompare(a))
    },

    hayFiltrosActivos() {
      return Boolean(this.busqueda || this.cursoSeleccionado !== "Todos" || this.anoSeleccionado !== "Todos")
    },

    cursosFiltrados() {
      const texto = this.busqueda.toLowerCase()
      return this.cursos
        .filter(curso => {
        const coincideBusqueda = !texto || [curso.nombre, curso.docente, curso.turno, curso.ano]
          .join(" ")
          .toLowerCase()
          .includes(texto)
        const coincideCurso = this.cursoSeleccionado === "Todos" || curso.nombre.toLowerCase().startsWith(this.cursoSeleccionado.toLowerCase())
        const coincideAno = this.anoSeleccionado === "Todos" || curso.ano === this.anoSeleccionado
        return coincideBusqueda && coincideCurso && coincideAno
      })
        .sort((a, b) => {
          const campo = this.ordenSeleccionado === "curso" ? "nombre" : this.ordenSeleccionado
          return a[campo].localeCompare(b[campo], "es", { numeric: true })
        })
    }
  },

  methods: {
    limpiarFiltros() {
      this.busqueda = ""
      this.cursoSeleccionado = "Todos"
      this.anoSeleccionado = "Todos"
    }
  }
}
</script>

<style scoped>
* { box-sizing: border-box; }

.courses-page {
  min-height: 100vh;
  width: 100%;
  display: flex;
  background: #f4f7f9;
  font-family: Arial, Helvetica, sans-serif;
  color: #333;
}

.sidebar {
  width: 250px;
  min-width: 250px;
  height: 100vh;
  background: #fff;
  border-right: 1px solid #e1e4e8;
  padding: 20px 15px;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  display: flex;
  align-items: center;
  padding: 5px 10px 22px;
  border-bottom: 1px solid #eee;
}

.logo {
  width: 40px;
  height: 40px;
  border-radius: 9px;
  background: #4f5bd5;
  color: #fff;
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

.brand-title { font-size: 16px; color: #333; font-weight: 500; }
.brand-subtitle { margin-top: 3px; font-size: 13px; color: #888; }
.separator { display: none; }

.menu {
  margin-top: 20px;
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
  transition: background .2s ease, color .2s ease;
}

.menu-item:hover { background: #f1f3ff; color: #5159d8; }
.menu-item.active { background: #e9eaff; color: #5159d8; font-weight: 500; }
.menu-icon { width: 20px; min-width: 20px; display: flex; justify-content: center; font-size: 17px; }
.menu-icon.plus { font-size: 24px; font-weight: 300; }

.courses-content {
  flex: 1;
  min-height: 100vh;
  padding: 45px 50px 0;
  display: flex;
  flex-direction: column;
}

.page-header { margin-bottom: 30px; }
.page-header h1 { margin: 0 0 8px; font-size: 32px; font-weight: 500; letter-spacing: 2px; color: #333; }
.page-header p { margin: 0; font-size: 14px; color: #888; }

.filters-card {
  background: #fff;
  border: 1px solid #e1e1e1;
  border-radius: 12px;
  padding: 22px 25px;
  margin-bottom: 20px;
  display: flex;
  gap: 30px;
  box-shadow: 0 4px 15px rgba(0,0,0,.03);
}

.filter { display: flex; flex-direction: column; gap: 7px; min-width: 180px; }
.search-filter { flex: 1; min-width: 240px; }
.filter label { font-size: 13px; color: #555; font-weight: 500; }
.filter select,
.search-control input {
  height: 38px;
  padding: 0 12px;
  border: 1px solid #d6d9df;
  border-radius: 7px;
  background: #fff;
  color: #555;
  outline: none;
  cursor: pointer;
}
.search-control { position: relative; display: flex; align-items: center; }
.search-control span { position: absolute; left: 12px; color: #7c83a8; font-size: 20px; pointer-events: none; }
.search-control input { width: 100%; padding-left: 36px; cursor: text; }
.filter select:focus,
.search-control input:focus,
.sort-control select:focus { border-color: #5159d8; box-shadow: 0 0 0 3px rgba(81, 89, 216, .12); outline: none; }
.clear-filters { align-self: end; height: 38px; padding: 0 16px; border: 1px solid #d6d9df; border-radius: 7px; background: #fff; color: #5159d8; cursor: pointer; transition: .2s ease; }
.clear-filters:hover:not(:disabled) { background: #f1f3ff; border-color: #5159d8; }
.clear-filters:disabled { color: #aeb2bd; cursor: not-allowed; opacity: .7; }

.results-summary { display: flex; justify-content: space-between; align-items: center; margin: 0 2px 12px; color: #777; font-size: 13px; }
.results-summary strong { color: #5159d8; font-size: 15px; }
.sort-control { display: flex; align-items: center; gap: 8px; }
.sort-control select { border: 0; background: transparent; color: #5159d8; font-weight: 600; cursor: pointer; outline: none; }

.courses-card {
  width: 100%;
  background: #fff;
  border: 1px solid #e1e1e1;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,.03);
}

.table-container { width: 100%; overflow-x: auto; }
table { width: 100%; border-collapse: collapse; min-width: 700px; }
thead { background: #f7f8fb; }
th { padding: 16px 20px; text-align: left; font-size: 12px; font-weight: 600; color: #707783; text-transform: uppercase; border-bottom: 1px solid #e5e7eb; }
td { padding: 17px 20px; font-size: 13px; color: #666; border-bottom: 1px solid #eee; }
tbody tr:last-child td { border-bottom: none; }
tbody tr:hover { background: #fafbff; }

.course-name { display: flex; align-items: center; gap: 12px; color: #444; font-weight: 500; }
.course-icon { width: 34px; height: 34px; border-radius: 7px; background: #eef0ff; display: flex; align-items: center; justify-content: center; font-size: 16px; }
.turno { display: inline-block; padding: 5px 10px; border-radius: 20px; background: #f0f2ff; color: #5159d8; font-size: 12px; }
.contact { color: #777; }
.contact a { color: inherit; text-decoration: none; }
.contact a:hover { color: #5159d8; text-decoration: underline; }
.empty { text-align: center; padding: 40px; color: #999; }

.footer { margin-top: auto; border-top: 1px solid #dcdcdc; padding: 25px 0 20px; text-align: center; }
.contact-title { margin: 0 0 15px; color: #777; font-size: 15px; }
.contact-info { display: flex; justify-content: center; align-items: center; gap: 40px; color: #888; font-size: 13px; }
.copyright { margin: 15px 0 0; color: #aaa; font-size: 12px; }

@media (max-width: 800px) {
  .sidebar { width: 210px; min-width: 210px; }
  .courses-content { padding: 35px 25px 0; }
  .filters-card { gap: 15px; }
  .search-filter { min-width: 200px; }
}

@media (max-width: 600px) {
  .courses-page { flex-direction: column; }
  .sidebar { width: 100%; min-width: 100%; height: auto; min-height: auto; padding: 15px; border-right: none; border-bottom: 1px solid #e1e4e8; }
  .menu { flex-direction: row; overflow-x: auto; }
  .menu-item { min-width: max-content; padding: 10px 13px; }
  .courses-content { padding: 25px 15px 0; }
  .page-header h1 { font-size: 27px; }
  .filters-card { flex-direction: column; gap: 15px; }
  .filter { width: 100%; }
  .clear-filters { align-self: stretch; }
  .results-summary { align-items: flex-start; flex-direction: column; gap: 10px; }
  .contact-info { flex-direction: column; gap: 10px; }
}
</style>
