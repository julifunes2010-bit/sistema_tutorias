<template>
  <section v-if="sesionActiva" class="help-chat" aria-label="Chat miniProA Beta">
    <Transition name="chat">
      <div v-if="abierto" class="help-panel" role="dialog" aria-labelledby="help-title">
        <header class="help-header">
          <div class="help-avatar" aria-hidden="true"><img src="../assets/proa.jpg" alt=""></div>
          <div class="help-heading">
            <h2 id="help-title">miniProA</h2>
            <span class="online-label"><i></i> Asistente automático</span>
          </div>
          <button class="close-button" type="button" aria-label="Cerrar chat" @click="abierto = false">×</button>
        </header>

        <div ref="listaMensajes" class="chat-messages" aria-live="polite" aria-relevant="additions text">
          <div class="day-divider"><span>CHAT DE AYUDA</span><span class="beta-label">BETA · PROTOTIPO</span></div>
          <article
            v-for="item in mensajes"
            :key="item.id"
            class="message-row"
            :class="item.autor === 'usuario' ? 'from-user' : 'from-help'"
          >
            <div v-if="item.autor === 'ayuda'" class="message-avatar" aria-hidden="true"><img src="../assets/proa.jpg" alt=""></div>
            <div v-if="item.autor === 'ayuda'" class="assistant-content">
              <p class="message-bubble" :class="{ 'error-bubble': item.error }">{{ item.texto }}</p>
              <div v-if="item.actions?.length" class="quick-actions" aria-label="Acciones sugeridas">
                <template v-for="action in item.actions" :key="action.label">
                  <a v-if="action.url" :href="action.url" target="_blank" rel="noopener noreferrer">
                    {{ action.label }} ↗
                  </a>
                  <button v-else type="button" :disabled="enviando" @click="ejecutarAccion(action)">
                    {{ action.label }}
                  </button>
                </template>
              </div>
            </div>
            <p v-else class="message-bubble">{{ item.texto }}</p>
          </article>
          <article v-if="enviando" class="message-row from-help" role="status" aria-label="Enviando mensaje">
            <div class="message-avatar" aria-hidden="true"><img src="../assets/proa.jpg" alt=""></div>
            <p class="message-bubble typing"><i></i><i></i><i></i><span>Notificando al equipo</span></p>
          </article>
        </div>

        <form class="message-form" @submit.prevent="enviarMensaje">
          <label class="sr-only" for="help-message">Tu mensaje</label>
          <textarea
            id="help-message"
            v-model="mensaje"
            rows="3"
            maxlength="2000"
            placeholder="Escribí tu consulta…"
            required
            @keydown.esc="abierto = false"
          ></textarea>
          <div class="form-footer">
            <span class="privacy-note">Se enviará a soporte junto con tu correo de cuenta.</span>
            <button type="submit" :disabled="enviando || !mensaje.trim()" aria-label="Enviar mensaje">
              <span>{{ enviando ? "Enviando" : "Enviar" }}</span>
              <span aria-hidden="true">➤</span>
            </button>
          </div>
          <div class="character-count" :class="{ 'near-limit': mensaje.length > 1800 }">{{ mensaje.length }}/2000</div>
        </form>
      </div>
    </Transition>

    <button
      v-if="!abierto"
      class="security-shortcut"
      type="button"
      aria-label="Abrir guía rápida para evitar phishing"
      @click="abrirGuiaPhishing"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 19 6v5c0 4.6-2.9 8-7 10-4.1-2-7-5.4-7-10V6l7-3Z"/><path d="m9 12 2 2 4-4"/></svg>
      <span>Evitar phishing</span>
    </button>

    <button
      v-if="!abierto"
      class="chat-toggle"
      type="button"
      :aria-expanded="abierto"
      aria-label="Abrir chat con miniProA"
      @click="abierto = !abierto"
    >
      <span v-if="!abierto" class="toggle-avatar" aria-hidden="true"><img src="../assets/proa.jpg" alt=""></span>
      <span class="toggle-label">miniProA <small>Beta · Prototipo</small></span>
    </button>
  </section>
</template>

<script setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue"
import { useRouter } from "vue-router"
import { supabase } from "../lib/supabase.js"

