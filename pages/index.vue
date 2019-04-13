<template>
  <div id="app" v-if="$store.state.token">
    <b-nav tabs v-if="$store.state.me.role==='admin'">
      <b-nav-item to="/dogs">Dogs</b-nav-item>
      <b-nav-item to="admin">Admin</b-nav-item>
    </b-nav>
    <nuxt-child/>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  mounted() {
    this.$nextTick(() => {
      this.$store.dispatch('getMyData')
      this.$router.push('/dogs')
    })
  }
}
</script>

<style scoped>
</style>

