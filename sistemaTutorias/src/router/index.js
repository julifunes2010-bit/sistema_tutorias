import { createRouter, createWebHistory } from "vue-router"
import SettingsRole from "../SettingsRole.vue"
import Login from "../login.vue"
import register from "../register.vue"
import reports from "../reports.vue"
import recuperar from "../recuperar.vue"
import cursos from "../cursos.vue"
import NuevaCitacion from "../nueva-citacion.vue"
import MisCitaciones from "../misCitaciones.vue"
import Home from "../home.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Login", component: Login },
    { path: "/register", name: "Register", component: register },
    { path: "/recuperar", name: "Recuperar", component: recuperar },
    { path: "/home", name: "Home", component: Home, meta: { requiereLogin: true } },
    { path: "/panel", redirect: "/home" },
    { path: "/setting", name: "Setting", component: SettingsRole, meta: { requiereLogin: true } },
    {
      path: "/reportes",
      name: "Reports",
      component: reports,
      meta: { requiereLogin: true, roles: ["director", "coordinador", "preceptor", "secretario"] }
    },
    {
      path: "/cursos",
      name: "Cursos",
      component: cursos,
      meta: { requiereLogin: true, roles: ["director", "profesor", "coordinador"] }
    },
    {
      path: "/nueva-citacion",
      name: "NuevaCitacion",
      component: NuevaCitacion,
      meta: { requiereLogin: true, roles: ["director", "profesor", "preceptor"] }
    },
    {
      path: "/mis-citaciones",
      name: "MisCitaciones",
      component: MisCitaciones,
      meta: { requiereLogin: true, roles: ["director", "profesor", "preceptor"] }
    }
  ]
})

router.beforeEach((to) => {
  const usuario = JSON.parse(localStorage.getItem("usuarioActual") || "null")

  if (to.meta.requiereLogin && !usuario) return "/"

  if (to.meta.roles && (!usuario || !to.meta.roles.includes(usuario.rol))) {
    return "/home"
  }

  if (to.path === "/" && usuario) return "/home"
})

export default router
