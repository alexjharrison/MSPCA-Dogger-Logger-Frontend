<template>
  <div id="app" v-if="$store.state.token">
    <dog-select/>
  </div>
</template>

<script>
import DogSelect from '@/components/DogSelect'
export default {
  data() {
    return {}
  },
  components: {
    DogSelect
  },
  mounted() {
    this.$nextTick(() => {
      this.$store.dispatch('getMyData')
    })
  }
}
</script>

<style scoped>
</style>

