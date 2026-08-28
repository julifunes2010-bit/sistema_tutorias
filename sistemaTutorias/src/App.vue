<template>
  <router-view />
</template>

<script>
import Login from "./login.vue"
import Home from "./home.vue"
import RECUPERAR from "./RecuperarContraseña.vue"

export default {
  components: {
    Login,
    Home,
    RECUPERAR
  }
}
</script>