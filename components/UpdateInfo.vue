<template>
  <div class="p-4" v-if="$store.state.me.role==='admin'" id="update-info">
    <hr>
    <span class="h3 mt-4">Update Dog Info</span>
    <b-form id="new-dog-form" class="p-4 text-left" @submit.prevent="submitDog">
      <b-form-group label="Enter Dog's Name">
        <b-input required type="text" v-model="name" placeholder="Name"/>
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
      <img v-if="loading" class="my-3 spinner" src="/spinner.gif" alt="spinner">
      <b-button v-else class="my-3" variant="success" type="submit">Submit</b-button>
      <span>{{' ' + message}}</span>
    </b-form>
  </div>
</template>

<script>
export default {
  props: ['dog'],
  data() {
    return {
      name: this.dog.name,
      age: this.dog.age.split(' ')[0],
      ageInterval: this.dog.age.split(' ')[1],
      weight: this.dog.weight,
      breed: this.dog.breed,
      status: this.dog.status,
      photo: null,
      photoId: this.dog.photo_id,
      gender: this.dog.gender,
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
    submitDog() {
      const {name,weight,breed,status,gender} = this
      const data = {name,weight,breed,status,gender,age:this.age + ' '+ this.ageInterval,id:this.dog.id}
      this.$axios.$put('dog',data).then(dogs => {
        this.$store.commit('setDogs',dogs);
        this.message=this.name+" saved"
        setTimeout(()=>{
          this.message = ''
        },5000)
      }).catch(err=>this.message = 'Something went wrong :-(')
    }
  },
  mounted(){
    console.log(this.dog.age.split(' ')[1])
  }
}
</script>

<style scoped>
#update-info {
  max-width: 800px;
  border-radius: 10px;
  margin: 0 auto;
}
.spinner {
  height: 35px;
}
</style>
