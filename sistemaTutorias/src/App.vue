<template>
  <router-view />
</template>

<script>
import Login from "./login.vue"
import Home from "./home.vue"

export default {
  components: {
    Login,
    Home
  }
}
</script>