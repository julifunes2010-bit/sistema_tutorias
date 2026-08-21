import { createRouter, createWebHistory } from "vue-router"

import Setting from "../Setting.vue"
import Login from "../login.vue"
import Home from "../home.vue"
import register from "../register.vue"



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
    }

  ]

})


export default router