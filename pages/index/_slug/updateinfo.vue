<template>
  <update-info :dog="dog"/>
</template>

<script>
import UpdateInfo from '~/components/UpdateInfo'
export default {
  name: 'updateinfo',
  components: { UpdateInfo },
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
