<template>
  <div id="new-dog">
    <hr>
    <span class="h3 mt-4">Add New Dog</span>
    <b-form class="p-4 text-left" @submit.prevent="submitDog">
      <b-form-group label="Enter Dog's Name">
        <b-input id="dog-name" required type="text" v-model="name" placeholder="Name"/>
      </b-form-group>
      <b-form-group label="Enter Dog's Age">
        <b-input required type="number" v-model="age" placeholder="Age"/>
        <b-form-radio-group :options="aoptions" v-model="ageInterval"/>
      </b-form-group>
      <b-form-group label="Enter Dog's Weight (lbs)">
        <b-input required type="number" v-model="weight" placeholder="Weight"/>
      </b-form-group>
      <b-form-group label="Enter Dog's Breed">
        <b-input required type="text" v-model="breed" placeholder="Breed"/>
      </b-form-group>
      <b-form-group label="Enter Dog's Gender">
        <b-form-radio-group v-model="gender" :options="goptions"/>
      </b-form-group>
      <b-form-group label="Enter Dog's Status">
        <b-form-radio-group v-model="status" :options="soptions"/>
      </b-form-group>
      <b-form-group label="Upload Photo (optional)">
        <b-form-file
          v-model="photo"
          placeholder="Choose a photo..."
          accept="image/*"
          :state="Boolean(photo)"
          @input="uploadPhoto"
        />
      </b-form-group>
      <img v-if="loading" class="my-3 spinner" src="/spinner.gif" alt="spinner">
      <b-button v-else class="my-3" variant="success" type="submit">Submit</b-button>
      <span>{{' ' + message}}</span>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'newdog',
  data() {
    return {
      name: '',
      age: '',
      weight: '',
      breed: '',
      status: 'Receiving',
      photo: null,
      photoId: null,
      gender: 'Male',
      ageInterval: 'years',
      loading: false,
      message: '',
      aoptions: [
        { value: 'months', text: 'months' },
        { value: 'years', text: 'years' }
      ],
      soptions: [
        { value: 'Receiving', text: 'Receiving' },
        { value: 'Adoption', text: 'Adoption' }
      ],
      goptions: [
        { value: 'Male', text: 'Male' },
        { value: 'Female', text: 'Female' },
        { value: 'Non-Binary', text: 'Non-Binary' }
      ]
    }
  },
  methods: {
    uploadPhoto() {
      this.loading = true
      let data = new FormData()
      data.append('photo', this.photo)
      this.$axios
        .$post('photo', data)
        .then(res => {
          console.log(res)
          this.photoId = res.photo.id
          this.loading = false
        })
        .catch(err => {
          // alert(err.message)
          this.loading = false
        })
    },
    submitDog() {
      let data = {
        name: this.name,
        age: this.age + ' ' + this.ageInterval,
        weight: this.weight,
        breed: this.breed,
        gender: this.gender,
        status: this.status
      }
      if (this.photoId) data['photo_id'] = this.photoId
      console.log(data)
      this.message = 'Sending...'
      this.$axios.setHeader('Content-Type', 'x-www-form-urlencoded')
      this.$axios
        .$post('dog', data)
        .then(res => {
          console.log(res)
          this.$store.commit('setDogs', res)
          this.message = this.name + ' Added!'
          this.name = ''
          this.age = ''
          this.weight = ''
          this.breed = ''
          this.status = 'Receiving'
          this.photo = null
          this.photoId = null
          this.gender = 'Male'
          this.ageInterval = 'years'
          document.getElementById('dog-name').focus()
          setTimeout(() => {
            this.message = ''
          }, 5000)
        })
        .catch(err => {
          console.log(err)
          this.message = 'Submission Failed'
        })
    }
  }
}
</script>

<style scoped>
#new-dog {
  max-width: 800px;
  border-radius: 10px;
  margin: 0 auto;
}
.spinner {
  height: 35px;
}
</style>
