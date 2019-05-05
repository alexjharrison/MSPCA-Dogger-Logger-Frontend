<template>
  <div class="d-flex align-items-center flex-wrap justify-content-center mb-3">
    <div v-if="selected" class="d-flex flex-column">
      <b-button
        to="#add-walk"
        @click="$emit('updatePage','add-walk')"
        class="m-1"
        size="lg"
        variant="primary"
      >
        Add Walk
        <img id="paw-print" src="/paw-print.png" alt="paw print">
      </b-button>
      <b-button
        to="#walk-data"
        @click="$emit('updatePage','walk-data')"
        class="m-1"
        variant="outline-info"
      >Walks Data</b-button>
      <b-button
        v-if="$store.state.me.role==='admin'"
        @click="$emit('updatePage','update-info')"
        class="m-1"
        variant="outline-success"
      >Update Info</b-button>
    </div>
    <div class="dog-head" @click="$emit('updateId',dog.id)">
      <img :class="selected ? 'selected' : ''" :src="image" :alt="dog.name">
      <h4 class="text-center" v-if="!selected">{{ dog.name }}</h4>
      <b-form-file
        id="pic-input"
        accept="image/*"
        @input="uploadPic"
        :state="Boolean(photo)"
        placeholder="update pic"
        v-model="photo"
        v-if="selected"
      />
    </div>
    <div v-if="selected" class="mx-4">
      <p>Status: {{dog.status}}</p>
      <p>Age: {{dog.age}}</p>
      <p>Weight: {{dog.weight}} lbs</p>
      <p>Breed: {{dog.breed}}</p>
    </div>
    <hr>
  </div>
</template>

<script>
export default {
  props: ['dog', 'selectedId'],
  data() {
    return {
      photo: null
    }
  },
  computed: {
    selected() {
      return this.dog.id === this.selectedId
    },
    image() {
      return this.dog.photo
        ? `http://localhost:8000/${this.dog.photo.filepath}`
        : '/silhouette.png'
      // return this.dog.photo
      //   ? `https://api.doggerlogger.aharrison.xyz/${this.dog.photo.filepath}`
      //   : '/silhouette.png'
    }
  },
  methods: {
    // uploadPic() {
    //   let data = new FormData()
    //   data.append('photo', this.photo)
    //   data.append('dog_id', this.dog.id)
    //   this.$axios
    //     .$post('photo', data)
    //     .then(res => {
    //       // const dogId = this.dog.id
    //       // let newPhoto = res.photo
    //       this.$store.commit('setDogs', res.dogs)
    //     })
    //     .catch(err => console.log(err))
    // }
  }
}
</script>

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