const router = useRouter()
const sesionActiva = ref(false)
const abierto = ref(false)
const mensaje = ref("")
const enviando = ref(false)
const listaMensajes = ref(null)
const datosCuenta = ref({ correo: "", rolDeclarado: "" })
let siguienteId = 1
const mensajes = ref([
  {
    id: siguienteId++,
    autor: "ayuda",
    texto: "¡Hola! Soy miniProA. Puedo guiarte por el sistema, abrir secciones y mostrarte los datos básicos de tu cuenta. ¿Qué necesitás?",
    actions: [
      { label: "Guía rápida", prompt: "ayuda" },
      { label: "Evitar phishing", prompt: "phishing" },
      { label: "Crear tutoría", path: "/nueva-citacion" },
      { label: "Mis datos", prompt: "mis datos" }
    ]
  }
])
let authSubscription

watch([abierto, mensajes, enviando], async () => {
  if (!abierto.value) return
  await nextTick()
  if (listaMensajes.value) listaMensajes.value.scrollTop = listaMensajes.value.scrollHeight
})

onMounted(async () => {
  const { data } = await supabase.auth.getSession()
  sesionActiva.value = Boolean(data.session)
  if (data.session) void cargarDatosCuenta()

  const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
    sesionActiva.value = Boolean(session)
    if (session) {
      // Espera a que termine el callback de Auth antes de hacer otra llamada al cliente.
      setTimeout(() => void cargarDatosCuenta(), 0)
    } else {
      abierto.value = false
      datosCuenta.value = { correo: "", rolDeclarado: "" }
    }
  })
  authSubscription = listener.subscription
})

onUnmounted(() => authSubscription?.unsubscribe())

async function cargarDatosCuenta() {
  try {
    const { data, error } = await supabase.auth.getUser()
    if (error || !data.user) {
      datosCuenta.value = { correo: "", rolDeclarado: "" }
      return
    }
    datosCuenta.value = {
      correo: data.user.email || "",
      rolDeclarado: String(data.user.user_metadata?.requested_role || "")
    }
  } catch {
    datosCuenta.value = { correo: "", rolDeclarado: "" }
  }
}

function normalizarTexto(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
}

