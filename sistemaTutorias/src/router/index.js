import { createRouter, createWebHistory } from "vue-router"

import Login from "../login.vue"
import Home from "../home.vue"


const router = createRouter({

  history: createWebHistory(),

  routes: [

    {
      path: "/",
      name: "Login",
      component: Login
    },

    {
      path: "/home",
      name: "Home",
      component: Home
    }

  ]

})


export default router