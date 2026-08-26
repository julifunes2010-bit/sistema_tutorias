<template>
  <router-view />
</template>

<script>
import Login from "./login.vue"
import Home from "./home.vue"
import olvidar_CONTRA from "./olvidar_CONTRA.vue"

export default {
  components: {
    Login,
    Home
  }
}
</script>