function obtenerRespuesta(texto) {
  const consulta = normalizarTexto(texto)

  if (/^(hola|buenas|buen dia|buenos dias|buenas tardes|buenas noches|hey)[!. ]*$/.test(consulta)) {
    return "¡Hola! ¿En qué te puedo ayudar? Podés preguntarme cómo crear una tutoría, revisar tus citaciones, ver cursos o cambiar la configuración."
  }
  if (/^(ayuda|guia|guia rapida|como funciona|que hace cada cosa|opciones)[?.! ]*$/.test(consulta) || /\bnecesito ayuda\b|\bmostrar ayuda\b|\bguia del sistema\b/.test(consulta)) {
    return "GUÍA RÁPIDA DEL SISTEMA\n\n• Inicio: resumen de tus tutorías próximas y actividad.\n• Nueva citación: creá una tutoría eligiendo año, materia, fecha y horario; después tocá “Crear citación”.\n• Mis citaciones: consultá tus citas y marcá si fueron realizadas o siguen pendientes.\n• Cursos: buscá cursos por nombre, docente o turno; también podés filtrar y ordenar.\n• Reportes: consultá el resumen de actividad disponible.\n• Configuración: cambiá el tema claro/oscuro y editá tu perfil.\n• Seguridad del correo: escribí “phishing” para ver cómo reconocer y reportar mensajes maliciosos.\n\nPara crear una tutoría, elegí un horario libre entre las 08:00 y las 18:00, en intervalos de 30 minutos. Podés preguntarme por cualquier sección para ver más detalle."
  }
  if (/phishing|phising|malicios|malisios|correo sospechoso|correos sospechosos|email sospechoso|spam|suplantacion/.test(consulta)) {
    return "GUÍA PARA PREVENIR EL PHISHING\n\n1. Revisá la dirección completa del remitente: el nombre visible puede ser falso.\n2. Desconfiá de mensajes urgentes, premios inesperados o pedidos de claves, códigos, pagos o datos personales.\n3. No abras enlaces ni adjuntos inesperados. Para entrar a una cuenta, escribí su dirección habitual en el navegador o usá la app oficial.\n4. No compartas contraseñas ni códigos de verificación por correo. Activá la verificación en dos pasos.\n5. Si el mensaje te parece sospechoso, no respondas ni uses sus enlaces. Marcá “Reportar phishing” o “Reportar spam” desde tu servicio de correo y después eliminá el mensaje.\n\nSobre “no recibirlos”: ningún filtro garantiza bloquear todos los mensajes maliciosos. Este sistema de tutorías no administra tu bandeja ni puede impedir que lleguen. En Gmail podés reportar el correo como phishing o bloquear al remitente; los próximos mensajes de esa dirección irán a Spam."
  }
  if (/mis datos|datos de usuario|mi usuario|mi cuenta|mi perfil|mi correo|mi rol|que correo/.test(consulta)) {
    if (!datosCuenta.value.correo) return "No pude consultar los datos de tu cuenta ahora. Volvé a iniciar sesión e intentá de nuevo."
    const rol = datosCuenta.value.rolDeclarado
      ? `\nRol indicado al registrarte: ${datosCuenta.value.rolDeclarado}.`
      : "\nNo figura un rol indicado al registrarte."
    return `Estos son los datos de tu cuenta actual:\nCorreo: ${datosCuenta.value.correo}${rol}\n\nNo puedo ver tu contraseña ni los datos privados de otras personas.`
  }
  if (/^(inicio|home|panel principal|resumen)[?.! ]*$/.test(consulta)) {
    return "“Inicio” es el panel principal: muestra un resumen de tus próximas tutorías, estudiantes citados y tutorías realizadas. Desde ahí también podés entrar rápidamente a crear una citación."
  }
  if (/gracias|muchas gracias|te agradezco/.test(consulta)) {
    return "¡De nada! Si te surge otra duda, escribime."
  }
  if (/crear|agendar|programar|nueva citacion|tutoria|horario|fecha/.test(consulta)) {
    return "Para crear una tutoría, abrí “Nueva citación”, elegí el año (del 1.º al 6.º), la materia, la fecha y el horario, y tocá “Crear citación”. Los horarios disponibles van de 08:00 a 18:00 cada 30 minutos."
  }
  if (/mis citaciones|ver citacion|estado|realizada|pendiente|cancelar|cambiar citacion/.test(consulta)) {
    return "En “Mis citaciones” podés revisar las tutorías y cambiar su estado entre pendiente y realizada. Si necesitás cancelar o modificar una cita, escribinos el detalle y el equipo podrá orientarte."
  }
  if (/curso|materia|docente/.test(consulta)) {
    return "En “Cursos” podés buscar por curso, docente o turno, filtrar por año y ordenar los resultados. Si no encontrás una materia, contame cuál y la consulta le llegará al equipo."
  }
  if (/reporte|estadistica|informe/.test(consulta)) {
    return "La sección “Reportes” muestra el resumen de las tutorías registradas. Entrá desde el menú lateral para consultar la información disponible."
  }
  if (/oscuro|tema|apariencia|configuracion|perfil|foto/.test(consulta)) {
    return "En “Configuración” podés cambiar entre modo claro y oscuro y editar la información de tu perfil."
  }
  if (/contrasena|password|no puedo entrar|iniciar sesion|recuperar acceso|olvide/.test(consulta)) {
    return "En la pantalla de inicio elegí “¿Olvidaste tu contraseña?” y seguí los pasos para recuperarla con tu correo institucional."
  }
  if (/que podes hacer|que puedes hacer/.test(consulta)) {
    return "Puedo orientarte con la creación de tutorías, tus citaciones, los cursos, los reportes, la configuración y el acceso."
  }

  return "Todavía no tengo una respuesta automática para esa consulta. Voy a compartirla con el equipo de ayuda para que pueda orientarte."
}

