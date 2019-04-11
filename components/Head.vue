<template>
  <div class="d-flex">
    <b-button class="back"><--</b-button>
    <div class="dog-head" @click="$emit('updateId',dog.id)">
      <img :src="image" :alt="dog.name">
      <h4 :class="myClass">{{ dog.name }}</h4>
    </div>
  </div>
</template>

<script>
export default {
  props: ['dog', 'selectedId'],
  computed: {
    myClass() {
      return `text-center ${this.selectedId ? 'invisible' : 'visible'}`
    },
    image() {
      return this.dog.photo
        ? `https://dogger-logger.aharrison.xyz/${this.dog.photo.filepath}`
        : '/silhouette.png'
    }
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
  -webkit-box-shadow: 4px 6px 5px 8px rgba(33, 147, 176, 0.308);
  -moz-box-shadow: 4px 6px 5px 8px rgba(33, 147, 176, 0.308);
  box-shadow: 4px 6px 5px 8px rgba(33, 147, 176, 0.308);
  transition: all 0.5s ease;
}
</style>
