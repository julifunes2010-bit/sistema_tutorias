import "./assets/main.css"

import { createApp } from "vue"

import App from "./App.vue"

import router from "./router"

const savedTheme = localStorage.getItem("tutorias-theme")
document.documentElement.dataset.theme = savedTheme === "dark" ? "dark" : "light"

// El prototipo guardaba contraseñas sin cifrar en localStorage. Supabase Auth las reemplaza.
localStorage.removeItem("sistemaTutoriasUsers")
localStorage.removeItem("sistemaTutoriasSession")

createApp(App)
  .use(router)
  .mount("#app")
