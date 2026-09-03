import { createRouter, createWebHistory } from "vue-router"

import Setting from "../Setting.vue"
import Login from "../login.vue"
import Home from "../home.vue"
import register from "../register.vue"
import reports from "../reports.vue"
import recuperar from "../recuperar.vue"
import cursos from "../cursos.vue"
import EnviarGmail from "../Enviar-Gmail.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/setting", name: "Setting", component: Setting },
    { path: "/", name: "Login", component: Login },
    { path: "/home", name: "Home", component: Home },
    { path: "/register", name: "Register", component: register },
    { path: "/reportes", name: "Reports", component: reports },
    { path: "/recuperar", name: "Recuperar", component: recuperar },
    { path: "/cursos", name: "Cursos", component: cursos },
    { path: "/enviar-gmail", name: "EnviarGmail", component: EnviarGmail }
  ]
})

export default router
