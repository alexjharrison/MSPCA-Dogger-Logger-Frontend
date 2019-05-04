<template>
  <add-walk :dog="dog"/>
</template>

<script>
import AddWalk from '~/components/AddWalk'
export default {
  components: { AddWalk },
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
