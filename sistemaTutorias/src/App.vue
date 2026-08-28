<template>
  <router-view />
</template>

<script>
import Login from "./login.vue"
import Home from "./home.vue"
import recuperar from "./recuperar.vue"


export default {
  components: {
    Login,
    Home,
    recuperar
  }
}
</script>