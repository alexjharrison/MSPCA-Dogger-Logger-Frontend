<template>
  <div>
    <b-navbar type="dark">
      <img width="160" src="~/static/mspca_logo.png">
      <div class="push-right">
        <b-button size="sm" @click="logout" v-if="this.token" variant="outline-light">Log Out</b-button>
      </div>
    </b-navbar>
    <b-nav tabs v-if="$store.state.me.role==='admin'">
      <b-nav-item to="/">Dogs</b-nav-item>
      <b-nav-item to="/newdog">Add Dog</b-nav-item>
      <b-nav-item to="/adminify">Adminify Users</b-nav-item>
    </b-nav>
    <nuxt/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['token', 'me', 'dogs'])
  },
  mounted() {
    this.$axios.setHeader('Accept', 'application/json')
    this.$axios.setHeader('Content-Type', 'application/x-www-form-urlencoded')
    const store = JSON.parse(localStorage.getItem('store'))
    if (store) this.$store.commit('setState', store)
    this.$axios.setToken(this.token, 'Bearer')
  },
  methods: {
    logout() {
      // this.$store.commit('setToken', '')
      this.$store.commit('setState', {
        token: '',
        me: {},
        dogs: [],
        users: []
      })
      localStorage.setItem('store', JSON.stringify(this.$store.state))
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.navbar {
  background: #2193b0; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #6dd5ed,
    #2193b0
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #6dd5ed,
    #2193b0
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  -webkit-box-shadow: 1px 4px 5px -4px #aaa;
  -moz-box-shadow: 1px 4px 5px -4px #aaa;
  box-shadow: 1px 4px 5px -4px #aaa;
}
.push-right {
  position: absolute;
  right: 10px;
}
</style>


<style>
html {
  font-family: 'Raleway', sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Roboto', sans-serif;
}
/* 
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
} */
</style>
