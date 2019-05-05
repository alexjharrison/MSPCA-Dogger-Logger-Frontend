<template>
  <div id="app" v-if="$store.state.token">
    <div class="container-fluid">
      <span @click="$router.push('/')" id="back-btn" v-if="currentSlug">&#128281;</span>
      <h1 class="text-center my-3 mx-5">{{currentSlug ? selectedDog.name : "Select Dog"}}</h1>
      <transition-group class="dog-list" name="doggy">
        <div
          v-for="dog in visibleDogs"
          :key="dog.id"
          class="d-flex align-items-center flex-wrap justify-content-center mb-3"
        >
          <div v-if="currentSlug" class="d-flex flex-column">
            <b-button
              @click="$router.push(`/${currentSlug}/addwalk`)"
              class="m-1"
              size="lg"
              variant="primary"
            >
              Add Walk
              <img id="paw-print" src="/paw-print.png" alt="paw print">
            </b-button>
            <b-button
              @click="$router.push('/'+dog.slug)"
              class="m-1"
              variant="outline-info"
            >Walks Data</b-button>
            <b-button
              v-if="$store.state.me.role==='admin'"
              @click="$router.push(`/${currentSlug}/updateinfo`)"
              class="m-1"
              variant="outline-success"
            >Update Info</b-button>
          </div>
          <div class="dog-head" @click="$router.push('/'+dog.slug)">
            <img :class="currentSlug ? 'selected' : ''" :src="image(dog)" :alt="dog.name">
            <h4 class="text-center" v-if="!currentSlug">{{ dog.name }}</h4>
            <b-form-file
              id="pic-input"
              accept="image/*"
              @input="uploadPic(dog)"
              :state="Boolean(photo)"
              placeholder="update pic"
              v-model="photo"
              v-if="currentSlug"
            />
          </div>
          <div v-if="currentSlug" class="mx-4">
            <p>Status: {{dog.status}}</p>
            <p>Age: {{dog.age}}</p>
            <p>Weight: {{dog.weight}} lbs</p>
            <p>Breed: {{dog.breed}}</p>
          </div>
          <hr>
        </div>
      </transition-group>
    </div>
    <nuxt-child :key="$route.path"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'home',
  data() {
    return {
      photo: ''
    }
  },
  computed: {
    ...mapState(['me', 'dogs']),
    selectedDog() {
      return this.dogs.filter(dog => dog.slug == this.currentSlug)
    },
    visibleDogs() {
      let dogList = [...this.dogs].sort(
        (a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0)
      )
      let thisDog = this.selectedDog
      console.log(this.currentSlug ? this.selectedDog : dogList)
      return this.currentSlug ? this.selectedDog : dogList
    },
    currentSlug() {
      return this.$route.params.slug
    }
  },
  methods: {
    image({ photo }) {
      return photo
        ? 'http://localhost:8000/' + photo.filepath
        : '/silhouette.png'
    },
    uploadPic({ id }) {
      let data = new FormData()
      data.append('photo', this.photo)
      data.append('dog_id', id)
      this.$axios
        .$post('photo', data)
        .then(res => {
          this.$store.commit('setDogs', res.dogs)
        })
        .catch(err => console.log(err))
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.$store.dispatch('getMyData')
    })
  }
}
</script>

<style scoped>
.dog-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
#back-btn {
  position: absolute;
  font-size: 30px;
  cursor: pointer;
  margin-left: 20px;
}
#back-btn:hover {
  opacity: 0.7;
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

<style scoped>
img {
  border-radius: 50%;
  margin: 10px;
  width: 200px;
  -webkit-box-shadow: 7px 10px 5px -4px #ccc;
  -moz-box-shadow: 7px 10px 5px -4px #ccc;
  box-shadow: 7px 10px 5px -4px #ccc;
  transition: all 0.3s ease;
}
img:hover {
  -webkit-box-shadow: 4px 6px 5px 8px rgba(23, 94, 112, 0.308);
  -moz-box-shadow: 4px 6px 5px 8px rgba(23, 94, 112, 0.308);
  box-shadow: 4px 6px 5px 8px rgba(23, 94, 112, 0.308);
  transition: all 0.5s ease;
}
.selected {
  border-radius: 5px;
}
p {
  margin: 0;
  font-size: 25px;
}
#paw-print {
  border-radius: 0;
  box-shadow: none;
  width: 25px;
}
@media screen and (max-width: 500px) {
  img {
    width: 150px;
  }
}
</style>

<style>
#pic-input {
  width: 1px;
}
</style>