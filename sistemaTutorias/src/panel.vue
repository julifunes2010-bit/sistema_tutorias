<template>
  <div class="panel">
    <aside class="sidebar">
      <div class="logo">
        <div class="logo-icon">T</div>
        <div><h2>Tutorías</h2><span>ProA</span></div>
      </div>

      <nav class="menu">
        <router-link to="/panel" class="menu-item active"><span class="icon">⌂</span><span>Inicio</span></router-link>
        <router-link v-for="item in menuPermitido" :key="item.path" :to="item.path" class="menu-item">
          <span class="icon">{{ item.icon }}</span><span>{{ item.label }}</span>
        </router-link>
        <router-link to="/setting" class="menu-item"><span class="icon">⚙</span><span>Configuración</span></router-link>
      </nav>

      <button class="logout" @click="salir">Cerrar sesión</button>
    </aside>

    <main class="main-content">
      <header class="header">
        <div><h1>{{ titulo }}</h1><p>Panel de {{ rolTexto }}</p></div>
        <div class="user"><div class="avatar">👤</div><div><strong>{{ usuario.email }}</strong><small>{{ rolTexto }}</small></div></div>
      </header>

      <section class="welcome">
        <div>
          <span class="tag">{{ rolTexto.toUpperCase() }}</span>
          <h2>Bienvenido/a a Tutorías</h2>
          <p>{{ descripcion }}</p>
        </div>
      </section>

      <section class="cards">
        <div v-for="card in tarjetas" :key="card.titulo" class="card">
          <div class="card-icon">{{ card.icon }}</div>
          <div><span>{{ card.titulo }}</span><h3>{{ card.valor }}</h3></div>
        </div>
      </section>

      <section class="section">
        <div class="section-header"><h2>Accesos de tu rol</h2></div>
        <div class="permissions">
          <div v-for="permiso in permisos" :key="permiso" class="permission"><span>✓</span>{{ permiso }}</div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed } from "vue"
import { useRouter } from "vue-router"
import { obtenerUsuarioActual, cerrarSesion } from "./auth.js"

const router = useRouter()
const usuario = obtenerUsuarioActual()
const rol = usuario?.rol || "profesor"

const configuracion = {
  profesor: {
    titulo: "Inicio", descripcion: "Administrá tus tutorías, estudiantes y observaciones de aprendizaje.",
    permisos: ["Ver datos de tus estudiantes", "Crear y gestionar citaciones", "Registrar asistencia", "Agregar observaciones", "Consultar aprendizajes pendientes"],
    tarjetas: [{icon:"📅",titulo:"Próximas tutorías",valor:"2"},{icon:"👥",titulo:"Estudiantes",valor:"8"},{icon:"📝",titulo:"Observaciones",valor:"5"}],
    menu: [{label:"Nueva citación",path:"/nueva-citacion",icon:"＋"},{label:"Mis citaciones",path:"/mis-citaciones",icon:"▣"},{label:"Cursos",path:"/cursos",icon:"▤"}]
  },
  preceptor: {
    titulo: "Gestión de estudiantes", descripcion: "Consultá la información de estudiantes y gestioná sus asistencias por cuatrimestre.",
    permisos: ["Consultar datos de estudiantes", "Gestionar asistencias", "Consultar asistencias por cuatrimestre"],
    tarjetas: [{icon:"👥",titulo:"Estudiantes",valor:"32"},{icon:"✓",titulo:"Asistencias",valor:"94%"},{icon:"📅",titulo:"Cuatrimestre",valor:"2°"}],
    menu: [{label:"Mis citaciones",path:"/mis-citaciones",icon:"▣"}]
  },
  director: {
    titulo: "Panel general", descripcion: "Tenés acceso a la información general del sistema y a la gestión de estudiantes.",
    permisos: ["Acceso a toda la información", "Consultar estudiantes", "Gestionar citaciones", "Consultar asistencias", "Consultar observaciones y aprendizajes", "Consultar reportes"],
    tarjetas: [{icon:"👥",titulo:"Estudiantes",valor:"32"},{icon:"📅",titulo:"Tutorías",valor:"18"},{icon:"📊",titulo:"Reportes",valor:"6"}],
    menu: [{label:"Nueva citación",path:"/nueva-citacion",icon:"＋"},{label:"Mis citaciones",path:"/mis-citaciones",icon:"▣"},{label:"Cursos",path:"/cursos",icon:"▤"},{label:"Reportes",path:"/reportes",icon:"📊"}]
  },
  coordinador: {
    titulo: "Seguimiento académico", descripcion: "Supervisá el recorrido académico y el seguimiento realizado por los profesores.",
    permisos: ["Consultar notas", "Consultar observaciones de profesores", "Consultar asistencias", "Consultar aprendizajes pendientes"],
    tarjetas: [{icon:"📚",titulo:"Notas",valor:"42"},{icon:"📝",titulo:"Observaciones",valor:"17"},{icon:"✓",titulo:"Asistencia",valor:"91%"}],
    menu: [{label:"Cursos",path:"/cursos",icon:"▤"},{label:"Reportes",path:"/reportes",icon:"📊"}]
  },
  secretario: {
    titulo: "Gestión administrativa", descripcion: "Mantené el registro de inasistencias y consultá los datos necesarios de estudiantes.",
    permisos: ["Consultar datos de estudiantes", "Registrar inasistencias", "Consultar asistencias por cuatrimestre"],
    tarjetas: [{icon:"👥",titulo:"Estudiantes",valor:"32"},{icon:"⚠",titulo:"Inasistencias",valor:"12"},{icon:"📅",titulo:"Cuatrimestre",valor:"2°"}],
    menu: [{label:"Reportes",path:"/reportes",icon:"📊"}]
  }
}

