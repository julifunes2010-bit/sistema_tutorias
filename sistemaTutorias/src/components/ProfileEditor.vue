<template>
  <div class="profile-editor">
    <button class="profile-trigger" type="button" aria-haspopup="dialog" @click="abrirEditor">
      <span class="profile-avatar" aria-hidden="true">
        <img v-if="perfil.photo" :src="perfil.photo" alt="">
        <span v-else>{{ iniciales }}</span>
      </span>
      <span class="profile-label">
        <strong>Profe {{ nombreVisible }}</strong>
        <small>Docente</small>
      </span>
    </button>

    <div v-if="abierto" class="profile-backdrop" @click.self="cerrarEditor">
      <section class="profile-modal" role="dialog" aria-modal="true" aria-labelledby="profile-title">
        <header class="profile-modal-header">
          <div>
            <h2 id="profile-title">Editar perfil</h2>
            <p>Actualizá cómo aparece tu perfil en el sistema.</p>
          </div>
          <button class="profile-close" type="button" aria-label="Cerrar" @click="cerrarEditor">×</button>
        </header>

        <form @submit.prevent="guardarPerfil">
          <div class="profile-photo-section">
            <span class="profile-avatar profile-avatar-large" aria-hidden="true">
              <img v-if="borrador.photo" :src="borrador.photo" alt="">
              <span v-else>{{ inicialesBorrador }}</span>
            </span>
            <div class="photo-actions">
              <label class="photo-upload">
                Cambiar foto
                <input type="file" accept="image/*" @change="cargarFoto">
              </label>
              <button v-if="borrador.photo" class="photo-remove" type="button" @click="borrador.photo = ''">Quitar foto</button>
              <small>Elegí una imagen de hasta 2 MB.</small>
            </div>
          </div>

          <label class="profile-field">
            <span>Nombre</span>
            <input v-model.trim="borrador.nombre" type="text" autocomplete="given-name" maxlength="50" required>
          </label>
          <label class="profile-field">
            <span>Apellido</span>
            <input v-model.trim="borrador.apellido" type="text" autocomplete="family-name" maxlength="50">
          </label>

          <p v-if="error" class="profile-error" role="alert">{{ error }}</p>
          <p v-if="guardado" class="profile-success" role="status">Cambios guardados.</p>

          <footer class="profile-actions">
            <button class="profile-cancel" type="button" @click="cerrarEditor">Cancelar</button>
            <button class="profile-save" type="submit">Guardar cambios</button>
          </footer>
        </form>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue"

const PROFILE_KEY = "sistemaTutoriasProfile"
const emit = defineEmits(["saved"])
const defaultProfile = { nombre: "Luis", apellido: "", photo: "" }
const perfil = ref(leerPerfil())
const borrador = ref({ ...perfil.value })
const abierto = ref(false)
const error = ref("")
const guardado = ref(false)

function leerPerfil() {
  try {
    return { ...defaultProfile, ...JSON.parse(localStorage.getItem(PROFILE_KEY) || "{}") }
  } catch {
    return { ...defaultProfile }
  }
}

const nombreVisible = computed(() => [perfil.value.nombre, perfil.value.apellido].filter(Boolean).join(" "))
const iniciales = computed(() => obtenerIniciales(perfil.value))
const inicialesBorrador = computed(() => obtenerIniciales(borrador.value))

function obtenerIniciales(datos) {
  return [datos.nombre, datos.apellido].filter(Boolean).map(parte => parte[0]).join("").toUpperCase() || "LS"
}

function abrirEditor() {
  // Recarga el perfil persistido al abrir, por si se actualizó desde otra pantalla.
  perfil.value = leerPerfil()
  borrador.value = { ...perfil.value }
  error.value = ""
  guardado.value = false
  abierto.value = true
}

function cerrarEditor() {
  abierto.value = false
  error.value = ""
  guardado.value = false
}

function cargarFoto(evento) {
  const archivo = evento.target.files?.[0]
  evento.target.value = ""
  if (!archivo) return
  if (!archivo.type.startsWith("image/")) {
    error.value = "Seleccioná un archivo de imagen."
    return
  }
  if (archivo.size > 2 * 1024 * 1024) {
    error.value = "La imagen no puede superar los 2 MB."
    return
  }

  const lector = new FileReader()
  lector.onload = () => {
    borrador.value.photo = String(lector.result || "")
    error.value = ""
  }
  lector.onerror = () => { error.value = "No se pudo leer la imagen seleccionada." }
  lector.readAsDataURL(archivo)
}

