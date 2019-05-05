<template>
  <div id="adminify" class="m-4">
    <hr>
    <span class="h3 mt-4">Choose Users to Become Admins</span>
    <b-form @submit.prevent="submit">
      <b-form-group>
        <b-form-checkbox-group class="mt-4" v-model="selectedIds" :options="options" stacked/>
      </b-form-group>
      <b-button type="submit" variant="success">Submit</b-button>
      <span>{{" "+message}}</span>
    </b-form>
    <div class="m-5">
      <h3>Current Admins</h3>
      <div v-for="admin in admins" :key="admin">{{admin}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'adminify',
  data() {
    return {
      selectedIds: [],
      message: ''
    }
  },
  computed: {
    options() {
      return this.users.map(user => ({
        text: user.name + ' (' + user.email + ')',
        value: user.id
      }))
    },
    allUsers() {
      return this.$store.state.users
    },
    users() {
      return this.allUsers
        .filter(user => user.role === 'walker')
        .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
    },
    admins() {
      return this.allUsers
        .filter(user => user.role === 'admin')
        .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
        .map(user => `${user.name} (${user.email})`)
    }
  },
  methods: {
    submit() {
      this.message = 'submitting...'
      this.$axios
        .$post('adminify', { user_ids: this.selectedIds })
        .then(res => {
          console.log(res)
          this.message = 'Success!'
          this.$store.dispatch('getAllUsers')
          setTimeout(() => {
            this.message = ''
          }, 5000)
        })
        .catch(err => (this.message = 'Submission Failed :-('))
    }
  },
  mounted() {
    setTimeout(() => {
      this.$store.dispatch('getAllUsers')
    }, 0)
  }
}
</script>

<style scoped>
#adminify {
  margin: 0 auto;
}
</style>