const datos = computed(() => configuracion[rol] || configuracion.profesor)
const titulo = computed(() => datos.value.titulo)
const descripcion = computed(() => datos.value.descripcion)
const permisos = computed(() => datos.value.permisos)
const tarjetas = computed(() => datos.value.tarjetas)
const menuPermitido = computed(() => datos.value.menu)
const rolTexto = computed(() => rol.charAt(0).toUpperCase() + rol.slice(1))

function salir() {
  cerrarSesion()
  router.push("/")
}
</script>

<style scoped>
*{box-sizing:border-box}.panel{min-height:100vh;display:flex;background:#f5f6fa;color:#252936;font-family:Arial,Helvetica,sans-serif}.sidebar{width:250px;min-height:100vh;position:fixed;left:0;top:0;background:white;border-right:1px solid #e5e7eb;padding:20px 15px;display:flex;flex-direction:column}.logo{display:flex;align-items:center;gap:10px;padding:5px 10px 22px;border-bottom:1px solid #eee}.logo-icon{width:40px;height:40px;display:flex;align-items:center;justify-content:center;background:#4f5bd5;color:white;border-radius:9px;font-size:20px;font-weight:bold}.logo h2{margin:0;font-size:17px}.logo span{color:#777;font-size:12px}.menu{margin-top:20px}.menu-item{height:44px;display:flex;align-items:center;gap:13px;padding:0 13px;margin-bottom:5px;border-radius:8px;text-decoration:none;color:#555b67;font-size:14px}.menu-item:hover{background:#f1f2f7}.menu-item.active{background:#e9ebff;color:#4352c7;font-weight:bold}.icon{width:22px;text-align:center;font-size:18px}.logout{margin-top:auto;border:1px solid #ddd;background:white;border-radius:8px;padding:11px;cursor:pointer;color:#555}.logout:hover{background:#f5f5f5}.main-content{width:calc(100% - 250px);margin-left:250px;padding:30px 40px 50px}.header{display:flex;justify-content:space-between;align-items:center;margin-bottom:25px}.header h1{margin:0;font-size:28px}.header p{margin:5px 0 0;color:#777;font-size:14px}.user{display:flex;align-items:center;gap:10px}.avatar{width:40px;height:40px;display:flex;align-items:center;justify-content:center;background:#e8e9ef;border-radius:50%}.user strong{display:block;font-size:14px}.user small{display:block;margin-top:3px;color:#777;font-size:12px}.welcome{background:white;border:1px solid #e4e6eb;border-radius:12px;padding:25px;margin-bottom:25px}.tag{display:inline-block;padding:5px 9px;border-radius:6px;background:#eef0ff;color:#4352c7;font-size:11px;font-weight:bold;margin-bottom:10px}.welcome h2{margin:0 0 8px;font-size:21px}.welcome p{margin:0;color:#777;font-size:14px}.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-bottom:35px}.card{background:white;border:1px solid #e4e6eb;border-radius:12px;padding:20px;display:flex;align-items:center;gap:15px}.card-icon{width:50px;height:50px;display:flex;align-items:center;justify-content:center;background:#eef0ff;border-radius:10px;font-size:22px}.card span{display:block;color:#777;font-size:13px}.card h3{margin:5px 0 0;font-size:26px}.section{margin-bottom:35px}.section-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:15px}.section-header h2{margin:0;font-size:19px}.permissions{background:white;border:1px solid #e4e6eb;border-radius:12px;padding:8px 20px}.permission{padding:16px 5px;border-bottom:1px solid #eee;font-size:14px}.permission:last-child{border-bottom:none}.permission span{color:#4352c7;font-weight:bold;margin-right:10px}@media(max-width:900px){.sidebar{width:70px}.logo h2,.logo span,.menu-item span:not(.icon),.logout{display:none}.menu-item{justify-content:center}.main-content{width:calc(100% - 70px);margin-left:70px;padding:25px}.cards{grid-template-columns:1fr}.header{gap:15px}.user div:last-child{display:none}}
</style>
