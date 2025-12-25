<template>
  <img :src="src" :alt="alt" class="a-image" />
</template>

<script>
export default {
  name: 'A_Image',
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: '',
    }
  }
}
</script>

<style scoped>
.a-image {
  max-width: 100%;
  height: auto;
  display: block;
}
</style>