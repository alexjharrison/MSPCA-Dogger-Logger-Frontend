<template>
  <section class="container">
    <div v-if="token">
      <logo/>
      <div>{{ this.token }}</div>
      <span>{{ this.me }}</span>
      <span>{{ this.dogs }}</span>
      <nuxt-link to="/login">Login</nuxt-link>
      <nuxt-link to="/register">Register</nuxt-link>
      <!-- <h1 class="title">dogger-logger</h1>
      <h2 class="subtitle">loggers the doggers</h2>-->
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green">Documentation</a>
        <a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey">GitHub</a>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import { mapState } from 'vuex'

export default {
  data() {
    return {}
  },
  components: {
    Logo
  },
  computed: {
    ...mapState(['token', 'me', 'dogs'])
  },
  mounted() {
    this.$store.dispatch('getDogData')
  }
}
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>