function obtenerAcciones(texto) {
  const consulta = normalizarTexto(texto)
  if (/phishing|phising|malicios|malisios|correo sospechoso|email sospechoso|spam|suplantacion/.test(consulta)) {
    return [
      { label: "Reportar phishing en Gmail", url: "https://support.google.com/mail/answer/8253?hl=es" },
      { label: "Bloquear remitente en Gmail", url: "https://support.google.com/mail/answer/8151?hl=es" }
    ]
  }
  if (/^(ayuda|guia|guia rapida|como funciona|que hace cada cosa|opciones)[?.! ]*$/.test(consulta) || /\bnecesito ayuda\b|\bmostrar ayuda\b|\bguia del sistema\b/.test(consulta)) {
    return [
      { label: "Inicio", path: "/home" },
      { label: "Nueva citación", path: "/nueva-citacion" },
      { label: "Mis citaciones", path: "/mis-citaciones" },
      { label: "Cursos", path: "/cursos" },
      { label: "Reportes", path: "/reportes" },
      { label: "Configuración", path: "/setting" }
    ]
  }
  if (/crear|agendar|programar|nueva citacion|tutoria|horario|fecha/.test(consulta)) {
    return [{ label: "Ir a Nueva citación", path: "/nueva-citacion" }]
  }
  if (/mis citaciones|ver citacion|estado|realizada|pendiente|cancelar/.test(consulta)) {
    return [{ label: "Abrir Mis citaciones", path: "/mis-citaciones" }]
  }
  if (/curso|materia|docente/.test(consulta)) return [{ label: "Abrir Cursos", path: "/cursos" }]
  if (/reporte|estadistica|informe/.test(consulta)) return [{ label: "Abrir Reportes", path: "/reportes" }]
  if (/oscuro|tema|apariencia|configuracion|perfil|foto/.test(consulta)) {
    return [{ label: "Abrir Configuración", path: "/setting" }]
  }
  if (/contrasena|password|no puedo entrar|iniciar sesion|recuperar acceso|olvide/.test(consulta)) {
    return [{ label: "Recuperar contraseña", path: "/recuperar" }]
  }
  if (/^(inicio|home|panel principal|resumen)[?.! ]*$/.test(consulta)) {
    return [{ label: "Abrir Inicio", path: "/home" }]
  }
  if (/^(hola|buenas|buen dia|buenos dias|buenas tardes|buenas noches|hey)[!. ]*$/.test(consulta)) {
    return [{ label: "Ver guía rápida", prompt: "ayuda" }, { label: "Mis datos", prompt: "mis datos" }]
  }
  if (/que podes hacer|que puedes hacer/.test(consulta)) {
    return [{ label: "Ver guía rápida", prompt: "ayuda" }]
  }
  return []
}

async function ejecutarAccion(action) {
  if (enviando.value) return
  if (action.path) {
    abierto.value = false
    await router.push(action.path)
    return
  }
  if (action.prompt) await enviarTexto(action.prompt)
}

function abrirGuiaPhishing() {
  abierto.value = true
  mensajes.value.push({
    id: siguienteId++,
    autor: "ayuda",
    texto: obtenerRespuesta("phishing"),
    actions: obtenerAcciones("phishing")
  })
}

async function enviarMensaje() {
  const texto = mensaje.value.trim()
  if (!texto || enviando.value) return
  mensaje.value = ""
  await enviarTexto(texto)
}

async function enviarTexto(texto) {
  if (!texto.trim() || enviando.value) return
  enviando.value = true
  mensajes.value.push({ id: siguienteId++, autor: "usuario", texto })
  mensajes.value.push({
    id: siguienteId++,
    autor: "ayuda",
    texto: obtenerRespuesta(texto),
    actions: obtenerAcciones(texto)
  })

  try {
    const { error: invokeError } = await supabase.functions.invoke("help-chat", {
      body: { message: texto }
    })
    if (invokeError) {
      let serverMessage = ""
      try {
        serverMessage = (await invokeError.context?.json())?.error || ""
      } catch {
        // Usa el mensaje genérico del cliente cuando la respuesta no es JSON.
      }
      throw new Error(serverMessage || invokeError.message)
    }

    mensajes.value.push({ id: siguienteId++, autor: "ayuda", texto: "También envié tu mensaje al equipo de ayuda." })
  } catch (sendError) {
    const detalle = sendError.message?.includes("Failed to fetch")
      ? "No se pudo conectar con el servicio. Revisá la configuración del prototipo."
      : sendError.message || "No se pudo enviar el mensaje. Probá de nuevo."
    mensajes.value.push({ id: siguienteId++, autor: "ayuda", texto: `Pude responderte, pero el correo al equipo no se pudo enviar: ${detalle}`, error: true })
  } finally {
    enviando.value = false
  }
}
</script>

