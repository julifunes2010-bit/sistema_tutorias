import { createRouter, createWebHistory } from "vue-router"

import Setting from "../Setting.vue"
import Login from "../login.vue"
import Home from "../home.vue"
import register from "../register.vue"
import reports from "../reports.vue"
import recuperar from "../recuperar.vue"
import cursos from "../cursos.vue"
import NuevaCitacion from "../nueva-citacion.vue"
import MisCitaciones from "../misCitaciones.vue"

// para usar router pega este codigo en la terminal: npm install vue-router
const router = createRouter({

  history: createWebHistory(),

  routes: [

    {
      path: "/setting",
      name: "Setting",
      component: Setting
    },
    {
      path: "/",
      name: "Login",
      component: Login
    },

    {
      path: "/home",
      name: "Home",
      component: Home
    },
    {
      path: "/register",
      name: "Register",
      component: register
    },
    {
      path: "/reportes",
      name: "Reports",
      component: reports
    },
    {
      path: "/recuperar",
      name: "Recuperar",
      component: recuperar
    },
    {
      path: "/cursos",
      name: "Cursos",
      component: cursos
    },
    {
      path: "/nueva-citacion",
      name: "NuevaCitacion",
      component: NuevaCitacion
    },
    {
      path: "/mis-citaciones",
      name: "MisCitaciones",
      component: MisCitaciones
    }

  ]

})


export default router