<template>
  <div id="login">
    <b-container class="mt-5">
      <b-card class="mb-2" title="Register New Account">
        <b-form @submit.prevent="register">
          <b-form-group class="mb-1" label="Full Name">
            <b-form-input type="text" v-model="name"/>
          </b-form-group>
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
      <b-link to="/login">Switch to Login Page</b-link>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      name: '',
      alert: false
    }
  },
  methods: {
    register() {
      const { name, password, email } = this
      this.$store.dispatch('register', {
        name,
        password,
        email
      })
    }
  }
}
</script>

<style scoped>
p {
  margin: 0;
}
</style>
