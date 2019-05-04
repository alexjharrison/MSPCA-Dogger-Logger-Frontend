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
  data() {
    return {
      users: [],
      selectedIds: [],
      message: '',
      admins: []
    }
  },
  mounted() {
    this.getUsers()
  },
  computed: {
    options() {
      return this.users.map(user => ({
        text: user.name + ' (' + user.email + ')',
        value: user.id
      }))
    }
  },
  methods: {
    submit() {
      this.message = 'submitting...'
      const { selectedIds } = this
      this.$axios
        .$post('adminify', { user_ids: selectedIds })
        .then(res => {
          console.log(res)
          this.message = 'Success!'
          this.getUsers()
          setTimeout(() => {
            this.message = ''
          }, 5000)
        })
        .catch(err => (this.message = 'Submission Failed :-('))
    },
    getUsers() {
      this.$axios.$get('users').then(users => {
        this.users = []
        this.admins = users
          .filter(user => user.role === 'admin')
          .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
          .map(user => user.name)
        users = users
          .filter(user => user.role === 'walker')
          .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
        this.users.splice(0, 0, ...users)
      })
    }
  }
}
</script>

<style scoped>
#adminify {
  margin: 0 auto;
}
</style>
