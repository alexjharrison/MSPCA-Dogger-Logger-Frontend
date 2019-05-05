<template>
  <div id="login">
    <b-container class="mt-5">
      <b-card class="mb-2" title="Login">
        <b-form @submit.prevent="login">
          <b-form-group class="mb-1" label="Email">
            <b-form-input type="email" v-model="email"/>
          </b-form-group>
          <b-form-group label="Password">
            <b-form-input type="password" v-model="password"/>
          </b-form-group>
          <b-form-group>
            <b-button variant="success" type="submit">Submit</b-button>
            <b-alert variant="danger" class="mt-3 mb-0" v-if="alert" show>Error</b-alert>
          </b-form-group>
        </b-form>
      </b-card>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
      alert: false
    }
  },
  methods: {
    login() {
      const { password, email } = this
      this.$store.dispatch('login', { password, email })
    }
  }
}
</script>

<style scoped>
p {
  margin: 0;
}
.container {
  max-width: 500px;
  margin: auto;
}
</style>