function guardarPerfil() {
  error.value = ""
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(borrador.value))
    perfil.value = { ...borrador.value }
    // Notifica a Inicio para actualizar el saludo inmediatamente, además de persistir el perfil.
    emit("saved", { ...perfil.value })
    guardado.value = true
    setTimeout(() => { abierto.value = false; guardado.value = false }, 650)
  } catch {
    error.value = "No se pudo guardar el perfil en este navegador. Probá con una imagen más pequeña."
  }
}
</script>

<style scoped>
.profile-editor { position: relative; }
.profile-trigger {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px 0 4px 8px;
  border: 0;
  border-radius: 10px;
  color: var(--ui-ink);
  background: transparent;
  text-align: left;
}
.profile-trigger:hover { background: var(--ui-primary-soft); }
.profile-avatar {
  display: inline-flex;
  width: 40px;
  height: 40px;
  flex: 0 0 40px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 50%;
  color: #fff;
  background: var(--ui-primary);
  font-size: 14px;
  font-weight: 700;
}
.profile-avatar img { width: 100%; height: 100%; object-fit: cover; }
.profile-label { display: flex; flex-direction: column; gap: 2px; }
.profile-label strong { font-size: 14px; font-weight: 600; }
.profile-label small { color: var(--ui-muted); font-size: 12px; }
.profile-backdrop {
  position: fixed;
  z-index: 1000;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(20, 29, 38, .48);
}
.profile-modal {
  width: min(460px, 100%);
  max-height: min(92vh, 720px);
  overflow-y: auto;
  padding: 26px;
  border: 1px solid var(--ui-border);
  border-radius: 14px;
  color: var(--ui-ink);
  background: var(--ui-surface);
  box-shadow: 0 20px 60px rgba(15, 31, 46, .24);
}
.profile-modal-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 22px; }
.profile-modal-header h2 { margin: 0 0 5px; color: var(--ui-ink); font-size: 21px; }
.profile-modal-header p { margin: 0; color: var(--ui-muted); font-size: 13px; }
.profile-close { border: 0; color: var(--ui-muted); background: transparent; font-size: 25px; line-height: 1; }
.profile-photo-section { display: flex; align-items: center; gap: 16px; margin-bottom: 22px; }
.profile-avatar-large { width: 76px; height: 76px; flex-basis: 76px; font-size: 22px; }
.photo-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; }
.photo-upload, .photo-remove { padding: 8px 11px; border: 1px solid var(--ui-border); border-radius: 8px; color: var(--ui-primary-dark); background: var(--ui-surface); font-size: 13px; cursor: pointer; }
.photo-upload input { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0, 0, 0, 0); }
.photo-actions small { flex-basis: 100%; color: var(--ui-muted); font-size: 12px; }
.profile-field { display: flex; flex-direction: column; gap: 7px; margin-bottom: 16px; color: var(--ui-ink); font-size: 13px; font-weight: 600; }
.profile-field input { width: 100%; min-height: 42px; padding: 9px 11px; border: 1px solid var(--ui-border); border-radius: 8px; color: var(--ui-ink); background: var(--ui-surface); font-size: 14px; }
.profile-error, .profile-success { margin: 8px 0; font-size: 13px; }
.profile-error { color: #a8323e; }
.profile-success { color: #28704b; }
.profile-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 24px; }
.profile-actions button { min-height: 40px; padding: 8px 14px; border: 1px solid var(--ui-border); border-radius: 8px; }
.profile-cancel { color: var(--ui-ink); background: var(--ui-surface); }
.profile-save { border-color: var(--ui-primary) !important; color: #fff !important; background: var(--ui-primary) !important; }
html[data-theme="dark"] .profile-avatar { color: #17212b; }
html[data-theme="dark"] .profile-error { color: #ff9aa2; }
html[data-theme="dark"] .profile-success { color: #8fd0a9; }
@media (max-width: 500px) {
  .profile-modal { padding: 21px 18px; }
  .profile-label { display: none; }
}
</style>
