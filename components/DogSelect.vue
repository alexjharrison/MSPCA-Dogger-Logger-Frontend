<template>
  <div class="container-fluid">
    <h1 class="text-center m-4">{{selectedDogId ? selectedDog.name : "Select Dog"}}</h1>
    <div class="dog-list">
      <Head
        v-for="dog in visibleDogs"
        :key="dog.id"
        :dog="dog"
        :selectedId="selectedDogId"
        @updateId="updateId"
      />
    </div>
    <dog-details :dog="selectedDog"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Head from '@/components/Head'
import DogDetails from '@/components/DogDetails'
export default {
  data() {
    return {
      selectedDogId: '',
      status: ''
    }
  },
  components: { Head, DogDetails },
  computed: {
    ...mapState(['me', 'dogs']),
    selectedDog() {
      return this.dogs.filter(dog => dog.id === this.selectedDogId)[0]
    },
    visibleDogs() {
      if (this.selectedDogId) return [this.selectedDog]
      else if (!status) return this.dogs
      else return this.dogs.filter(dog => dog.status === this.status)
    }
  },
  methods: {
    updateId(newId) {
      this.selectedDogId = newId
    }
  }
}
</script>

<style scoped>
.dog-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
