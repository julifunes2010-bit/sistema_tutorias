import "./assets/main.css"

import { createApp } from "vue"

import App from "./App.vue"

import router from "./router"

const savedTheme = localStorage.getItem("tutorias-theme")
document.documentElement.dataset.theme = savedTheme === "light" ? "light" : "dark"

createApp(App)
  .use(router)
  .mount("#app")
