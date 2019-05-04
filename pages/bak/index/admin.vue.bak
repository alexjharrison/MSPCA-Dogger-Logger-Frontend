<template>
  <div id="admin" class="text-center">
    <h1 class="m-3">Admin Stuff</h1>
    <div>
      <b-button @click="page='dog'" variant="success">Add New Dog</b-button>
      <b-button @click="page='adminify'" variant="info" class="m-2">Adminify Users</b-button>
    </div>
    <adminify-form class="mx-auto" v-if="page==='adminify'"/>
    <new-dog class="mx-auto" v-else-if="page==='dog'"/>
  </div>
</template>

<script>
import AdminifyForm from '~/components/AdminifyForm'
import NewDog from '~/components/NewDog'
export default {
  data() {
    return {
      page: 'dog'
    }
  },
  components: {
    AdminifyForm,
    NewDog
  }
}
</script>

<style scoped>
</style>
