<template>
  <update-info v-if="dog" :dog="dog"/>
</template>

<script>
import UpdateInfo from '~/components/UpdateInfo'
export default {
  data() {
    return {
      dog: null
    }
  },
  components: { UpdateInfo },
  computed: {
    // dog() {
    //   return this.$store.state.dogs.filter(dog => dog.slug === slug)[0]
    // }
  },
  mounted() {
    const slug = this.$route.params.slug
    this.dog = this.$store.state.dogs.filter(dog => dog.slug === slug)[0]
  }
}
</script>

<style>
</style>
