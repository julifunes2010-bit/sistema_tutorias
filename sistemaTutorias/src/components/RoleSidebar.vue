<template>
  <aside class="role-sidebar">
    <div class="sidebar-header">
      <div class="logo">T</div>
      <div class="brand"><span class="brand-title">Tutorías</span><span class="brand-subtitle">ProA</span></div>
    </div>

    <nav class="menu">
      <router-link to="/home" class="menu-item" :class="{ active: route.path === '/home' }">
        <span class="menu-icon">⌂</span><span>Inicio</span>
      </router-link>

      <template v-for="item in opciones" :key="item.path">
        <router-link
          v-if="puedeUsar(item.path)"
          :to="item.path"
          class="menu-item"
          :class="{ active: route.path === item.path }"
        >
          <span class="menu-icon">{{ item.icon }}</span><span>{{ item.label }}</span>
        </router-link>

        <button v-else class="menu-item menu-disabled" type="button" disabled :title="`Tu rol (${rolTexto}) no tiene acceso a esta opción`">
          <span class="menu-icon">{{ item.icon }}</span><span>{{ item.label }}</span>
          <span class="lock">🔒</span>
        </button>
      </template>

      <router-link to="/setting" class="menu-item" :class="{ active: route.path === '/setting' }">
        <span class="menu-icon">⚙</span><span>Configuración</span>
      </router-link>
    </nav>

    <div class="sidebar-user">
      <div class="avatar">👤</div>
      <div class="user-info"><strong>{{ usuario?.email }}</strong><small>{{ rolTexto }}</small></div>
    </div>
    <button class="logout" @click="salir">Cerrar sesión</button>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { obtenerUsuarioActual, cerrarSesion } from '../auth.js'

const route = useRoute()
const router = useRouter()
const usuario = obtenerUsuarioActual()
const rol = usuario?.rol || 'profesor'

const opciones = [
  { label: 'Nueva citación', path: '/nueva-citacion', icon: '＋' },
  { label: 'Mis citaciones', path: '/mis-citaciones', icon: '▣' },
  { label: 'Cursos', path: '/cursos', icon: '▤' },
  { label: 'Reportes', path: '/reportes', icon: '📊' }
]

const permisos = {
  director: ['/nueva-citacion', '/mis-citaciones', '/cursos', '/reportes'],
  profesor: ['/nueva-citacion', '/mis-citaciones', '/cursos'],
  preceptor: ['/nueva-citacion', '/mis-citaciones', '/reportes'],
  coordinador: ['/cursos', '/reportes'],
  secretario: ['/reportes']
}

function puedeUsar(path) {
  return (permisos[rol] || []).includes(path)
}

const rolTexto = computed(() => rol.charAt(0).toUpperCase() + rol.slice(1))

function salir() {
  cerrarSesion()
  router.push('/')
}
</script>

<style scoped>
* { box-sizing: border-box; }
.role-sidebar { width:250px; min-width:250px; height:100vh; position:fixed; left:0; top:0; z-index:10; background:#fff; border-right:1px solid #e5e7eb; padding:20px 15px; display:flex; flex-direction:column; }
.sidebar-header { display:flex; align-items:center; padding:5px 10px 22px; border-bottom:1px solid #eee; }
.logo { width:40px; height:40px; border-radius:9px; background:#4f5bd5; color:#fff; display:flex; align-items:center; justify-content:center; font-size:20px; font-weight:bold; }
.brand { display:flex; flex-direction:column; margin-left:10px; }
.brand-title { font-size:16px; color:#333; font-weight:500; }
.brand-subtitle { margin-top:3px; font-size:13px; color:#888; }
.menu { margin-top:20px; display:flex; flex-direction:column; gap:5px; }
.menu-item { min-height:44px; padding:0 13px; border:0; border-radius:8px; display:flex; align-items:center; gap:13px; color:#555b67; text-decoration:none; font-size:14px; font-family:inherit; background:transparent; width:100%; text-align:left; }
.menu-item:not(.menu-disabled):hover, .menu-item.active { background:#e9ebff; color:#4352c7; }
.menu-item.active { font-weight:bold; }
.menu-disabled { color:#b7bbc4; cursor:not-allowed; opacity:.65; }
.menu-disabled .menu-icon { color:#b7bbc4; }
.lock { margin-left:auto; font-size:12px; opacity:.8; }
.menu-icon { width:22px; min-width:22px; text-align:center; font-size:18px; }
.sidebar-user { margin-top:auto; padding:14px 5px; border-top:1px solid #eee; display:flex; align-items:center; gap:10px; }
.avatar { width:38px; height:38px; min-width:38px; border-radius:50%; background:#e8e9ef; display:flex; align-items:center; justify-content:center; }
.user-info { min-width:0; }.user-info strong,.user-info small { display:block; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }.user-info strong { font-size:12px; color:#333; }.user-info small { margin-top:3px; font-size:11px; color:#777; }
.logout { width:100%; min-height:40px; border:1px solid #ddd; border-radius:8px; background:#fff; color:#555; cursor:pointer; font-size:13px; }.logout:hover { background:#f5f5f5; }
@media (max-width:900px) { .role-sidebar{width:70px;min-width:70px}.brand,.menu-item>span:not(.menu-icon),.sidebar-user,.logout{display:none}.sidebar-header{justify-content:center;padding:5px 0 22px}.menu-item{justify-content:center;padding:0}.lock{display:none} }
@media (max-width:600px) { .role-sidebar{width:100%;min-width:100%;height:auto;position:relative;padding:15px;border-right:none;border-bottom:1px solid #e5e7eb}.brand,.menu-item>span:not(.menu-icon){display:inline}.sidebar-user,.logout{display:none}.sidebar-header{justify-content:flex-start;padding:5px 10px 15px}.menu{flex-direction:row;overflow-x:auto;margin-top:12px}.menu-item{min-width:max-content;padding:10px 13px;justify-content:flex-start}.lock{display:inline;margin-left:0} }
</style>
