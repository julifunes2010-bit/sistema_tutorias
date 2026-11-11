<template>
  <div class="schedule-page">
    <aside class="sidebar">
      <div class="brand"><span class="brand-mark">T</span><span>Tutorías <small>ProA</small></span></div>
      <nav aria-label="Navegación principal">
        <router-link to="/home">Inicio</router-link>
        <router-link to="/nueva-citacion">Nueva citación</router-link>
        <router-link to="/mis-citaciones">Mis citaciones</router-link>
        <router-link to="/cursos">Cursos</router-link>
        <router-link to="/horarios" class="active">Horarios de tutoría</router-link>
        <router-link to="/setting">Configuración</router-link>
      </nav>
      <div class="source-note"><span class="source-dot"></span>Supabase · PostgreSQL</div>
    </aside>

    <main class="content">
      <header class="page-heading">
        <div>
          <p class="eyebrow">AGENDA COMPARTIDA</p>
          <h1>Horarios de tutoría</h1>
          <p class="subtitle">Los cambios guardados están disponibles al volver a cargar.</p>
        </div>
        <button class="refresh-button" type="button" :disabled="cargando" aria-label="Actualizar horarios" title="Actualizar horarios" @click="cargarTutorias">↻</button>
      </header>

      <p v-if="error" class="notice error-notice" role="alert">{{ error }}</p>
      <p v-if="mensaje" class="notice success-notice" role="status">{{ mensaje }}</p>

      <section class="workspace">
        <form class="editor" @submit.prevent="guardarTutoria">
          <div class="section-heading">
            <div>
              <p class="eyebrow">{{ editandoId === null ? "NUEVO REGISTRO" : `EDITANDO ID ${editandoId}` }}</p>
              <h2>{{ editandoId === null ? "Agregar tutoría" : "Editar tutoría" }}</h2>
            </div>
            <span class="form-symbol" aria-hidden="true">＋</span>
          </div>

          <label for="materia">Materia</label>
          <input id="materia" v-model.trim="formulario.materia" maxlength="100" placeholder="Ej.: Robótica" required>

          <label for="curso">Curso</label>
          <input id="curso" v-model.trim="formulario.curso" maxlength="40" placeholder="Ej.: 4°" required>

          <label for="dia">Día</label>
          <select id="dia" v-model="formulario.dia" required>
            <option value="" disabled>Seleccioná el día</option>
            <option v-for="dia in dias" :key="dia" :value="dia">{{ dia }}</option>
          </select>

          <label for="horario">Horario</label>
          <input id="horario" v-model.trim="formulario.horario" type="time" required>

          <div class="form-actions">
            <button v-if="editandoId !== null" class="secondary-button" type="button" :disabled="guardando" @click="cancelarEdicion">Cancelar</button>
            <button class="primary-button" type="submit" :disabled="guardando || cargando || !sesionActiva">
              {{ guardando ? "Guardando..." : editandoId === null ? "Guardar tutoría" : "Guardar cambios" }}
            </button>
          </div>
        </form>

        <section class="list-panel" aria-labelledby="list-title">
          <div class="section-heading list-heading">
            <div>
              <p class="eyebrow">TABLA · tutorias</p>
              <h2 id="list-title">Tutorías guardadas</h2>
            </div>
            <span class="count">{{ tutoriasFiltradas.length }} <small>filas</small></span>
          </div>

          <div class="filters">
            <label class="search-field" for="buscar">Buscar materia o curso
              <input id="buscar" v-model.trim="busqueda" type="search" placeholder="Robótica, 4°...">
            </label>
            <label for="filtrar-dia">Día
              <select id="filtrar-dia" v-model="diaSeleccionado">
                <option value="">Todos</option>
                <option v-for="dia in dias" :key="dia" :value="dia">{{ dia }}</option>
              </select>
            </label>
          </div>

          <p v-if="cargando" class="empty-state" aria-live="polite">Cargando tutorías...</p>
          <div v-else class="table-wrap">
            <table>
              <thead><tr><th>ID</th><th>Materia</th><th>Curso</th><th>Día</th><th>Horario</th><th><span class="sr-only">Acciones</span></th></tr></thead>
              <tbody>
                <tr v-for="tutoria in tutoriasFiltradas" :key="tutoria.id">
                  <td class="id-cell">{{ tutoria.id }}</td>
                  <td class="subject-cell">{{ tutoria.materia }}</td>
                  <td>{{ tutoria.curso }}</td>
                  <td>{{ tutoria.dia }}</td>
                  <td>{{ tutoria.horario }}</td>
                  <td><button class="edit-button" type="button" :aria-label="`Editar tutoría ${tutoria.id}`" title="Editar" @click="iniciarEdicion(tutoria)">Editar</button></td>
                </tr>
                <tr v-if="tutoriasFiltradas.length === 0">
                  <td colspan="6" class="empty-state">{{ tutorias.length ? "No hay coincidencias para esos filtros." : "Todavía no hay tutorías en la tabla." }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue"
import { supabase, supabaseConfigured } from "./lib/supabase.js"

const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
const tutorias = ref([])
const cargando = ref(false)
const guardando = ref(false)
const sesionActiva = ref(false)
const error = ref("")
const mensaje = ref("")
const busqueda = ref("")
const diaSeleccionado = ref("")
const editandoId = ref(null)
const formulario = reactive({ materia: "", curso: "", dia: "", horario: "" })

const tutoriasFiltradas = computed(() => {
  const texto = busqueda.value.toLocaleLowerCase("es")
  return tutorias.value.filter(tutoria => {
    const coincideTexto = `${tutoria.materia} ${tutoria.curso}`.toLocaleLowerCase("es").includes(texto)
    return coincideTexto && (!diaSeleccionado.value || tutoria.dia === diaSeleccionado.value)
  })
})

async function cargarTutorias({ conservarMensaje = false } = {}) {
  error.value = ""
  if (!conservarMensaje) mensaje.value = ""

  if (!supabaseConfigured || !supabase) {
    sesionActiva.value = false
    error.value = "Falta configurar VITE_SUPABASE_URL y VITE_SUPABASE_PUBLISHABLE_KEY en .env o .env.local."
    return
  }

  cargando.value = true
  try {
    const { data: sesionData, error: errorSesion } = await supabase.auth.getSession()
    if (errorSesion) throw errorSesion
    sesionActiva.value = Boolean(sesionData.session)

    if (!sesionActiva.value) {
      tutorias.value = []
      error.value = "Iniciá sesión con una cuenta autorizada de Supabase para consultar los horarios."
      return
    }

    const { data, error: errorConsulta } = await supabase
      .from("tutorias")
      .select("id, materia, curso, dia, horario")
      .order("id")

    if (errorConsulta) throw errorConsulta
    tutorias.value = data ?? []
  } catch (problema) {
    error.value = problema.message || "No se pudieron cargar las tutorías. Revisá la tabla y las políticas RLS."
  } finally {
    cargando.value = false
  }
}

async function guardarTutoria() {
  error.value = ""
  mensaje.value = ""
  guardando.value = true

  try {
    const valores = {
      materia: formulario.materia,
      curso: formulario.curso,
      dia: formulario.dia,
      horario: formulario.horario
    }
    const consulta = editandoId.value === null
      ? supabase.from("tutorias").insert(valores)
      : supabase.from("tutorias").update(valores).eq("id", editandoId.value)
    const { error: errorGuardado } = await consulta

    if (errorGuardado) throw errorGuardado

    mensaje.value = editandoId.value === null ? "Tutoría guardada en Supabase." : `Se actualizó la tutoría ${editandoId.value}.`
    limpiarFormulario()
    await cargarTutorias({ conservarMensaje: true })
  } catch (problema) {
    error.value = problema.message || "No se pudo guardar la tutoría. Revisá los permisos de la tabla."
  } finally {
    guardando.value = false
  }
}

function iniciarEdicion(tutoria) {
  editandoId.value = tutoria.id
  Object.assign(formulario, {
    materia: tutoria.materia,
    curso: tutoria.curso,
    dia: tutoria.dia,
    horario: tutoria.horario
  })
  error.value = ""
  mensaje.value = ""
}

function cancelarEdicion() {
  limpiarFormulario()
}

function limpiarFormulario() {
  editandoId.value = null
  Object.assign(formulario, { materia: "", curso: "", dia: "", horario: "" })
}

onMounted(cargarTutorias)
</script>

<style scoped>
* { box-sizing: border-box; }
.schedule-page { min-height: 100vh; display: flex; color: #202a31; background: #f2f5f2; font-family: Arial, Helvetica, sans-serif; }
.sidebar { width: 248px; flex: 0 0 248px; min-height: 100vh; padding: 26px 18px; display: flex; flex-direction: column; background: #173c36; color: #f5f7f3; }
.brand { display: flex; align-items: center; gap: 11px; padding: 0 5px 25px; font-size: 15px; font-weight: 700; }
.brand small { display: block; margin-top: 3px; color: #b7c8be; font-size: 12px; font-weight: 400; }
.brand-mark { width: 38px; height: 38px; display: grid; place-items: center; background: #e5a545; color: #203b33; border-radius: 7px; font-weight: 800; }
nav { display: grid; gap: 5px; }
nav a { padding: 12px 13px; border-radius: 5px; color: #d6e0d9; font-size: 13px; text-decoration: none; }
nav a:hover, nav a.active { background: #2b554a; color: #fff; }
.source-note { margin-top: auto; padding: 13px 5px 0; border-top: 1px solid #426258; color: #c6d4cc; font-size: 12px; }
.source-dot { width: 7px; height: 7px; display: inline-block; margin-right: 7px; border-radius: 50%; background: #e5a545; }
.content { width: min(1440px, 100%); margin: 0 auto; padding: 42px clamp(20px, 4vw, 58px); }
.page-heading, .section-heading { display: flex; align-items: center; justify-content: space-between; gap: 18px; }
.page-heading { margin-bottom: 27px; }
.eyebrow { margin: 0 0 8px; color: #8a6530; font-size: 10px; font-weight: 700; letter-spacing: 1.2px; }
h1, h2, p { margin-top: 0; }
h1 { margin-bottom: 8px; font-size: 29px; font-weight: 600; }
.subtitle { margin-bottom: 0; color: #69756e; font-size: 14px; }
.refresh-button { width: 40px; height: 40px; border: 1px solid #ccd5ce; border-radius: 5px; background: #fff; color: #245649; font-size: 23px; cursor: pointer; }
.workspace { display: grid; grid-template-columns: minmax(230px, 290px) minmax(0, 1fr); align-items: start; gap: 22px; }
.editor, .list-panel { border: 1px solid #dfe5df; border-radius: 6px; background: #fff; }
.editor { padding: 22px; }
.section-heading { margin-bottom: 22px; }
h2 { margin-bottom: 0; font-size: 17px; font-weight: 600; }
.form-symbol { width: 34px; height: 34px; display: grid; place-items: center; border-radius: 5px; background: #f5ead6; color: #946823; font-size: 22px; }
.editor label, .filters label { display: grid; gap: 7px; margin: 15px 0 0; color: #59665f; font-size: 12px; font-weight: 600; }
.editor input, .editor select, .filters input, .filters select { width: 100%; min-height: 39px; padding: 0 10px; border: 1px solid #cfd8d1; border-radius: 4px; background: #fff; color: #26342d; font: inherit; font-size: 13px; }
.editor input:focus, .editor select:focus, .filters input:focus, .filters select:focus { outline: 2px solid #79a494; outline-offset: 1px; }
.form-actions { display: flex; gap: 8px; margin-top: 22px; }
.primary-button, .secondary-button { min-height: 39px; padding: 0 14px; border: 1px solid transparent; border-radius: 4px; font: inherit; font-size: 12px; font-weight: 700; cursor: pointer; }
.primary-button { flex: 1; background: #245649; color: #fff; }
.secondary-button { border-color: #cfd8d1; background: #fff; color: #425249; }
button:disabled { cursor: not-allowed; opacity: .6; }
.list-panel { min-width: 0; padding: 22px; }
.list-heading { margin-bottom: 18px; }
.count { color: #245649; font-size: 17px; font-weight: 700; }
.count small { color: #77827c; font-size: 11px; font-weight: 400; }
.filters { display: grid; grid-template-columns: minmax(180px, 1fr) minmax(130px, 180px); gap: 15px; padding: 0 0 17px; }
.filters label { margin: 0; }
.table-wrap { width: 100%; overflow-x: auto; }
table { width: 100%; border-collapse: collapse; text-align: left; font-size: 13px; }
th { padding: 11px 9px; border-bottom: 1px solid #dfe5df; color: #737e77; font-size: 10px; font-weight: 700; text-transform: uppercase; }
td { padding: 13px 9px; border-bottom: 1px solid #edf0ed; color: #46534b; white-space: nowrap; }
tbody tr:last-child td { border-bottom: 0; }
.id-cell { color: #8a6530; font-variant-numeric: tabular-nums; }
.subject-cell { color: #243a31; font-weight: 700; }
.edit-button { padding: 5px 8px; border: 1px solid #d1dcd4; border-radius: 4px; background: #fff; color: #245649; font: inherit; font-size: 11px; cursor: pointer; }
.edit-button:hover { background: #eef4f0; }
.empty-state { padding: 28px 12px; color: #77827c; text-align: center; }
.notice { margin: 0 0 18px; padding: 12px 14px; border: 1px solid; border-radius: 4px; font-size: 13px; }
.error-notice { border-color: #e5c4ba; background: #fff5f1; color: #843e2e; }
.success-notice { border-color: #c8d9cb; background: #f0f7f0; color: #315b3c; }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; }
@media (max-width: 850px) { .workspace { grid-template-columns: 1fr; } .editor { max-width: none; } }
@media (max-width: 620px) { .schedule-page { flex-direction: column; } .sidebar { width: 100%; min-height: auto; padding: 14px 15px; } .brand { padding-bottom: 12px; } nav { display: flex; overflow-x: auto; } nav a { flex: 0 0 auto; padding: 10px; font-size: 12px; } .source-note { display: none; } .content { padding: 27px 15px; } .page-heading { align-items: flex-start; } h1 { font-size: 24px; } .list-panel { padding: 16px 12px; } .filters { grid-template-columns: 1fr 130px; gap: 10px; } }
</style>