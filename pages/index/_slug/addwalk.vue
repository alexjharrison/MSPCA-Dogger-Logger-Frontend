<template>
  <div id="app" class="d-flex justify-content-center">
    <b-card>
      <b-form @submit.prevent="submit" class="d-flex flex-column">
        <b-form-group label="Did they poop?">
          <b-form-radio-group v-model="pooped" :options="options" name="pooped"/>
        </b-form-group>
        <b-form-group label="Did they pee?">
          <b-form-radio-group v-model="peed" :options="options" name="peed"/>
        </b-form-group>
        <div>
          <b-form-group label="Any medical concerns?">
            <b-form-radio-group v-model="medical" :options="options" name="medical-concern"/>
          </b-form-group>
          <div v-if="medical">
            <label>Enter medical concerns</label>
            <b-form-textarea max-rows="8" v-model="medical_concern"/>
          </div>
        </div>
        <div class="my-2">
          <label>Number of jumps</label>
          <div class="d-flex justify-content-center mb-2">
            <b-button variant="danger" @click="jumps -= (jumps===0 ? 0: 1)">-</b-button>
            <h4 class="mx-3 my-auto">{{ jumps }}</h4>
            <b-button variant="success" @click="jumps++">+</b-button>
          </div>
          <div v-if="jumps>0">
            <label>Describe, how were they handled</label>
            <b-form-textarea max-rows="8" v-model="jump_handlage"/>
          </div>
        </div>
        <div class="my-2">
          <label>Number of mouthings</label>
          <div class="d-flex justify-content-center mb-2">
            <b-button variant="danger" @click="mouthings -= (mouthings===0 ? 0: 1)">-</b-button>
            <h4 class="mx-3 my-auto">{{ mouthings }}</h4>
            <b-button variant="success" @click="mouthings++">+</b-button>
          </div>
          <div v-if="mouthings>0">
            <label>Describe, how were they handled</label>
            <b-form-textarea max-rows="8" v-model="mouthings_handlage"/>
          </div>
        </div>
        <div class="my-2">
          <label>How many dogs were seen on walk?</label>
          <div class="d-flex justify-content-center mb-2">
            <b-button variant="danger" @click="dogs_seen -= (dogs_seen===0 ? 0: 1)">-</b-button>
            <h4 class="mx-3 my-auto">{{ dogs_seen }}</h4>
            <b-button variant="success" @click="dogs_seen++">+</b-button>
          </div>
          <div v-if="dogs_seen>0">
            <label>Of those, how many elicited a reaction</label>
            <div class="d-flex justify-content-center mb-2">
              <b-button
                variant="danger"
                @click="dogs_seen_reacted -= (dogs_seen_reacted===0 ? 0: 1)"
              >-</b-button>
              <h4 class="mx-3 my-auto">{{ dogs_seen_reacted }}</h4>
              <b-button
                variant="success"
                @click="dogs_seen_reacted += (dogs_seen_reacted === dogs_seen ? 0 : 1)"
              >+</b-button>
            </div>
            <label>How did they react?</label>
            <b-form-textarea max-rows="8" v-model="seen_dog_reaction"/>
          </div>
          <label>Any other comments/concerns?</label>
          <b-form-textarea max-rows="8" v-model="other_concerns"/>
        </div>
        <b-button style="width:100px" type="submit" variant="primary" class="submit-btn my-3">Submit</b-button>
      </b-form>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'addwalk',
  data() {
    return {
      pooped: false,
      peed: false,
      medical: false,
      medical_concern: '',
      jumps: 0,
      jump_handlage: '',
      mouthings: 0,
      mouthings_handlage: '',
      dogs_seen: 0,
      dogs_seen_reacted: 0,
      seen_dog_reaction: '',
      other_concerns: '',
      options: [{ text: 'Nope', value: false }, { text: 'Yup', value: true }]
    }
  },
  methods: {
    submit() {
      const {
        pooped,
        peed,
        medical_concern,
        jumps,
        jump_handlage,
        mouthings,
        mouthings_handlage,
        dogs_seen,
        dogs_seen_reacted,
        seen_dog_reaction,
        other_concerns
      } = this
      const data = {
        pooped,
        peed,
        medical_concern,
        jumps,
        jump_handlage,
        mouthings,
        mouthings_handlage,
        dogs_seen,
        dogs_seen_reacted,
        seen_dog_reaction,
        other_concerns,
        dog_id: this.dog.id
      }
      this.$axios.$post('walk', data).then(dogs => {
        this.$store.commit('setDogs', dogs)
        this.$router.push('/' + this.dog.slug)
      })
    }
  },
  computed: {
    dog() {
      const slug = this.$route.params.slug
      return this.$store.state.dogs.filter(dog => dog.slug === slug)[0]
    }
  }
}
</script>

<style>
</style>
