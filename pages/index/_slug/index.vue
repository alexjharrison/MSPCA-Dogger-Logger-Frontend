<template>
  <div id="walk-data-page">
    <walk-data :dog="dog"/>
  </div>
</template>

<script>
import WalkData from '~/components/WalkData'
export default {
  name: 'walkdata',
  components: { WalkData },
  computed: {
    dog() {
      const slug = this.$route.params.slug
      return this.$store.state.dogs.filter(dog => dog.slug === slug)[0]
    }
  }
}
</script>

<style scoped>
</style>
