<template>
  <div class="container-fluid">
    <h1 class="text-center my-3 mx-5">{{selectedDogId ? selectedDog.name : "Select Dog"}}</h1>
    <transition-group class="dog-list" name="doggy" method="out-in">
      <Head
        v-for="dog in visibleDogs"
        class="doggy"
        :key="dog.id"
        :dog="dog"
        :selectedId="selectedDogId"
        @updateId="updateId"
        @updatePage="updatePage"
      />
    </transition-group>
    <walk-data v-if="page==='walk-data'" :dog="selectedDog"/>
    <add-walk v-if="page==='add-walk'" :dog="selectedDog"/>
    <update-info v-if="page==='update-info'" :dog="selectedDog"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Head from '@/components/Head'
import WalkData from '@/components/WalkData'
import AddWalk from '@/components/AddWalk'
import UpdateInfo from '@/components/UpdateInfo'
export default {
  data() {
    return {
      selectedDogId: '',
      status: '',
      page: ''
    }
  },
  components: { Head, WalkData, AddWalk, UpdateInfo },
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
    },
    updatePage(page) {
      this.page = page
    }
  },
  watch: {
    selectedDogId() {
      if (this.selectedDogId !== '') {
        this.page = 'walk-data'
      } else this.page = ''
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
.doggy {
  backface-visibility: hidden;
  z-index: 1;
}

/* moving */
.doggy-move {
  transition: all 600ms ease-in-out 50ms;
}

/* appearing */
.doggy-enter-active {
  transition: all 400ms ease-out;
}

/* disappearing */
.doggy-leave-active {
  transition: all 200ms ease-in;
  position: absolute;
  z-index: 0;
}

/* appear at / disappear to */
.doggy-enter,
.doggy-leave-to {
  opacity: 0;
}
</style>