<style scoped>
.help-chat { position: fixed; z-index: 1000; right: 26px; bottom: 26px; font-family: inherit; }
.chat-toggle { display: flex; align-items: center; gap: 11px; min-height: 58px; padding: 0 20px; border: 1px solid #ffffff30; border-radius: 18px; color: #fff; background: linear-gradient(135deg, #376d98, #244b6c); box-shadow: 0 10px 28px #0005; font-weight: 700; transition: transform .18s ease, box-shadow .18s ease; }
.chat-toggle:hover { transform: translateY(-3px); box-shadow: 0 14px 34px #0006; }
.security-shortcut { position: absolute; right: 0; bottom: 72px; display: inline-flex; align-items: center; gap: 8px; padding: 10px 14px; border: 1px solid #c9d7e3; border-radius: 999px; color: #315f86; background: var(--ui-surface); box-shadow: 0 6px 18px #0002; font-size: 12px; font-weight: 700; transition: transform .16s ease, box-shadow .16s ease, border-color .16s ease; white-space: nowrap; }
.security-shortcut svg { width: 17px; height: 17px; fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 1.8; }
.security-shortcut:hover { transform: translateY(-2px); border-color: #83a6c2; box-shadow: 0 9px 22px #0003; }
.toggle-avatar { display: block; width: 34px; height: 34px; flex: 0 0 auto; overflow: hidden; border: 2px solid #ffffffaa; border-radius: 50%; background: #fff; }
.toggle-avatar img { display: block; width: 100%; height: 100%; object-fit: cover; }
.toggle-label { display: grid; text-align: left; line-height: 1.15; }
.toggle-label small { margin-top: 4px; color: #d5e6f4; font-size: 10px; font-weight: 600; }
.help-panel { position: absolute; right: 0; bottom: 0; display: flex; flex-direction: column; width: min(410px, calc(100vw - 40px)); height: min(590px, calc(100dvh - 52px)); min-height: min(420px, calc(100dvh - 52px)); overflow: hidden; border: 1px solid color-mix(in srgb, var(--ui-border), #315f86 25%); border-radius: 20px; color: var(--ui-ink); background: var(--ui-surface); box-shadow: 0 22px 64px #0006, 0 4px 16px #0002; }
.help-header { display: flex; align-items: center; gap: 12px; padding: 18px 19px; color: #fff; background: linear-gradient(125deg, #3976a5, #244b6c); }
.help-avatar { display: block; width: 42px; height: 42px; flex: 0 0 auto; overflow: hidden; border: 2px solid #ffffffaa; border-radius: 50%; background: #fff; box-shadow: 0 2px 8px #0002; }
.help-avatar img { display: block; width: 100%; height: 100%; object-fit: cover; }
.help-heading { flex: 1; }
.help-heading h2 { margin: 0; color: inherit; font-size: 17px; font-weight: 700; letter-spacing: .01em; }
.online-label { display: flex; align-items: center; gap: 6px; margin-top: 5px; color: #dceaf5; font-size: 11px; }
.online-label i { width: 7px; height: 7px; border-radius: 50%; background: #87e0ad; box-shadow: 0 0 0 3px #87e0ad25; }
.close-button { width: 34px; height: 34px; border: 0; border-radius: 50%; color: #fff; background: #ffffff17; font-size: 25px; transition: background .15s ease; }
.close-button:hover { background: #ffffff32; }
.chat-messages { display: flex; flex: 1; flex-direction: column; align-items: stretch; gap: 15px; padding: 20px 18px; overflow-y: auto; overscroll-behavior: contain; scroll-behavior: smooth; }
.day-divider { display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; color: var(--ui-muted); font-size: 9px; font-weight: 700; letter-spacing: .09em; }
.beta-label { padding: 4px 7px; border: 1px solid var(--ui-border); border-radius: 999px; color: var(--ui-muted); background: var(--ui-page); font-size: 9px; letter-spacing: .03em; }
.message-row { display: flex; align-items: flex-end; gap: 8px; animation: message-in .2s ease both; }
.message-row.from-user { justify-content: flex-end; }
.message-avatar { display: block; width: 28px; height: 28px; flex: 0 0 auto; overflow: hidden; border: 1px solid #315f8633; border-radius: 50%; background: #fff; box-shadow: 0 2px 5px #0002; }
.message-avatar img { display: block; width: 100%; height: 100%; object-fit: cover; }
.assistant-content { display: flex; min-width: 0; max-width: calc(100% - 36px); flex-direction: column; align-items: flex-start; gap: 9px; }
.message-bubble { max-width: 84%; margin: 0; padding: 12px 14px; border: 1px solid var(--ui-border); border-radius: 15px 15px 15px 5px; color: var(--ui-ink); background: color-mix(in srgb, var(--ui-surface), var(--ui-page) 34%); box-shadow: 0 2px 7px #0000000a; font-size: 13px; line-height: 1.55; overflow-wrap: anywhere; white-space: pre-wrap; }
.assistant-content .message-bubble { max-width: 100%; }
.from-user .message-bubble { border-color: #315f86; border-radius: 15px 15px 5px 15px; color: #fff; background: linear-gradient(145deg, #3976a5, #315f86); box-shadow: 0 3px 9px #315f8628; }
.message-bubble.error-bubble { border-color: #edc6c8; color: #842a31; background: #fff5f5; box-shadow: 0 2px 8px #8d2b3010; }
.quick-actions { display: flex; flex-wrap: wrap; gap: 7px; max-width: 100%; }
.quick-actions button, .quick-actions a { display: inline-flex; align-items: center; padding: 7px 10px; border: 1px solid #c9d7e3; border-radius: 999px; color: #315f86; background: var(--ui-surface); font-size: 11px; font-weight: 700; line-height: 1.2; text-decoration: none; transition: border-color .15s ease, background .15s ease, transform .15s ease; }
.quick-actions button:hover:not(:disabled), .quick-actions a:hover { transform: translateY(-1px); border-color: #789bb8; color: #244b6c; background: #edf4f9; }
.quick-actions button:disabled { cursor: wait; opacity: .6; }
.typing { display: flex; align-items: center; gap: 4px; color: var(--ui-muted); }
.typing i { width: 5px; height: 5px; border-radius: 50%; background: var(--ui-muted); animation: typing 1s infinite ease-in-out; }
.typing i:nth-child(2) { animation-delay: .15s; }
.typing i:nth-child(3) { margin-right: 4px; animation-delay: .3s; }
@keyframes typing { 0%, 60%, 100% { opacity: .35; transform: translateY(0); } 30% { opacity: 1; transform: translateY(-3px); } }
.message-form { padding: 14px 16px 12px; border-top: 1px solid var(--ui-border); background: color-mix(in srgb, var(--ui-surface), var(--ui-page) 14%); }
.message-form textarea { display: block; width: 100%; min-height: 82px; resize: vertical; padding: 12px 13px; border: 1px solid var(--ui-border); border-radius: 13px; outline: none; color: var(--ui-ink); background: var(--ui-page); font: inherit; font-size: 13px; line-height: 1.45; transition: border-color .15s ease, box-shadow .15s ease; }
.message-form textarea:focus { border-color: #6c9bc1; box-shadow: 0 0 0 3px #6c9bc126; }
.form-footer { display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-top: 9px; color: var(--ui-muted); font-size: 11px; }
.privacy-note { max-width: 220px; line-height: 1.35; }
.form-footer button { display: flex; align-items: center; gap: 9px; padding: 10px 15px; border: 0; border-radius: 10px; color: #fff; background: linear-gradient(135deg, #3976a5, #315f86); box-shadow: 0 3px 8px #315f8628; font-size: 13px; font-weight: 700; transition: background .15s ease, transform .15s ease, box-shadow .15s ease; }
.form-footer button:hover:not(:disabled) { transform: translateY(-1px); background: linear-gradient(135deg, #315f86, #244b6c); box-shadow: 0 5px 12px #315f8638; }
.form-footer button:disabled { cursor: not-allowed; opacity: .5; }
.character-count { margin-top: 6px; text-align: right; color: var(--ui-muted); font-size: 10px; }
.character-count.near-limit { color: #b42332; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
.chat-enter-active, .chat-leave-active { transition: opacity .16s ease, transform .16s ease; }
.chat-enter-from, .chat-leave-to { transform: translateY(8px); opacity: 0; }
@keyframes message-in { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
html[data-theme="dark"] .help-panel { border-color: #44515c; background: #242c33; box-shadow: 0 24px 70px #0009, 0 4px 18px #0005; }
html[data-theme="dark"] .help-header { background: linear-gradient(125deg, #315f86, #203f59); }
html[data-theme="dark"] .chat-messages { background: #20272d; }
html[data-theme="dark"] .day-divider { color: #aebac4; }
html[data-theme="dark"] .beta-label { border-color: #46535e; color: #d5dfe7; background: #303a43; }
html[data-theme="dark"] .message-bubble { border-color: #414d57; color: #e8edf1; background: #2c353d; box-shadow: 0 2px 8px #0002; }
html[data-theme="dark"] .from-user .message-bubble { border-color: #6285a1; color: #fff; background: linear-gradient(145deg, #547c9a, #3d6381); }
html[data-theme="dark"] .message-bubble.error-bubble { border-color: #74454b; color: #ffd9dc; background: #422c30; }
html[data-theme="dark"] .quick-actions button, html[data-theme="dark"] .quick-actions a { border-color: #4c5c68; color: #d6e8f5; background: #303a43; }
html[data-theme="dark"] .quick-actions button:hover:not(:disabled), html[data-theme="dark"] .quick-actions a:hover { border-color: #87a9c5; color: #f4f9fc; background: #3b4a56; }
html[data-theme="dark"] .message-avatar { border-color: #596875; box-shadow: 0 2px 6px #0004; }
html[data-theme="dark"] .message-form { border-color: #3c4750; background: #242c33; }
html[data-theme="dark"] #app .help-chat .message-form textarea { border-color: #46535e; color: #e8edf1 !important; background: #171d22 !important; }
html[data-theme="dark"] #app .help-chat .message-form textarea:focus { border-color: #8eb3d3; box-shadow: 0 0 0 3px #8eb3d32a; }
html[data-theme="dark"] .form-footer { color: #b6c0c8; }
html[data-theme="dark"] .form-footer button { color: #17212b; background: linear-gradient(135deg, #a4c4df, #82a9c8); box-shadow: 0 3px 10px #0004; }
html[data-theme="dark"] .form-footer button:hover:not(:disabled) { color: #111a21; background: linear-gradient(135deg, #b4d0e6, #94b8d4); }
html[data-theme="dark"] .chat-toggle { border-color: #94b6d055; color: #f7fbff; background: linear-gradient(135deg, #315f86, #203f59); }
html[data-theme="dark"] .chat-toggle:hover { background: linear-gradient(135deg, #3b719d, #284d6b); }
html[data-theme="dark"] .toggle-label small { color: #d6e5f1; }
html[data-theme="dark"] .security-shortcut { border-color: #475966; color: #d9e8f4; background: #29343d; box-shadow: 0 7px 20px #0005; }
html[data-theme="dark"] .security-shortcut:hover { border-color: #88a9c4; color: #f4f9fc; background: #34434e; }
@media (max-width: 480px) { .help-chat { right: 14px; bottom: 14px; } .help-panel { right: -7px; bottom: 0; width: calc(100vw - 28px); height: min(620px, calc(100dvh - 28px)); min-height: min(340px, calc(100dvh - 28px)); border-radius: 19px; } .help-header { padding: 15px 16px; } .chat-messages { padding: 16px 14px; } .message-form { padding: 12px; } }
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; scroll-behavior: auto !important; transition-duration: .01ms !important; } }
</style>
